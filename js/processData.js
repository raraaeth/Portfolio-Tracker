/* =====================================================
   Portfolio Tracker v3.0
   File : processData.js
===================================================== */

/* ===========================
   NORMALIZE DATA
=========================== */

function normalizeData(){

    Portfolio.data =

    Portfolio.raw.map(item=>{

        return{

            date :

            item.Tanggal || "",

            wallet :

            item.Wallet || "",

            type :

            (item.Jenis || "")

            .trim(),

            asset :

            normalizeAsset(

                item.Asset

            ),

            amount :

            toNumber(

                item.Amount

            ),

            description :

            item.Keterangan || ""

        };

    });

}

/* ===========================
   CALCULATE BALANCES
=========================== */

function calculateBalances(){

    Portfolio.balances = {};

    VALID_ASSETS.forEach(asset=>{

        Portfolio.balances[asset]=0;

    });

    Portfolio.data.forEach(item=>{

        if(

            !isValidAsset(

                item.asset

            )

        ){

            return;

        }

        if(

            item.type === "Masuk"

        ){

            Portfolio.balances[

                item.asset

            ] += item.amount;

        }

        if(

            item.type === "Keluar"

        ){

            Portfolio.balances[

                item.asset

            ] -= item.amount;

        }

    });

}

/* ===========================
   PROCESS DATA
=========================== */

function processData(){

    normalizeData();

    calculateBalances();

}
