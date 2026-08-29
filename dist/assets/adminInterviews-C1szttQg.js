import{s as l}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";import{s as R}from"./utils-B1kQYoMr.js";import{l as re,r as se}from"./auth-BTxupRwK.js";let s=[],c=[],f=[],h=null,B=null;const P=20;let a=1;const $=document.getElementById("interviewModal"),de=document.getElementById("addInterviewButton"),ce=document.getElementById("closeModal"),le=document.getElementById("cancelModal"),z=document.getElementById("interviewForm"),k=document.getElementById("interviewTitle"),G=document.getElementById("interviewee"),N=document.getElementById("category"),W=document.getElementById("description"),u=document.getElementById("interviewMedia"),Y=document.getElementById("youtubeUrl"),A=document.getElementById("featured"),q=document.getElementById("published"),b=document.getElementById("interviewPhotoPreview"),L=document.getElementById("interviewPhotoPreviewImage"),j=document.getElementById("interviewModalTitle"),o=document.getElementById("saveButton"),S=document.getElementById("loadingState"),y=document.getElementById("errorState"),M=document.getElementById("emptyState"),H=document.getElementById("emptyMessage"),C=document.getElementById("tableContainer"),ue=document.getElementById("interviewsTableBody"),w=document.getElementById("pagination"),Z=document.getElementById("prevPage"),J=document.getElementById("nextPage"),me=document.getElementById("pageInfo"),K=document.getElementById("searchInput"),p=document.getElementById("confirmModal"),ge=document.getElementById("confirmMessage"),ve=document.getElementById("cancelDelete"),g=document.getElementById("confirmDelete");function r(e,t="success"){try{R(e,t)}catch{try{R(e)}catch{console.log(e)}}}function I(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function fe(e){return e?f.find(t=>String(t.id)===String(e)):null}function Q(e){if(!e)return"";const{data:t}=l.storage.from("media").getPublicUrl(e);return t?.publicUrl||""}function he(e){if(!e?.media_id)return"";const t=fe(e.media_id);return t?.storage_path?Q(t.storage_path):""}function X(){$.classList.add("active")}function T(){$.classList.remove("active"),ee()}function ee(){z.reset(),h=null,j.textContent="Add New Interview",o.textContent="Save Interview",o.disabled=!1,N.value="Interview",A.value="false",q.value="true",b.classList.add("hidden"),L.src=""}de.addEventListener("click",async()=>{ee(),await te(),X()});ce.addEventListener("click",T);le.addEventListener("click",T);document.addEventListener("keydown",e=>{e.key==="Escape"&&($.classList.contains("active")&&T(),p.classList.contains("active")&&_())});async function te(){u.innerHTML=`
        <option value="">
            No Thumbnail
        </option>
    `;try{const{data:e,error:t}=await l.from("media").select("id,file_name,storage_path,file_type").order("created_at",{ascending:!1});if(t)throw t;f=(e||[]).filter(n=>n.file_type?.startsWith("image/")),f.forEach(n=>{const i=document.createElement("option");i.value=n.id,i.textContent=n.file_name,i.dataset.storagePath=n.storage_path,u.appendChild(i)})}catch(e){console.error("Error loading media:",e),f=[],r("Unable to load media.","error")}}function ne(){const t=u.options[u.selectedIndex]?.dataset?.storagePath;if(!t){b.classList.add("hidden"),L.src="";return}const n=Q(t);if(!n){b.classList.add("hidden"),L.src="";return}L.src=n,b.classList.remove("hidden")}u.addEventListener("change",ne);async function V(){Be();try{const{data:e,error:t}=await l.from("interviews").select("*").order("created_at",{ascending:!1});if(t)throw t;s=e||[];const{data:n,error:i}=await l.from("media").select("id,file_name,storage_path,file_type");if(i)throw i;if(f=n||[],c=[...s],a=1,s.length===0){ae("No interviews found.");return}E()}catch(e){console.error("Error loading interviews:",e),ie(e?.message||"Unable to load interviews.")}}function ye(e){ue.innerHTML=e.map((t,n)=>{const i=s.findIndex(D=>D.id===t.id)+1,m=he(t),x=t.featured?`
                                <span class="status-badge success">
                                    Yes
                                </span>
                              `:`
                                <span class="status-badge">
                                    No
                                </span>
                              `,U=t.published?`
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
                                ${i}
                            </td>


                            <!-- THUMBNAIL -->

                            <td>

                                ${m?`

                                            <img
                                                src="${I(m)}"
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
                                    ${I(t.title)}
                                </strong>

                            </td>


                            <!-- INTERVIEWEE -->

                            <td>

                                ${I(t.interviewee||"-")}

                            </td>


                            <!-- CATEGORY -->

                            <td>

                                ${I(t.category||"Interview")}

                            </td>


                            <!-- FEATURED -->

                            <td>

                                ${x}

                            </td>


                            <!-- PUBLISHED -->

                            <td>

                                ${U}

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

                    `}).join(""),we(),Ee(),S.classList.add("hidden"),y.classList.add("hidden"),M.classList.add("hidden"),C.classList.remove("hidden")}function we(){document.querySelectorAll(".edit-btn").forEach(e=>{e.addEventListener("click",()=>{pe(e.dataset.id)})})}async function pe(e){const t=s.find(n=>String(n.id)===String(e));t&&(h=t.id,j.textContent="Edit Interview",o.textContent="Update Interview",k.value=t.title||"",G.value=t.interviewee||"",N.value=t.category||"Interview",W.value=t.description||"",Y.value=t.youtube_url||"",A.value=t.featured?"true":"false",q.value=t.published?"true":"false",await te(),u.value=t.media_id||"",ne(),X())}z.addEventListener("submit",async e=>{e.preventDefault();const t=k.value.trim(),n=G.value.trim(),i=N.value.trim()||"Interview",m=W.value.trim(),x=Y.value.trim(),U=u.value||null,D=A.value==="true",oe=q.value==="true";if(!t){r("Please enter an interview title.","error"),k.focus();return}if(o.disabled)return;o.disabled=!0;const O=h!==null;o.textContent=O?"Updating...":"Saving...";try{const d={title:t,description:m||null,category:i,interviewee:n||null,media_id:U,youtube_url:x||null,featured:D,published:oe};if(O){const{error:v}=await l.from("interviews").update({...d,updated_at:new Date().toISOString()}).eq("id",h);if(v)throw v;r("Interview updated successfully.","success")}else{const{error:v}=await l.from("interviews").insert([d]);if(v)throw v;r("Interview added successfully.","success")}T(),await V()}catch(d){console.error("Interview save error:",d),d?.code==="42501"||d?.code==="PGRST301"?r("Supabase blocked this operation because of the interviews table RLS policy.","error"):r(d?.message||"Unable to save interview.","error")}finally{o.disabled=!1,o.textContent=h!==null?"Update Interview":"Save Interview"}});function Ee(){document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",()=>{Ie(e.dataset.id)})})}function Ie(e){const t=s.find(n=>String(n.id)===String(e));t&&(B=t,ge.textContent=`Are you sure you want to delete "${t.title}"? This action cannot be undone.`,p.classList.add("active"))}function _(){B=null,p.classList.remove("active")}ve.addEventListener("click",_);g.addEventListener("click",async()=>{if(B&&!g.disabled){g.disabled=!0,g.textContent="Deleting...";try{const e=B.id,{error:t}=await l.from("interviews").delete().eq("id",e);if(t)throw t;_(),r("Interview deleted successfully.","success"),await V()}catch(e){console.error("Interview delete error:",e),r(e?.message||"Unable to delete interview.","error")}finally{g.disabled=!1,g.textContent="Delete"}}});K.addEventListener("input",be);function be(){const e=K.value.trim().toLowerCase();if(!e){c=[...s],a=1,E();return}if(c=s.filter(t=>{const n=(t.title||"").toLowerCase(),i=(t.interviewee||"").toLowerCase(),m=(t.category||"").toLowerCase();return n.includes(e)||i.includes(e)||m.includes(e)}),a=1,c.length===0){ae("No interviews match your search.");return}E()}function E(){const e=(a-1)*P,t=e+P,n=c.slice(e,t);ye(n),Le()}function Le(){const e=Math.ceil(c.length/P);if(e<=1){w.classList.add("hidden");return}w.classList.remove("hidden"),me.textContent=`Page ${a} of ${e}`,Z.disabled=a===1,J.disabled=a===e}Z.addEventListener("click",()=>{a<=1||(a--,E())});J.addEventListener("click",()=>{const e=Math.ceil(c.length/P);a>=e||(a++,E())});function Be(){S.classList.remove("hidden"),y.classList.add("hidden"),M.classList.add("hidden"),C.classList.add("hidden"),w.classList.add("hidden")}function ie(e){S.classList.add("hidden"),y.classList.remove("hidden"),M.classList.add("hidden"),C.classList.add("hidden"),w.classList.add("hidden");const t=y.querySelector("p");t&&(t.textContent=e||"Something went wrong while loading interviews.")}function ae(e="No interviews found."){S.classList.add("hidden"),y.classList.add("hidden"),M.classList.remove("hidden"),C.classList.add("hidden"),w.classList.add("hidden"),H&&(H.textContent=e)}p.addEventListener("click",e=>{e.target===p&&_()});const F=document.getElementById("logoutButton");F&&F.addEventListener("click",async()=>{try{await re()}catch(e){console.error("Logout error:",e)}});document.addEventListener("DOMContentLoaded",async()=>{try{await se(),await V()}catch(e){console.error("Interviews initialization error:",e),ie(e?.message||"Unable to initialize Interviews page.")}});
