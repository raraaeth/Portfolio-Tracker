/* =====================================================
   Portfolio Tracker v3.0
   File : activities.js
===================================================== */

/* ===========================
   FILTER ACTIVITIES
=========================== */

function getActivities(){

    let activities = [

        ...Portfolio.data

    ];

    const days =

    Number(

        $("periodFilter")?.value || 30

    );

    const today =

    new Date();

    const limit =

    new Date();

    limit.setDate(

        today.getDate()-days

    );

    activities =

    activities.filter(item=>{

        return(

            new Date(item.date)

            >=

            limit

        );

    });

    if(

        selectedWallets.length>0

    ){

        activities =

        activities.filter(item=>

            selectedWallets.includes(

                item.wallet

            )

        );

    }

    return activities

    .sort(

        (a,b)=>

        new Date(b.date)-

        new Date(a.date)

    );

}

/* ===========================
   UPDATE ACTIVITIES
=========================== */

function updateActivities(){

    const tbody =

    $("activityTable");

    if(!tbody) return;

    tbody.innerHTML="";

    getActivities()

    .forEach(item=>{

        const row =

        document.createElement(

            "tr"

        );

        row.innerHTML =

        `

        <td>

            ${item.date}

        </td>

        <td>

            ${item.wallet}

        </td>

        <td class="${
            item.type==="Masuk"
            ? "masuk"
            : "keluar"
        }">

            ${item.type}

        </td>

        <td>

            ${item.asset}

        </td>

        <td>

            ${item.amount}

        </td>

        <td>

            ${item.description}

        </td>

        `;

        tbody.appendChild(

            row

        );

    });

}

/* ===========================
   INIT FILTER
=========================== */

function initActivityFilter(){

    const filter =

    $("periodFilter");

    if(!filter) return;

    filter.addEventListener(

        "change",

        updateActivities

    );

}
