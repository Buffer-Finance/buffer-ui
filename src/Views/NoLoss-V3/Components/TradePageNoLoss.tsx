import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { filteredTournamentsDataReadOnlyAtom } from '../atoms';
import { AllMyTab } from './AllMyTab';
import { TournamentStateTabs } from './TournamentStateTabs';
import { TradepageTournamentCard } from './TradePageTournamentCard';

const TradePageNoLossBackground = styled.div`
  margin: 0 6px;
`;

export const NoLossSection = () => {
  return (
    <TradePageNoLossBackground>
      <TournamentStateTabs />
      <AllMyTab />
      <NoLoss />
    </TradePageNoLossBackground>
  );
};

const NoLoss = () => {
  const allTournaments = useAtomValue(filteredTournamentsDataReadOnlyAtom);

  if (allTournaments === undefined)
    return <Skeleton className="w-[100px] !h-8 lc " />;

  return (
    <div className="flex flex-col gap-3">
      {allTournaments.map((tournament) => (
        <TradepageTournamentCard
          tournament={tournament}
          key={tournament.id + tournament.tournamentMeta.name}
        />
      ))}
    </div>
  );
};