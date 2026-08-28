import{s as h}from"./supabase-C4TjTvDq.js";/* empty css              */import"./common-CauTVTzm.js";import{s as x}from"./utils-B1kQYoMr.js";import{r as A}from"./auth-BTxupRwK.js";let y=[],B=[],r=null;const D=document.getElementById("addBookButton"),$=document.getElementById("emptyAddBookButton"),s=document.getElementById("bookFormPanel"),w=document.getElementById("bookForm"),k=document.getElementById("bookFormTitle"),b=document.getElementById("bookId"),n=document.getElementById("bookName"),v=document.getElementById("bookDescription"),i=document.getElementById("saveBookButton"),q=document.getElementById("cancelBookButton"),a=document.getElementById("booksLoading"),c=document.getElementById("booksEmpty"),l=document.getElementById("booksError"),C=document.getElementById("booksErrorMessage"),m=document.getElementById("booksTableWrapper"),M=document.getElementById("booksTableBody"),z=document.getElementById("booksCount");let d=document.getElementById("bookSlug");function I(){if(d||!n)return;const e=n.closest(".form-group")||n.parentElement;if(!e)return;const t=document.createElement("div");t.className="form-group",t.innerHTML=`

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

    `,e.insertAdjacentElement("afterend",t),d=document.getElementById("bookSlug")}function P(){["bookAuthor","bookCategory","bookCover"].forEach(t=>{const o=document.getElementById(t);if(!o)return;const u=o.closest(".form-group")||o.parentElement;u&&u.remove()})}document.addEventListener("DOMContentLoaded",async()=>{try{await A(),I(),P(),H(),await S()}catch(e){console.error("Books initialization error:",e),U(e?.message||"Unable to initialize the Books page.")}});function H(){D?.addEventListener("click",L),$?.addEventListener("click",L),q?.addEventListener("click",F),w?.addEventListener("submit",V),n?.addEventListener("input",()=>{!r&&d&&(d.value=N(n.value))})}async function S(){O();try{const{data:e,error:t}=await h.from("books").select(`
                id,
                name,
                slug,
                description,
                created_at
            `).order("created_at",{ascending:!1});if(t)throw t;if(y=e||[],B=[...y],!y.length){J();return}_()}catch(e){console.error("Failed to load books:",e),U(e?.message||"Unable to load books.")}}function _(){z.textContent=B.length,M.innerHTML=B.map((e,t)=>j(e,t)).join(""),K(),m.hidden=!1,G()}function j(e,t){const o=e.description?E(X(e.description,100)):"No description";return`

        <tr>

            <td>

                <strong>
                    ${E(e.name||"Untitled Book")}
                </strong>

            </td>


            <td>

                <code>
                    ${E(e.slug||"—")}
                </code>

            </td>


            <td>

                <span>
                    ${o}
                </span>

            </td>


            <td>

                ${Q(e.created_at)}

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

    `}function G(){document.querySelectorAll(".edit-book").forEach(e=>{e.addEventListener("click",()=>{const t=Number(e.dataset.index),o=B[t];o&&R(o)})}),document.querySelectorAll(".delete-book").forEach(e=>{e.addEventListener("click",()=>{const t=Number(e.dataset.index),o=B[t];o&&W(o)})})}function L(){r=null,w?.reset(),b&&(b.value=""),I(),d&&(d.value=""),k&&(k.textContent="Add Book"),i&&(i.textContent="Save Book"),s&&(s.hidden=!1,s.scrollIntoView({behavior:"smooth",block:"start"})),setTimeout(()=>n?.focus(),200)}function R(e){r=e,I(),b&&(b.value=e.id),n&&(n.value=e.name||""),d&&(d.value=e.slug||""),v&&(v.value=e.description||""),k&&(k.textContent="Edit Book"),i&&(i.textContent="Update Book"),s&&(s.hidden=!1,s.scrollIntoView({behavior:"smooth",block:"start"}))}function F(){r=null,w?.reset(),b&&(b.value=""),k&&(k.textContent="Add Book"),i&&(i.textContent="Save Book"),s&&(s.hidden=!0)}async function V(e){e.preventDefault();const t=n?.value.trim()||"",o=v?.value.trim()||"";let u=d?.value.trim()||"";if(!t){f("Please enter the book name.","error"),n?.focus();return}if(u||(u=N(t)),!u){f("Unable to generate a valid slug.","error");return}T(!0);try{const g={name:t,slug:u,description:o||null};let p=null;if(r?{error:p}=await h.from("books").update(g).eq("id",r.id):{error:p}=await h.from("books").insert(g),p)throw p.code==="23505"?new Error("That slug is already being used. Please choose another slug."):p;f(r?"Book updated successfully.":"Book added successfully.","success"),F(),await S()}catch(g){console.error("Book save error:",g),f(g?.message||"Unable to save the book.","error")}finally{T(!1)}}async function W(e){if(window.confirm(`Delete "${e.name}"?

This action cannot be undone.`))try{const{error:o}=await h.from("books").delete().eq("id",e.id);if(o)throw o;f("Book deleted successfully.","success"),await S()}catch(o){console.error("Book deletion error:",o),f(o?.message||"Unable to delete the book.","error")}}function N(e){return String(e||"").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"")}function O(){a&&(a.hidden=!1),c&&(c.hidden=!0),l&&(l.hidden=!0),m&&(m.hidden=!0)}function J(){a&&(a.hidden=!0),c&&(c.hidden=!1),l&&(l.hidden=!0),m&&(m.hidden=!0)}function U(e){a&&(a.hidden=!0),c&&(c.hidden=!0),l&&(l.hidden=!1),m&&(m.hidden=!0),C&&(C.textContent=e)}function K(){a&&(a.hidden=!0),c&&(c.hidden=!0),l&&(l.hidden=!0)}function T(e){i&&(i.disabled=e,i.textContent=e?r?"Updating...":"Saving...":r?"Update Book":"Save Book")}function f(e,t="success"){try{x(e,t)}catch{try{x(e)}catch{console.log(e)}}}function Q(e){if(!e)return"—";const t=new Date(e);return Number.isNaN(t.getTime())?"—":new Intl.DateTimeFormat("en-IN",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function X(e,t){const o=String(e||"");return o.length<=t?o:o.slice(0,t).trim()+"..."}function E(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
