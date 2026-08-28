import{s}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-CauTVTzm.js";import{s as d}from"./utils-B1kQYoMr.js";import"./auth-BTxupRwK.js";let L=[],i=[],u=50,r=1,l=null;const E=document.getElementById("hymnModal"),N=document.getElementById("addHymnButton"),A=document.getElementById("closeModal"),U=document.getElementById("cancelModal"),g=document.getElementById("confirmModal"),C=document.getElementById("confirmDelete"),F=document.getElementById("cancelDelete"),z=document.getElementById("confirmMessage"),S=document.getElementById("title_english"),M=document.getElementById("slug");let h=!1;M.addEventListener("input",()=>{h=!0});S.addEventListener("input",()=>{h||(M.value=oe(S.value))});let c=null;function T(){l||(_.reset(),document.getElementById("saveButton").textContent="Save Hymn",h=!1),E.classList.add("active")}function v(){l=null,_.reset(),document.getElementById("saveButton").textContent="Save Hymn",h=!1,E.classList.remove("active")}N.addEventListener("click",T);A.addEventListener("click",v);U.addEventListener("click",v);E.addEventListener("click",e=>{e.target===E&&v()});document.addEventListener("keydown",e=>{e.key==="Escape"&&v()});const _=document.getElementById("hymnForm");_.addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("saveButton"),n=!!l;D(t,n?"Updating...":"Saving...");try{const o={number:Number(document.getElementById("number").value),title_telugu:document.getElementById("title_telugu").value.trim(),title_english:document.getElementById("title_english").value.trim(),author_id:Number(document.getElementById("author").value)||null,book_id:Number(document.getElementById("book").value)||null,category_id:Number(document.getElementById("category").value)||null,language:document.getElementById("language").value,slug:document.getElementById("slug").value.trim(),youtube_links:document.getElementById("youtube_links").value.split(`
`).map(y=>y.trim()).filter(y=>y!==""),is_featured:document.getElementById("featured").checked};if(!await ae(o))return;let m=null;if(n?m=(await s.from("hymns").update(o).eq("id",l)).error:m=(await s.from("hymns").insert([o])).error,m)throw m;d(n?"Hymn updated successfully.":"Hymn added successfully.","success"),v(),await w()}catch(o){console.error("Hymn save error:",o),d(o.message||"Unable to save hymn.","error")}finally{a(t)}});const B=document.getElementById("loadingState"),p=document.getElementById("errorState"),b=document.getElementById("emptyState"),I=document.getElementById("tableContainer"),j=document.getElementById("hymnsTableBody"),H=document.getElementById("pagination"),$=document.getElementById("prevPage"),x=document.getElementById("nextPage"),G=document.getElementById("pageInfo");document.addEventListener("DOMContentLoaded",async()=>{await O(),await ee(),await te(),await ne(),await w(),a(saveButton)});async function O(){try{const{data:e,error:t}=await s.from("cms_settings").select("items_per_page").eq("id",1).single();if(t)throw t;u=Number(e.items_per_page)||50,console.log("Items per page:",u)}catch(e){console.error("Failed to load page size:",e),u=50}}async function w(){V();try{const{data:e,error:t}=await s.from("hymns").select(`
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
`).order("number",{ascending:!0});if(t)throw t;if(!e||e.length===0){P(),a(saveButton);return}L=e,i=[...e],f()}catch(e){console.error(e),W()}}function Z(e){j.innerHTML=e.map(t=>`

        <tr>

            <td>${t.number}</td>

            <td>${t.title_telugu??"-"}</td>

            <td>${t.title_english??"-"}</td>

            <td>${t.authors?.name??"Unknown"}</td>

            <td>${X(t.language)}</td>

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

    `).join(""),J(),Q(),B.classList.add("hidden"),p.classList.add("hidden"),b.classList.add("hidden"),I.classList.remove("hidden")}function J(){document.querySelectorAll(".edit-btn").forEach(e=>{e.addEventListener("click",()=>{K(e.dataset.number)})})}async function K(e){const{data:t,error:n}=await s.from("hymns").select("*").eq("number",e).single();if(n){console.error(n),a(saveButton);return}l=t.id,console.log("Loaded hymn:",t),console.log("Editing hymn id:",l),document.getElementById("number").value=t.number,document.getElementById("title_telugu").value=t.title_telugu??"",document.getElementById("title_english").value=t.title_english??"",document.getElementById("author").value=t.author_id??"",document.getElementById("book").value=t.book_id??"",document.getElementById("category").value=t.category_id??"",document.getElementById("language").value=t.language??"telugu",document.getElementById("slug").value=t.slug??"",document.getElementById("youtube_links").value=(t.youtube_links||[]).join(`
