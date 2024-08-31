import sendPostReq from '../../functions/sendPostReq.js';
const server = location.origin || 'http://localhost:3000';
console.log(server)
let skip = 10, limit = 10;
let loadBtn = document.querySelector('#loadBtn');
let productPg = document.querySelector('#productPg');
// loadBtn.addEventListener('click', async () => {
//     let response = await fetch(`${server}/api/product?limit=${limit}&&skip=${skip}`)
//     let data = await response.json();
//     console.log(response);
//     if(response.ok){
//         data.forEach((product) => {
//             let card = createCard(product);
//             productPg.appendChild(card);
//         })
//     }
//     else
//         console.log(data.msg)
//     //set skip for next request
//     skip += limit;
//     if (data.length < limit) {
//         loadBtn.remove();
//         // loadBtn.setAttribute('disabled', '');
//         // // loadBtn.classList.remove('')
//         // loadBtn.innerText = 'No Data'
//     }

// })
let flag = true;
document.addEventListener('scroll',async (e)=>{
    // console.log(e);
    if(flag && window.scrollY + window.innerHeight > (document.body.scrollHeight - 100))
    {
        flag = false;
        await bringData();  
        console.log("bring");
    }
})
async function bringData(){
        let response = await fetch(`${server}/api/product?limit=${limit}&&skip=${skip}`)
        let data = await response.json();
        console.log(response);
        if(response.ok){
            data.forEach((product) => {
                let card = createCard(product);
                productPg.appendChild(card);
            })
        }
        else
            console.log(data.msg)
        //set skip for next request
        skip += limit;
        flag = true;
        if (data.length < limit) {
            // loadBtn.remove();
            flag = false;
            console.log("finished");
        }
}
// productPg.addEventListener('click',(e)=>{
//     let detailBtn = e.target;
//     let data = JSON.parse(detailBtn.nextElementSibling.innerText);
//     console.log(data);
//     if(detailBtn.tagName == 'BUTTON'){
//         //show pop up
//         createPopup(data);
//     }
// })
async function cartHandler(e){
    //get the product id
    try{
        const cartBtnParent = e.currentTarget.parentElement;
        const {_id} = JSON.parse(cartBtnParent.querySelector('p').innerText);
        const productQuantitySpan = cartBtnParent.querySelector('span');
        let productQuantity = parseInt(productQuantitySpan.innerText);
        //send req to save the id of the product
        let formData = new FormData();
        formData.append('productId',_id);
        formData.append('quantity',++productQuantity);
        console.log('here')
        //update product quantity on frontEnd
        productQuantitySpan.innerText = productQuantity;
        productQuantitySpan.classList.remove('hidden');
        // console.log("here");
        let data = await sendPostReq(`${server}/addToCart`,formData);
        if(data){
            console.log(data);
        }
    }
    catch(e){
        console.log("some error in cartHandler",e);
    }
}

function detailHandler(e){
        let detailBtnParent = e.target.parentElement;
        let details = detailBtnParent.querySelector('p');
        let data = JSON.parse(details.innerText);
        console.log(data);
        createPopup(data);
}

/*
As i am using scripts as module
the functions are scoped inside the module and not accessible from global window scope
which is true when script are not modules
so we have to explicitly set the global function
*/
window.cartHandler = cartHandler;
window.detailHandler = detailHandler;

document.body.addEventListener('click',(e)=>{
    if(e.target.id == 'bodyOverlay'){
        e.target.remove();
    }
})
function createPopup(product){
    let bodyOverlay = document.createElement('div');
    bodyOverlay.id = 'bodyOverlay'
    bodyOverlay.classList.add('h-screen','w-screen','flex','justify-center','items-center','bg-slate-500/50','fixed','top-0');
    let popupWindow = document.createElement('div');
    popupWindow.classList.add('z-10','bg-black/70','w-1/2','h-1/2','rounded-lg','overflow-hidden','flex','justify-around','items-center','backdrop-blur');
    popupWindow.innerHTML = `
        <div class="w-2/6 h-full py-2 flex justify-center items-center">
            <img class="max-h-full" alt="Image Not Found!" src=${product.imgSrc}>
        </div>
        <div class="w-3/6 flex flex-col justify-evenly h-full">
            <div>
                <h5 class="px-2 text-gray-400 ">${product.brand}</h5>
                <p class="px-2">${product.productName}</p>
            </div>    
            <p class="px-2">${product.description}</p>
            <p class="px-2 text-green-500 font-semibold">${product.currency} ${product.price}</p>
        </div>
    `
    bodyOverlay.append(popupWindow)
    document.body.appendChild(bodyOverlay);
    return bodyOverlay;
}
function createCard(product) {
    let card = document.createElement('div');
    card.classList.add('border-gray-300', 'border', 'rounded-md', 'overflow-hidden', 'shadow-white', 'shadow-sm', 'w-52', 'h-72', 'hover:shadow-md', 'dark:hover:shadow-emerald-600', 'dark:shadow-neutral-500', 'dark:bg-neutral-800', 'dark:border-gray-800', 'transition-hover');
    card.innerHTML = `
        <div class="h-4/6 bg-white flex justify-center items-center">
            <img class="max-h-full max-w-full" alt="Image Not Found!" src=${product.imgSrc}>
        </div>
        <div class="">
            <h5 class="px-2 text-gray-400 ">${product.brand}</h5>
            <p class="px-2">${product.productName}</p>
            <div class="flex justify-evenly items-center p-1 m-1">
                <button onclick=detailHandler(event) class="bg-green-300 hover:bg-green-400 rounded p-1 dark:bg-green-700 dark:hover:bg-green-600">Details</button>
                <button onclick=cartHandler(event) class="bg-green-300 hover:bg-green-400 rounded p-1 dark:bg-green-700 dark:hover:bg-green-600c cart">Add to Cart</button>
                <span class="rounded-md bg-green-600 hidden">0</span>
                <p class="data hidden">${JSON.stringify(product)}</p>
            </div>
        </div>`
    return card;
}
