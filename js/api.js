/* =====================================================
   Portfolio Tracker v3.0
   File : api.js
===================================================== */

/* ===========================
   FETCH TRANSACTIONS
=========================== */

async function fetchTransactions(){

    try{

        const response =

        await fetch(

            CONFIG.API_URL

        );

        const data =

        await response.json();

        Portfolio.raw = data;

    }

    catch(error){

        console.error(

            "Transaction Error :",

            error

        );

        Portfolio.raw = [];

    }

}

/* ===========================
   FETCH PRICES
=========================== */

async function fetchPrices(){

    try{

        const response =

        await fetch(

            CONFIG.PRICE_API

        );

        const data =

        await response.json();

        Portfolio.prices = data;

    }

    catch(error){

        console.error(

            "Price Error :",

            error

        );

        Portfolio.prices = {};

    }

}

/* ===========================
   TEST API
=========================== */

async function testAPI(){

    await fetchTransactions();

    await fetchPrices();

    console.log(

        "RAW :", Portfolio.raw

    );

    console.log(

        "PRICES :", Portfolio.prices

    );

}
