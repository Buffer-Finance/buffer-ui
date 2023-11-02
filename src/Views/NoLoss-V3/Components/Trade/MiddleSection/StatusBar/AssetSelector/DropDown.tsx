import { nolossmarketsAtom } from '@Views/NoLoss-V3/atoms';
import { ColumnGap } from '@Views/TradePage/Components/Column';
import { RowBetween } from '@Views/TradePage/Components/Row';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { CategoryTabs } from './CategoryTabs';
import { SearchBar } from './SearchBar';
import { Table } from './Table';

const AssetSelectorDDBackground = styled.div`
  max-height: 420px;
  width: 100%;
  padding: 16px;
  background-color: #232334;

  @media (max-width: 1200px) {
    background-color: transparent;
  }
`;

export const DropDown: React.FC<{
  isMobile?: boolean;
  onMarketSelect?: () => void;
}> = ({ isMobile, onMarketSelect }) => {
  const markets = useAtomValue(nolossmarketsAtom);
  const categories = useMemo(() => {
    if (markets === undefined) {
      return [];
    }
    const categories = markets.map((market) => market.chartData.category);
    return ['favourites', 'all', ...new Set(categories)];
  }, [markets]);

  return (
    <AssetSelectorDDBackground>
      <ColumnGap gap="16px">
        <SearchBar />
        {!isMobile && (
          <RowBetween>
            <CategoryTabs categories={categories} />
          </RowBetween>
        )}

        <Table onMarketSelect={onMarketSelect} />
      </ColumnGap>
    </AssetSelectorDDBackground>
  );
};