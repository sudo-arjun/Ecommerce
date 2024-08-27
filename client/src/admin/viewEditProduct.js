import sendPostReq from '../../functions/sendPostReq.js';
const apiProduct = 'http://localhost:3000/api/product';
let skip = 10, limit = 10;
let loadBtn = document.querySelector('#loadBtn');
let productPg = document.querySelector('#productPg');
loadBtn.addEventListener('click', async () => {
    let response = await fetch(`${apiProduct}?limit=${limit}&&skip=${skip}`)
    let data = await response.json();
    data.forEach((product) => {
        let card = createCard(product);
        console.log('product appended');
        productPg.appendChild(card);
    })
    skip += limit;
    if (data.length < limit) {
        loadBtn.setAttribute('disabled', '');
        // loadBtn.classList.remove('')
        loadBtn.innerText = 'No Data'
    }

})

async function deleteHandler(e) {
    let detailBtnParent = e.target.parentElement;
    let details = detailBtnParent.querySelector('p');
    let {_id} = JSON.parse(details.innerText);
    const serverResp = await fetch(`${apiProduct}/${_id}`,{
        method: "DELETE"
    })
    const serverRespData = await serverResp.json();
    console.log(serverRespData);
    if(serverRespData.msg == 'deleted'){
        const card = detailBtnParent.closest('.card');
        card.remove();
    }
}

function editHandler(e) {
    let detailBtnParent = e.target.parentElement;
    let details = detailBtnParent.querySelector('p');
    let data = JSON.parse(details.innerText);
    let card = detailBtnParent.closest('.card');
    console.log(data);
    createPopup(data, card);
}

window.editHandler = editHandler;
window.deleteHandler = deleteHandler;


async function saveHandler(e,bodyOverlay,_id, card){
    e.preventDefault();
    let form = e.currentTarget;
    let formData = new FormData(form);
    formData.append('_id',_id);
    console.log(formData.get('productImage'));
    try{
        const serverResp = await fetch(apiProduct,{
            method: "PUT",
            body: formData
        })
        const servedData = await serverResp.json();
        console.log(servedData);
        if(servedData.msg == 'updated'){
            bodyOverlay.remove();
            const newCard = createCard(servedData.data);
            card.replaceWith(newCard);
        }
    }
    catch(e){
        console.log("error in saveHandler",e);
    }
    // console.log(formData);
}

