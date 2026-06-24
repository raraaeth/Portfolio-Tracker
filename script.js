/* =========================
   CONFIG
========================= */
/* =========================
   GLOBAL DATA
========================= */

let transaksi = [];
let prices = {};
let walletChart = null;
let selectedWallets = [];

/* =========================
   COINGECKO
========================= */

async function getPrices(){

    const response =
    await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd"
    );

    prices =
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
   PORTFOLIO CALCULATOR
========================= */

function calculatePortfolio(){

    let balances = {

        BTC:0,
        ETH:0,
        BNB:0,
        SOL:0,
        USDT:0,
        USDC:0

    };

    transaksi.forEach(item => {

        const asset =
        item.Asset.toUpperCase();

        const amount =
        parseFloat(item.Amount) || 0;

        if(
            !balances.hasOwnProperty(asset)
        ){
            return;
        }

        if(item.Jenis === "Masuk"){

            balances[asset] += amount;

        }

        if(item.Jenis === "Keluar"){

            balances[asset] -= amount;

        }

    });

    let totalPortfolio = 0;

    totalPortfolio +=
    balances.BTC *
    prices.bitcoin.usd;

    totalPortfolio +=
    balances.ETH *
    prices.ethereum.usd;

    totalPortfolio +=
    balances.BNB *
    prices.binancecoin.usd;

    totalPortfolio +=
    balances.SOL *
    prices.solana.usd;

    totalPortfolio +=
    balances.USDT;

    totalPortfolio +=
    balances.USDC;

    document.getElementById(
        "portfolioValue"
    ).textContent =
    "$" +
    totalPortfolio.toLocaleString(
        undefined,
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    );

}
/* =========================
   AIRDROP COUNTER
========================= */

function calculateAirdrop(){

    let totalAirdrop = 0;

    transaksi.forEach(item => {

        const keterangan =
        item.Keterangan
        ?.toLowerCase() || "";

        if(
            keterangan.includes("airdrop")
        ){
            totalAirdrop++;
        }

    });

    document.getElementById(
        "airdropCount"
    ).textContent =
    totalAirdrop;

       }
/* =========================
   ACTIVITIES TABLE
========================= */

function renderActivities(){

    const tbody =
    document.getElementById(
        "activityTable"
    );

    tbody.innerHTML = "";

    const days =
    Number(
        document.getElementById(
            "periodFilter"
        ).value
    );

    const today =
    new Date();

    const limitDate =
    new Date();

    limitDate.setDate(
        today.getDate() - days
    );

    transaksi
    .filter(item => {

        const txDate =
        new Date(item.Tanggal);

        const walletMatch =

selectedWallets.length === 0
? true
: selectedWallets.includes(
    item.Wallet
);

return (
    txDate >= limitDate &&
    walletMatch
);

    })
    .slice()
    .reverse()
    .forEach(item => {

        const row =
        document.createElement("tr");

        const statusClass =
        item.Jenis === "Masuk"
        ? "masuk"
        : "keluar";

        row.innerHTML = `
            <td>${item.Tanggal}</td>
            <td>${item.Wallet}</td>
            <td class="${statusClass}">
                ${item.Jenis}
            </td>
            <td>${item.Asset}</td>
            <td>${item.Amount}</td>
            <td>${item.Keterangan}</td>
        `;

        tbody.appendChild(row);

    });

}

/* =========================
   WALLET ALLOCATION
========================= */

function renderWalletAllocation(){

    const wallets = {};

    transaksi.forEach(item => {

        const asset =
        item.Asset.toUpperCase();

        const amount =
        parseFloat(item.Amount) || 0;

        if(
            ![
                "BTC",
                "ETH",
                "BNB",
                "SOL",
                "USDT",
                "USDC"
            ].includes(asset)
        ){
            return;
        }

        const wallet =
        item.Wallet;

        if(!wallets[wallet]){

            wallets[wallet] = {
                BTC:0,
                ETH:0,
                BNB:0,
                SOL:0,
                USDT:0,
                USDC:0
            };

        }

        if(item.Jenis === "Masuk"){

            wallets[wallet][asset] += amount;

        }

        if(item.Jenis === "Keluar"){

            wallets[wallet][asset] -= amount;

        }

    });

    const labels = [];
    const values = [];

    Object.keys(wallets).forEach(wallet => {

        const balance =
        wallets[wallet];

        let usd = 0;

        usd +=
        balance.BTC *
        prices.bitcoin.usd;

        usd +=
        balance.ETH *
        prices.ethereum.usd;

        usd +=
        balance.BNB *
        prices.binancecoin.usd;

        usd +=
        balance.SOL *
        prices.solana.usd;

        usd += balance.USDT;

        usd += balance.USDC;

        labels.push(wallet);

        values.push(
            Number(usd.toFixed(2))
        );

    });

    const ctx =
    document
    .getElementById("walletChart")
    .getContext("2d");

    if(walletChart){

        walletChart.destroy();

    }

    walletChart =
    new Chart(ctx, {

        type:"pie",

        data:{
            labels:labels,
            datasets:[{
                data:values
            }]
        },

        options:{
            responsive:true,

            plugins:{
                legend:{
                    position:"bottom"
                }
            }
        }

    });

}

