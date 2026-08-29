import{s}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";import{s as T}from"./utils-B1kQYoMr.js";import{l as nt,r as ot}from"./auth-BTxupRwK.js";let h=[],g=[],y=[],p=null,A=null;const _=50;let i=1;const N=document.getElementById("authorModal"),at=document.getElementById("addAuthorButton"),it=document.getElementById("closeModal"),st=document.getElementById("cancelModal"),H=document.getElementById("authorForm"),k=document.getElementById("authorName"),m=document.getElementById("authorMedia"),R=document.getElementById("authorBio"),D=document.getElementById("authorBirthYear"),$=document.getElementById("authorDeathYear"),z=document.getElementById("authorCountry"),I=document.getElementById("authorPhotoPreview"),w=document.getElementById("authorPhotoPreviewImage"),O=document.getElementById("authorModalTitle"),d=document.getElementById("saveButton"),S=document.getElementById("loadingState"),E=document.getElementById("errorState"),W=document.getElementById("emptyState"),P=document.getElementById("tableContainer"),dt=document.getElementById("authorsTableBody"),b=document.getElementById("pagination"),G=document.getElementById("prevPage"),j=document.getElementById("nextPage"),ct=document.getElementById("pageInfo"),Z=document.getElementById("searchInput");let v="active";function lt(){const t=document.querySelector(".toolbar");if(!t||document.getElementById("authorStatusFilter"))return;const r=document.createElement("select");r.id="authorStatusFilter",r.className="search-input",r.style.maxWidth="220px",r.innerHTML=`
        <option value="active">
            Active Writers
        </option>

        <option value="archived">
            Archived Writers
        </option>

        <option value="all">
            All Writers
        </option>
    `,t.appendChild(r),r.addEventListener("change",()=>{v=r.value,J()})}function J(){const t=Z.value.trim().toLowerCase();let e=[...h];if(v==="active"?e=e.filter(r=>r.is_active!==!1):v==="archived"&&(e=e.filter(r=>r.is_active===!1)),t&&(e=e.filter(r=>(r.name||"").toLowerCase().includes(t))),g=e,i=1,g.length===0){rt(v==="archived"?"No archived Writers found.":v==="active"?"No active Writers found.":"No Writers found.");return}U()}const L=document.getElementById("confirmModal"),ut=document.getElementById("confirmMessage"),ht=document.getElementById("cancelDelete"),u=document.getElementById("confirmDelete");function a(t,e="success"){try{T(t,e)}catch{try{T(t)}catch{console.log(t)}}}function F(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function K(t){return t?y.find(e=>String(e.id)===String(t)):null}function q(t){if(!t)return"";const{data:e}=s.storage.from("media").getPublicUrl(t);return e?.publicUrl||""}function mt(t){if(t?.photo_url)return t.photo_url;const e=K(t?.media_id);return e?.storage_path?q(e.storage_path):""}function Q(){N.classList.add("active")}function V(){H.reset(),p=null,O.textContent="Add New Author",d.textContent="Save Author",d.disabled=!1,I.classList.add("hidden"),w.src=""}function M(){N.classList.remove("active"),V()}at.addEventListener("click",async()=>{V(),await X(),Q()});it.addEventListener("click",M);st.addEventListener("click",M);document.addEventListener("keydown",t=>{t.key==="Escape"&&(N.classList.contains("active")&&M(),L.classList.contains("active")&&x())});async function X(){m.innerHTML=`
        <option value="">
            No Photo
        </option>
    `;try{const{data:t,error:e}=await s.from("media").select("id,file_name,storage_path,file_type").order("created_at",{ascending:!1});if(e)throw e;y=(t||[]).filter(r=>r.file_type?.startsWith("image/")),y.forEach(r=>{const n=document.createElement("option");n.value=r.id,n.textContent=r.file_name,n.dataset.storagePath=r.storage_path,m.appendChild(n)})}catch(t){console.error("Error loading media:",t),y=[],a("Unable to load Writer photos.","error")}}function tt(){const e=m.options[m.selectedIndex]?.dataset?.storagePath;if(!e){I.classList.add("hidden"),w.src="";return}const r=q(e);if(!r){I.classList.add("hidden"),w.src="";return}w.src=r,I.classList.remove("hidden")}m.addEventListener("change",tt);async function C(){Lt();try{const{data:t,error:e}=await s.from("authors").select("*").order("id",{ascending:!0});if(e)throw e;const{data:r,error:n}=await s.from("media").select("id,file_name,storage_path,file_type");if(n)throw n;y=r||[];const{data:c,error:l}=await s.from("hymns").select("author_id");if(l)throw l;const f={};if((c||[]).forEach(o=>{if(!o.author_id)return;const B=String(o.author_id);f[B]=(f[B]||0)+1}),h=(t||[]).map(o=>{const B=mt(o);return{...o,hymnCount:f[String(o.id)]||0,photoUrl:B}}),g=[...h],i=1,h.length===0){rt("No Writers found.");return}U()}catch(t){console.error("Error loading Writers:",t),et(t?.message||"Unable to load Writers.")}}function ft(t){dt.innerHTML=t.map((e,r)=>{const n=h.findIndex(l=>l.id===e.id)+1,c=e.photoUrl;return`
                        <tr>

                            <td>
                                ${n}
                            </td>

                            <td>

                                ${c?`
                                            <img
                                                src="${F(c)}"
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
                                ${F(e.name||"-")}
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
                    `}).join(""),gt(),yt(),It(),S.classList.add("hidden"),E.classList.add("hidden"),W.classList.add("hidden"),P.classList.remove("hidden")}function gt(){document.querySelectorAll(".edit-btn").forEach(t=>{t.addEventListener("click",()=>{vt(t.dataset.id)})})}async function vt(t){const e=h.find(r=>String(r.id)===String(t));e&&(p=e.id,O.textContent="Edit Writer",d.textContent="Update Writer",k.value=e.name||"",R.value=e.bio||"",D.value=e.birth_year??"",$.value=e.death_year??"",z.value=e.country||"",await X(),m.value=e.media_id||"",tt(),Q())}H.addEventListener("submit",async t=>{t.preventDefault();const e=k.value.trim();if(!e){a("Please enter the Writer name.","error"),k.focus();return}if(d.disabled)return;d.disabled=!0;const r=p!==null;d.textContent=r?"Updating...":"Saving...";try{const n=m.value||null,c=K(n);let l=null;c?.storage_path&&(l=q(c.storage_path));const f={name:e,media_id:n,photo_url:l,bio:R.value.trim()||null,birth_year:D.value?Number(D.value):null,death_year:$.value?Number($.value):null,country:z.value.trim()||null};if(r){const{error:o}=await s.from("authors").update(f).eq("id",p);if(o)throw o;a("Writer updated successfully.","success")}else{const{error:o}=await s.from("authors").insert([f]);if(o)throw o;a("Writer added successfully.","success")}M(),await C()}catch(n){console.error("Author save error:",n),n?.code==="42501"||n?.code==="PGRST301"?a("Supabase blocked this operation because of the Writers table RLS policy.","error"):a(n?.message||"Unable to save Writer.","error")}finally{d.disabled=!1,d.textContent=p!==null?"Update Author":"Save Author"}});function yt(){document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",()=>{pt(t.dataset.id)})})}function pt(t){const e=h.find(r=>String(r.id)===String(t));e&&(A=e,ut.textContent=`Are you sure you want to archive "${e.name}"? You can restore this writer later from Archived Writers.`,u.textContent="Archive",L.classList.add("active"))}function x(){A=null,L.classList.remove("active")}ht.addEventListener("click",x);u.addEventListener("click",async()=>{if(A&&!u.disabled){u.disabled=!0,u.textContent="Archiving...";try{const t=A.id,{error:e}=await s.from("authors").update({is_active:!1}).eq("id",t);if(e)throw e;x(),a("Writer archived successfully.","success"),await C()}catch(t){console.error("Writer archive error:",t),a(t?.message||"Unable to archive Writer.","error")}finally{u.disabled=!1,u.textContent="Archive"}}});Z.addEventListener("input",Et);function Et(){J()}function U(){const t=(i-1)*_,e=t+_,r=g.slice(t,e);ft(r),bt()}function bt(){const t=Math.ceil(g.length/_);if(t<=1){b.classList.add("hidden");return}b.classList.remove("hidden"),ct.textContent=`Page ${i} of ${t}`,G.disabled=i===1,j.disabled=i===t}G.addEventListener("click",()=>{i<=1||(i--,U())});j.addEventListener("click",()=>{const t=Math.ceil(g.length/_);i>=t||(i++,U())});function Lt(){S.classList.remove("hidden"),E.classList.add("hidden"),W.classList.add("hidden"),P.classList.add("hidden"),b.classList.add("hidden")}function et(t){S.classList.add("hidden"),E.classList.remove("hidden"),W.classList.add("hidden"),P.classList.add("hidden"),b.classList.add("hidden");const e=E.querySelector("p");e&&(e.textContent=t||"Something went wrong while loading the Writers.")}function rt(t="No Writers found."){S.classList.add("hidden"),E.classList.add("hidden"),W.classList.remove("hidden"),P.classList.add("hidden"),b.classList.add("hidden");const e=document.getElementById("emptyMessage");e&&(e.textContent=t)}L.addEventListener("click",t=>{t.target===L&&x()});const Y=document.getElementById("logoutButton");Y&&Y.addEventListener("click",async()=>{try{await nt()}catch(t){console.error("Logout error:",t)}});document.addEventListener("DOMContentLoaded",async()=>{try{await ot(),lt(),await C()}catch(t){console.error("Writers initialization error:",t),et(t?.message||"Unable to initialize Writers page.")}});async function Bt(t){try{const{error:e}=await s.from("authors").update({is_active:!0}).eq("id",t);if(e)throw e;a("Writer restored successfully.","success"),await C()}catch(e){console.error("Writer restore error:",e),a(e?.message||"Unable to restore Writer.","error")}}function It(){document.querySelectorAll(".restore-btn").forEach(t=>{t.addEventListener("click",async()=>{const e=t.dataset.id;await Bt(e)})})}
