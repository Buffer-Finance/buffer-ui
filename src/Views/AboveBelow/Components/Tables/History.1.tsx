import { formatDistance } from '@Hooks/Utilities/useStopWatch';
import { useActiveChain } from '@Hooks/useActiveChain';
import { getDisplayDate, getDisplayTime } from '@Utils/Dates/displayDateTime';
import { toFixed } from '@Utils/NumString';
import { divide, lte, subtract } from '@Utils/NumString/stringArithmatics';
import { Variables } from '@Utils/Time';
import { numberWithCommas } from '@Utils/display';
import { getSlicedUserAddress } from '@Utils/getUserAddress';
import { BetState } from '@Views/AboveBelow/Hooks/useAheadTrades';
import {
  IGQLHistory,
  expiryPriceCache,
} from '@Views/AboveBelow/Hooks/usePastTradeQuery';
import BufferTable from '@Views/Common/BufferTable';
import { TableHeader } from '@Views/Common/TableHead';
import { Display } from '@Views/Common/Tooltips/Display';
import { ColumnGap } from '@Views/ABTradePage/Components/Column';
import { RowBetween } from '@Views/ABTradePage/Components/Row';
import { DisplayTime } from '@Views/ABTradePage/Views/AccordionTable/Common';
import { getAssetMonochromeImageUrl } from '@Views/ABTradePage/utils/getAssetImageUrl';
import { Launch } from '@mui/icons-material';
import { AssetCell } from './Components/AssetCell';
import { PayoutChip } from './Components/PayoutChip';
import { JackpotChip } from '@Views/Jackpot/JackpotChip';
import { TableColumn } from './History';
import { getJackpotKey, useJackpotManager } from 'src/atoms/JackpotState';

