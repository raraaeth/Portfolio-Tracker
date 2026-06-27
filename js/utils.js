/* =====================================================
   Portfolio Tracker v3.0
   File : utils.js
===================================================== */

/* ===========================
   FORMAT USD
=========================== */

function formatUSD(value){

    return "$" +

    Number(value || 0)

    .toLocaleString(

        undefined,

        {

            minimumFractionDigits:2,

            maximumFractionDigits:2

        }

    );

}

/* ===========================
   TO NUMBER
=========================== */

function toNumber(value){

    return Number(value) || 0;

}

/* ===========================
   UPPERCASE ASSET
=========================== */

function normalizeAsset(asset){

    return String(asset || "")

    .trim()

    .toUpperCase();

}

/* ===========================
   IS VALID ASSET
=========================== */

function isValidAsset(asset){

    return VALID_ASSETS.includes(

        normalizeAsset(asset)

    );

}

/* ===========================
   DOM
=========================== */

function $(id){

    return document.getElementById(id);

}
