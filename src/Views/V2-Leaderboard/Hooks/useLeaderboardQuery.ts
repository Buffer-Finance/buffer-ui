import axios from 'axios';
import { useUserAccount } from '@Hooks/useUserAccount';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { add } from '@Utils/NumString/stringArithmatics';
import { updateLeaderboardTotalPageAtom } from '../atom';
import { ROWINAPAGE } from '../Incentivised';
import { ILeague } from '../interfaces';
import { useDayOfTournament } from './useDayOfTournament';
import { useDayOffset } from './useDayOffset';
import { blockedAccounts } from './useWeeklyLeaderboardQuery';
import { useActiveChain } from '@Hooks/useActiveChain';
import { DailyTournamentConfig } from '../Incentivised/config';

interface ILeaderboardQuery {
  userStats: ILeague[];
  loserStats: ILeague[];
  totalData: {
    totalTrades: number;
    volume: string;
    user: string;
  }[];
  userData: ILeague[];
  reward: { settlementFee: string; totalFee: string }[];
}

export function getDayId(offset: number): number {
  let timestamp = new Date().getTime() / 1000;
  if (offset > 0) {
    timestamp = timestamp - offset * 86400;
  }
  let dayTimestamp = Math.floor((timestamp - 16 * 3600) / 86400);
  return dayTimestamp;
}

export const useLeaderboardQuery = () => {
  const setTablePages = useSetAtom(updateLeaderboardTotalPageAtom);
  const { address: account } = useUserAccount();
  const { offset } = useDayOffset();
  const { day } = useDayOfTournament();
  const timestamp = getDayId(Number(day - Number(offset ?? day)));
  const { configContracts, activeChain } = useActiveChain();
  const configValue = DailyTournamentConfig[activeChain.id];

  const { data } = useSWR<ILeaderboardQuery>(
    `leaderboard-arbi-offset-${offset}-account-${account}-daily-chainId-${activeChain.id}`,
    {
      fetcher: async () => {
        const leaderboardQuery = `
          userStats: leaderboards(
            orderBy: netPnL
            orderDirection: desc
            first: 100
            where: {timestamp: "${timestamp}", totalTrades_gte: ${
          configValue.minTradesToQualifyPNL
        }, user_not_in: [${blockedAccounts.map((address) => `"${address}"`)}]}
          ) {
            user
            totalTrades
            netPnL
            volume
          }
          loserStats: leaderboards(
            orderBy: netPnL
            orderDirection: asc
            first: 100
            where: {timestamp: "${timestamp}", totalTrades_gte: ${
          configValue.minTradesToQualifyPNL
        }, user_not_in: [${blockedAccounts.map((address) => `"${address}"`)}]}
          ) {
            user
            totalTrades
            netPnL
            volume
          }
          totalData: leaderboards(
            orderBy: netPnL
            orderDirection: desc
            where: {timestamp: "${timestamp}"}
          ) {
            totalTrades
            volume
            user
          }
          reward:dailyRevenueAndFees(where: {id: "${timestamp}"}) {
            settlementFee
            totalFee
          }
          
        `;
        const userQuery = account
          ? `userData: leaderboards(
          where: {user: "${account}", timestamp: "${timestamp}"}
        ) {
          totalTrades
          netPnL
          volume
          user
        }`
          : '';

        const query = `{${leaderboardQuery}${userQuery}}`;
        const response = await axios.post(configContracts.graph.MAIN, {
          query,
        });

        return response.data?.data as ILeaderboardQuery;
      },
      refreshInterval: 300,
    }
  );

  useEffect(() => {
    //sets total number of pages in arbiturm testnet page
    if (data && data.userStats && data.userStats.length > 0) {
      setTablePages({
        arbitrum: Math.ceil(data.userStats.length / ROWINAPAGE),
      });
    } else {
      setTablePages({
        arbitrum: 0,
      });
    }
  }, [data?.userStats]);

  const winnerUserRank = useMemo(() => {
    if (!data || !data.userStats || !account) return '-';
    const rank = data.userStats.findIndex(
      (data) => data.user.toLowerCase() == account.toLowerCase()
    );

    if (rank === -1) return '-';
    else return (rank + 1).toString();
  }, [data?.userData, account]);

  const loserUserRank = useMemo(() => {
    if (!data || !data.loserStats || !account) return '-';
    const rank = data.loserStats.findIndex(
      (data) => data.user.toLowerCase() == account.toLowerCase()
    );
    if (rank === -1) return '-';
    else return (rank + 1).toString();
  }, [data?.loserStats, account]);

  const totalTournamentData = useMemo(() => {
    if (!data || !data.totalData) return null;
    let allTradesCount = 0;
    let totalFee = '0'; //totalFee is the Volume, variable already used everywhere so not changing it.
    let totalUsers = data?.totalData.length;
    let totalRows = data?.totalData.length;
    for (let singleUserTrades of data?.totalData) {
      allTradesCount += singleUserTrades.totalTrades;
      totalFee = add(totalFee, singleUserTrades.volume);
    }
    return { allTradesCount, totalFee, totalRows, totalUsers };
  }, [data?.totalData, account]);

  return { data, totalTournamentData, winnerUserRank, loserUserRank };
};

/*
allTradesCount:
  accumulator.allTradesCount + currentvalue.totalTrades,
totalFee: add(accumulator.totalFee, currentvalue.volume),
userRank,
totalRows: accumulator.totalRows + 1,


*/

// const { data: userAboveMe } = useSWR<ILeaderboardQuery>(
//   `leaderboard-${data?.userData?.[0]?.netPnL}-${account}`,
//   {
//     fetcher: async () => {
//       const netPnL = data?.userData?.[0]?.netPnL;
//       const query = `{
//         usersAboveMe: leaderboards(
//           orderBy: netPnL
//           orderDirection: desc
//           where: {timestamp: ${timestamp}, totalTrades_gte: ${minimumTrades}, netPnL_gt: ${netPnL}}
//           ) {
//             user
//           }
//         }`;
//       const response = await axios.post(baseGraphqlUrl, {
//         query,
//       });

//       return response.data?.data as {};
//     },
//     refreshInterval: 300,
//   }
// );

//not used query
// totalPaginationData: leaderboards(
//           orderBy: netPnL
//           orderDirection: desc
//           where: {timestamp: "${timestamp}", totalTrades_gte: ${minimumTrades}}
//         ) {
//           user
//         }
