/* =====================================================
   Portfolio Tracker v3.0
   File : config.js
===================================================== */

/* ===========================
   APP INFO
=========================== */

const APP = {

    NAME : "Portfolio Tracker",

    VERSION : "3.0"

};

/* ===========================
   CONFIG
=========================== */

const CONFIG = {

    SHEET_ID :

    "1Wnje_mKu73eJyq0a8QlYETunfCCf2ntSKerV5J8qT30",

    SHEET_NAME :

    "transaksi",

    API_URL :

    "https://opensheet.elk.sh/" +

    "1Wnje_mKu73eJyq0a8QlYETunfCCf2ntSKerV5J8qT30" +

    "/transaksi",

    PRICE_API :

    "https://api.coingecko.com/api/v3/simple/price" +

    "?ids=bitcoin,ethereum,binancecoin,solana" +

    "&vs_currencies=usd"

};

/* ===========================
   VALID ASSETS
=========================== */

const VALID_ASSETS = [

    "BTC",

    "ETH",

    "BNB",

    "SOL",

    "USDT",

    "USDC"

];

/* ===========================
   GLOBAL OBJECT
=========================== */

const Portfolio = {

    raw : [],

    data : [],

    prices : {},

    balances : {},

    wallets : {},

    summary : {},

    activities : [],

    airdrops : []

};
