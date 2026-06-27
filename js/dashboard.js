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
   FORMAT PNL
=========================== */

function formatPnL(value){

    const prefix =

    value >= 0

    ? "+"

    : "-";

    return (

        prefix +

        "$" +

        Math.abs(value)

        .toFixed(2)

    );

}

/* ===========================
   FORMAT PERCENT
=========================== */

function formatPercent(value){

    const prefix =

    value >= 0

    ? "+"

    : "-";

    return (

        prefix +

        Math.abs(value)

        .toFixed(2)

        +

        "%"

    );

}
/* ===========================
   GET PORTFOLIO VALUE
=========================== */

function getPortfolioValue(data){

    const balances = {

        BTC:0,

        ETH:0,

        BNB:0,

        SOL:0,

        USDT:0,

        USDC:0

    };

    data.forEach(item=>{

        if(

            !isValidAsset(

                item.asset

            )

        ){

            return;

        }

        if(

            item.type==="Masuk"

        ){

            balances[item.asset]+=

            item.amount;

        }

        else{

            balances[item.asset]-=

            item.amount;

        }

    });

    const p =

    Portfolio.prices;

    let total = 0;

    total += balances.BTC*(p.bitcoin?.usd||0);

    total += balances.ETH*(p.ethereum?.usd||0);

    total += balances.BNB*(p.binancecoin?.usd||0);

    total += balances.SOL*(p.solana?.usd||0);

    total += balances.USDT;

    total += balances.USDC;

    return total;

}
/* ===========================
   UPDATE PNL
=========================== */

function updatePnL(){

    const today =

    new Date();

    const week =

    new Date();

    week.setDate(

        today.getDate()-7

    );

    const month =

    new Date();

    month.setDate(

        today.getDate()-30

    );

    const current =

    getPortfolioValue(

        Portfolio.data

    );

    const weekly =

    getPortfolioValue(

        Portfolio.data.filter(item=>

            new Date(item.date)<=week

        )

    );

    const monthly =

    getPortfolioValue(

        Portfolio.data.filter(item=>

            new Date(item.date)<=month

        )

    );

    const weekPnL =

    current-weekly;

    const monthPnL =

    current-monthly;

    const weekPercent =

    weekly===0

    ?0

    :(weekPnL/weekly)*100;

    const monthPercent =

    monthly===0

    ?0

    :(monthPnL/monthly)*100;

    $("weeklyPnl").innerHTML=

        formatPnL(

            weekPnL

        )+

        "<br><small>"+

        formatPercent(

            weekPercent

        )+

        "</small>";

    $("monthlyPnl").innerHTML=

        formatPnL(

            monthPnL

        )+

        "<br><small>"+

        formatPercent(

            monthPercent

        )+

        "</small>";

}

/* ===========================
   UPDATE DASHBOARD
=========================== */

function updateDashboard(){

    calculateSummary();

    updateLivePrice();

    updatePortfolio();

    updatePnL();

}




