import{s as c}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";const K=document.getElementById("addSlideButton"),z=document.getElementById("emptyAddSlideButton"),G=document.getElementById("retrySlidesButton"),b=document.getElementById("slidesLoading"),w=document.getElementById("slidesError"),J=document.getElementById("slidesErrorMessage"),L=document.getElementById("slidesEmpty"),k=document.getElementById("slidesTableWrapper"),T=document.getElementById("slidesTableBody"),Q=document.getElementById("slidesCount"),r=document.getElementById("slideModal"),F=document.getElementById("slideModalTitle"),V=document.getElementById("closeSlideModal"),X=document.getElementById("cancelSlideButton"),U=document.getElementById("slideForm"),u=document.getElementById("slideId"),f=document.getElementById("slideImage"),m=document.getElementById("slideImagePreview"),y=document.getElementById("slidePreviewImage"),S=document.getElementById("slideOrder"),C=document.getElementById("slideActive"),W=document.getElementById("slideKicker"),B=document.getElementById("slideTitle"),O=document.getElementById("slideDescription"),R=document.getElementById("slideButtonText"),j=document.getElementById("slideButtonUrl"),v=document.getElementById("saveSlideButton"),I=document.getElementById("deleteSlideModal"),Y=document.getElementById("cancelDeleteSlide"),$=document.getElementById("confirmDeleteSlide"),Z=document.getElementById("deleteSlideMessage");let l=[],g=null,o=null;document.addEventListener("DOMContentLoaded",()=>{ee(),_()});function ee(){K?.addEventListener("click",()=>q()),z?.addEventListener("click",()=>q()),G?.addEventListener("click",()=>_()),V?.addEventListener("click",p),X?.addEventListener("click",p),r?.querySelectorAll("[data-close-slide-modal]").forEach(e=>{e.addEventListener("click",p)}),U?.addEventListener("submit",se),f?.addEventListener("change",ie),Y?.addEventListener("click",x),$?.addEventListener("click",oe),document.addEventListener("keydown",e=>{e.key==="Escape"&&(r&&!r.hidden&&p(),I&&!I.hidden&&x())})}async function _(){me();try{const{data:e,error:t}=await c.from("home_slides").select("*").order("slide_order",{ascending:!0});if(t)throw t;l=e||[],Q.textContent=l.length,te()}catch(e){console.error("[Home Slides] Load failed:",e),fe(e?.message||"Unable to load home slides.")}}function te(){if(!l.length){ge();return}T.innerHTML=l.map(e=>de(e)).join(""),T.querySelectorAll("[data-edit-slide]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.editSlide,d=l.find(n=>n.id===t);d&&ne(d)})}),T.querySelectorAll("[data-delete-slide]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.deleteSlide,d=l.find(n=>n.id===t);d&&le(d)})}),he()}function de(e){const t=D(e.image_path),d=e.is_active?`
                <span class="status-badge status-active">
                    Active
                </span>
              `:`
                <span class="status-badge status-inactive">
                    Inactive
                </span>
              `;return`

        <tr>

            <td>

                <span
                    class="home-slide-order"
                >
                    ${h(e.slide_order)}
                </span>

            </td>


            <td>

                <div
                    class="home-slide-table-image"
                >

                    ${t?`
                                <img
                                    src="${E(t)}"
                                    alt="${E(e.title)}"
                                >
                              `:`
                                <div>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                              `}

                </div>

            </td>


            <td>

                <div class="home-slide-table-content">

                    ${e.kicker?`
                                <span>
                                    ${h(e.kicker)}
                                </span>
                              `:""}


                    <strong>
                        ${h(e.title)}
                    </strong>


                    ${e.description?`
                                <p>
                                    ${h(ue(e.description,100))}
                                </p>
                              `:""}

                </div>

            </td>


            <td>

                ${d}

            </td>


            <td>

                <div class="home-slide-actions">

                    <button
    type="button"
    class="table-action edit"
    data-edit-slide="${E(e.id)}"
>
    <i class="fa-solid fa-pen"></i>
</button>


                    <button
    type="button"
    class="table-action delete"
    data-delete-slide="${E(e.id)}"
>
    <i class="fa-solid fa-trash"></i>
</button>

                </div>

            </td>

        </tr>

    `}function q(){U.reset(),u.value="",S.value=re(),C.checked=!0,o=null,f.required=!0,m.hidden=!0,y.src="",F.textContent="Add Home Slide",v.textContent="Save Home Slide",r.hidden=!1,document.body.classList.add("home-slide-modal-open"),setTimeout(()=>B?.focus(),50)}function ne(e){u.value=e.id,S.value=e.slide_order,C.checked=e.is_active,W.value=e.kicker||"",B.value=e.title||"",O.value=e.description||"",R.value=e.button_text||"",j.value=e.button_url||"",o=e.image_path,f.required=!1;const t=D(e.image_path);t?(y.src=t,m.hidden=!1):m.hidden=!0,F.textContent="Edit Home Slide",v.textContent="Update Home Slide",r.hidden=!1,document.body.classList.add("home-slide-modal-open")}function ie(){const e=f.files?.[0];if(!e){if(o){const d=D(o);y.src=d,m.hidden=!d}else m.hidden=!0;return}if(!e.type.startsWith("image/")){s("Please select an image file.","error"),f.value="";return}const t=new FileReader;t.onload=d=>{y.src=d.target.result,m.hidden=!1},t.readAsDataURL(e)}async function se(e){e.preventDefault();const t=!!u.value,d=f.files?.[0],n=B.value.trim(),M=Number(S.value);if(!n){s("Please enter a slide title.","error"),B.focus();return}if(!Number.isInteger(M)||M<1){s("Please enter a valid slide order.","error"),S.focus();return}if(!t&&!d){s("Please select a slide image.","error");return}N(!0);try{let i=o;if(d){const a=ce(d.name);i=`home-slides/${`${crypto.randomUUID()}${a}`}`;const{error:A}=await c.storage.from("home-slides").upload(i,d,{cacheControl:"3600",upsert:!1,contentType:d.type});if(A)throw A}const P={image_path:i,image_name:d?.name||ae(u.value)||"home-slide",slide_order:M,kicker:W.value.trim()||null,title:n,description:O.value.trim()||null,button_text:R.value.trim()||null,button_url:j.value.trim()||null,is_active:C.checked};if(t){const{error:a}=await c.from("home_slides").update(P).eq("id",u.value);if(a)throw a;d&&o&&o!==i&&await H(o),s("Home slide updated successfully.","success")}else{const{error:a}=await c.from("home_slides").insert(P);if(a)throw i&&await H(i),a;s("Home slide created successfully.","success")}p(),await _()}catch(i){console.error("[Home Slides] Save failed:",i),s(i?.message||"Unable to save the home slide.","error")}finally{N(!1)}}function le(e){g=e,Z.textContent=`Delete "${e.title}"? This will remove the slide and its image.`,I.hidden=!1,document.body.classList.add("home-slide-modal-open")}function x(){I.hidden=!0,g=null,(!r||r.hidden)&&document.body.classList.remove("home-slide-modal-open")}async function oe(){if(g){$.disabled=!0;try{const{error:e}=await c.from("home_slides").delete().eq("id",g.id);if(e)throw e;g.image_path&&await H(g.image_path),s("Home slide deleted.","success"),x(),await _()}catch(e){console.error("[Home Slides] Delete failed:",e),s(e?.message||"Unable to delete the home slide.","error")}finally{$.disabled=!1}}}function D(e){if(!e)return"";if(e.startsWith("http://")||e.startsWith("https://"))return e;const{data:t}=c.storage.from("home-slides").getPublicUrl(e);return t?.publicUrl||""}async function H(e){if(!e)return;const{error:t}=await c.storage.from("home-slides").remove([e]);t&&console.warn("[Home Slides] Storage delete failed:",t)}function re(){if(!l.length)return 1;const e=l.map(t=>Number(t.slide_order)).filter(Number.isFinite);return e.length?Math.max(...e)+1:1}function ae(e){return l.find(d=>d.id===e)?.image_name||""}function ce(e){const t=e.match(/\.[^/.]+$/);return t?t[0].toLowerCase():".jpg"}function ue(e,t){return!e||e.length<=t?e||"":e.substring(0,t).trim()+"…"}function p(){r.hidden=!0,U.reset(),u.value="",m.hidden=!0,y.src="",f.required=!0,o=null,document.body.classList.remove("home-slide-modal-open")}function me(){b.hidden=!1,w.hidden=!0,L.hidden=!0,k.hidden=!0}function fe(e){b.hidden=!0,L.hidden=!0,k.hidden=!0,w.hidden=!1,J.textContent=e}function ge(){b.hidden=!0,w.hidden=!0,k.hidden=!0,L.hidden=!1}function he(){b.hidden=!0,w.hidden=!0,L.hidden=!0,k.hidden=!1}function N(e){v&&(v.disabled=e,v.textContent=e?"Saving...":u.value?"Update Home Slide":"Save Home Slide")}function s(e,t="success"){const d=document.getElementById("toastContainer");if(!d){alert(e);return}const n=document.createElement("div");n.className=`toast toast-${t}`,n.innerHTML=`

        <span>
            ${t==="success"?"✓":"!"}
        </span>

        <p>
            ${h(e)}
        </p>

    `,d.appendChild(n),setTimeout(()=>{n.classList.add("toast-hide"),setTimeout(()=>n.remove(),250)},3500)}function h(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function E(e){return h(e)}