function createPopup0(product) {
    let bodyOverlay = document.createElement('div');
    bodyOverlay.id = 'bodyOverlay'
    bodyOverlay.classList.add('h-screen', 'w-screen', 'flex', 'justify-center', 'items-center', 'bg-slate-500/50', 'fixed', 'top-0');
    let popupWindow = document.createElement('div');
    popupWindow.classList.add('z-10', 'bg-black/70', 'w-1/2', 'h-1/2', 'rounded-lg', 'overflow-hidden', 'flex', 'justify-around', 'items-center', 'backdrop-blur');
    popupWindow.innerHTML = `
        <div class="w-2/6 h-full py-2 flex justify-center items-center flex-col">
            <img class="max-h-full" alt="Image Not Found!" src=${product.imgSrc}>
            <input type="file">
        </div>
        <div class="w-3/6 flex flex-col justify-evenly h-full">
            <div>
                <label class="text-gray-200">Brand:</label>
                <input class="px-2 dark:text-white dark:bg-black" value=${product.brand}></input>
            </div>
            <div>
                <label class="text-gray-200">Product Name:</label>
                <input class="px-2 dark:text-white dark:bg-black" value=${product.productName}></input>
            </div>    
                <label class="text-gray-200">Product Description:</label>
                <textarea class="px-2 dark:text-white dark:bg-black" >${product.description}</textarea>
            <div>
                <label class="text-gray-200">Product price:</label>
                ${product.currency} 
                <input class="px-2 dark:text-white dark:bg-black text-green-500 font-semibold" value=${product.price}></input>
            </div>
              <div>
                <label class="text-gray-200">Stock:</label>
                <input class="px-2 dark:text-white dark:bg-black text-green-500 font-semibold" value=${product.quantity}></input>
            </div>
        </div>
    `
    bodyOverlay.append(popupWindow)
    document.body.appendChild(bodyOverlay);
    return bodyOverlay;
}
function createPopup(product, card) {
    // Create the overlay div
    let bodyOverlay = document.createElement('div');
    bodyOverlay.id = 'bodyOverlay';
    bodyOverlay.classList.add(
        'fixed', 'inset-0', 'flex', 'justify-center', 'items-center',
        'bg-slate-500/50', 'backdrop-blur-md', 'z-50'
    );

    // Create the popup window div
    let popupWindow = document.createElement('form');
    popupWindow.classList.add(
        'relative',
        'bg-white', 'dark:bg-gray-900', // Light and dark background colors
        'w-full', 'max-w-4xl', 'p-6', 'rounded-lg', 'shadow-lg',
        'flex', 'flex-col', 'md:flex-row', 'space-y-4', 'md:space-y-0', 'md:space-x-4'
    );

    popupWindow.innerHTML = `
  <button id="closePopup" class="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
    <div class="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center p-4 flex-wrap">
        <img class="w-full h-auto object-cover rounded-lg" alt="Image Not Found!" src="${product.imgSrc}">
        <input type="file" name=productImage class="mt-4 border border-gray-300 p-2 rounded-md" />
    </div>
    <div class="flex-1 flex flex-col space-y-4">
        <div class="flex flex-col space-y-2">
            <label class="text-gray-700 dark:text-gray-300 font-semibold">Brand:</label>
            <input name="productBrand" class="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" value="${product.brand}" />
        </div>
        <div class="flex flex-col space-y-2">
            <label class="text-gray-700 dark:text-gray-300 font-semibold">Product Name:</label>
            <input name="productName" class="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" value="${product.productName}" />
        </div>
        <div class="flex flex-col space-y-2">
            <label class="text-gray-700 dark:text-gray-300 font-semibold">Product Description:</label>
            <textarea name="productDescript" class="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" rows="4">${product.description}</textarea>
        </div>
        <div class="flex flex-col space-y-2">
            <label class="text-gray-700 dark:text-gray-300 font-semibold">Product Price:</label>
            <div class="flex items-center space-x-2">
                <span class="text-green-600 font-semibold">${product.currency}</span>
                <input name="productPrice" class="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white text-green-600 font-semibold" value="${product.price}" />
            </div>
        </div>
        <div class="flex flex-col space-y-2">
            <label class="text-gray-700 dark:text-gray-300 font-semibold">Stock:</label>
            <input name="productQuantity" class="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white text-green-600 font-semibold" value="${product.quantity}" />
        </div>
             <div class="flex justify-end">
            <input type="submit" value="Save" class="dark:hover:bg-green-600 dark:bg-green-800 px-2 py-1 rounded-lg">
        </div>
    </div>
`;

    bodyOverlay.appendChild(popupWindow);
    document.body.appendChild(bodyOverlay);

    //add event listeners
    bodyOverlay.addEventListener('click', (e) => {
        if(e.target == bodyOverlay){
            e.target.remove();
        }
    })
    popupWindow.querySelector('#closePopup')?.addEventListener('click', () => {
        bodyOverlay.remove();
    })
    popupWindow.addEventListener('submit',(e)=>saveHandler(e, bodyOverlay, product._id, card));
    return bodyOverlay;

}

function createCard(product) {
    let card = document.createElement('div');
    card.classList.add('card', 'border-gray-300', 'border', 'rounded-md', 'overflow-hidden', 'shadow-white', 'shadow-sm', 'w-52', 'h-72', 'hover:shadow-md', 'dark:hover:shadow-emerald-600', 'dark:shadow-neutral-500', 'dark:bg-neutral-800', 'dark:border-gray-800', 'transition-hover');
    card.innerHTML = `
        <div class="h-4/6 bg-white flex justify-center items-center">
            <img class="max-h-full max-w-full" alt="Image Not Found!" src=${product.imgSrc}>
        </div>
        <div class="">
            <h5 class="px-2 text-gray-400 ">${product.brand}</h5>
            <p class="px-2">${product.productName}</p>
            <div class="flex justify-evenly items-center p-1 m-1">
                  <button onclick="editHandler(event)" class="bg-green-300 hover:bg-green-400 rounded p-1 dark:bg-green-700 dark:hover:bg-green-600">Edit</button>
                  <button onclick="deleteHandler(event)" class="bg-red-300 hover:bg-red-400 rounded p-1 dark:bg-red-900 dark:hover:bg-red-800 cart">Delete</button>
                  <span class="rounded-md bg-green-600 hidden">0</span>
                <p class="data hidden">${JSON.stringify(product)}</p>
            </div>
        </div>`
    return card;
}
