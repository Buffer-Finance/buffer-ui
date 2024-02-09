export const config = {
  '168587773': {
    graph: 'https://no-loss-production.up.railway.app/',
    multicall: '0xb41e43f6AD6183e58C44aa3C914d0a794e8D1b68',
    router: '0xC42D0a6d10fd4E0085F82cAE02Bb10a2A6b9650E',
    leaderboard: '0x060AB78118bc76eD797C2af0D25cde6192D837c1',
    manager: '0xc0b0022604e40130D8F6ad0c770510EFa2A97A72',
    tournament_reader: '0x6E8BCCf9ab6B776b451aB0fff4d1dEbc1079afc8',
  },
  '421613': {
    graph:
      'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/no-loss-arbitrum-testnet/api',
    multicall: '0x842eC2c7D803033Edf55E478F461FC547Bc54EB2',
    router: '0xF7760095561259e9c52A62A7743d3451d010E97b',
    leaderboard: '0xca709e7db37eEE8d8d9B18E80156Fb767Ba16eFB',
    manager: '0x8a5e09Cab3CF3C12645E41C9563EA25BFbD1FD5C',
    tournament_reader: '0xDddf36335D23a22407975E8877F638438C11A5F4',
    // creation_window: '0xFd9B6b168b60A31b75b15C7d26eA26d5721Bb862',
  },
};

export const ZEROADDRESS =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
export const defaultSelectedTime = '00:15';
export const oneSec = 1000;
export const durations = [
  {
    duration: 1 * 60,
    time: '00:01',
    name: ['1m'],
  },
  // {
  //   duration: 3 * 60,
  //   time: '00:03',
  //   name: ['3m'],
  // },
  {
    duration: 5 * 60,
    time: '00:05',
    name: ['5m'],
  },
  {
    duration: 15 * 60,
    time: '00:15',
    name: ['15m'],
  },
  {
    duration: 60 * 60,
    time: '01:00',
    name: ['1h'],
  },
  {
    duration: 4 * 60 * 60,
    time: '04:00',
    name: ['4h'],
  },
];

