const server = location.origin;
const form = document.querySelector('form');
console.log('js');
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    let response = await fetch(`${server}/signup/validateEmail`,{
        method:'POST',
        body: formData,
    });
    let resJson = await response.json();
    console.log(resJson);
    if(!document.querySelector('#verifyBtn')){
        let otpForm = createOtpVerifyForm();
        form.append(otpForm);
        otpForm.addEventListener('submit',(e)=>{
            e.preventDefault();
            let formData = new FormData(otpForm);
            let result = verifyOtp(formData);
            if(result.ok){
                //verified
                console.log("verified",result)
            }
            else{
                //wrong otp
                console.log("wrong otp",result)
            }
        })
    }

})
async function verifyOtp(formData){
    let response = await fetch(`${server}/signup/verifyotp`,{
        method: 'POST',
        body: formData
    })
    if(response.redirected){
        console.log(response.redirected)
        window.location.href = response.url;
        // window.location.assign(response.url)
    }
    // let data = await response.json();
    return response;
}

function createOtpVerifyForm(){
    let div = document.createElement('form');
    div.classList.add('flex','gap');
    let input = document.createElement('input');
    input.type = 'number';
    input.name = 'otp';
    input.classList.add('grow','bg-neutral-600');
    let verifyBtn = document.createElement('input');
    verifyBtn.type = 'submit';
    verifyBtn.value = 'Verify';
    verifyBtn.id = 'verifyBtn'
    div.append(input,verifyBtn);
    return div;
}