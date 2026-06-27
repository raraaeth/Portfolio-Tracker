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
   POPULATE WALLET FILTER
=========================== */

function populateWalletFilter(){

    const container =

    $("walletFilter");

    if(!container) return;

    container.innerHTML="";

    Object.keys(

        Portfolio.wallets

    )

    .forEach(wallet=>{

        const label =

        document.createElement(

            "label"

        );

        label.className=

        "wallet-option";

        label.innerHTML=

        `

        <input

        type="checkbox"

        value="${wallet}"

        checked>

        ${wallet}

        `;

        container.appendChild(

            label

        );

    });

}

/* ===========================
   INIT WALLET FILTER
=========================== */

function initWalletFilter(){

    const checkbox =

    document.querySelectorAll(

        "#walletFilter input"

    );

    checkbox.forEach(item=>{

        item.addEventListener(

            "change",

            ()=>{

                selectedWallets =

                [...checkbox]

                .filter(

                    c=>c.checked

                )

                .map(

                    c=>c.value

                );

                updateActivities();

            }

        );

    });

}

/* ===========================
   POPULATE ASSET FILTER
=========================== */

function populateWalletAssetFilter(){

    const container =

    $("walletAssetFilter");

    if(!container) return;

    container.innerHTML="";

    Object.keys(

        Portfolio.wallets

    )

    .forEach(wallet=>{

        const button =

        document.createElement(

            "button"

        );

        button.textContent=

        wallet;

        button.onclick=()=>{

            selectedAssetWallet=

            wallet;

            updateWalletAssets();

        };

        container.appendChild(

            button

        );

    });

}

/* ===========================
   UPDATE WALLET ASSETS
=========================== */

function updateWalletAssets(){

    const tbody =

    $("walletAssetTable");

    if(!tbody) return;

    tbody.innerHTML="";

    if(

        !selectedAssetWallet

    ) return;

    const balance =

    Portfolio.wallets

    [

        selectedAssetWallet

    ];

    Object.entries(balance)

    .forEach(

        ([asset,amount])=>{

            if(amount===0)

            return;

            const row=

            document.createElement(

                "tr"

            );

            let usd = 0;

            switch(asset){

                case "BTC":

                usd=

                amount*

                Portfolio.prices

                .bitcoin.usd;

                break;

                case "ETH":

                usd=

                amount*

                Portfolio.prices

                .ethereum.usd;

                break;

                case "BNB":

                usd=

                amount*

                Portfolio.prices

                .binancecoin.usd;

                break;

                case "SOL":

                usd=

                amount*

                Portfolio.prices

                .solana.usd;

                break;

                default:

                usd=

                amount;

            }

            row.innerHTML=

            `

            <td>

            ${asset}

            </td>

            <td>

            ${amount}

            </td>

            <td>

            ${formatUSD(usd)}

            </td>

            `;

            tbody.appendChild(

                row

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

    populateWalletFilter();

    initWalletFilter();

    populateWalletAssetFilter();

    if(

        !selectedAssetWallet

    ){

        selectedAssetWallet =

        Object.keys(

            Portfolio.wallets

        )[0];

    }

    updateWalletAssets();

}