export const marketsForChart = {
  BTCUSD: {
    category: 'Crypto',
    tv_id: 'BTCUSD',
    pair: 'BTC-USD',
    price_precision: 100,
    token0: 'BTC',
    token1: 'USD',
    full_name: 'Bitcoin',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/btc.svg',
    pythId:
      '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    pythGroup: 'Crypto',
  },
  ETHUSD: {
    category: 'Crypto',
    tv_id: 'ETHUSD',
    pair: 'ETH-USD',
    price_precision: 100,
    token0: 'ETH',
    token1: 'USD',
    full_name: 'Ethereum',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/btc.svg',
    pythId:
      '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    pythGroup: 'Crypto',
  },
  EURUSD: {
    category: 'Forex',
    tv_id: 'EURUSD',
    pair: 'EUR-USD',
    price_precision: 1000000,
    token0: 'EUR',
    token1: 'USD',
    full_name: 'Euro',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/euro.png',
    pythId:
      '0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b',
    pythGroup: 'FX',
  },
  GBPUSD: {
    category: 'Forex',
    tv_id: 'GBPUSD',
    pair: 'GBP-USD',
    price_precision: 1000000,
    token0: 'GBP',
    token1: 'USD',
    full_name: 'Pound',
    img: 'https://cdn.buffer.finance/Buffer-Media/main/GBP.png',
    pythId:
      '0x84c2dde9633d93d1bcad84e7dc41c9d56578b7ec52fabedc1f335d673df0a7c1',
    pythGroup: 'FX',
  },
  SOLUSD: {
    category: 'Crypto',
    tv_id: 'SOLUSD',
    pair: 'SOL-USD',
    price_precision: 1000,
    token0: 'SOL',
    token1: 'USD',
    full_name: 'Solana',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/sol.svg',
    pythId:
      '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    pythGroup: 'Crypto',
  },
  LINKUSD: {
    category: 'Crypto',
    tv_id: 'LINKUSD',
    pair: 'LINK-USD',
    price_precision: 10000,
    token0: 'LINK',
    token1: 'USD',
    full_name: 'Chainlink',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/link.svg',
    pythId:
      '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221',
    pythGroup: 'Crypto',
  },
  XAUUSD: {
    category: 'Commodity',
    tv_id: 'XAUUSD',
    pair: 'XAU-USD',
    price_precision: 100,
    token0: 'XAU',
    token1: 'USD',
    full_name: 'Gold',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/xau.svg',
    pythId:
      '0x765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2',
    pythGroup: 'Metal',
  },
  XAGUSD: {
    category: 'Commodity',
    tv_id: 'XAGUSD',
    pair: 'XAG-USD',
    price_precision: 1000,
    token0: 'XAG',
    token1: 'USD',
    full_name: 'Silver',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/xag.svg',
    pythId:
      '0xf2fb02c32b055c805e7238d628e5e9dadef274376114eb1f012337cabe93871e',
    pythGroup: 'Metal',
  },
  AUDUSD: {
    category: 'Forex',
    tv_id: 'AUDUSD',
    pair: 'AUD-USD',
    price_precision: 1000000,
    token0: 'AUD',
    token1: 'USD',
    full_name: 'Australian Dollar',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/aud1.svg',
    pythId:
      '0x67a6f93030420c1c9e3fe37c1ab6b77966af82f995944a9fefce357a22854a80',
    pythGroup: 'FX',
  },
  USDJPY: {
    category: 'Forex',
    tv_id: 'USDJPY',
    pair: 'USD-JPY',
    price_precision: 1000000,
    token0: 'USD',
    token1: 'JPY',
    full_name: 'United States Dollar',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/USDC.svg',
    pythId:
      '0xef2c98c804ba503c6a707e38be4dfbb16683775f195b091252bf24693042fd52',
    pythGroup: 'FX',
  },
  NZDUSD: {
    category: 'Forex',
    tv_id: 'NZDUSD',
    pair: 'NZD-USD',
    price_precision: 1000000,
    token0: 'NZD',
    token1: 'USD',
    full_name: 'New Zealand Dollar',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/nzd.svg',
    pythId:
      '0x92eea8ba1b00078cdc2ef6f64f091f262e8c7d0576ee4677572f314ebfafa4c7',
    pythGroup: 'FX',
  },
  USDCHF: {
    category: 'Forex',
    tv_id: 'USDCHF',
    pair: 'USD-CHF',
    price_precision: 1000000,
    token0: 'USD',
    token1: 'CHF',
    full_name: 'United States Dollar',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/USDC.svg',
    pythId:
      '0x0b1e3297e69f162877b577b0d6a47a0d63b2392bc8499e6540da4187a63e28f8',
    pythGroup: 'FX',
  },
  USDCAD: {
    category: 'Forex',
    tv_id: 'USDCAD',
    pair: 'USD-CAD',
    price_precision: 1000000,
    token0: 'USD',
    token1: 'CAD',
    full_name: 'United States Dollar',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/USDC.svg',
    pythId:
      '0x3112b03a41c910ed446852aacf67118cb1bec67b2cd0b9a214c58cc0eaa2ecca',
    pythGroup: 'FX',
  },
  ARBUSD: {
    category: 'Crypto',
    tv_id: 'ARBUSD',
    pair: 'ARB-USD',
    price_precision: 10000,
    token0: 'ARB',
    token1: 'USD',
    full_name: 'Arbitrum',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/arb.svg',
    pythId:
      '0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5',
    pythGroup: 'Crypto',
  },
  BNBUSD: {
    category: 'Crypto',
    tv_id: 'BNBUSD',
    pair: 'BNB-USD',
    price_precision: 100,
    token0: 'BNB',
    token1: 'USD',
    full_name: 'Binance Coin',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/bnb.svg',
    pythId:
      '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
    pythGroup: 'Crypto',
  },
  MATICUSD: {
    category: 'Crypto',
    tv_id: 'MATICUSD',
    pair: 'MATIC-USD',
    price_precision: 100,
    token0: 'MATIC',
    token1: 'USD',
    full_name: 'Matic',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/matic.svg',
    pythId:
      '0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52',
    pythGroup: 'Crypto',
  },
  OPUSD: {
    category: 'Crypto',
    tv_id: 'OPUSD',
    pair: 'OP-USD',
    price_precision: 100,
    token0: 'OP',
    token1: 'USD',
    full_name: 'Optimism',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/op.svg',
    pythId:
      '0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf',
    pythGroup: 'Crypto',
  },
  XRPUSD: {
    category: 'Crypto',
    tv_id: 'XRPUSD',
    pair: 'XRP-USD',
    price_precision: 100000,
    token0: 'XRP',
    token1: 'USD',
    full_name: 'Ripple',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/xrp.svg',
    pythId:
      '0xec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8',
    pythGroup: 'Crypto',
  },
  DOGEUSD: {
    category: 'Crypto',
    tv_id: 'DOGEUSD',
    pair: 'DOGE-USD',
    price_precision: 1000000,
    token0: 'DOGE',
    token1: 'USD',
    full_name: 'Dogecoin',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/doge.svg',
    pythId:
      '0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c',
    pythGroup: 'Crypto',
  },
  TONUSD: {
    category: 'Crypto',
    tv_id: 'TONUSD',
    pair: 'TON-USD',
    price_precision: 10000,
    token0: 'TON',
    token1: 'USD',
    full_name: 'TON',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/ton.svg',
    pythId:
      '0x8963217838ab4cf5cadc172203c1f0b763fbaa45f346d8ee50ba994bbcac3026',
    pythGroup: 'Crypto',
  },
  SHIBUSD: {
    category: 'Crypto',
    tv_id: 'SHIBUSD',
    pair: 'SHIB-USD',
    price_precision: 1000000000,
    token0: 'SHIB',
    token1: 'USD',
    full_name: 'Shiba Inu',
    img: 'https://cdn.buffer.finance/Buffer-Website-Data/main/Assets/shib.svg',
    pythId:
      '0xf0d57deca57b3da2fe63a493f4c25925fdfd8edf834b20f93e1f84dbd1504d4a',
    pythGroup: 'Crypto',
  },
};
