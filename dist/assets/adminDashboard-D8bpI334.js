import{s as a}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";import{r,l as c}from"./auth-BTxupRwK.js";s();async function s(){const t=await r();t&&(await i(),m(t),u(),await d(),await l())}async function i(){const t=await fetch("./components/sidebar.html").then(e=>e.text());document.getElementById("sidebar").innerHTML=t;const n=await fetch("./components/navbar.html").then(e=>e.text());document.getElementById("navbar").innerHTML=n}function m(t){document.getElementById("adminName").textContent=t.email.split("@")[0],document.getElementById("adminEmail").textContent=t.email}function u(){document.addEventListener("click",t=>{t.target.id==="logoutButton"&&c()})}async function d(){const[t,n,e,o]=await Promise.all([a.from("hymns").select("*",{count:"exact",head:!0}),a.from("authors").select("*",{count:"exact",head:!0}),a.from("books").select("*",{count:"exact",head:!0}),a.from("interviews").select("*",{count:"exact",head:!0})]);document.getElementById("totalHymns").textContent=t.count??0,document.getElementById("totalAuthors").textContent=n.count??0,document.getElementById("totalBooks").textContent=e.count??0,document.getElementById("totalInterviews").textContent=o.count??0}async function l(){const{data:t,error:n}=await a.from("hymns").select(`
            number,
            title_telugu,
            authors(name)
        `).order("number",{ascending:!1}).limit(10);if(n){console.error(n);return}const e=document.getElementById("recentHymns");e.innerHTML=`

        <table class="recent-table">

            <thead>

                <tr>

                    <th>No.</th>

                    <th>Title</th>

                    <th>Author</th>

                </tr>

            </thead>

            <tbody>

                ${t.map(o=>`

                    <tr>

                        <td>${o.number}</td>

                        <td>${o.title_telugu}</td>

                        <td>${o.authors?.name||"-"}</td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `}
