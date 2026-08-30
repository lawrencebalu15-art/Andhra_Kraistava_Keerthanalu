import{s as p}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-DAz3qKPy.js";import{s as T}from"./utils-B1kQYoMr.js";import{r as _}from"./auth-BTxupRwK.js";let I=[],E=[],r=null;const j=document.getElementById("addBookButton"),q=document.getElementById("emptyAddBookButton"),l=document.getElementById("bookFormPanel"),x=document.getElementById("bookForm"),h=document.getElementById("bookFormTitle"),B=document.getElementById("bookId"),i=document.getElementById("bookName"),S=document.getElementById("bookDescription"),s=document.getElementById("saveBookButton"),z=document.getElementById("cancelBookButton"),u=document.getElementById("booksLoading"),m=document.getElementById("booksEmpty"),f=document.getElementById("booksError"),F=document.getElementById("booksErrorMessage"),k=document.getElementById("booksTableWrapper"),M=document.getElementById("booksTableBody"),R=document.getElementById("booksCount"),H=document.getElementById("bookCover"),b=document.getElementById("bookCoverPreview"),y=document.getElementById("bookCoverPreviewImage");let w=null,a=document.getElementById("bookSlug");function L(){if(a||!i)return;const e=i.closest(".form-group")||i.parentElement;if(!e)return;const t=document.createElement("div");t.className="form-group",t.innerHTML=`

        <label for="bookSlug">
            Slug
        </label>

        <input
            type="text"
            id="bookSlug"
            name="slug"
            placeholder="book-name"
            autocomplete="off"
        >

        <small>
            Used for the book's web address.
        </small>

    `,e.insertAdjacentElement("afterend",t),a=document.getElementById("bookSlug")}function W(){["bookAuthor","bookCategory"].forEach(t=>{const o=document.getElementById(t);if(!o)return;const n=o.closest(".form-group")||o.parentElement;n&&n.remove()})}document.addEventListener("DOMContentLoaded",async()=>{try{await _(),L(),W(),G(),await U()}catch(e){console.error("Books initialization error:",e),A(e?.message||"Unable to initialize the Books page.")}});function G(){j?.addEventListener("click",N),q?.addEventListener("click",N),z?.addEventListener("click",$),H?.addEventListener("change",O),x?.addEventListener("submit",Y),i?.addEventListener("input",()=>{!r&&a&&(a.value=P(i.value))})}function O(e){const t=e.target.files?.[0];if(!t){w=null;return}if(!t.type.startsWith("image/")){c("Please select an image file.","error"),e.target.value="";return}const o=5*1024*1024;if(t.size>o){c("Book cover must be smaller than 5 MB.","error"),e.target.value="";return}w=t;const n=URL.createObjectURL(t);y&&(y.src=n),b&&(b.hidden=!1)}async function V(e){if(!e)return null;const t=e.name.split(".").pop().toLowerCase(),o=["jpg","jpeg","png","webp"].includes(t)?t:"jpg",d=`covers/${`book-${Date.now()}-${crypto.randomUUID()}.${o}`}`,{error:v}=await p.storage.from("book-covers").upload(d,e,{cacheControl:"3600",upsert:!1,contentType:e.type});if(v)throw v;const{data:g}=p.storage.from("book-covers").getPublicUrl(d);return g.publicUrl}async function U(){ee();try{const{data:e,error:t}=await p.from("books").select(`
    id,
    name,
    slug,
    description,
    cover_url,
    created_at