`),document.getElementById("featured").checked=t.is_featured??!1,document.getElementById("saveButton").textContent="Update Hymn",T()}function Q(){document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",()=>{c={id:e.dataset.id,number:e.dataset.number},z.textContent=`Are you sure you want to delete Hymn #${c.number}? This action cannot be undone.`,g.classList.add("active")})})}function f(){const e=(r-1)*u,t=e+u,n=i.slice(e,t);Z(n),R()}function R(){const e=Math.ceil(i.length/u);if(e<=1){H.classList.add("hidden"),a(saveButton);return}H.classList.remove("hidden"),G.textContent=`Page ${r} of ${e}`,$.disabled=r===1,x.disabled=r===e}function V(){B.classList.remove("hidden"),p.classList.add("hidden"),b.classList.add("hidden"),I.classList.add("hidden")}function W(){B.classList.add("hidden"),p.classList.remove("hidden"),b.classList.add("hidden"),I.classList.add("hidden")}function P(e="No hymns found."){document.getElementById("emptyMessage").textContent=e,B.classList.add("hidden"),p.classList.add("hidden"),b.classList.remove("hidden"),I.classList.add("hidden")}function X(e){return e?e.charAt(0).toUpperCase()+e.slice(1):"-"}const q=document.getElementById("searchInput");q.addEventListener("input",Y);function Y(){const e=q.value.trim().toLowerCase();if(!e){i=[...L],r=1,f(),a(saveButton);return}if(i=L.filter(t=>{const n=String(t.number),o=(t.title_telugu||"").toLowerCase(),k=(t.title_english||"").toLowerCase(),m=(t.authors?.name||"").toLowerCase();return n.includes(e)||o.includes(e)||k.includes(e)||m.includes(e)}),i.length===0){P("No hymns match your search."),a(saveButton);return}f()}$.addEventListener("click",()=>{r>1&&(r--,f())});x.addEventListener("click",()=>{const e=Math.ceil(i.length/u);r<e&&(r++,f())});async function ee(){const e=document.getElementById("author");e.innerHTML=`
        <option value="">Select Author</option>
    `;const{data:t,error:n}=await s.from("authors").select("id,name").order("name");if(n){console.error(n),a(saveButton);return}t.forEach(o=>{e.innerHTML+=`

            <option value="${o.id}">

                ${o.name}

            </option>

        `})}async function te(){const e=document.getElementById("book");e.innerHTML=`
        <option value="">Select Book</option>
    `;const{data:t,error:n}=await s.from("books").select("id,name").order("name");if(n){console.error(n),a(saveButton);return}t.forEach(o=>{e.innerHTML+=`
            <option value="${o.id}">
                ${o.name}
            </option>
        `})}async function ne(){const e=document.getElementById("category");e.innerHTML=`
        <option value="">Select Category</option>
    `;const{data:t,error:n}=await s.from("categories").select("id,name").order("name");if(n){console.error(n),a(saveButton);return}t.forEach(o=>{e.innerHTML+=`
            <option value="${o.id}">
                ${o.name}
            </option>
        `})}F.addEventListener("click",()=>{D(C,"Deleting..."),g.classList.remove("active"),c=null});C.addEventListener("click",async()=>{if(!c)return;const{error:e}=await s.from("hymns").delete().eq("id",c.id);if(e){d(e.message,"error"),a(saveButton);return}g.classList.remove("active"),d("Hymn deleted successfully.","success"),c=null,await w(),a(saveButton)});g.addEventListener("click",e=>{e.target===g&&(g.classList.remove("active"),c=null)});function D(e,t){e.disabled=!0,e.dataset.originalText=e.textContent,e.textContent=t}function a(e){e.disabled=!1,e.textContent=e.dataset.originalText||"Save Hymn"}function oe(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}async function ae(e){return e.number?e.title_english.trim()?e.title_telugu.trim()?await se(e.number)?(d("This hymn number already exists.","error"),!1):!0:(d("Telugu title is required.","error"),!1):(d("English title is required.","error"),!1):(d("Hymn number is required.","error"),!1)}async function se(e){const{data:t}=await s.from("hymns").select("id").eq("number",e).maybeSingle();return!(!t||l&&t.id===l)}
