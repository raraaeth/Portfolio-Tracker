/* =====================================================
   Portfolio Tracker v3.0
   File : dashboard.js
===================================================== */

/* ===========================
   CALCULATE SUMMARY
=========================== */

function calculateSummary(){

    const p = Portfolio.prices;

    const b = Portfolio.balances;

    let portfolio = 0;

    portfolio += b.BTC * (p.bitcoin?.usd || 0);

    portfolio += b.ETH * (p.ethereum?.usd || 0);

    portfolio += b.BNB * (p.binancecoin?.usd || 0);

    portfolio += b.SOL * (p.solana?.usd || 0);

    portfolio += b.USDT;

    portfolio += b.USDC;

    Portfolio.summary = {

        portfolio,

        btc :

        b.BTC * (p.bitcoin?.usd || 0),

        eth :

        b.ETH * (p.ethereum?.usd || 0),

        bnb :

        b.BNB * (p.binancecoin?.usd || 0),

        sol :

        b.SOL * (p.solana?.usd || 0),

        stable :

        b.USDT +

        b.USDC

    };

}

/* ===========================
   UPDATE LIVE PRICE
=========================== */

function updateLivePrice(){

    const p = Portfolio.prices;

    $("btcPrice").textContent =

    formatUSD(

        p.bitcoin?.usd || 0

    );

    $("bnbPrice").textContent =

    formatUSD(

        p.binancecoin?.usd || 0

    );

    $("ethPrice").textContent =

    formatUSD(

        p.ethereum?.usd || 0

    );

    $("solPrice").textContent =

    formatUSD(

        p.solana?.usd || 0

    );

}

/* ===========================
   UPDATE PORTFOLIO
=========================== */

function updatePortfolio(){

    $("portfolioValue").textContent =

    formatUSD(

        Portfolio.summary.portfolio

    );

}

/* ===========================
   UPDATE DASHBOARD
=========================== */

function updateDashboard(){

    calculateSummary();

    updateLivePrice();

    updatePortfolio();

}
