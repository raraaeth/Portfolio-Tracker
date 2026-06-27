/* =====================================================
   Portfolio Tracker v3.0
   File : airdrop.js
===================================================== */

/* ===========================
   CALCULATE AIRDROP
=========================== */

function calculateAirdrops(){

    const projects = {};

    Portfolio.data.forEach(item=>{

        const desc =

        item.description

        .toLowerCase();

        if(

            !desc.includes(

                "airdrop"

            )

        ){

            return;

        }

        const project =

        item.description

        .replace(

            /airdrop\s*-\s*/i,

            ""

        )

        .trim();

        if(

            !projects[project]

        ){

            projects[project]={

                asset :

                item.asset,

                amount : 0

            };

        }

        projects[project].amount +=

        item.amount;

    });

    Portfolio.airdrops =

    Object.entries(projects)

    .map(

        ([project,data])=>({

            project,

            asset:data.asset,

            amount:data.amount

        })

    )

    .sort(

        (a,b)=>

        b.amount-a.amount

    );

}

/* ===========================
   UPDATE AIRDROP COUNTER
=========================== */

function updateAirdropCounter(){

    const counter =

    $("airdropCount");

    if(!counter) return;

    counter.textContent =

    Portfolio.airdrops.length;

}

/* ===========================
   UPDATE AIRDROP STATS
=========================== */

function updateAirdropStats(){

    if(

        !$("airdropTitle")

    ) return;

    const total =

    Portfolio.airdrops.length;

    const top =

    total

    ?

    Portfolio.airdrops[0]

    :

    null;

    $("airdropTitle")

    .textContent =

    `🎁 My Airdrop • ${total} Projects`;

    $("airdropStats")

    .innerHTML =

    top

    ?

    `

    🏆 <strong>

    Top Project :

    </strong>

    ${top.project}

    <br>

    💰 <strong>

    Largest Allocation :

    </strong>

    ${top.amount}

    ${top.asset}

    `

    :

    "-";

}

/* ===========================
   UPDATE AIRDROP HOLDINGS
=========================== */

function updateAirdropHoldings(){

    const container =

    $("airdropHoldings");

    if(!container) return;

    container.innerHTML="";

    Portfolio.airdrops

    .slice(

        0,

        airdropLimit

    )

    .forEach(

        (item,index)=>{

            const medal =

            [

                "🥇",

                "🥈",

                "🥉"

            ][index]

            ||

            "🏅";

            const card =

            document

            .createElement(

                "div"

            );

            card.className=

            "airdrop-item";

            card.innerHTML=`

            <div class="airdrop-rank">

                ${medal}

            </div>

            <div class="airdrop-project">

                ${item.project}

            </div>

            <div class="airdrop-amount">

                ${item.amount}

                ${item.asset}

            </div>

            `;

            container.appendChild(

                card

            );

        }

    );

}

/* ===========================
   INIT AIRDROP
=========================== */

function initAirdrop(){

    calculateAirdrops();

    updateAirdropCounter();

    updateAirdropStats();

    updateAirdropHoldings();

    const filter =

    $("airdropLimit");

    if(filter){

        filter.addEventListener(

            "change",

            e=>{

                airdropLimit =

                Number(

                    e.target.value

                );

                updateAirdropHoldings();

            }

        );

    }

}