`).order("created_at",{ascending:!1});if(t)throw t;if(I=e||[],E=[...I],!I.length){te();return}J()}catch(e){console.error("Failed to load books:",e),A(e?.message||"Unable to load books.")}}function J(){R.textContent=E.length,M.innerHTML=E.map((e,t)=>K(e,t)).join(""),oe(),k.hidden=!1,Q()}function K(e,t){const o=e.description?C(re(e.description,100)):"No description";return`

        <tr>

            <td>

                <strong>
                    ${C(e.name||"Untitled Book")}
                </strong>

            </td>


            <td>

                <code>
                    ${C(e.slug||"—")}
                </code>

            </td>


            <td>

                <span>
                    ${o}
                </span>

            </td>


            <td>

                ${ne(e.created_at)}

            </td>


            <td>

                <div
                    class="table-actions"
                >

                    <button
                        type="button"
                        class="btn btn-sm btn-secondary edit-book"
                        data-index="${t}"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-danger delete-book"
                        data-index="${t}"
                    >
                        Delete
                    </button>

                </div>

            </td>

        </tr>

    `}function Q(){document.querySelectorAll(".edit-book").forEach(e=>{e.addEventListener("click",()=>{const t=Number(e.dataset.index),o=E[t];o&&X(o)})}),document.querySelectorAll(".delete-book").forEach(e=>{e.addEventListener("click",()=>{const t=Number(e.dataset.index),o=E[t];o&&Z(o)})})}function N(){r=null,x?.reset(),B&&(B.value=""),L(),a&&(a.value=""),h&&(h.textContent="Add Book"),s&&(s.textContent="Save Book"),l&&(l.hidden=!1,l.scrollIntoView({behavior:"smooth",block:"start"})),setTimeout(()=>i?.focus(),200)}function X(e){r=e,L(),B&&(B.value=e.id),i&&(i.value=e.name||""),a&&(a.value=e.slug||""),S&&(S.value=e.description||""),h&&(h.textContent="Edit Book"),s&&(s.textContent="Update Book"),l&&(l.hidden=!1,l.scrollIntoView({behavior:"smooth",block:"start"})),y&&(e.cover_url?(y.src=e.cover_url,b&&(b.hidden=!1)):(y.src="",b&&(b.hidden=!0)),w=null)}function $(){r=null,x?.reset(),B&&(B.value=""),h&&(h.textContent="Add Book"),s&&(s.textContent="Save Book"),l&&(l.hidden=!0)}async function Y(e){e.preventDefault();const t=i?.value.trim()||"",o=S?.value.trim()||"";let n=a?.value.trim()||"";if(!t){c("Please enter the book name.","error"),i?.focus();return}if(n||(n=P(t)),!n){c("Unable to generate a valid slug.","error");return}D(!0);try{let d=r?.cover_url||null;w&&(d=await V(w));const v={name:t,slug:n,description:o||null,cover_url:d};let g=null;if(r?{error:g}=await p.from("books").update(v).eq("id",r.id):{error:g}=await p.from("books").insert(v),g)throw g.code==="23505"?new Error("That slug is already being used. Please choose another slug."):g;c(r?"Book updated successfully.":"Book added successfully.","success"),$(),await U()}catch(d){console.error("Book save error:",d),c(d?.message||"Unable to save the book.","error")}finally{D(!1)}}async function Z(e){if(window.confirm(`Delete "${e.name}"?

This action cannot be undone.`))try{const{error:o}=await p.from("books").delete().eq("id",e.id);if(o)throw o;c("Book deleted successfully.","success"),await U()}catch(o){console.error("Book deletion error:",o),c(o?.message||"Unable to delete the book.","error")}}function P(e){return String(e||"").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"")}function ee(){u&&(u.hidden=!1),m&&(m.hidden=!0),f&&(f.hidden=!0),k&&(k.hidden=!0)}function te(){u&&(u.hidden=!0),m&&(m.hidden=!1),f&&(f.hidden=!0),k&&(k.hidden=!0)}function A(e){u&&(u.hidden=!0),m&&(m.hidden=!0),f&&(f.hidden=!1),k&&(k.hidden=!0),F&&(F.textContent=e)}function oe(){u&&(u.hidden=!0),m&&(m.hidden=!0),f&&(f.hidden=!0)}function D(e){s&&(s.disabled=e,s.textContent=e?r?"Updating...":"Saving...":r?"Update Book":"Save Book")}function c(e,t="success"){try{T(e,t)}catch{try{T(e)}catch{console.log(e)}}}function ne(e){if(!e)return"—";const t=new Date(e);return Number.isNaN(t.getTime())?"—":new Intl.DateTimeFormat("en-IN",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function re(e,t){const o=String(e||"");return o.length<=t?o:o.slice(0,t).trim()+"..."}function C(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
