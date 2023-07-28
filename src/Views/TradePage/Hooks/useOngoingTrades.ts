import { useOneCTWallet } from '@Views/OneCT/useOneCTWallet';
import axios from 'axios';
import useSWR from 'swr';
import { baseUrl, refreshInterval } from '../config';
import { useAccount } from 'wagmi';
import { useActiveChain } from '@Hooks/useActiveChain';
import { TradeType } from '../type';
import { getSingatureCached } from '../cache';
import { useMarketsConfig } from './useMarketsConfig';
import { addMarketInTrades } from '../utils';
export enum TradeState {
  Queued = 'QUEUED',
  Active = 'ACTIVE',
}

const useOngoingTrades = () => {
  // const { oneCTWallet } = useOneCTWallet();
  const { activeChain } = useActiveChain();
  const { oneCTWallet } = useOneCTWallet();
  const { address } = useAccount();
  const markets = useMarketsConfig();
  const { data, error } = useSWR<TradeType[][]>(
    'active-trades-' +
      address +
      '-' +
      activeChain.id +
      '-' +
      oneCTWallet?.address,
    {
      fetcher: async () => {
        if (!oneCTWallet || !address) return [[], []] as TradeType[][];
        const signature = await getSingatureCached(oneCTWallet);

        const res = await axios.get(`${baseUrl}trades/user/active/`, {
          params: {
            user_signature: signature,
            user_address: address,
            environment: activeChain.id,
          },
        });
        if (!res?.data?.length || !markets?.length) return [[], []];
        // limitOrders
        const limitOrders = res.data.filter(
          (t: any) => t.is_limit_order && t.state === 'QUEUED'
        );
        const activeTrades = res.data.filter(
          (t: any) =>
            !t.is_limit_order || (t.is_limit_order && t.state !== 'QUEUED')
        );
        // console.log(`activeTrades: `, activeTrades, limitOrders);
        console.log(`markets: `, markets);
        return [
          addMarketInTrades(activeTrades, markets),
          addMarketInTrades(limitOrders, markets),
        ] as TradeType[][];
      },
      refreshInterval: refreshInterval,
    }
  );
  return data || ([[], []] as TradeType[][]);
};

export { useOngoingTrades };
