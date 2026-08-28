import{s as i}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-CauTVTzm.js";import{s as q}from"./utils-B1kQYoMr.js";import{l as et,r as nt}from"./auth-BTxupRwK.js";let c=[],h=[],y=[],p=null,M=null;const _=50;let r=1;const E=document.getElementById("authorModal"),ot=document.getElementById("addAuthorButton"),at=document.getElementById("closeModal"),rt=document.getElementById("cancelModal"),F=document.getElementById("authorForm"),U=document.getElementById("authorName"),m=document.getElementById("authorMedia"),H=document.getElementById("authorBio"),k=document.getElementById("authorBirthYear"),T=document.getElementById("authorDeathYear"),O=document.getElementById("authorCountry"),A=document.getElementById("authorPhotoPreview"),P=document.getElementById("authorPhotoPreviewImage"),G=document.getElementById("authorModalTitle"),d=document.getElementById("saveButton"),S=document.getElementById("loadingState"),v=document.getElementById("errorState"),C=document.getElementById("emptyState"),x=document.getElementById("tableContainer"),dt=document.getElementById("authorsTableBody"),L=document.getElementById("pagination"),R=document.getElementById("prevPage"),j=document.getElementById("nextPage"),st=document.getElementById("pageInfo"),W=document.getElementById("searchInput"),b=document.getElementById("confirmModal"),it=document.getElementById("confirmMessage"),ct=document.getElementById("cancelDelete"),f=document.getElementById("confirmDelete");function s(t,e="success"){try{q(t,e)}catch{try{q(t)}catch{console.log(t)}}}function Y(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Z(t){return t?y.find(e=>String(e.id)===String(t)):null}function $(t){if(!t)return"";const{data:e}=i.storage.from("media").getPublicUrl(t);return e?.publicUrl||""}function lt(t){if(t?.photo_url)return t.photo_url;const e=Z(t?.media_id);return e?.storage_path?$(e.storage_path):""}function J(){E.classList.add("active")}function K(){F.reset(),p=null,G.textContent="Add New Author",d.textContent="Save Author",d.disabled=!1,A.classList.add("hidden"),P.src=""}function I(){E.classList.remove("active"),K()}ot.addEventListener("click",async()=>{K(),await Q(),J()});at.addEventListener("click",I);rt.addEventListener("click",I);E.addEventListener("click",t=>{t.target===E&&I()});document.addEventListener("keydown",t=>{t.key==="Escape"&&(E.classList.contains("active")&&I(),b.classList.contains("active")&&D())});async function Q(){m.innerHTML=`
        <option value="">
            No Photo
        </option>
    `;try{const{data:t,error:e}=await i.from("media").select("id,file_name,storage_path,file_type").order("created_at",{ascending:!1});if(e)throw e;y=(t||[]).filter(n=>n.file_type?.startsWith("image/")),y.forEach(n=>{const o=document.createElement("option");o.value=n.id,o.textContent=n.file_name,o.dataset.storagePath=n.storage_path,m.appendChild(o)})}catch(t){console.error("Error loading media:",t),y=[],s("Unable to load author photos.","error")}}function V(){const e=m.options[m.selectedIndex]?.dataset?.storagePath;if(!e){A.classList.add("hidden"),P.src="";return}const n=$(e);if(!n){A.classList.add("hidden"),P.src="";return}P.src=n,A.classList.remove("hidden")}m.addEventListener("change",V);async function N(){Et();try{const{data:t,error:e}=await i.from("authors").select("*").order("id",{ascending:!0});if(e)throw e;const{data:n,error:o}=await i.from("media").select("id,file_name,storage_path,file_type");if(o)throw o;y=n||[];const{data:l,error:u}=await i.from("hymns").select("author_id");if(u)throw u;const g={};if((l||[]).forEach(a=>{if(!a.author_id)return;const w=String(a.author_id);g[w]=(g[w]||0)+1}),c=(t||[]).map(a=>{const w=lt(a);return{...a,hymnCount:g[String(a.id)]||0,photoUrl:w}}),h=[...c],r=1,c.length===0){tt("No authors found.");return}B()}catch(t){console.error("Error loading authors:",t),X(t?.message||"Unable to load authors.")}}function ut(t){dt.innerHTML=t.map((e,n)=>{const o=c.findIndex(u=>u.id===e.id)+1,l=e.photoUrl;return`
                        <tr>

                            <td>
                                ${o}
                            </td>

                            <td>

                                ${l?`
                                            <img
                                                src="${Y(l)}"
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
                                ${Y(e.name||"-")}
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

                                <button
                                    type="button"
                                    class="table-btn delete-btn"
                                    data-id="${e.id}"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    `}).join(""),ht(),gt(),S.classList.add("hidden"),v.classList.add("hidden"),C.classList.add("hidden"),x.classList.remove("hidden")}function ht(){document.querySelectorAll(".edit-btn").forEach(t=>{t.addEventListener("click",()=>{mt(t.dataset.id)})})}async function mt(t){const e=c.find(n=>String(n.id)===String(t));e&&(p=e.id,G.textContent="Edit Author",d.textContent="Update Author",U.value=e.name||"",H.value=e.bio||"",k.value=e.birth_year??"",T.value=e.death_year??"",O.value=e.country||"",await Q(),m.value=e.media_id||"",V(),J())}F.addEventListener("submit",async t=>{t.preventDefault();const e=U.value.trim();if(!e){s("Please enter an author name.","error"),U.focus();return}if(d.disabled)return;d.disabled=!0;const n=p!==null;d.textContent=n?"Updating...":"Saving...";try{const o=m.value||null,l=Z(o);let u=null;l?.storage_path&&(u=$(l.storage_path));const g={name:e,media_id:o,photo_url:u,bio:H.value.trim()||null,birth_year:k.value?Number(k.value):null,death_year:T.value?Number(T.value):null,country:O.value.trim()||null};if(n){const{error:a}=await i.from("authors").update(g).eq("id",p);if(a)throw a;s("Author updated successfully.","success")}else{const{error:a}=await i.from("authors").insert([g]);if(a)throw a;s("Author added successfully.","success")}I(),await N()}catch(o){console.error("Author save error:",o),o?.code==="42501"||o?.code==="PGRST301"?s("Supabase blocked this operation because of the authors table RLS policy.","error"):s(o?.message||"Unable to save author.","error")}finally{d.disabled=!1,d.textContent=p!==null?"Update Author":"Save Author"}});function gt(){document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",()=>{ft(t.dataset.id)})})}function ft(t){const e=c.find(n=>String(n.id)===String(t));e&&(M=e,it.textContent=`Are you sure you want to delete "${e.name}"? This action cannot be undone.`,b.classList.add("active"))}function D(){M=null,b.classList.remove("active")}ct.addEventListener("click",D);f.addEventListener("click",async()=>{if(M&&!f.disabled){f.disabled=!0,f.textContent="Deleting...";try{const t=M.id,{error:e}=await i.from("authors").delete().eq("id",t);if(e)throw e;D(),s("Author deleted successfully.","success"),await N()}catch(t){console.error("Author delete error:",t),s(t?.message||"Unable to delete author. Make sure the author is not being used by any hymns.","error")}finally{f.disabled=!1,f.textContent="Delete"}}});W.addEventListener("input",yt);function yt(){const t=W.value.trim().toLowerCase();if(!t){h=[...c],r=1,B();return}if(h=c.filter(e=>(e.name||"").toLowerCase().includes(t)),r=1,h.length===0){tt("No authors match your search.");return}B()}function B(){const t=(r-1)*_,e=t+_,n=h.slice(t,e);ut(n),pt()}function pt(){const t=Math.ceil(h.length/_);if(t<=1){L.classList.add("hidden");return}L.classList.remove("hidden"),st.textContent=`Page ${r} of ${t}`,R.disabled=r===1,j.disabled=r===t}R.addEventListener("click",()=>{r<=1||(r--,B())});j.addEventListener("click",()=>{const t=Math.ceil(h.length/_);r>=t||(r++,B())});function Et(){S.classList.remove("hidden"),v.classList.add("hidden"),C.classList.add("hidden"),x.classList.add("hidden"),L.classList.add("hidden")}function X(t){S.classList.add("hidden"),v.classList.remove("hidden"),C.classList.add("hidden"),x.classList.add("hidden"),L.classList.add("hidden");const e=v.querySelector("p");e&&(e.textContent=t||"Something went wrong while loading the authors.")}function tt(t="No authors found."){S.classList.add("hidden"),v.classList.add("hidden"),C.classList.remove("hidden"),x.classList.add("hidden"),L.classList.add("hidden");const e=document.getElementById("emptyMessage");e&&(e.textContent=t)}b.addEventListener("click",t=>{t.target===b&&D()});const z=document.getElementById("logoutButton");z&&z.addEventListener("click",async()=>{try{await et()}catch(t){console.error("Logout error:",t)}});document.addEventListener("DOMContentLoaded",async()=>{try{await nt(),await N()}catch(t){console.error("Authors initialization error:",t),X(t?.message||"Unable to initialize Authors page.")}});
