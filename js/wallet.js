/* =====================================================
   Portfolio Tracker v3.0
   File : wallet.js
===================================================== */

/* ===========================
   CALCULATE WALLETS
=========================== */

function calculateWallets(){

    Portfolio.wallets = {};

    Portfolio.data.forEach(item=>{

        if(

            !isValidAsset(item.asset)

        ){

            return;

        }

        const wallet = item.wallet;

        if(

            !Portfolio.wallets[wallet]

        ){

            Portfolio.wallets[wallet]={

                BTC:0,

                ETH:0,

                BNB:0,

                SOL:0,

                USDT:0,

                USDC:0

            };

        }

        if(item.type==="Masuk"){

            Portfolio.wallets

            [wallet]

            [item.asset]+=

            item.amount;

        }

        else if(

            item.type==="Keluar"

        ){

            Portfolio.wallets

            [wallet]

            [item.asset]-=

            item.amount;

        }

    });

}

/* ===========================
   GET WALLET VALUE
=========================== */

function getWalletValue(balance){

    const p = Portfolio.prices;

    let total = 0;

    total +=

    balance.BTC *

    (p.bitcoin?.usd||0);

    total +=

    balance.ETH *

    (p.ethereum?.usd||0);

    total +=

    balance.BNB *

    (p.binancecoin?.usd||0);

    total +=

    balance.SOL *

    (p.solana?.usd||0);

    total += balance.USDT;

    total += balance.USDC;

    return total;

}

/* ===========================
   UPDATE WALLET SUMMARY
=========================== */

function updateWalletSummary(){

    const container =

    $("walletSummaryTable");

    if(!container) return;

    container.innerHTML="";

    const data =

    Object.entries(

        Portfolio.wallets

    )

    .map(

        ([wallet,balance])=>({

            wallet,

            value:

            getWalletValue(

                balance

            )

        })

    )

    .sort(

        (a,b)=>

        b.value-a.value

    );

    data.forEach(

        (item,index)=>{

            const medal =

            [

                "🥇",

                "🥈",

                "🥉"

            ][index] ||

            "🏅";

            const card =

            document.createElement(

                "div"

            );

            card.className=

            "wallet-item";

            card.innerHTML=`

            <div class="wallet-left">

                <div class="wallet-rank">

                    ${medal}

                </div>

                <div class="wallet-name">

                    ${item.wallet}

                </div>

            </div>

            <div class="wallet-value">

                ${formatUSD(item.value)}

            </div>

            `;

            container.appendChild(

                card

            );

        }

    );

}

/* ===========================
   UPDATE WALLET
=========================== */

function updateWallet(){

    calculateWallets();

    updateWalletSummary();

}
