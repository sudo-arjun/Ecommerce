export default async function sendPostReq(route,formData){
    let response = await fetch(route,{
         body: formData,
         method: 'POST'
     })
     if(response.redirected){
         //have to redirect
         window.location.assign(response.url);
         return null;
     }
     let data = await response.json();
     return data;
 }
 