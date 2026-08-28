function a(e,s="success"){const t=document.getElementById("toastContainer"),n=document.createElement("div");n.className=`toast ${s}`;const o={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"};n.innerHTML=`

        <span>${o[s]||"ℹ️"}</span>

        <span>${e}</span>

    `,t.appendChild(n),setTimeout(()=>{n.remove()},4e3)}export{a as s};
