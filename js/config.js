/* =====================================================
   Portfolio Tracker v3.0
   File : config.js
===================================================== */

/* =========================
   CONFIG
========================= */

const SHEET_ID =
"1Wnje_mKu73eJyq0a8QlYETunfCCf2ntSKerV5J8qT30";

const SHEET_NAME =
"transaksi";

const API_URL =
`https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

/* =========================
   GLOBAL DATA
========================= */

let transaksi = [];

let prices = {};

let walletChart = null;

let balanceChart = null;

let selectedWallets = [];

let selectedAssetWallet = null;

let airdropLimit = 5;
