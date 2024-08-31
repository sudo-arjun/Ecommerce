import sendPostReq from '../../functions/sendPostReq.js'
const quantityIncBtn = document.querySelector('.quantityIncreaseBtn');
const quantityDecBtn = document.querySelector('.quantityDecreaseBtn');
const removeBtn = document.querySelector('.removeBtn');
const totalPriceSpan = document.querySelector('#totalPrice');
const buyBtn = document.querySelector('#buyBtn');
const server = document.location.origin || 'http://localhost:3000'

function quantityHandler(e,operation){
    const quantityController = e.currentTarget.parentElement;
    const {_id: pId, price} = JSON.parse(quantityController.parentElement.querySelector('.data').innerText);
    const span = quantityController.querySelector('span');
    let newQuantity = Number(span.innerText);
    // let previousTotal = parseFloat(totalPriceSpan.innerText.replace(',',''));
    let previousTotal = parseFloat(totalPriceSpan.innerText.replace(/,/g, ''));
    console.log(previousTotal,price)

    if(operation == '+'){
        newQuantity++
        let newValue = previousTotal + price;
        totalPriceSpan.textContent = newValue;
    }else{
        newQuantity--;    
        totalPriceSpan.innerText = previousTotal - price;
    } 
    if (updateQuantityOnServer(pId, newQuantity)) {
        //update quantity on frontend
        span.innerText = newQuantity;
        if(newQuantity == 0)
            e.currentTarget.closest('.pCart').remove();
    }
}
function removeHandler(e){
    const {_id: pId, price} = JSON.parse(e.currentTarget.parentElement.querySelector('.data').innerText);
    const productCartQuantity = Number(e.currentTarget.parentElement.querySelector('span').innerText);
    console.log(price,productCartQuantity)
    if (updateQuantityOnServer(pId, 0)) {
        //update on frontend
        let total = Number(price) * Number(productCartQuantity);
        console.log(total)
        let previousTotal = parseFloat(totalPriceSpan.innerText.replace(/,/g, ''));
        totalPriceSpan.innerText = previousTotal - total;
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

buyBtn.addEventListener('click',async (e)=>{
    // console.log(cartArr)
    let response = await fetch(`${server}/api/order`);
    if(response.redirected){
        location.href = response.url
    }else{
        let data = await response.json();
        console.log(data);
    }
    
})