export const History: React.FC<{
  onlyView?: number[];
  overflow?: boolean;
  isMobile?: boolean;
  totalPages: number;
  activePage: number;
  history: IGQLHistory[];
  inGlobalContext?: boolean;
  setHistoryPage: (page: number) => void;
  isLoading: boolean;
  error?: React.ReactNode;
}> = ({
  onlyView,
  overflow,
  isMobile,
  activePage,
  history,
  setHistoryPage,
  totalPages,
  inGlobalContext = false,
  isLoading,
  error,
}) => {
  const { activeChain } = useActiveChain();

  const headNameArray = [
    'Asset',
    'Strike Price',
    'Expiry Price',
    'Open Time',
    'Duration',
    'Expiry',
    'Trade Size',
    'Payout',
  ];

  if (inGlobalContext) {
    headNameArray.push('user');
  }
  const jackpotManager = useJackpotManager();

  const HeaderFomatter = (col: number) => {
    return <TableHeader col={col} headsArr={headNameArray} />;
  };

  const BodyFormatter: any = (row: number, col: number) => {
    const trade = history[row];
    const decimals = trade.market.poolInfo.decimals;
    const jackpote18 =
      jackpotManager.jackpot.jackpots?.[getJackpotKey(trade)]?.jackpot_amount ||
      trade?.jackpot_amount ||
      '0';
    switch (col) {
      case TableColumn.Asset:
        return (
          <div>
            <AssetCell currentRow={trade} split={isMobile} />
          </div>
        );
      case TableColumn.Strike:
        return (
          <Display
            data={divide(trade.strike, 8)}
            precision={trade.market.price_precision.toString().length - 1}
            className="!justify-start"
          />
        );
      case TableColumn.Expiry:
        if (trade.state === BetState.active) {
          if (trade.optionID !== undefined) {
            const expiry = expiryPriceCache[trade.optionID];
            if (expiry !== undefined) {
              return (
                <Display
                  data={divide(expiry, 8)}
                  precision={trade.market.price_precision.toString().length - 1}
                  className="!justify-start"
                />
              );
            }
          }
          return <>fetching...</>;
        }
        return (
          <Display
            data={divide(trade.expirationPrice ?? '0', 8)}
            precision={trade.market.price_precision.toString().length - 1}
            className="!justify-start"
          />
        );
      case TableColumn.OpenTime:
        return <DisplayTime ts={trade.creationTime as string} />;
      case TableColumn.Duration:
        return formatDistance(
          Variables(
            +subtract(
              trade.expirationTime as string,
              trade.creationTime as string
            )
          )
        );
      case TableColumn.ExpiryTime:
        return <DisplayTime ts={trade.expirationTime as string} />;
      case TableColumn.TradeSize:
        if (isMobile) {
          return (
            <div className={`flex items-center`}>
              <Display
                data={divide(trade.totalFee as string, decimals)}
                precision={2}
                className="!justify-start"
              />
              <img
                src={getAssetMonochromeImageUrl(trade.market.poolInfo.token)}
                width={13}
                height={13}
                className="inline ml-1 mb-[0px]"
              />
            </div>
          );
        }
        return (
          <Display
            data={divide(trade.totalFee as string, decimals)}
            precision={2}
            unit={trade.market.poolInfo.token}
            className="!justify-start"
          />
        );
      case TableColumn.Payout:
        if (trade.state === BetState.active) return <PayoutChip data={trade} />;
        const pnl = subtract(trade.payout ?? '0', trade.totalFee as string);
        const isTradeLost = lte(pnl, '0');

        if (isMobile)
          return (
            <div
              className={`flex items-center ${isTradeLost ? 'red' : 'green'}`}
            >
              {isTradeLost ? '' : '+ '}
              <Display
                data={divide(
                  trade.payout as string,
                  trade.market.poolInfo.decimals
                )}
                precision={2}
              />
              <img
                src={getAssetMonochromeImageUrl(trade.market.poolInfo.token)}
                width={13}
                height={13}
                className="inline ml-2 mb-[0px]"
              />
            </div>
          );
        return (
          <div className="flex flex-col gap-1">
            <div className="flex">
              <Display
                data={divide(
                  trade.payout ?? '0',
                  trade.market.poolInfo.decimals
                )}
                precision={2}
                unit={trade.market.poolInfo.token}
                className="!justify-start"
              />
              <JackpotChip jackpote18={jackpote18} />
            </div>
            <div
              className={`flex items-center ${isTradeLost ? 'red' : 'green'}`}
            >
              Net Pnl : {isTradeLost ? '' : '+ '}
              <Display
                data={divide(pnl, trade.market.poolInfo.decimals)}
                unit={trade.market.poolInfo.token}
                precision={2}
              />
            </div>
          </div>
        );
      case TableColumn.User:
        return (
          <button
            onClick={() =>
              window.open(
                'https://app.buffer.finance/#/profile?user_address=' +
                  trade.user
              )
            }
            className="flex items-center gap-2"
          >
            {getSlicedUserAddress(trade.user, 4)}
            <Launch />
          </button>
        );
      default:
        return <></>;
    }
  };

  const Accordian = (row: number) => {
    if (!isMobile) return <></>;
    const trade = history[row];
    const expiryPrice = trade.expirationPrice;
    const headerClass = 'text-[#808191] text-f12';
    const descClass = 'text-[#C3C2D4] text-f2';
    const dateClass = 'text-[#6F6E84] text-f10';
    const durationClass = 'text-[#7F87A7] text-f12';
    const timeClass = 'text-[#C3C2D4] text-f12';
    return (
      <div className="px-3 py-2">
        <RowBetween>
          <div className={timeClass}>{getDisplayTime(trade.creationTime)}</div>
          <div className={durationClass}>
            {formatDistance(
              Variables(
                +subtract(
                  trade.expirationTime as string,
                  trade.creationTime as string
                )
              )
            )}
          </div>
          <div className={timeClass}>
            {getDisplayTime(trade.expirationTime)}
          </div>
        </RowBetween>
        {/* <TradeTimeElapsed trade={trade} stopTime={minClosingTime} /> */}
        <RowBetween className="mt-3">
          <div className={dateClass}>
            {getDisplayDate(+(trade.creationTime as string))}
          </div>
          <div className={dateClass}>
            {getDisplayDate(+(trade.expirationTime as string))}
          </div>
        </RowBetween>

        <RowBetween className="mt-5">
          <ColumnGap gap="3px">
            <span className={headerClass}>Expiry</span>
            <span className={descClass}>
              {expiryPrice
                ? numberWithCommas(
                    toFixed(
                      divide(expiryPrice, 8) as string,
                      trade.market.price_precision.toString().length - 1
                    )
                  )
                : 'Processing...'}
            </span>
          </ColumnGap>
          <ColumnGap gap="3px">
            <span className={headerClass}>Profit</span>
            <span className={descClass}>
              {expiryPrice
                ? numberWithCommas(
                    toFixed(
                      divide(
                        subtract(
                          (trade.payout as string) ?? '0',
                          trade.totalFee as string
                        ),
                        trade.market.poolInfo.decimals
                      ) as string,
                      2
                    )
                  )
                : 'Calculating...'}
              <img
                src={getAssetMonochromeImageUrl(trade.market.poolInfo.token)}
                width={13}
                height={13}
                className="inline ml-1"
              />
            </span>
          </ColumnGap>
        </RowBetween>
      </div>
    );
  };

  return (
    <BufferTable
      bodyJSX={BodyFormatter}
      headerJSX={HeaderFomatter}
      loading={isLoading}
      rows={history?.length ?? 0}
      cols={headNameArray.length}
      onRowClick={() => {}}
      widths={['auto']}
      activePage={activePage}
      count={totalPages}
      overflow={overflow}
      showOnly={onlyView}
      shouldShowMobile
      doubleHeight={isMobile}
      accordianJSX={!isMobile ? undefined : Accordian}
      onPageChange={(e, page) => {
        setHistoryPage(page);
      }}
      error={error}
    />
  );
};