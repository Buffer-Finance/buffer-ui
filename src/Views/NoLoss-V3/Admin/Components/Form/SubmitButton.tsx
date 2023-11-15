import { useToast } from '@Contexts/Toast';
import { useWriteCall } from '@Hooks/useWriteCall';
import { toFixed } from '@Utils/NumString';
import { BlueBtn } from '@Views/Common/V2-Button';
import { activeChainAtom, nolossmarketsAtom } from '@Views/NoLoss-V3/atoms';
import { getNoLossV3Config } from '@Views/NoLoss-V3/helpers/getNolossV3Config';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import TournamentManagerABI from '../../../ABIs/TournamentManager.json';
import {
  LeaderboardRulesAtom,
  TournamentConditionsAtom,
  TournamentMetaDataAtom,
} from '../../Atoms/Form';

export const SubmitButton = () => {
  const { writeCall } = useWriteCall();
  const activeChain = useAtomValue(activeChainAtom);
  const toastify = useToast();
  const [loading, setLoading] = useState(false);
  const markets = useAtomValue(nolossmarketsAtom);
  const leaderboardRules = useAtomValue(LeaderboardRulesAtom);
  const tournamentConditions = useAtomValue(TournamentConditionsAtom);
  const tournamentMetaData = useAtomValue(TournamentMetaDataAtom);

  async function handleSubmit() {
    try {
      if (activeChain === undefined) throw new Error('No active chain');
      const config = getNoLossV3Config(activeChain.id);
      if (config === undefined) throw new Error('No config for active chain');
      if (markets === undefined) throw new Error('No markets');
      const marketsArray = Object.values(markets).map((market) => market.asset);
      setLoading(true);
      const params = [
        marketsArray,
        [
          tournamentMetaData.name,
          tournamentMetaData.startTime,
          tournamentMetaData.closeTime,
          toFixed(tournamentMetaData.ticketCost, 0),
          toFixed(tournamentMetaData.playTokenMintAmount, 0),
          tournamentMetaData.isClosed,
          tournamentMetaData.isVerified,
          tournamentMetaData.hasTradingStarted,
          tournamentMetaData.shouldRefundTickets,
          tournamentMetaData.tournamentType,
          tournamentMetaData.buyInToken,
          tournamentMetaData.rewardToken,
          tournamentMetaData.creator,
        ],
        [
          tournamentConditions.maxBuyinsPerWallet,
          tournamentConditions.minParticipants,
          tournamentConditions.maxParticipants,
          toFixed(tournamentConditions.guaranteedWinningAmount, 0),
          toFixed(tournamentConditions.startPriceMoney, 0),
          toFixed(tournamentConditions.rakePercent, 0),
        ],
        [
          leaderboardRules.rankFirst,
          leaderboardRules.rankLast,
          leaderboardRules.userCount,
          leaderboardRules.totalBuyins,
          leaderboardRules.rakeCollected,
          leaderboardRules.totalWinners,
          leaderboardRules.rewardPercentages.map((reward) =>
            toFixed(reward, 0)
          ),
        ],
      ];
      console.log(params);
      await writeCall(
        config.manager,
        TournamentManagerABI,
        (response) => {
          console.log(response);
        },
        'createTournament',
        params
      );
    } catch (e) {
      toastify({
        type: 'error',
        msg: (e as Error).message,
        id: 'submit-error-no-loss-admin',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <BlueBtn
      onClick={handleSubmit}
      className="!w-fit !text-f14 !px-3 !py-1 !h-fit"
      isLoading={loading}
    >
      Create Tournament
    </BlueBtn>
  );
};