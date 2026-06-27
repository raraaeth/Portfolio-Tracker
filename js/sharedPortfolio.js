/* =====================================================
   Portfolio Tracker v2.0
   File : sharedPortfolio.js
===================================================== */

/* ===========================
   SHARED PORTFOLIO
=========================== */

const Portfolio = {

    prices:{},

    balances:{},

    wallets:{},

    reserve:{

        usd:0,

        idr:0

    }

};

/* ===========================
   LOAD PRICES
=========================== */

async function loadPrices(){

    const response =

    await fetch(

        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd"

    );

    Portfolio.prices =

    await response.json();

}





