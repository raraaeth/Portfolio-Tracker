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
/* =========================
   FETCH WALLET TOKEN
========================= */

async function fetchWalletTokens(
    address,
    network
){

    try{

        const chain =
        NETWORK[network];

        const response =
        await fetch(

`${MORALIS.BASE_URL}/wallets/${address}/tokens?chain=${chain}`,

        {

            headers:{

                "accept":"application/json",

                "X-API-Key":
                MORALIS.API_KEY

            }

        });

        const data =
        await response.json();

        return data.result || [];

    }catch(error){

        console.error(

            "Moralis Error:",

            address,

            error

        );

        return [];

    }

}

/* =========================
   FETCH ALL WALLET
========================= */

async function fetchAllWalletTokens(){

    Wallet.tokens = [];

    const activeWallets =

    Wallet.raw.filter(

        item =>

        item.Aktif === "TRUE"

    );

    for(const wallet of activeWallets){

        const tokens =

        await fetchWalletTokens(

            wallet.Address,

            wallet.Network

        );

        Wallet.tokens.push({

            portfolio:

            wallet.Portofolio,

            network:

            wallet.Network,

            provider:

            wallet.Provider,

            address:

            wallet.Address,

            tokens

        });

    }

    console.log(

        "Portfolio Loaded :",

        Wallet.tokens

    );

       }

