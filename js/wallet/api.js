/* =========================
   WALLET API
========================= */

const WALLET_SHEET = "wallet";

const WALLET_API_URL =
`https://opensheet.elk.sh/${SHEET_ID}/${WALLET_SHEET}`;


/* =========================
   FETCH WALLET LIST
========================= */

async function fetchWalletList(){

    try{

        const response =
        await fetch(WALLET_API_URL);

        Wallet.raw =
        await response.json();

        Wallet.summary.totalWallets =
        Wallet.raw.filter(
            item =>
            item.Aktif === "TRUE"
        ).length;

        console.log(
            "Wallet Loaded :",
            Wallet.summary.totalWallets
        );

        return Wallet.raw;

    }catch(error){

        console.error(
            "Wallet Error :",
            error
        );

        Wallet.raw=[];

    }

}
