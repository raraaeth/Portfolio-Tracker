/* =====================================================
   Portfolio Tracker v3.0
   File : portfolioEngine.js
===================================================== */

/* ===========================
   PORTFOLIO ENGINE
=========================== */

const PortfolioEngine = {

    balances:{},

    portfolioValue:0,

    reserve:{

        usd:0

    }

};

/* ===========================
   CALCULATE BALANCES
=========================== */

function calculateBalances(data){

    const balances = {

        BTC:0,

        ETH:0,

        BNB:0,

        SOL:0,

        USDT:0,

        USDC:0

    };

    data.forEach(item=>{

        const asset =

        String(item.Asset)

        .toUpperCase();

        if(

            !balances.hasOwnProperty(asset)

        ){

            return;

        }

        const amount =

        Number(item.Amount)||0;

        if(item.Jenis==="Masuk"){

            balances[asset]+=amount;

        }

        else if(item.Jenis==="Keluar"){

            balances[asset]-=amount;

        }

    });

    PortfolioEngine.balances =

    balances;

    return balances;

}

/* ===========================
   CALCULATE PORTFOLIO VALUE
=========================== */

function calculatePortfolioValue(

    balances,

    prices

){

    let total = 0;

    total +=

    balances.BTC *

    prices.bitcoin.usd;

    total +=

    balances.ETH *

    prices.ethereum.usd;

    total +=

    balances.BNB *

    prices.binancecoin.usd;

    total +=

    balances.SOL *

    prices.solana.usd;

    total += balances.USDT;

    total += balances.USDC;

    PortfolioEngine.portfolioValue =

    total;

    return total;

}
/* ===========================
   GET PORTFOLIO VALUE
=========================== */

function getPortfolioValue(data){

    const balances =

    calculateBalances(data);

    return calculatePortfolioValue(

        balances,

        prices

    );

}
/* ===========================
   CALCULATE RESERVE
=========================== */

function calculateReserve(balances){

    const reserve = {

        stablecoinUSD:0,

        cryptoUSD:0,

        totalUSD:0

    };

    reserve.stablecoinUSD =

        balances.USDT +

        balances.USDC;

    reserve.cryptoUSD =

        balances.BTC *

        prices.bitcoin.usd +

        balances.ETH *

        prices.ethereum.usd +

        balances.BNB *

        prices.binancecoin.usd +

        balances.SOL *

        prices.solana.usd;

    reserve.totalUSD =

        reserve.stablecoinUSD +

        reserve.cryptoUSD;

    PortfolioEngine.reserve =

    reserve;

    return reserve;

}
