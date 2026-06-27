document.addEventListener(
    "DOMContentLoaded",
    init
);

async function init(){

    debug("1","Start");

    await fetchTransactions();

    debug("2",Portfolio.raw);

    await fetchPrices();

    debug("3",Portfolio.prices);

    processData();

    debug("4",Portfolio.data);

    updateDashboard();

    debug("5","Dashboard");

    updateWallet();

    debug("6","Wallet");

    updateActivities();

    debug("7","Activities");

    initActivityFilter();

    debug("8","Filter");

    initAirdrop();

    debug("9","Airdrop");

    updateCharts();

    debug("10","Charts");

}
