/* =====================================================
   Portfolio Tracker v3.0
   File : main.js
===================================================== */

/* ===========================
   INITIALIZE APP
=========================== */

document.addEventListener(

    "DOMContentLoaded",

    init

);

async function init(){

    console.log(

        APP.NAME,

        "v"+APP.VERSION

    );

    /* ======================
       LOAD DATA
    ====================== */

    await fetchTransactions();

    await fetchPrices();

    /* ======================
       PROCESS
    ====================== */

    processData();

    /* ======================
       DASHBOARD
    ====================== */

    updateDashboard();

    /* ======================
       WALLET
    ====================== */

    updateWallet();

    /* ======================
       ACTIVITIES
    ====================== */

    updateActivities();

    initActivityFilter();

    /* ======================
       AIRDROP
    ====================== */

    initAirdrop();

    /* ======================
       CHART
    ====================== */

    updateCharts();

    console.log(

        "Portfolio Loaded",

        Portfolio

    );

}
/* ===========================
   DEBUG
=========================== */

function debug(title,data){

    if(!DEBUG) return;

    console.group(title);

    console.log(data);

    console.groupEnd();

}
