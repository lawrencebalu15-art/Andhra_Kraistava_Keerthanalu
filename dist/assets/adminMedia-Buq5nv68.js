import{s as i}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";let d=[],p="";const m="media",$=3600,D=document.getElementById("uploadButton"),F=document.getElementById("emptyUploadButton"),U=document.getElementById("uploadModal"),N=document.getElementById("closeUploadModal"),x=document.getElementById("cancelUpload"),M=document.getElementById("uploadForm"),c=document.getElementById("mediaFile"),v=document.getElementById("uploadPreview"),_=document.getElementById("previewImage"),s=document.getElementById("mediaGrid"),h=document.getElementById("loadingState"),u=document.getElementById("emptyState"),B=document.getElementById("searchInput"),P=document.getElementById("totalFiles"),k=document.getElementById("totalImages"),z=document.getElementById("totalStorage"),l=document.getElementById("previewModal"),q=document.getElementById("closePreviewModal"),y=document.getElementById("fullPreviewImage"),A=document.getElementById("previewFileName");async function R(){const{data:e,error:t}=await i.auth.getUser();if(t)throw t;if(!e.user)throw new Error("You must be logged in to manage media.");return e.user}async function G(){const{data:e,error:t}=await i.from("media").select("*").order("created_at",{ascending:!1});if(t)throw t;return!e||e.length===0?[]:await Promise.all(e.map(async n=>{const{data:r,error:o}=await i.storage.from(m).createSignedUrl(n.storage_path,$);return o?(console.error("Signed URL error:",o),{...n,url:null}):{...n,url:r?.signedUrl||null}}))}async function w(){X();try{d=await G(),T(),S()}catch(e){console.error("Media loading error:",e),h.classList.add("hidden"),s.classList.add("hidden"),u.classList.remove("hidden"),alert(`Unable to load media.

`+e.message)}}function T(){const e=d.filter(a=>a.file_type&&a.file_type.startsWith("image/")),t=d.reduce((a,n)=>a+Number(n.file_size||0),0);P.textContent=d.length,k.textContent=e.length,z.textContent=C(t)}function S(){const e=d.filter(t=>p?t.file_name.toLowerCase().includes(p):!0);if(h.classList.add("hidden"),e.length===0){s.classList.add("hidden"),u.classList.remove("hidden");return}u.classList.add("hidden"),s.classList.remove("hidden"),s.innerHTML=e.map(t=>K(t)).join(""),O()}function K(e){const t=e.url?`
                <img
                    src="${e.url}"
                    alt="${f(e.file_name)}"
                    loading="lazy"
                >
              `:`
                <div class="media-image-error">
                    Image unavailable
                </div>
              `;return`

        <article
            class="media-card"
            data-id="${e.id}">


            <div class="media-thumbnail">

                ${t}

            </div>


            <div class="media-card-body">

                <h3
                    title="${f(e.file_name)}">

                    ${f(e.file_name)}

                </h3>


                <div class="media-meta">

                    <span>
                        ${C(Number(e.file_size||0))}
                    </span>

                    <span>
                        ${H(e.created_at)}
                    </span>

                </div>


                <div class="media-actions">

                    <button
                        class="table-btn preview-media"
                        data-id="${e.id}">

                        View

                    </button>


                    <button
                        class="table-btn delete-media"
                        data-id="${e.id}">

                        Delete

                    </button>

                </div>

            </div>

        </article>

    `}function O(){document.querySelectorAll(".preview-media").forEach(e=>{e.addEventListener("click",()=>{W(e.dataset.id)})}),document.querySelectorAll(".delete-media").forEach(e=>{e.addEventListener("click",async()=>{await j(e.dataset.id,e)})})}function W(e){const t=d.find(a=>String(a.id)===String(e));if(t){if(!t.url){alert("Unable to preview this image.");return}y.src=t.url,A.textContent=t.file_name,l.classList.add("active")}}async function j(e,t){const a=d.find(r=>String(r.id)===String(e));if(!(!a||!confirm(`Delete "${a.file_name}"?`))){t.disabled=!0,t.textContent="Deleting...";try{const{error:r}=await i.storage.from(m).remove([a.storage_path]);if(r)throw r;const{error:o}=await i.from("media").delete().eq("id",a.id);if(o)throw o;await w()}catch(r){console.error("Media delete error:",r),alert(`Unable to delete media.

`+r.message),t.disabled=!1,t.textContent="Delete"}}}function b(){U.classList.add("active")}function E(){U.classList.remove("active"),M.reset(),v.classList.add("hidden"),_.src=""}D.addEventListener("click",b);F.addEventListener("click",b);N.addEventListener("click",E);x.addEventListener("click",E);c.addEventListener("change",()=>{const e=c.files[0];if(!e){v.classList.add("hidden");return}if(!e.type.startsWith("image/")){alert("Please select an image file."),c.value="";return}const t=URL.createObjectURL(e);_.src=t,v.classList.remove("hidden")});M.addEventListener("submit",async e=>{e.preventDefault();const t=c.files[0];if(!t)return;const a=document.getElementById("saveUpload");a.disabled=!0,a.textContent="Uploading...";try{const n=await R(),r=Q(t.name),g=`general/${`${crypto.randomUUID()}-${r}`}`,{error:L}=await i.storage.from(m).upload(g,t,{cacheControl:"3600",upsert:!1,contentType:t.type});if(L)throw L;const{error:I}=await i.from("media").insert([{file_name:t.name,storage_path:g,file_type:t.type,file_size:t.size,uploaded_by:n.id}]);if(I)throw await i.storage.from(m).remove([g]),I;E(),await w()}catch(n){console.error("Media upload error:",n),alert(`Unable to upload media.

`+n.message)}finally{a.disabled=!1,a.textContent="Add to Media Library"}});B.addEventListener("input",()=>{p=B.value.trim().toLowerCase(),S()});q.addEventListener("click",()=>{l.classList.remove("active"),y.src=""});l.addEventListener("click",e=>{e.target===l&&(l.classList.remove("active"),y.src="")});function C(e){if(!e||e===0)return"0 KB";const t=["Bytes","KB","MB","GB"],a=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,a)).toFixed(2))+" "+t[a]}function H(e){return e?new Date(e).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"-"}function Q(e){return e.normalize("NFKD").replace(/[^\w.\-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}function f(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function X(){h.classList.remove("hidden"),u.classList.add("hidden"),s.classList.add("hidden")}document.addEventListener("DOMContentLoaded",async()=>{await w()});
