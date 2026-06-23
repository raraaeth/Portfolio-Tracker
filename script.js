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

testData();
