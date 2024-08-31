import sendPostReq from '../../functions/sendPostReq.js'
const server = document.location.origin || 'http://localhost:3000'
const form = document.querySelector('form');
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    console.log("posted")
    let data = await sendPostReq(`${server}/api/product`,formData);
    if(data){
        console.log(data);
    }
})