import{s as l}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";import{s as z}from"./utils-B1kQYoMr.js";import{l as le,r as ue}from"./auth-BTxupRwK.js";let c=[],u=[],p=[],v=[],y=null,M=null;const P=20;let i=1;const N=document.getElementById("interviewModal"),me=document.getElementById("addInterviewButton"),ge=document.getElementById("closeModal"),fe=document.getElementById("cancelModal"),j=document.getElementById("interviewForm"),$=document.getElementById("interviewTitle"),o=document.getElementById("interviewAuthor"),H=document.getElementById("category"),W=document.getElementById("description"),m=document.getElementById("interviewMedia"),Z=document.getElementById("youtubeUrl"),q=document.getElementById("featured"),O=document.getElementById("published"),B=document.getElementById("interviewPhotoPreview"),S=document.getElementById("interviewPhotoPreviewImage"),J=document.getElementById("interviewModalTitle"),d=document.getElementById("saveButton"),_=document.getElementById("loadingState"),w=document.getElementById("errorState"),C=document.getElementById("emptyState"),G=document.getElementById("emptyMessage"),T=document.getElementById("tableContainer"),ve=document.getElementById("interviewsTableBody"),E=document.getElementById("pagination"),K=document.getElementById("prevPage"),Q=document.getElementById("nextPage"),he=document.getElementById("pageInfo"),X=document.getElementById("searchInput"),I=document.getElementById("confirmModal"),pe=document.getElementById("confirmMessage"),ye=document.getElementById("cancelDelete"),f=document.getElementById("confirmDelete");function r(e,t="success"){try{z(e,t)}catch{try{z(e)}catch{console.log(e)}}}function b(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function we(e){return e?p.find(t=>String(t.id)===String(e)):null}function ee(e){if(!e)return"";const{data:t}=l.storage.from("media").getPublicUrl(e);return t?.publicUrl||""}function Ee(e){if(!e?.media_id)return"";const t=we(e.media_id);return t?.storage_path?ee(t.storage_path):""}function te(){N.classList.add("active")}function U(){N.classList.remove("active"),ne()}function ne(){j.reset(),y=null,J.textContent="Add New Interview",d.textContent="Save Interview",d.disabled=!1,o.value="",H.value="Interview",q.value="false",O.value="true",B.classList.add("hidden"),S.src=""}me.addEventListener("click",async()=>{ne(),await Promise.all([R(),ae()]),te()});ge.addEventListener("click",U);fe.addEventListener("click",U);document.addEventListener("keydown",e=>{e.key==="Escape"&&(N.classList.contains("active")&&U(),I.classList.contains("active")&&x())});async function ae(){m.innerHTML=`
        <option value="">
            No Thumbnail
        </option>
    `;try{const{data:e,error:t}=await l.from("media").select("id,file_name,storage_path,file_type").order("created_at",{ascending:!1});if(t)throw t;p=(e||[]).filter(n=>n.file_type?.startsWith("image/")),p.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.file_name,a.dataset.storagePath=n.storage_path,m.appendChild(a)})}catch(e){console.error("Error loading media:",e),p=[],r("Unable to load media.","error")}}function ie(){const t=m.options[m.selectedIndex]?.dataset?.storagePath;if(!t){B.classList.add("hidden"),S.src="";return}const n=ee(t);if(!n){B.classList.add("hidden"),S.src="";return}S.src=n,B.classList.remove("hidden")}m.addEventListener("change",ie);async function R(){if(o){o.innerHTML=`
        <option value="">Loading authors...</option>
    `;try{const{data:e,error:t}=await l.from("authors").select("id,name,is_active").eq("is_active",!0).order("name",{ascending:!0});if(t)throw t;v=e||[],o.innerHTML=`
            <option value="">Select an author</option>
        `,v.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name||`Author #${n.id}`,o.appendChild(a)}),v.length||(o.innerHTML=`
                <option value="">No active authors found</option>
            `)}catch(e){console.error("Error loading authors:",e),v=[],o.innerHTML=`
            <option value="">Unable to load authors</option>
        `,r("Unable to load authors.","error")}}}function oe(e){return e&&v.find(n=>String(n.id)===String(e))?.name||""}async function V(){_e();try{const{data:e,error:t}=await l.from("interviews").select("*").order("created_at",{ascending:!1});if(t)throw t;c=e||[];const{data:n,error:a}=await l.from("media").select("id,file_name,storage_path,file_type");if(a)throw a;if(p=n||[],u=[...c],i=1,c.length===0){se("No interviews found.");return}L()}catch(e){console.error("Error loading interviews:",e),re(e?.message||"Unable to load interviews.")}}function Ie(e){ve.innerHTML=e.map((t,n)=>{const a=c.findIndex(k=>k.id===t.id)+1,g=Ee(t),D=t.featured?`
                                <span class="status-badge success">
                                    Yes
                                </span>
                              `:`
                                <span class="status-badge">
                                    No
                                </span>
                              `,A=t.published?`
                                <span class="status-badge success">
                                    Published
                                </span>
                              `:`
                                <span class="status-badge warning">
                                    Draft
                                </span>
                              `;return`

                        <tr>


                            <!-- NUMBER -->

                            <td>
                                ${a}
                            </td>


                            <!-- THUMBNAIL -->

                            <td>

                                ${g?`

                                            <img
                                                src="${b(g)}"
                                                alt="Interview"
                                                class="author-table-photo"
                                                loading="lazy">

                                          `:`

                                            <div class="author-table-placeholder">
                                                —
                                            </div>

                                          `}

                            </td>


                            <!-- TITLE -->

                            <td>

                                <strong>
                                    ${b(t.title)}
                                </strong>

                            </td>


                            <!-- AUTHOR -->

                            <td>

                                ${b(oe(t.author_id)||t.interviewee||"-")}

                            </td>


                            <!-- CATEGORY -->

                            <td>

                                ${b(t.category||"Interview")}

                            </td>


                            <!-- FEATURED -->

                            <td>

                                ${D}

                            </td>


                            <!-- PUBLISHED -->

                            <td>

                                ${A}

                            </td>


                            <!-- ACTIONS -->

                            <td>

                                <button
                                    type="button"
                                    class="table-btn edit-btn"
                                    data-id="${t.id}">

                                    Edit

                                </button>


                                <button
                                    type="button"
                                    class="table-btn delete-btn"
                                    data-id="${t.id}">

                                    Delete

                                </button>

                            </td>


                        </tr>

                    `}).join(""),Le(),Be(),_.classList.add("hidden"),w.classList.add("hidden"),C.classList.add("hidden"),T.classList.remove("hidden")}function Le(){document.querySelectorAll(".edit-btn").forEach(e=>{e.addEventListener("click",()=>{be(e.dataset.id)})})}async function be(e){const t=c.find(n=>String(n.id)===String(e));t&&(y=t.id,J.textContent="Edit Interview",d.textContent="Update Interview",$.value=t.title||"",await R(),o.value=t.author_id||"",H.value=t.category||"Interview",W.value=t.description||"",Z.value=t.youtube_url||"",q.value=t.featured?"true":"false",O.value=t.published?"true":"false",await ae(),m.value=t.media_id||"",ie(),te())}j.addEventListener("submit",async e=>{e.preventDefault();const t=$.value.trim(),n=o.value||null,a=v.find(s=>String(s.id)===String(n)),g=H.value.trim()||"Interview",D=W.value.trim(),A=Z.value.trim(),k=m.value||null,de=q.value==="true",ce=O.value==="true";if(!t){r("Please enter an interview title.","error"),$.focus();return}if(!n){r("Please select an author.","error"),o.focus();return}if(d.disabled)return;d.disabled=!0;const F=y!==null;d.textContent=F?"Updating...":"Saving...";try{const s={title:t,description:D||null,category:g,author_id:n,interviewee:a?.name||null,media_id:k,youtube_url:A||null,featured:de,published:ce};if(F){const{error:h}=await l.from("interviews").update({...s,updated_at:new Date().toISOString()}).eq("id",y);if(h)throw h;r("Interview updated successfully.","success")}else{const{error:h}=await l.from("interviews").insert([s]);if(h)throw h;r("Interview added successfully.","success")}U(),await V()}catch(s){console.error("Interview save error:",s),s?.code==="42501"||s?.code==="PGRST301"?r("Supabase blocked this operation because of the interviews table RLS policy.","error"):r(s?.message||"Unable to save interview.","error")}finally{d.disabled=!1,d.textContent=y!==null?"Update Interview":"Save Interview"}});function Be(){document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",()=>{Se(e.dataset.id)})})}function Se(e){const t=c.find(n=>String(n.id)===String(e));t&&(M=t,pe.textContent=`Are you sure you want to delete "${t.title}"? This action cannot be undone.`,I.classList.add("active"))}function x(){M=null,I.classList.remove("active")}ye.addEventListener("click",x);f.addEventListener("click",async()=>{if(M&&!f.disabled){f.disabled=!0,f.textContent="Deleting...";try{const e=M.id,{error:t}=await l.from("interviews").delete().eq("id",e);if(t)throw t;x(),r("Interview deleted successfully.","success"),await V()}catch(e){console.error("Interview delete error:",e),r(e?.message||"Unable to delete interview.","error")}finally{f.disabled=!1,f.textContent="Delete"}}});X.addEventListener("input",Me);function Me(){const e=X.value.trim().toLowerCase();if(!e){u=[...c],i=1,L();return}if(u=c.filter(t=>{const n=(t.title||"").toLowerCase(),a=(oe(t.author_id)||t.interviewee||"").toLowerCase(),g=(t.category||"").toLowerCase();return n.includes(e)||a.includes(e)||g.includes(e)}),i=1,u.length===0){se("No interviews match your search.");return}L()}function L(){const e=(i-1)*P,t=e+P,n=u.slice(e,t);Ie(n),Pe()}function Pe(){const e=Math.ceil(u.length/P);if(e<=1){E.classList.add("hidden");return}E.classList.remove("hidden"),he.textContent=`Page ${i} of ${e}`,K.disabled=i===1,Q.disabled=i===e}K.addEventListener("click",()=>{i<=1||(i--,L())});Q.addEventListener("click",()=>{const e=Math.ceil(u.length/P);i>=e||(i++,L())});function _e(){_.classList.remove("hidden"),w.classList.add("hidden"),C.classList.add("hidden"),T.classList.add("hidden"),E.classList.add("hidden")}function re(e){_.classList.add("hidden"),w.classList.remove("hidden"),C.classList.add("hidden"),T.classList.add("hidden"),E.classList.add("hidden");const t=w.querySelector("p");t&&(t.textContent=e||"Something went wrong while loading interviews.")}function se(e="No interviews found."){_.classList.add("hidden"),w.classList.add("hidden"),C.classList.remove("hidden"),T.classList.add("hidden"),E.classList.add("hidden"),G&&(G.textContent=e)}I.addEventListener("click",e=>{e.target===I&&x()});const Y=document.getElementById("logoutButton");Y&&Y.addEventListener("click",async()=>{try{await le()}catch(e){console.error("Logout error:",e)}});document.addEventListener("DOMContentLoaded",async()=>{try{await ue(),await R(),await V()}catch(e){console.error("Interviews initialization error:",e),re(e?.message||"Unable to initialize Interviews page.")}});
