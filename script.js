/* =========================
   CONFIG
========================= */
/* =========================
   COINGECKO
========================= */

async function getPrices(){

    const response =
    await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd"
    );

    const prices =
    await response.json();

    document.getElementById("btcPrice")
    .textContent =
    "$" +
    prices.bitcoin.usd.toLocaleString();

    document.getElementById("bnbPrice")
    .textContent =
    "$" +
    prices.binancecoin.usd.toLocaleString();

    document.getElementById("ethPrice")
    .textContent =
    "$" +
    prices.ethereum.usd.toLocaleString();

    document.getElementById("solPrice")
    .textContent =
    "$" +
    prices.solana.usd.toLocaleString();

}

const SHEET_ID =
"1Wnje_mKu73eJyq0a8QlYETunfCCf2ntSKerV5J8qT30";

const SHEET_NAME =
"transaksi";

const API_URL =
`https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;


/* =========================
   TEST OPENSHEET
========================= */

async function testData(){

    const response =
    await fetch(API_URL);

    const data =
    await response.json();

    console.log(data);

}


/* =========================
   INIT
========================= */

async function init(){

    await testData();

    await getPrices();

}

init();
