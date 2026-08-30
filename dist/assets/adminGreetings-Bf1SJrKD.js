import{s as f}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";import{s as K}from"./utils-B1kQYoMr.js";import{l as Q,r as V}from"./auth-BTxupRwK.js";let d=[],l=[],b=null,L=null;const B=50;let i=1,m="active";const M=document.getElementById("greetingModal"),X=document.getElementById("addGreetingButton"),ee=document.getElementById("closeModal"),te=document.getElementById("cancelModal"),k=document.getElementById("greetingForm"),P=document.getElementById("greetingTitle"),$=document.getElementById("senderName"),T=document.getElementById("greetingCategory"),q=document.getElementById("youtubeUrl"),U=document.getElementById("greetingDescription"),D=document.getElementById("thumbnailUrl"),N=document.getElementById("greetingModalTitle"),v=document.getElementById("saveButton"),I=document.getElementById("loadingState"),h=document.getElementById("errorState"),w=document.getElementById("emptyState"),x=document.getElementById("tableContainer"),ne=document.getElementById("greetingsTableBody"),y=document.getElementById("pagination"),F=document.getElementById("prevPage"),j=document.getElementById("nextPage"),re=document.getElementById("pageInfo"),H=document.getElementById("searchInput");function ie(){const e=document.querySelector(".toolbar");if(!e||document.getElementById("greetingStatusFilter"))return;const n=document.createElement("select");n.id="greetingStatusFilter",n.className="search-input",n.style.maxWidth="220px",n.innerHTML=`

        <option value="active">
            Active Greetings
        </option>

        <option value="archived">
            Archived Greetings
        </option>

        <option value="all">
            All Greetings
        </option>

    `,e.appendChild(n),n.addEventListener("change",()=>{m=n.value,R()})}function R(){const e=H.value.trim().toLowerCase();let t=[...d];if(m==="active"?t=t.filter(n=>n.is_active!==!1):m==="archived"&&(t=t.filter(n=>n.is_active===!1)),e&&(t=t.filter(n=>{const u=(n.title||"").toLowerCase(),s=(n.sender_name||"").toLowerCase(),g=(n.category||"").toLowerCase();return u.includes(e)||s.includes(e)||g.includes(e)})),l=t,i=1,l.length===0){W(m==="archived"?"No archived greetings found.":m==="active"?"No active greetings found.":"No greetings found.");return}A()}H.addEventListener("input",R);function r(e,t="success"){try{K(e,t)}catch{console.log(e)}}function E(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function z(){M.classList.add("active")}function Y(){k.reset(),b=null,N.textContent="Add New Greeting",v.textContent="Save Greeting",v.disabled=!1}function G(){M.classList.remove("active"),Y()}X.addEventListener("click",()=>{Y(),z()});ee.addEventListener("click",G);te.addEventListener("click",G);document.addEventListener("keydown",e=>{e.key==="Escape"&&(M.classList.contains("active")&&G(),p.classList.contains("active")&&C())});async function S(){ve();try{const{data:e,error:t}=await f.from("greetings").select("*").order("id",{ascending:!0});if(t)throw t;if(d=e||[],l=[...d],i=1,d.length===0){W("No greetings found.");return}A()}catch(e){console.error("Error loading greetings:",e),O(e?.message||"Unable to load greetings.")}}function se(e){ne.innerHTML=e.map((t,n)=>{const u=d.findIndex(g=>g.id===t.id)+1,s=t.thumbnail_url||"";return`

                        <tr>

                            <td>
                                ${u}
                            </td>


                            <td>

                                ${s?`

                                            <img
                                                src="${E(s)}"
                                                alt="Greeting"
                                                style="
                                                    width:70px;
                                                    height:90px;
                                                    object-fit:cover;
                                                    border-radius:8px;
                                                "
                                            >

                                        `:`

                                            <div
                                                style="
                                                    width:70px;
                                                    height:90px;
                                                    border-radius:8px;
                                                    background:#f1f5f9;
                                                    display:flex;
                                                    align-items:center;
                                                    justify-content:center;
                                                    color:#94a3b8;
                                                "
                                            >
                                                —
                                            </div>

                                        `}

                            </td>


                            <td>

                                ${E(t.title||"-")}

                            </td>


                            <td>

                                ${E(t.sender_name||"-")}

                            </td>


                            <td>

                                ${E(t.category||"-")}

                            </td>


                            <td>

                                ${t.is_active===!1?`

                                            <span
                                                class="status-badge archived"
                                            >
                                                Archived
                                            </span>

                                        `:`

                                            <span
                                                class="status-badge active"
                                            >
                                                Active
                                            </span>

                                        `}

                            </td>


                            <td>


                                <button
                                    type="button"
                                    class="table-btn edit-btn"
                                    data-id="${t.id}"
                                >
                                    Edit
                                </button>


                                ${t.is_active===!1?`

                                            <button
                                                type="button"
                                                class="table-btn restore-btn"
                                                data-id="${t.id}"
                                            >
                                                Restore
                                            </button>

                                        `:`

                                            <button
                                                type="button"
                                                class="table-btn delete-btn"
                                                data-id="${t.id}"
                                            >
                                                Archive
                                            </button>

                                        `}


                            </td>

                        </tr>

                    `}).join(""),ae(),le(),ge(),I.classList.add("hidden"),h.classList.add("hidden"),w.classList.add("hidden"),x.classList.remove("hidden")}function ae(){document.querySelectorAll(".edit-btn").forEach(e=>{e.addEventListener("click",()=>{oe(e.dataset.id)})})}function oe(e){const t=d.find(n=>String(n.id)===String(e));t&&(b=t.id,N.textContent="Edit Greeting",v.textContent="Update Greeting",P.value=t.title||"",$.value=t.sender_name||"",T.value=t.category||"",q.value=t.youtube_url||"",U.value=t.description||"",D.value=t.thumbnail_url||"",z())}k.addEventListener("submit",async e=>{e.preventDefault();const t=P.value.trim(),n=$.value.trim(),u=T.value.trim(),s=q.value.trim(),g=U.value.trim(),Z=D.value.trim();if(!t){r("Please enter a greeting title.","error");return}if(!n){r("Please enter the sender name.","error");return}if(!s){r("Please enter the YouTube Shorts URL.","error");return}v.disabled=!0;try{const a={title:t,sender_name:n,category:u||null,youtube_url:s,description:g||null,thumbnail_url:Z||null,published:!0};let c;if(b?(c=(await f.from("greetings").update(a).eq("id",b)).error,c||r("Greeting updated successfully.","success")):(a.is_active=!0,a.featured=!1,c=(await f.from("greetings").insert(a)).error,c||r("Greeting added successfully.","success")),c)throw c;G(),await S()}catch(a){console.error("Greeting save error:",a),r(a?.message||"Unable to save greeting.","error")}finally{v.disabled=!1}});const p=document.getElementById("confirmModal"),de=document.getElementById("confirmMessage"),ce=document.getElementById("cancelDelete"),o=document.getElementById("confirmDelete");function le(){document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",()=>{ue(e.dataset.id)})})}function ue(e){const t=d.find(n=>String(n.id)===String(e));t&&(L=t,de.textContent=`Are you sure you want to archive "${t.title}"? You can restore it later from Archived Greetings.`,o.textContent="Archive",p.classList.add("active"))}function C(){L=null,p.classList.remove("active")}ce.addEventListener("click",C);p.addEventListener("click",e=>{e.target===p&&C()});o.addEventListener("click",async()=>{if(L&&!o.disabled){o.disabled=!0,o.textContent="Archiving...";try{const e=L.id,{error:t}=await f.from("greetings").update({is_active:!1}).eq("id",e);if(t)throw t;r("Greeting archived successfully.","success"),C(),await S()}catch(e){console.error("Greeting archive error:",e),r(e?.message||"Unable to archive greeting.","error")}finally{o.disabled=!1,o.textContent="Archive"}}});function ge(){document.querySelectorAll(".restore-btn").forEach(e=>{e.addEventListener("click",async()=>{await me(e.dataset.id)})})}async function me(e){try{const{error:t}=await f.from("greetings").update({is_active:!0}).eq("id",e);if(t)throw t;r("Greeting restored successfully.","success"),await S()}catch(t){console.error("Greeting restore error:",t),r(t?.message||"Unable to restore greeting.","error")}}function A(){const e=(i-1)*B,t=e+B,n=l.slice(e,t);se(n),fe()}function fe(){const e=Math.ceil(l.length/B);if(e<=1){y.classList.add("hidden");return}y.classList.remove("hidden"),re.textContent=`Page ${i} of ${e}`,F.disabled=i===1,j.disabled=i===e}F.addEventListener("click",()=>{i<=1||(i--,A())});j.addEventListener("click",()=>{const e=Math.ceil(l.length/B);i>=e||(i++,A())});function ve(){I.classList.remove("hidden"),h.classList.add("hidden"),w.classList.add("hidden"),x.classList.add("hidden"),y.classList.add("hidden")}function O(e){I.classList.add("hidden"),h.classList.remove("hidden"),w.classList.add("hidden"),x.classList.add("hidden"),y.classList.add("hidden");const t=h.querySelector("p");t&&(t.textContent=e||"Something went wrong while loading greetings.")}function W(e="No greetings found."){I.classList.add("hidden"),h.classList.add("hidden"),w.classList.remove("hidden"),x.classList.add("hidden"),y.classList.add("hidden");const t=document.getElementById("emptyMessage");t&&(t.textContent=e)}const _=document.getElementById("logoutButton");_&&_.addEventListener("click",async()=>{try{await Q()}catch(e){console.error("Logout error:",e)}});document.addEventListener("DOMContentLoaded",async()=>{try{await V(),ie(),await S()}catch(e){console.error("Greetings initialization error:",e),O(e?.message||"Unable to initialize Greetings page.")}});
