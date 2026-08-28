import{s as y}from"./supabase-C4TjTvDq.js";import"./main-DZT5cO3Q.js";const r=document.getElementById("galleryGrid"),s=document.getElementById("galleryLoading"),d=document.getElementById("galleryError"),o=document.getElementById("galleryEmpty"),x=document.getElementById("galleryRetry"),l=document.getElementById("galleryLightbox"),g=document.getElementById("galleryLightboxImage"),I=document.getElementById("galleryLightboxCaption"),v=document.getElementById("galleryLightboxClose"),B=document.getElementById("galleryPrevious"),w=document.getElementById("galleryNext");let n=[],i=0;document.addEventListener("DOMContentLoaded",p);async function p(){U();try{const{data:e,error:a}=await y.from("media").select(`
                id,
                file_name,
                storage_path,
                file_type,
                created_at
            `).order("created_at",{ascending:!1});if(a)throw a;if(n=(e||[]).filter(t=>t.file_type&&t.file_type.toLowerCase().startsWith("image/")).map(t=>{const{data:E}=y.storage.from("media").getPublicUrl(t.storage_path);return{...t,publicUrl:E?.publicUrl||""}}).filter(t=>t.publicUrl),!n.length){S();return}_()}catch(e){console.error("Failed to load gallery:",e),A()}}function _(){r.innerHTML=n.map((e,a)=>k(e,a)).join(""),r.querySelectorAll(".gallery-item").forEach(e=>{e.addEventListener("click",()=>{const a=Number(e.dataset.index);C(a)})}),$(),r.classList.remove("hidden")}function k(e,a){const t=u(e.file_name);return`

        <button
            type="button"
            class="gallery-item"
            data-index="${a}"
            aria-label="Open ${c(t)}"
        >

            <img
                src="${c(e.publicUrl)}"
                alt="${c(t)}"
                loading="lazy"
                onerror="this.closest('.gallery-item').remove();"
            >


            <span class="gallery-overlay">

                <span class="gallery-view-icon">

                    <i class="fas fa-expand"></i>

                </span>

            </span>


            <span class="gallery-caption">

                ${b(t)}

            </span>

        </button>

    `}function C(e){e<0||e>=n.length||(i=e,h(),l.classList.remove("hidden"),l.setAttribute("aria-hidden","false"),document.body.classList.add("gallery-lightbox-open"))}function m(){l.classList.add("hidden"),l.setAttribute("aria-hidden","true"),document.body.classList.remove("gallery-lightbox-open"),g.src=""}function h(){const e=n[i];e&&(g.src=e.publicUrl,g.alt=u(e.file_name),I.textContent=u(e.file_name))}function f(){n.length&&(i=(i-1+n.length)%n.length,h())}function L(){n.length&&(i=(i+1)%n.length,h())}v?.addEventListener("click",m);B?.addEventListener("click",f);w?.addEventListener("click",L);l?.addEventListener("click",e=>{e.target===l&&m()});document.addEventListener("keydown",e=>{if(!l.classList.contains("hidden")){if(e.key==="Escape"){m();return}if(e.key==="ArrowLeft"){f();return}e.key==="ArrowRight"&&L()}});x?.addEventListener("click",p);function U(){r.classList.add("hidden"),s.classList.remove("hidden"),d.classList.add("hidden"),o.classList.add("hidden")}function A(){r.classList.add("hidden"),s.classList.add("hidden"),d.classList.remove("hidden"),o.classList.add("hidden")}function S(){r.classList.add("hidden"),s.classList.add("hidden"),d.classList.add("hidden"),o.classList.remove("hidden")}function $(){s.classList.add("hidden"),d.classList.add("hidden"),o.classList.add("hidden")}function u(e){return e?e.replace(/\.[^/.]+$/,"").replace(/[-_]+/g," ").replace(/\s+/g," ").trim():"Historical Photograph"}function b(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function c(e){return b(e)}
