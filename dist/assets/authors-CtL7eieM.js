import{s as m}from"./supabase-C4TjTvDq.js";import"./main-DZT5cO3Q.js";let s=[],a=[],i=[];const l=document.getElementById("authorsGrid"),r=document.getElementById("authorsLoading"),c=document.getElementById("authorsEmpty"),d=document.getElementById("authorSearch"),u=document.getElementById("authorSort");p();async function p(){await f(),g(),y(),E()}async function f(){r.style.display="block",l.innerHTML="",c.style.display="none";const{data:t,error:e}=await m.from("authors").select("*").order("name");if(e){console.error(e),r.style.display="none";return}const{data:n,error:o}=await m.from("hymns").select("id, author_id");if(o){console.error(o),r.style.display="none";return}s=t||[],i=n||[],a=[...s],r.style.display="none",console.log(s),console.log(i)}function g(){document.getElementById("totalAuthors").textContent=s.length,document.getElementById("totalHymns").textContent=i.length,document.getElementById("totalBooks").textContent=0}function y(){if(a.length===0){l.innerHTML="",c.style.display="block";return}c.style.display="none",l.innerHTML=a.map(v).join("")}function v(t){const e=i.filter(o=>o.author_id===t.id).length,n=t.photo_url||"https://placehold.co/400x400?text=Author";return`
        <div class="author-card" onclick="window.location.href='author.html?id=${t.id}'">

            <div class="author-image-wrapper">
                <img
                    src="${n}"
                    alt="${t.name}">
            </div>

            <div class="author-content">
                <h3>${t.name}</h3>
                <p class="bio-coming">
                    ${t.bio||"Biography coming soon..."}
                </p>
                <div class="author-hymn-count">
                    <i class="fas fa-music"></i> ${e} Hymns
                </div>
                
                <!-- Added a sleek, text-based button link -->
                <span class="view-author-link">
                    View Author <i class="fas fa-arrow-right"></i>
                </span>
            </div>

        </div>
    `}function E(){d&&d.addEventListener("input",h),u&&u.addEventListener("change",h)}function h(){const t=d.value.toLowerCase().trim();a=s.filter(e=>{const n=(e.name||"").toLowerCase(),o=(e.bio||"").toLowerCase();return n.includes(t)||o.includes(t)}),u.value==="za"?a.sort((e,n)=>n.name.localeCompare(e.name)):a.sort((e,n)=>e.name.localeCompare(n.name)),y()}
