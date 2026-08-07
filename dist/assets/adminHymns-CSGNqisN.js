import{s as l}from"./supabase-C4TjTvDq.js";/* empty css              */function i(e,t="success"){const n=document.getElementById("toastContainer"),o=document.createElement("div");o.className=`toast ${t}`;const f={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"};o.innerHTML=`

        <span>${f[t]||"ℹ️"}</span>

        <span>${e}</span>

    `,n.appendChild(o),setTimeout(()=>{o.remove()},4e3)}let _=[],r=[];const E=50;let d=1,s=null;const v=document.getElementById("hymnModal"),N=document.getElementById("addHymnButton"),A=document.getElementById("closeModal"),U=document.getElementById("cancelModal"),u=document.getElementById("confirmModal"),S=document.getElementById("confirmDelete"),F=document.getElementById("cancelDelete"),j=document.getElementById("confirmMessage"),k=document.getElementById("title_english"),M=document.getElementById("slug");let B=!1;M.addEventListener("input",()=>{B=!0});k.addEventListener("input",()=>{B||(M.value=ne(k.value))});let c=null;function H(){s||(h.reset(),document.getElementById("saveButton").textContent="Save Hymn",B=!1),v.classList.add("active")}function y(){s=null,h.reset(),document.getElementById("saveButton").textContent="Save Hymn",B=!1,v.classList.remove("active")}N.addEventListener("click",H);A.addEventListener("click",y);U.addEventListener("click",y);v.addEventListener("click",e=>{e.target===v&&y()});document.addEventListener("keydown",e=>{e.key==="Escape"&&y()});const h=document.getElementById("hymnForm");h.addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("saveButton");P(t,s?"Updating...":"Saving...");const n={number:Number(document.getElementById("number").value),title_telugu:document.getElementById("title_telugu").value,title_english:document.getElementById("title_english").value,author_id:Number(document.getElementById("author").value)||null,book_id:Number(document.getElementById("book").value)||null,category_id:Number(document.getElementById("category").value)||null,language:document.getElementById("language").value,slug:document.getElementById("slug").value,youtube_links:document.getElementById("youtube_links").value.split(`
`).filter(m=>m.trim()!==""),is_featured:document.getElementById("featured").checked};if(!await oe(n)){a(t);return}console.log(n);let o;if(s){const{data:m,error:q}=await l.from("hymns").update(n).eq("id",s).select();console.log("Editing ID:",s),console.log("Sending:",n),console.log("Returned:",m),console.log("Error:",q)}else({error:o}=await l.from("hymns").insert([n]));if(o){console.error(o),alert(o.message),a(t);return}i(s?"Successfully updated hymn.":"Hymn added successfully.","success"),y(),h.reset(),await w()});const I=document.getElementById("loadingState"),L=document.getElementById("errorState"),b=document.getElementById("emptyState"),p=document.getElementById("tableContainer"),z=document.getElementById("hymnsTableBody"),C=document.getElementById("pagination"),$=document.getElementById("prevPage"),T=document.getElementById("nextPage"),G=document.getElementById("pageInfo");document.addEventListener("DOMContentLoaded",async()=>{await Y(),await ee(),await te(),await w(),a(saveButton)});async function w(){Q();try{const{data:e,error:t}=await l.from("hymns").select(`
    id,
    number,
    title_telugu,
    title_english,
    author_id,
    book_id,
    category_id,
    language,
    slug,
    youtube_links,
    is_featured,
    authors(name)
`).order("number",{ascending:!0});if(t)throw t;if(!e||e.length===0){x(),a(saveButton);return}_=e,r=[...e],g()}catch(e){console.error(e),V()}}function O(e){z.innerHTML=e.map(t=>`

        <tr>

            <td>${t.number}</td>

            <td>${t.title_telugu??"-"}</td>

            <td>${t.title_english??"-"}</td>

            <td>${t.authors?.name??"Unknown"}</td>

            <td>${W(t.language)}</td>

            <td>

                <button class="table-btn edit-btn"
                    data-number="${t.number}">
                        Edit 
                </button>

                <button
    class="table-btn delete-btn"
    data-id="${t.id}"
    data-number="${t.number}">
    Delete
</button>

            </td>

        </tr>

    `).join(""),R(),J(),I.classList.add("hidden"),L.classList.add("hidden"),b.classList.add("hidden"),p.classList.remove("hidden")}function R(){document.querySelectorAll(".edit-btn").forEach(e=>{e.addEventListener("click",()=>{Z(e.dataset.number)})})}async function Z(e){const{data:t,error:n}=await l.from("hymns").select("*").eq("number",e).single();if(n){console.error(n),a(saveButton);return}s=t.id,console.log("Loaded hymn:",t),console.log("Editing hymn id:",s),document.getElementById("number").value=t.number,document.getElementById("title_telugu").value=t.title_telugu??"",document.getElementById("title_english").value=t.title_english??"",document.getElementById("author").value=t.author_id??"",document.getElementById("book").value=t.book_id??"",document.getElementById("category").value=t.category_id??"",document.getElementById("language").value=t.language??"telugu",document.getElementById("slug").value=t.slug??"",document.getElementById("youtube_links").value=(t.youtube_links||[]).join(`
`),document.getElementById("featured").checked=t.is_featured??!1,document.getElementById("saveButton").textContent="Update Hymn",H()}function J(){document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",()=>{c={id:e.dataset.id,number:e.dataset.number},j.textContent=`Are you sure you want to delete Hymn #${c.number}? This action cannot be undone.`,u.classList.add("active")})})}function g(){const e=(d-1)*E,t=e+E,n=r.slice(e,t);O(n),K()}function K(){const e=Math.ceil(r.length/E);if(e<=1){C.classList.add("hidden"),a(saveButton);return}C.classList.remove("hidden"),G.textContent=`Page ${d} of ${e}`,$.disabled=d===1,T.disabled=d===e}function Q(){I.classList.remove("hidden"),L.classList.add("hidden"),b.classList.add("hidden"),p.classList.add("hidden")}function V(){I.classList.add("hidden"),L.classList.remove("hidden"),b.classList.add("hidden"),p.classList.add("hidden")}function x(e="No hymns found."){document.getElementById("emptyMessage").textContent=e,I.classList.add("hidden"),L.classList.add("hidden"),b.classList.remove("hidden"),p.classList.add("hidden")}function W(e){return e?e.charAt(0).toUpperCase()+e.slice(1):"-"}const D=document.getElementById("searchInput");D.addEventListener("input",X);function X(){const e=D.value.trim().toLowerCase();if(!e){r=[..._],d=1,g(),a(saveButton);return}if(r=_.filter(t=>{const n=String(t.number),o=(t.title_telugu||"").toLowerCase(),f=(t.title_english||"").toLowerCase(),m=(t.authors?.name||"").toLowerCase();return n.includes(e)||o.includes(e)||f.includes(e)||m.includes(e)}),r.length===0){x("No hymns match your search."),a(saveButton);return}g()}$.addEventListener("click",()=>{d>1&&(d--,g())});T.addEventListener("click",()=>{const e=Math.ceil(r.length/E);d<e&&(d++,g())});async function Y(){const e=document.getElementById("author");e.innerHTML=`
        <option value="">Select Author</option>
    `;const{data:t,error:n}=await l.from("authors").select("id,name").order("name");if(n){console.error(n),a(saveButton);return}t.forEach(o=>{e.innerHTML+=`

            <option value="${o.id}">

                ${o.name}

            </option>

        `})}async function ee(){const e=document.getElementById("book");e.innerHTML=`
        <option value="">Select Book</option>
    `;const{data:t,error:n}=await l.from("books").select("id,name").order("name");if(n){console.error(n),a(saveButton);return}t.forEach(o=>{e.innerHTML+=`
            <option value="${o.id}">
                ${o.name}
            </option>
        `})}async function te(){const e=document.getElementById("category");e.innerHTML=`
        <option value="">Select Category</option>
    `;const{data:t,error:n}=await l.from("categories").select("id,name").order("name");if(n){console.error(n),a(saveButton);return}t.forEach(o=>{e.innerHTML+=`
            <option value="${o.id}">
                ${o.name}
            </option>
        `})}F.addEventListener("click",()=>{P(S,"Deleting..."),u.classList.remove("active"),c=null});S.addEventListener("click",async()=>{if(!c)return;const{error:e}=await l.from("hymns").delete().eq("id",c.id);if(e){i(e.message,"error"),a(saveButton);return}u.classList.remove("active"),i("Hymn deleted successfully.","success"),c=null,await w(),a(saveButton)});u.addEventListener("click",e=>{e.target===u&&(u.classList.remove("active"),c=null)});function P(e,t){e.disabled=!0,e.dataset.originalText=e.textContent,e.textContent=t}function a(e){e.disabled=!1,e.textContent=e.dataset.originalText}function ne(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}async function oe(e){return e.number?e.title_english.trim()?e.title_telugu.trim()?await ae(e.number)?(i("This hymn number already exists.","error"),!1):!0:(i("Telugu title is required.","error"),!1):(i("English title is required.","error"),!1):(i("Hymn number is required.","error"),!1)}async function ae(e){const{data:t}=await l.from("hymns").select("id").eq("number",e).maybeSingle();return!(!t||s&&t.id===s)}
