import { useWriteCall } from '@Hooks/useWriteCall';
import { getCallId } from '@Utils/Contract/multiContract';
import { divide, lt } from '@Utils/NumString/stringArithmatics';
import { ConnectionRequired } from '@Views/Common/Navbar/AccountDropdown';
import { Display } from '@Views/Common/Tooltips/Display';
import { BufferButton } from '@Views/Common/V2-Button';
import { useUpdateActiveTournament } from '@Views/NoLoss-V3/Hooks/useUpdateActiveTournament';
import {
  activeChainAtom,
  tournamentBasedReadCallsReadOnlyAtom,
  userAtom,
} from '@Views/NoLoss-V3/atoms';
import { getNoLossV3Config } from '@Views/NoLoss-V3/helpers/getNolossV3Config';
import { ItournamentData } from '@Views/NoLoss-V3/types';
import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { erc20ABI } from 'wagmi';
import TournamentLeaderboardABI from '../../ABIs/TournamentLeaderboard.json';
import TournamentManagerABI from '../../ABIs/TournamentManager.json';
import { TradeIcon } from '../SVGs/TradeIcon';

export const tournamentButtonStyles =
  '!text-f12 flex items-center gap-x-2 !h-fit py-2 bg-blue';

export const TournamentCardButtons: React.FC<{
  tournament: ItournamentData;
  activeTournamentId: number | undefined;
}> = ({ tournament, activeTournamentId }) => {
  const { setActiveTournament } = useUpdateActiveTournament();
  const activeChain = useAtomValue(activeChainAtom);
  const user = useAtomValue(userAtom);
  const [btnLoading, setBtnLoading] = useState(false);

  const { writeCall } = useWriteCall();
  const tournamentBasedData = useAtomValue(
    tournamentBasedReadCallsReadOnlyAtom
  );
  if (user === undefined || user.userAddress === undefined)
    return (
      <ConnectionRequired className="!text-f12 h-fit bg-blue mt-4 py-2">
        <></>
      </ConnectionRequired>
    );
  if (tournamentBasedData.result === undefined)
    return (
      <Skeleton className="!h-[26px] full-width sr lc !mt-4 !transform-none" />
    );

  if (!activeChain) return <></>;
  const config = getNoLossV3Config(activeChain.id);

  const allowanceId = getCallId(
    tournament.tournamentMeta.buyinToken,
    'allowance',
    [user.userAddress, config.manager]
  );
  const allowance =
    tournamentBasedData.result?.buyInTokenToManagerAllowance?.find(
      (allowanceObj) => allowanceObj.id === allowanceId
    )?.allowance;
  const ticketCost = divide(
    tournament.tournamentMeta.ticketCost,
    tournament.buyinTokenDecimals
  ) as string;

  if (allowance === undefined)
    return (
      <Skeleton className="!h-[26px] full-width sr lc !mt-4 !transform-none" />
    );
  let secondButton = null;
  async function handleClaim() {
    setBtnLoading(true);
    await writeCall(
      config.leaderboard,
      TournamentLeaderboardABI,
      (response) => {
        setBtnLoading(false);
        console.log(response);
      },
      'claimReward',
      [tournament.id]
    );
  }

  if (tournament.state.toLowerCase() === 'closed') {
    const alreadClaimed = tournament.hasUserClaimed;

    secondButton = (
      <BufferButton
        onClick={handleClaim}
        isLoading={btnLoading}
        className={tournamentButtonStyles}
        isDisabled={tournament.hasUserClaimed === true}
      >
        {alreadClaimed ? 'Already Claimed' : 'Claim'}
      </BufferButton>
    );
  }

  if (lt(allowance, ticketCost) && secondButton === null) {
    const approveTournamentManager = () => {
      setBtnLoading(true);
      writeCall(
        tournament.tournamentMeta.buyinToken,
        erc20ABI as any,
        (response) => {
          setBtnLoading(false);
          console.log(response);
        },
        'approve',
        [
          config.manager,
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        ]
      );
    };

    secondButton = (
      <BufferButton
        onClick={approveTournamentManager}
        isLoading={btnLoading}
        className={tournamentButtonStyles}
      >
        Approve
      </BufferButton>
    );
  }

  const buyPlayTokens = () => {
    setBtnLoading(true);
    writeCall(
      config.manager,
      TournamentManagerABI,
      (response) => {
        setBtnLoading(false);
        console.log(response);
      },
      'buyTournamentTokens',
      [tournament.id]
    );
  };
  if (secondButton === null) {
    const hasUserBoughtMaxTickets =
      tournament.userBoughtTickets >=
      tournament.tournamentConditions.maxBuyinsPerWallet;
    secondButton = (
      <BufferButton
        className={tournamentButtonStyles}
        onClick={buyPlayTokens}
        isLoading={btnLoading}
        isDisabled={hasUserBoughtMaxTickets}
      >
        {hasUserBoughtMaxTickets ? (
          'Max bought'
        ) : (
          <>
            Entry
            <Display
              data={ticketCost}
              unit={tournament.buyinTokenSymbol}
              precision={0}
            />
          </>
        )}
      </BufferButton>
    );
  }

  return (
    <div className="flex items-center justify-center gap-x-[5px] mt-4">
      <BufferButton
        className={tournamentButtonStyles}
        isDisabled={
          tournament.id === activeTournamentId ||
          tournament.state.toLowerCase() === 'upcoming'
        }
        onClick={() => {
          setActiveTournament(tournament.id);
        }}
      >
        <TradeIcon />
        Trade
      </BufferButton>
      {secondButton}
    </div>
  );
};
