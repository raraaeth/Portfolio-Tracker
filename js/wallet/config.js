/* =========================
   WALLET CONFIG
========================= */

const Wallet = {

    // Data dari Google Sheet
    raw: [],

    // Hasil request Moralis
    tokens: [],

    // Ringkasan
    summary: {

        totalUSD: 0,

        portfolios: {},

        totalWallets: 0,

        totalTokens: 0

    }

};


/* =========================
   MORALIS CONFIG
========================= */

const MORALIS = {

    API_KEY:
    "PASTE_API_KEY_KAMU_DISINI",

    BASE_URL:
    "https://deep-index.moralis.io/api/v2.2"

};


/* =========================
   SUPPORTED NETWORK
========================= */

const NETWORK = {

    evm: "eth",

    sol: "solana"

};


/* =========================
   CORE ASSET
========================= */

const CORE_ASSET = [

    "BTC",
    "ETH",
    "BNB",
    "SOL",

    "USDT",
    "USDC",
    "USDE",
    "FDUSD",
    "DAI"

];


/* =========================
   FILTER
========================= */

const WALLET_FILTER = {

    hideSpam: true,

    hideZeroUsd: true,

    minimumUsd: 0.01

};

