import { getConfig } from '@Views/TradePage/utils/getConfig';
import axios from 'axios';
import useSWR from 'swr';
import { Chain } from 'wagmi';
import { poolStats, poolsType } from '../types';

export const usePoolStats = (activeChain: Chain, activePool: poolsType) => {
  const graphUrl = getConfig(activeChain.id).graph.LP;

  return useSWR<poolStats[]>(`${activeChain}-${activePool}-blp-stats`, {
    fetcher: async () => {
      const poolName = activePool === 'uBLP' ? 'USDC' : 'ARB';
      const query = `{
                poolStats(where: {id_not: "current${poolName}",poolName:"${poolName}"}) {
                   profit
                   loss
                   timestamp
                }
            }`;
      try {
        const { data, status } = await axios.post(graphUrl, { query });
        if (status === 200) {
          return data.data.poolStats;
        } else {
          throw new Error('Failed to fetch pool stats');
        }
      } catch (e) {
        console.error(e, 'poolStats');
      }
    },
    refreshInterval: 50000,
  });
};