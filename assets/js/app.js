const getFormData = (formId) => {
    const form = document.getElementById(`${formId}`);
    if (!form) {
        throw new Error(`Form with id "${formId}" not found.`);
    }
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    return formObject;
};

const clearForm = (formId) => {
    const form = document.getElementById(`${formId}`);
    if (!form) {
        throw new Error(`Form with id "${formId}" not found.`);
    }
    form.reset()
}


const generateHtml = (data) => {
    const newHtml = `
 <tr data-product-name="${data.productName}">
    <td class="trashcan-cell"><i class="fas fa-trash-alt delete-row trashcan"></i></td>
    <td><img src="${data.imageUrl}" ></td>
    <td>${data.category}</td>
    <td>${data.price}</td>
    <td>${data.productName}</td>
    </tr>
    `
    return newHtml
}

const deleteRow = (event) => {
    if (event.target.classList.contains('delete-row')) {
        const row = event.target.closest('tr');
        const productName = row.getAttribute('data-product-name');
        row.remove();
        removeFromLocalStorage(productName);
    }
};

const removeFromLocalStorage = (productName) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.productName !== productName);
    localStorage.setItem('products', JSON.stringify(products));
};
document.addEventListener('click', deleteRow);

const renderHtml = (data) => {

    const products = document.getElementById('productsContainer')
    products.innerHTML += data
}

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('addProduct');
//     form.addEventListener('submit', (event) => {
//         event.preventDefault();
//         if (validateForm()) {
//             addProductsToTable('addProduct');
//             clearForm('addProduct');
//         }
//     });
// });

const validateForm = () => {
    let isValid = true;
    const form = document.getElementById('addProduct');
    const productName = form.productName;
    const price = form.price;
    const category = form.category;
    const imageUrl = form.imageUrl;

    if (!productName.value.trim()) {
        productName.classList.add('is-invalid');
        isValid = false;
    } else {
        productName.classList.remove('is-invalid');
    }

    if (!price.value.trim() || isNaN(price.value) || price.value <= 0) {
        price.classList.add('is-invalid');
        isValid = false;
    } else {
        price.classList.remove('is-invalid');
    }

    if (!category.value.trim()) {
        category.classList.add('is-invalid');
        isValid = false;
    } else {
        category.classList.remove('is-invalid');
    }

    if (!imageUrl.value.trim()) {
        imageUrl.classList.add('is-invalid');
        isValid = false;
    } else {
        try {
            new URL(imageUrl.value.trim());
            imageUrl.classList.remove('is-invalid');
        } catch (e) {
            imageUrl.classList.add('is-invalid');
            isValid = false;
        }
    }

    return isValid;
};

const addProductsToTable = (formId) => {
    // event.preventDefault();

    const validation = validateForm()
if (validation) {
    const data = getFormData(formId);
    console.log(data);
    // console.log(data.carName);
    saveProductsToLocalStorage(data);

    let htmlRaw = '';
    htmlRaw += generateHtml(data);
    console.log(htmlRaw);
    renderHtml(htmlRaw);
    clearForm(formId);
}
};

const saveProductsToLocalStorage = (data) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(data);
    localStorage.setItem('products', JSON.stringify(products));
};

const init = () => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let htmlRaw = '';
    for (let i = 0; i < products.length; i++) {
        htmlRaw += generateHtml(products[i]);
    }
    renderHtml(htmlRaw);
};
init();
