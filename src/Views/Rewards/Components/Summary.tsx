import { toFixed } from '@Utils/NumString';
import { add, divide, subtract } from '@Utils/NumString/stringArithmatics';
import { Display } from '@Views/Common/Tooltips/Display';
import { Skeleton } from '@mui/material';
import { useMemo } from 'react';
import { useCompetitionRewardsClaimed } from '../Hooks/useCompetitionRewardsClaimed';
import { useRebatesAlloted } from '../Hooks/useRebatesAlloted';
import { useRebatesClaimed } from '../Hooks/useRebatesClaimed';

export const Summary = () => {
  return (
    <div className="mt-7">
      <div className="text-f20 text-[#F7F7F7] font-medium mb-6">
        Rewards Summary
      </div>
      <div className="flex gap-[60px] items-start">
        <TradingRewards />
        <ComeptitionRewards />
      </div>
    </div>
  );
};

const TradingRewards: React.FC = () => {
  const { data: claimedData, isValidating: isLoadingClaimed } =
    useRebatesClaimed();
  const { data: allotedRebates } = useRebatesAlloted();

  const totalAlloted = useMemo(() => {
    if (!allotedRebates) return '0';
    return Object.values(allotedRebates).reduce(
      (acc, curr) => add(acc as string, curr as string),
      '0'
    ) as string;
  }, [allotedRebates]);

  const totalClaimed = useMemo(() => {
    if (!claimedData) return '0';
    return claimedData.reduce((acc, curr) => add(acc, curr.amount), '0');
  }, [claimedData]);
  return (
    <div>
      <div className="text-[#FFFFFF] text-f16 font-medium mb-6">
        Trading Rewards
      </div>
      <div className="flex gap-6 items-start">
        <Column
          head="Rebates Claimed"
          data={
            isLoadingClaimed ? (
              <Skeleton
                variant="rectangular"
                className="w-[80px] !h-5 lc mr-auto"
              />
            ) : (
              <Display
                data={toFixed(divide(totalClaimed, 18) as string, 2)}
                unit="ARB"
                className="text-[#FFFFFF] text-f22 font-medium !text-start"
              />
            )
          }
        />
        <Divider />
        <Column
          head="Rebates Unclaimed"
          data={
            <Display
              data={toFixed(
                divide(subtract(totalAlloted, totalClaimed), 18) as string,
                2
              )}
              unit="ARB"
              className="text-[#FFFFFF] text-f22 font-medium !text-start"
            />
          }
        />
      </div>
    </div>
  );
};

const ComeptitionRewards: React.FC = () => {
  const { data, isValidating } = useCompetitionRewardsClaimed();

  const totalClaimed = useMemo(() => {
    if (!data) return 0;
    return data.reduce((acc, curr) => add(acc, curr.amount), '0');
  }, [data]);

  return (
    <div className="h-fit">
      <div className="text-[#FFFFFF] text-f16 font-medium mb-6">
        Trading Rewards
      </div>
      <div className="flex gap-6 items-start h-full">
        <Column
          head="Rebates Claimed"
          data={
            isValidating ? (
              <Skeleton
                variant="rectangular"
                className="w-[80px] !h-5 lc mr-auto"
              />
            ) : (
              <Display
                data={toFixed(divide(totalClaimed, 18) as string, 2)}
                unit={'ARB'}
                className="text-[#FFFFFF] text-f22 font-medium !text-start"
              />
            )
          }
        />
        <Divider />
        <Column
          head="Rebates Unclaimed"
          data={
            <Display
              data={0}
              label={'$'}
              className="text-[#FFFFFF] text-f22 font-medium !text-start"
            />
          }
        />
      </div>
    </div>
  );
};

const Divider = () => {
  return <div className="h-[40px] w-[2px] bg-[#393953] mt-3" />;
};

const Column: React.FC<{ head: string; data: React.ReactNode }> = ({
  data,
  head,
}) => {
  return (
    <div className="flex flex-col gap-3 items-start">
      <div className="text-[#7F87A7] text-f16 font-medium">{head}</div>
      {data}
    </div>
  );
};
