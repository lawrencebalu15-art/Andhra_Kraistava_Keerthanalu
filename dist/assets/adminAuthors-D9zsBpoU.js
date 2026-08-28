import{s as i}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-CauTVTzm.js";import{s as $}from"./utils-B1kQYoMr.js";import{l as V,r as X}from"./auth-BTxupRwK.js";let c=[],h=[],y=[],p=null,M=null;const S=50;let r=1;const E=document.getElementById("authorModal"),Y=document.getElementById("addAuthorButton"),tt=document.getElementById("closeModal"),et=document.getElementById("cancelModal"),z=document.getElementById("authorForm"),U=document.getElementById("authorName"),m=document.getElementById("authorMedia"),A=document.getElementById("authorPhotoPreview"),P=document.getElementById("authorPhotoPreviewImage"),F=document.getElementById("authorModalTitle"),d=document.getElementById("saveButton"),_=document.getElementById("loadingState"),v=document.getElementById("errorState"),C=document.getElementById("emptyState"),x=document.getElementById("tableContainer"),nt=document.getElementById("authorsTableBody"),L=document.getElementById("pagination"),H=document.getElementById("prevPage"),O=document.getElementById("nextPage"),ot=document.getElementById("pageInfo"),G=document.getElementById("searchInput"),b=document.getElementById("confirmModal"),at=document.getElementById("confirmMessage"),rt=document.getElementById("cancelDelete"),g=document.getElementById("confirmDelete");function s(t,e="success"){try{$(t,e)}catch{try{$(t)}catch{console.log(t)}}}function q(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function R(t){return t?y.find(e=>String(e.id)===String(t)):null}function k(t){if(!t)return"";const{data:e}=i.storage.from("media").getPublicUrl(t);return e?.publicUrl||""}function dt(t){if(t?.photo_url)return t.photo_url;const e=R(t?.media_id);return e?.storage_path?k(e.storage_path):""}function j(){E.classList.add("active")}function W(){z.reset(),p=null,F.textContent="Add New Author",d.textContent="Save Author",d.disabled=!1,A.classList.add("hidden"),P.src=""}function w(){E.classList.remove("active"),W()}Y.addEventListener("click",async()=>{W(),await Z(),j()});tt.addEventListener("click",w);et.addEventListener("click",w);E.addEventListener("click",t=>{t.target===E&&w()});document.addEventListener("keydown",t=>{t.key==="Escape"&&(E.classList.contains("active")&&w(),b.classList.contains("active")&&D())});async function Z(){m.innerHTML=`
        <option value="">
            No Photo
        </option>
    `;try{const{data:t,error:e}=await i.from("media").select("id,file_name,storage_path,file_type").order("created_at",{ascending:!1});if(e)throw e;y=(t||[]).filter(n=>n.file_type?.startsWith("image/")),y.forEach(n=>{const o=document.createElement("option");o.value=n.id,o.textContent=n.file_name,o.dataset.storagePath=n.storage_path,m.appendChild(o)})}catch(t){console.error("Error loading media:",t),y=[],s("Unable to load author photos.","error")}}function J(){const e=m.options[m.selectedIndex]?.dataset?.storagePath;if(!e){A.classList.add("hidden"),P.src="";return}const n=k(e);if(!n){A.classList.add("hidden"),P.src="";return}P.src=n,A.classList.remove("hidden")}m.addEventListener("change",J);async function T(){ft();try{const{data:t,error:e}=await i.from("authors").select("*").order("id",{ascending:!0});if(e)throw e;const{data:n,error:o}=await i.from("media").select("id,file_name,storage_path,file_type");if(o)throw o;y=n||[];const{data:l,error:u}=await i.from("hymns").select("author_id");if(u)throw u;const f={};if((l||[]).forEach(a=>{if(!a.author_id)return;const B=String(a.author_id);f[B]=(f[B]||0)+1}),c=(t||[]).map(a=>{const B=dt(a);return{...a,hymnCount:f[String(a.id)]||0,photoUrl:B}}),h=[...c],r=1,c.length===0){Q("No authors found.");return}I()}catch(t){console.error("Error loading authors:",t),K(t?.message||"Unable to load authors.")}}function st(t){nt.innerHTML=t.map((e,n)=>{const o=c.findIndex(u=>u.id===e.id)+1,l=e.photoUrl;return`
                        <tr>

                            <td>
                                ${o}
                            </td>

                            <td>

                                ${l?`
                                            <img
                                                src="${q(l)}"
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
                                ${q(e.name||"-")}
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
                    `}).join(""),it(),lt(),_.classList.add("hidden"),v.classList.add("hidden"),C.classList.add("hidden"),x.classList.remove("hidden")}function it(){document.querySelectorAll(".edit-btn").forEach(t=>{t.addEventListener("click",()=>{ct(t.dataset.id)})})}async function ct(t){const e=c.find(n=>String(n.id)===String(t));e&&(p=e.id,F.textContent="Edit Author",d.textContent="Update Author",U.value=e.name||"",await Z(),m.value=e.media_id||"",J(),j())}z.addEventListener("submit",async t=>{t.preventDefault();const e=U.value.trim();if(!e){s("Please enter an author name.","error"),U.focus();return}if(d.disabled)return;d.disabled=!0;const n=p!==null;d.textContent=n?"Updating...":"Saving...";try{const o=m.value||null,l=R(o);let u=null;l?.storage_path&&(u=k(l.storage_path));const f={name:e,media_id:o,photo_url:u};if(n){const{error:a}=await i.from("authors").update(f).eq("id",p);if(a)throw a;s("Author updated successfully.","success")}else{const{error:a}=await i.from("authors").insert([f]);if(a)throw a;s("Author added successfully.","success")}w(),await T()}catch(o){console.error("Author save error:",o),o?.code==="42501"||o?.code==="PGRST301"?s("Supabase blocked this operation because of the authors table RLS policy.","error"):s(o?.message||"Unable to save author.","error")}finally{d.disabled=!1,d.textContent=p!==null?"Update Author":"Save Author"}});function lt(){document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",()=>{ut(t.dataset.id)})})}function ut(t){const e=c.find(n=>String(n.id)===String(t));e&&(M=e,at.textContent=`Are you sure you want to delete "${e.name}"? This action cannot be undone.`,b.classList.add("active"))}function D(){M=null,b.classList.remove("active")}rt.addEventListener("click",D);g.addEventListener("click",async()=>{if(M&&!g.disabled){g.disabled=!0,g.textContent="Deleting...";try{const t=M.id,{error:e}=await i.from("authors").delete().eq("id",t);if(e)throw e;D(),s("Author deleted successfully.","success"),await T()}catch(t){console.error("Author delete error:",t),s(t?.message||"Unable to delete author. Make sure the author is not being used by any hymns.","error")}finally{g.disabled=!1,g.textContent="Delete"}}});G.addEventListener("input",ht);function ht(){const t=G.value.trim().toLowerCase();if(!t){h=[...c],r=1,I();return}if(h=c.filter(e=>(e.name||"").toLowerCase().includes(t)),r=1,h.length===0){Q("No authors match your search.");return}I()}function I(){const t=(r-1)*S,e=t+S,n=h.slice(t,e);st(n),mt()}function mt(){const t=Math.ceil(h.length/S);if(t<=1){L.classList.add("hidden");return}L.classList.remove("hidden"),ot.textContent=`Page ${r} of ${t}`,H.disabled=r===1,O.disabled=r===t}H.addEventListener("click",()=>{r<=1||(r--,I())});O.addEventListener("click",()=>{const t=Math.ceil(h.length/S);r>=t||(r++,I())});function ft(){_.classList.remove("hidden"),v.classList.add("hidden"),C.classList.add("hidden"),x.classList.add("hidden"),L.classList.add("hidden")}function K(t){_.classList.add("hidden"),v.classList.remove("hidden"),C.classList.add("hidden"),x.classList.add("hidden"),L.classList.add("hidden");const e=v.querySelector("p");e&&(e.textContent=t||"Something went wrong while loading the authors.")}function Q(t="No authors found."){_.classList.add("hidden"),v.classList.add("hidden"),C.classList.remove("hidden"),x.classList.add("hidden"),L.classList.add("hidden");const e=document.getElementById("emptyMessage");e&&(e.textContent=t)}b.addEventListener("click",t=>{t.target===b&&D()});const N=document.getElementById("logoutButton");N&&N.addEventListener("click",async()=>{try{await V()}catch(t){console.error("Logout error:",t)}});document.addEventListener("DOMContentLoaded",async()=>{try{await X(),await T()}catch(t){console.error("Authors initialization error:",t),K(t?.message||"Unable to initialize Authors page.")}});
