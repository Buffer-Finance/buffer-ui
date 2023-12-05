import { useActiveChain } from '@Hooks/useActiveChain';
import { usePriceRetriable } from '@Hooks/usePrice';
import { MobileWarning, RightPanelBackground } from '@Views/TradePage';
import {
  miscsSettingsAtom,
  tradePanelPositionSettingsAtom,
} from '@Views/TradePage/atoms';
import { tradePanelPosition } from '@Views/TradePage/type';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { polygon, polygonMumbai } from 'viem/chains';
import { BuyTrade } from './Components/BuyTrade';
import { MarketChart } from './Components/MarketChart';
import { PinnedMarkets } from './Components/PinnedMarkets';
import { StatusBar } from './Components/StatusBar';
import { Tables } from './Components/Tables';
import { useAboveBelowMarketsSetter } from './Hooks/useAboveBelowMarketsSetter';
import { useActiveMarketSetter } from './Hooks/useActiveMarketSetter';
import { usePastTradeQuery } from './Hooks/usePastTradeQuery';
import { useReacallDataSetter } from './Hooks/useReadcallDataSetter';
import {
  aboveBelowActiveMarketsAtom,
  selectedPoolActiveMarketAtom,
  setSelectedPoolForTradeAtom,
} from './atoms';

export const AboveBelow = () => {
  const panelPosision = useAtomValue(tradePanelPositionSettingsAtom);
  const { showFavoriteAsset } = useAtomValue(miscsSettingsAtom);
  const { activeChain } = useActiveChain();
  usePriceRetriable();
  useAboveBelowMarketsSetter();
  useActiveMarketSetter();
  useReacallDataSetter();
  usePastTradeQuery();
  const setActivePoolMarket = useSetAtom(setSelectedPoolForTradeAtom);
  const selectedPoolMarket = useAtomValue(selectedPoolActiveMarketAtom);
  const markets = useAtomValue(aboveBelowActiveMarketsAtom);

  if ([polygon.id, polygonMumbai.id].includes(activeChain.id as 80001)) {
    return <MobileWarning />;
  }

  useEffect(() => {
    if (markets.length > 0) {
      if (!selectedPoolMarket) {
        setActivePoolMarket(markets[0].poolInfo.token.toUpperCase());
      }
    }
  }, [markets.length]);

  return (
    <div
      className={`flex h-full justify-between w-[100%] bg-[#1C1C28] ${
        panelPosision === tradePanelPosition.Left ? 'flex-row-reverse' : ''
      }`}
    >
      <>
        <RightPanelBackground>
          {showFavoriteAsset && <PinnedMarkets />}
          <StatusBar isMobile={false} />
          <MarketChart />
          <Tables />
        </RightPanelBackground>
        <BuyTrade />
      </>
    </div>
  );
};