import sendPostReq from '../../functions/sendPostReq.js';
const form = document.querySelector('form');

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    //have to if FormData(this) works
    const formData = new FormData(form);
    let data = await sendPostReq('/changePassword',formData);
    if(data){
        console.log(data);
    }
})