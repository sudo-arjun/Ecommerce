import sendPostReq from '../../functions/sendPostReq.js';
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    //have to if FormData(this) works
    const formData = new FormData(loginForm);
    let data = await sendPostReq('/login',formData);
    if(data){
        console.log(data);
    }
})

const forgotBtn = document.querySelector('#forgotBtn');
forgotBtn.addEventListener('click',async (e)=>{
    const email = document.querySelector('#email').value; 
    console.log(email)
    if(email){
        console.log('in mail');
        let formData = new FormData();
        formData.append('email',email);
        let data = await sendPostReq('/forgotPassword',formData);
        if(data){
            console.log(data);
        }
    }
    else
        console.log("Enter email");
})
