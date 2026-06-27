document.addEventListener(
    "DOMContentLoaded",
    init
);

async function init(){

    document.title = "STEP 1";

    await fetchTransactions();

    document.title = "STEP 2";

    await fetchPrices();

    document.title = "STEP 3";

    processData();

    document.title = "STEP 4";

    updateDashboard();

    document.title = "STEP 5";

    updateWallet();

    document.title = "STEP 6";

    updateActivities();

    document.title = "STEP 7";

    initActivityFilter();

    document.title = "STEP 8";

    initAirdrop();

    document.title = "STEP 9";

    updateCharts();

    document.title = "DONE";

}