/* =========================
   TEST OPENSHEET
========================= */

async function testData(){

    const response =
    await fetch(API_URL);

    transaksi =
    await response.json();

}

/* =========================
   WALLET FILTER
========================= */

function populateWalletFilter(){

    const container =
    document.getElementById(
        "walletFilter"
    );

    container.innerHTML = "";

    const wallets =
    [
        ...new Set(
            transaksi.map(
                item => item.Wallet
            )
        )
    ];

    wallets.forEach(wallet => {

        const tag =
        document.createElement("div");

        tag.className =
        "wallet-tag";

        tag.textContent =
        wallet;

        tag.addEventListener(
            "click",
            () => {

                tag.classList.toggle(
                    "active"
                );

                if(
                    selectedWallets.includes(
                        wallet
                    )
                ){

                    selectedWallets =
                    selectedWallets.filter(
                        item =>
                        item !== wallet
                    );

                }else{

                    selectedWallets.push(
                        wallet
                    );

                }

                renderActivities();

            }
        );

        container.appendChild(
            tag
        );

    });

}

/* =========================
   FILTER EVENTS
========================= */

document
.getElementById(
    "periodFilter"
)
.addEventListener(
    "change",
    renderActivities
);
document
.getElementById(
    "walletFilter"
)
.addEventListener(
    "change",
    renderActivities
);

/* =========================
   PORTFOLIO VALUE
========================= */

function getPortfolioValue(data){

    let balances = {

        BTC:0,
        ETH:0,
        BNB:0,
        SOL:0,
        USDT:0,
        USDC:0

    };

    data.forEach(item => {

        const asset =
        item.Asset.toUpperCase();

        if(
            !balances.hasOwnProperty(asset)
        ){
            return;
        }

        const amount =
        parseFloat(item.Amount) || 0;

        if(item.Jenis === "Masuk"){

            balances[asset] += amount;

        }

        if(item.Jenis === "Keluar"){

            balances[asset] -= amount;

        }

    });

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

    return total;

}
/* =========================
   FORMAT PNL
========================= */

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

/* =========================
   FORMAT PERCENT
========================= */

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

/* =========================
   PNL CALCULATOR
========================= */

function calculatePnL(){

    const today =
    new Date();

    const weekDate =
    new Date();

    weekDate.setDate(
        today.getDate() - 7
    );

    const monthDate =
    new Date();

    monthDate.setDate(
        today.getDate() - 30
    );

    const currentPortfolio =
    getPortfolioValue(
        transaksi
    );

    const weeklyPortfolio =
    getPortfolioValue(

        transaksi.filter(item => {

            return (
                new Date(
                    item.Tanggal
                ) <= weekDate
            );

        })

    );

    const monthlyPortfolio =
    getPortfolioValue(

        transaksi.filter(item => {

            return (
                new Date(
                    item.Tanggal
                ) <= monthDate
            );

        })

    );

    const weeklyPnL =
    currentPortfolio -
    weeklyPortfolio;

    const monthlyPnL =
    currentPortfolio -
    monthlyPortfolio;

   const weeklyPercent =

weeklyPortfolio === 0
? 0
: (
    weeklyPnL /
    weeklyPortfolio
) * 100;

const monthlyPercent =

monthlyPortfolio === 0
? 0
: (
    monthlyPnL /
    monthlyPortfolio
) * 100;

    const weeklyElement =
document.getElementById(
    "weeklyPnl"
);

weeklyElement.innerHTML =

formatPnL(
    weeklyPnL
) +

"<br><small>" +

formatPercent(
    weeklyPercent
) +

"</small>";

weeklyElement.style.color =

weeklyPnL >= 0
? "#22c55e"
: "#ef4444";
   const monthlyElement =
document.getElementById(
    "monthlyPnl"
);

monthlyElement.innerHTML =

formatPnL(
    monthlyPnL
) +

"<br><small>" +

formatPercent(
    monthlyPercent
) +

"</small>";

monthlyElement.style.color =

monthlyPnL >= 0
? "#22c55e"
: "#ef4444";

}
/* =========================
   INIT
========================= */

async function init(){

    await testData();

    await getPrices();

    calculatePortfolio();
    calculateAirdrop();
    calculatePnL();
    populateWalletFilter();
    renderActivities();
    renderWalletAllocation();
   
}

init();
