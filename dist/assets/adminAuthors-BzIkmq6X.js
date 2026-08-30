import{s as c}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";import{s as O}from"./utils-B1kQYoMr.js";import{l as st,r as dt}from"./auth-BTxupRwK.js";let f=[],p=[],v=[],L=null,P=null;const M=50;let s=1;const F=document.getElementById("authorModal"),ct=document.getElementById("addAuthorButton"),lt=document.getElementById("closeModal"),ut=document.getElementById("cancelModal"),z=document.getElementById("authorForm"),$=document.getElementById("authorName"),g=document.getElementById("authorMedia"),o=document.getElementById("authorHistoricalMedia"),b=document.getElementById("authorHistoricalPreview"),S=document.getElementById("authorHistoricalPreviewImage"),G=document.getElementById("authorBio"),T=document.getElementById("authorBirthYear"),q=document.getElementById("authorDeathYear"),j=document.getElementById("authorCountry"),_=document.getElementById("authorPhotoPreview"),A=document.getElementById("authorPhotoPreviewImage"),Z=document.getElementById("authorModalTitle"),l=document.getElementById("saveButton"),W=document.getElementById("loadingState"),I=document.getElementById("errorState"),C=document.getElementById("emptyState"),x=document.getElementById("tableContainer"),ht=document.getElementById("authorsTableBody"),B=document.getElementById("pagination"),J=document.getElementById("prevPage"),K=document.getElementById("nextPage"),mt=document.getElementById("pageInfo"),Q=document.getElementById("searchInput");let E="active";function ft(){const t=document.querySelector(".toolbar");if(!t||document.getElementById("authorStatusFilter"))return;const r=document.createElement("select");r.id="authorStatusFilter",r.className="search-input",r.style.maxWidth="220px",r.innerHTML=`
        <option value="active">
            Active Writers
        </option>

        <option value="archived">
            Archived Writers
        </option>

        <option value="all">
            All Writers
        </option>
    `,t.appendChild(r),r.addEventListener("change",()=>{E=r.value,V()})}function V(){const t=Q.value.trim().toLowerCase();let e=[...f];if(E==="active"?e=e.filter(r=>r.is_active!==!1):E==="archived"&&(e=e.filter(r=>r.is_active===!1)),t&&(e=e.filter(r=>(r.name||"").toLowerCase().includes(t))),p=e,s=1,p.length===0){it(E==="archived"?"No archived Writers found.":E==="active"?"No active Writers found.":"No Writers found.");return}N()}const w=document.getElementById("confirmModal"),gt=document.getElementById("confirmMessage"),vt=document.getElementById("cancelDelete"),m=document.getElementById("confirmDelete");function i(t,e="success"){try{O(t,e)}catch{try{O(t)}catch{console.log(t)}}}function R(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function X(t){return t?v.find(e=>String(e.id)===String(t)):null}function U(t){if(!t)return"";const{data:e}=c.storage.from("media").getPublicUrl(t);return e?.publicUrl||""}function pt(t){if(t?.photo_url)return t.photo_url;const e=X(t?.media_id);return e?.storage_path?U(e.storage_path):""}function tt(){F.classList.add("active")}function et(){z.reset(),L=null,Z.textContent="Add New Author",l.textContent="Save Author",l.disabled=!1,_.classList.add("hidden"),A.src=""}o&&(o.value="");b&&b.classList.add("hidden");S&&(S.src="");function k(){F.classList.remove("active"),et()}ct.addEventListener("click",async()=>{et(),await rt(),tt()});lt.addEventListener("click",k);ut.addEventListener("click",k);document.addEventListener("keydown",t=>{t.key==="Escape"&&(F.classList.contains("active")&&k(),w.classList.contains("active")&&H())});async function rt(){g.innerHTML=`
        <option value="">
            No Photo
        </option>
    `;try{const{data:t,error:e}=await c.from("media").select("id,file_name,storage_path,file_type").order("created_at",{ascending:!1});if(e)throw e;v=(t||[]).filter(r=>r.file_type?.startsWith("image/")),v.forEach(r=>{const n=document.createElement("option");n.value=r.id,n.textContent=r.file_name,n.dataset.storagePath=r.storage_path,g.appendChild(n)}),o&&(o.innerHTML=`
        <option value="">
            No Historical Record
        </option>
    `,v.forEach(r=>{const n=document.createElement("option");n.value=r.id,n.textContent=r.file_name,n.dataset.storagePath=r.storage_path,o.appendChild(n)}))}catch(t){console.error("Error loading media:",t),v=[],i("Unable to load Writer photos.","error")}}function nt(){if(!o)return;const e=o.options[o.selectedIndex]?.dataset?.storagePath;if(!e){b.classList.add("hidden"),S.src="";return}const r=U(e);if(!r){b.classList.add("hidden");return}S.src=r,b.classList.remove("hidden")}o&&o.addEventListener("change",nt);function ot(){const e=g.options[g.selectedIndex]?.dataset?.storagePath;if(!e){_.classList.add("hidden"),A.src="";return}const r=U(e);if(!r){_.classList.add("hidden"),A.src="";return}A.src=r,_.classList.remove("hidden")}g.addEventListener("change",ot);async function D(){_t();try{const{data:t,error:e}=await c.from("authors").select("*").order("id",{ascending:!0});if(e)throw e;const{data:r,error:n}=await c.from("media").select("id,file_name,storage_path,file_type");if(n)throw n;v=r||[];const{data:u,error:h}=await c.from("hymns").select("author_id");if(h)throw h;const y={};if((u||[]).forEach(d=>{if(!d.author_id)return;const a=String(d.author_id);y[a]=(y[a]||0)+1}),f=(t||[]).map(d=>{const a=pt(d);return{...d,hymnCount:y[String(d.id)]||0,photoUrl:a}}),p=[...f],s=1,f.length===0){it("No Writers found.");return}N()}catch(t){console.error("Error loading Writers:",t),at(t?.message||"Unable to load Writers.")}}function yt(t){ht.innerHTML=t.map((e,r)=>{const n=f.findIndex(h=>h.id===e.id)+1,u=e.photoUrl;return`
                        <tr>

                            <td>
                                ${n}
                            </td>

                            <td>

                                ${u?`
                                            <img
                                                src="${R(u)}"
                                                alt="Author"
                                                class="author-table-photo"
                                                loading="lazy"
                                            >
                                        `:`
                                            <div class="author-table-placeholder">
                                                —
                                            </div>
                                        `}

                            </td>

                            <td>
                                ${R(e.name||"-")}
                            </td>
                            <td>
    ${e.is_active===!1?`
                <span class="status-badge archived">
                    Archived
                </span>
            `:`
                <span class="status-badge active">
                    Active
                </span>
            `}
