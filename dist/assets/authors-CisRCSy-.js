import{s as u}from"./main-wrhIyWzb.js";let r=[],a=[],i=[];const l=document.getElementById("authorsGrid"),s=document.getElementById("authorsLoading"),c=document.getElementById("authorsEmpty"),d=document.getElementById("authorSearch"),m=document.getElementById("authorSort");p();async function p(){await g(),f(),y(),v()}async function g(){s.style.display="block",l.innerHTML="",c.style.display="none";const{data:t,error:e}=await u.from("authors").select("*").order("name");if(e){console.error(e),s.style.display="none";return}const{data:n,error:o}=await u.from("hymns").select("id, author_id");if(o){console.error(o),s.style.display="none";return}r=t||[],i=n||[],a=[...r],s.style.display="none",console.log(r),console.log(i)}function f(){document.getElementById("totalAuthors").textContent=r.length,document.getElementById("totalHymns").textContent=i.length,document.getElementById("totalBooks").textContent=0}function y(){if(a.length===0){l.innerHTML="",c.style.display="block";return}c.style.display="none",l.innerHTML=a.map(E).join("")}function E(t){const e=i.filter(o=>o.author_id===t.id).length;return`
        <div class="author-card">

            <div class="author-image">
                <img
                    src="${t.photo_url||"https://placehold.co/400x400?text=Author"}"
                    alt="${t.name}">
            </div>

            <div class="author-content">

                <h3>${t.name}</h3>

                <p>
                    ${t.bio||"Biography coming soon..."}
                </p>

                <div class="author-meta">
                    🎵 ${e} Hymns
                </div>

                <a
                    href="author.html?id=${t.id}"
                    class="btn btn-primary">

                    View Author

                </a>

            </div>

        </div>
    `}function v(){d&&d.addEventListener("input",h),m&&m.addEventListener("change",h)}function h(){const t=d.value.toLowerCase().trim();a=r.filter(e=>{const n=(e.name||"").toLowerCase(),o=(e.bio||"").toLowerCase();return n.includes(t)||o.includes(t)}),m.value==="za"?a.sort((e,n)=>n.name.localeCompare(e.name)):a.sort((e,n)=>e.name.localeCompare(n.name)),y()}
