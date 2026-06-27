/* =====================================================
   Portfolio Tracker v3.0
   File : charts.js
===================================================== */

/* ===========================
   GLOBAL CHART
=========================== */

let walletChart = null;

let balanceChart = null;

/* ===========================
   UPDATE WALLET CHART
=========================== */

function updateWalletChart(){

    const canvas = $("walletChart");

    if(!canvas) return;

    const labels = [];

    const values = [];

    Object.entries(

        Portfolio.wallets

    ).forEach(([wallet,balance])=>{

        labels.push(wallet);

        values.push(

            getWalletValue(balance)

        );

    });

    if(walletChart){

        walletChart.destroy();

    }

    walletChart = new Chart(

        canvas,

        {

            type:"pie",

            data:{

                labels,

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

        }

    );

}

/* ===========================
   UPDATE BALANCE CHART
=========================== */

function updateBalanceChart(){

    const canvas = $("balanceChart");

    if(!canvas) return;

    const labels = [];

    const values = [];

    const history = {};

    Portfolio.data.forEach(item=>{

        if(

            !history[item.date]

        ){

            history[item.date]=[];

        }

        history[item.date].push(item);

    });

    Object.keys(history)

    .sort()

    .forEach(date=>{

        const temp =

        Portfolio.data.filter(item=>

            item.date<=date

        );

        const balances = {

            BTC:0,

            ETH:0,

            BNB:0,

            SOL:0,

            USDT:0,

            USDC:0

        };

        temp.forEach(item=>{

            if(

                !isValidAsset(

                    item.asset

                )

            ) return;

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

        labels.push(date);

        values.push(

            Number(

                total.toFixed(2)

            )

        );

    });

    if(balanceChart){

        balanceChart.destroy();

    }

    balanceChart =

    new Chart(

        canvas,

        {

            type:"line",

            data:{

                labels,

                datasets:[{

                    data:values,

                    label:"Portfolio",

                    borderWidth:3,

                    tension:0.4,

                    fill:false,

                    borderColor:"#ffffff",

                    backgroundColor:"#ffffff",

                    pointBackgroundColor:"#ffffff",

                    pointRadius:4

                }]

            },

            options:{

                responsive:true,

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    x:{

                        ticks:{

                            color:"#ffffff"

                        },

                        grid:{

                            color:"rgba(255,255,255,.1)"

                        }

                    },

                    y:{

                        ticks:{

                            color:"#ffffff"

                        },

                        grid:{

                            color:"rgba(255,255,255,.1)"

                        }

                    }

                }

            }

        }

    );

}

/* ===========================
   UPDATE CHARTS
=========================== */

function updateCharts(){

    updateWalletChart();

    updateBalanceChart();

}
