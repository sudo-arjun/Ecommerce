import sendPostReq from '../../functions/sendPostReq.js'
const quantityIncBtn = document.querySelector('.quantityIncreaseBtn');
const quantityDecBtn = document.querySelector('.quantityDecreaseBtn');
const removeBtn = document.querySelector('.removeBtn');
const server = 'http://localhost:3000'

function quantityHandler(e,operation){
    const quantityController = e.currentTarget.parentElement;
    const pId = JSON.parse(quantityController.parentElement.querySelector('.data').innerText)._id;
    const span = quantityController.querySelector('span');
    let newQuantity = Number(span.innerText);
    operation == '+' ? newQuantity++ : newQuantity--;
    if (updateQuantityOnServer(pId, newQuantity)) {
        //update quantity on frontend
        span.innerText = newQuantity;
        if(newQuantity == 0)
            e.currentTarget.closest('.pCart').remove();
    }
}
function removeHandler(e){
    const pId = JSON.parse(e.currentTarget.parentElement.querySelector('.data').innerText)._id;
    if (updateQuantityOnServer(pId, 0)) {
        //update on frontend
        e.currentTarget.closest('.pCart').remove();
    }
}
window.quantityHandler = quantityHandler;
window.removeHandler = removeHandler;

async function updateQuantityOnServer(pId, newQuantity) {
    let formData = new FormData();
    formData.append('productId', pId);
    formData.append('quantity', newQuantity);
    let data = await sendPostReq(`${server}/addToCart`, formData);
    if (data) {
        console.log(data);
    }
    return 1;
}