/* =========================
   PROCESS WALLET
========================= */

function processWalletData(){

    Wallet.summary = {

        totalUSD:0,

        totalWallets:Wallet.summary.totalWallets,

        totalTokens:0,

        portfolios:{}

    };

    for(const wallet of Wallet.tokens){

        if(

            !Wallet.summary.portfolios[
                wallet.portfolio
            ]

        ){

            Wallet.summary.portfolios[
                wallet.portfolio
            ]={

                totalUSD:0,

                totalTokens:0,

                evm:[],

                sol:[]

            };

        }

        const portfolio =

        Wallet.summary.portfolios[
            wallet.portfolio
        ];

        for(const token of wallet.tokens){

            portfolio.totalUSD +=

            Number(
                token.usd_value || 0
            );

            portfolio.totalTokens++;

            Wallet.summary.totalUSD +=

            Number(
                token.usd_value || 0
            );

            Wallet.summary.totalTokens++;

            if(

                wallet.network==="evm"

            ){

                portfolio.evm.push(
                    token
                );

            }else{

                portfolio.sol.push(
                    token
                );

            }

        }

    }

    console.log(

        "Wallet Summary",

        Wallet.summary

    );

}