</td>

                            <td>
                                ${e.hymnCount}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    class="table-btn edit-btn"
                                    data-id="${e.id}"
                                >
                                    Edit
                                </button>

                                ${e.is_active===!1?`
            <button
                type="button"
                class="table-btn restore-btn"
                data-id="${e.id}"
            >
                Restore
            </button>
        `:`
            <button
                type="button"
                class="table-btn delete-btn"
                data-id="${e.id}"
            >
                Archive
            </button>
        `}

                            </td>

                        </tr>
                    `}).join(""),Et(),bt(),Pt(),W.classList.add("hidden"),I.classList.add("hidden"),C.classList.add("hidden"),x.classList.remove("hidden")}function Et(){document.querySelectorAll(".edit-btn").forEach(t=>{t.addEventListener("click",()=>{Lt(t.dataset.id)})})}async function Lt(t){const e=f.find(r=>String(r.id)===String(t));e&&(L=e.id,Z.textContent="Edit Writer",l.textContent="Update Writer",$.value=e.name||"",G.value=e.bio||"",T.value=e.birth_year??"",q.value=e.death_year??"",j.value=e.country||"",await rt(),g.value=e.media_id||"",ot(),o&&(o.value=e.historical_media_id||"",nt()),tt())}z.addEventListener("submit",async t=>{t.preventDefault();const e=$.value.trim();if(!e){i("Please enter the Writer name.","error"),$.focus();return}if(l.disabled)return;l.disabled=!0;const r=L!==null;l.textContent=r?"Updating...":"Saving...";try{const n=g.value||null,u=X(n);let h=null;u?.storage_path&&(h=U(u.storage_path));const y=o?.value||null,d={name:e,media_id:n,photo_url:h,historical_media_id:y,bio:G.value.trim()||null,birth_year:T.value?Number(T.value):null,death_year:q.value?Number(q.value):null,country:j.value.trim()||null};if(r){const{error:a}=await c.from("authors").update(d).eq("id",L);if(a)throw a;i("Writer updated successfully.","success")}else{const{error:a}=await c.from("authors").insert([d]);if(a)throw a;i("Writer added successfully.","success")}k(),await D()}catch(n){console.error("Author save error:",n),n?.code==="42501"||n?.code==="PGRST301"?i("Supabase blocked this operation because of the Writers table RLS policy.","error"):i(n?.message||"Unable to save Writer.","error")}finally{l.disabled=!1,l.textContent=L!==null?"Update Author":"Save Author"}});function bt(){document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",()=>{It(t.dataset.id)})})}function It(t){const e=f.find(r=>String(r.id)===String(t));e&&(P=e,gt.textContent=`Are you sure you want to archive "${e.name}"? You can restore this writer later from Archived Writers.`,m.textContent="Archive",w.classList.add("active"))}function H(){P=null,w.classList.remove("active")}vt.addEventListener("click",H);m.addEventListener("click",async()=>{if(P&&!m.disabled){m.disabled=!0,m.textContent="Archiving...";try{const t=P.id,{error:e}=await c.from("authors").update({is_active:!1}).eq("id",t);if(e)throw e;H(),i("Writer archived successfully.","success"),await D()}catch(t){console.error("Writer archive error:",t),i(t?.message||"Unable to archive Writer.","error")}finally{m.disabled=!1,m.textContent="Archive"}}});Q.addEventListener("input",Bt);function Bt(){V()}function N(){const t=(s-1)*M,e=t+M,r=p.slice(t,e);yt(r),wt()}function wt(){const t=Math.ceil(p.length/M);if(t<=1){B.classList.add("hidden");return}B.classList.remove("hidden"),mt.textContent=`Page ${s} of ${t}`,J.disabled=s===1,K.disabled=s===t}J.addEventListener("click",()=>{s<=1||(s--,N())});K.addEventListener("click",()=>{const t=Math.ceil(p.length/M);s>=t||(s++,N())});function _t(){W.classList.remove("hidden"),I.classList.add("hidden"),C.classList.add("hidden"),x.classList.add("hidden"),B.classList.add("hidden")}function at(t){W.classList.add("hidden"),I.classList.remove("hidden"),C.classList.add("hidden"),x.classList.add("hidden"),B.classList.add("hidden");const e=I.querySelector("p");e&&(e.textContent=t||"Something went wrong while loading the Writers.")}function it(t="No Writers found."){W.classList.add("hidden"),I.classList.add("hidden"),C.classList.remove("hidden"),x.classList.add("hidden"),B.classList.add("hidden");const e=document.getElementById("emptyMessage");e&&(e.textContent=t)}w.addEventListener("click",t=>{t.target===w&&H()});const Y=document.getElementById("logoutButton");Y&&Y.addEventListener("click",async()=>{try{await st()}catch(t){console.error("Logout error:",t)}});document.addEventListener("DOMContentLoaded",async()=>{try{await dt(),ft(),await D()}catch(t){console.error("Writers initialization error:",t),at(t?.message||"Unable to initialize Writers page.")}});async function At(t){try{const{error:e}=await c.from("authors").update({is_active:!0}).eq("id",t);if(e)throw e;i("Writer restored successfully.","success"),await D()}catch(e){console.error("Writer restore error:",e),i(e?.message||"Unable to restore Writer.","error")}}function Pt(){document.querySelectorAll(".restore-btn").forEach(t=>{t.addEventListener("click",async()=>{const e=t.dataset.id;await At(e)})})}
