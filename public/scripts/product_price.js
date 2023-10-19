let price = document.getElementById('cost');
let size = document.getElementById('size');

let size_of_medicine = size.value.replace(/\D/g, "");
let stored_option_value = size_of_medicine;
let size_type = size.value.replace(/[0-9]/g, '');

let price_digits = price.textContent.replace(/\D/g, "");
const store_price = price_digits;

// console.log(size_type);
// console.log("Price of Medicine : " + price_digits);

let product_price_number = parseInt(size_of_medicine);
let product_price_number_static = parseInt(size_of_medicine);
// console.log("Size of Medicine : " + product_price_number);

for (let i = 0; i < 2; i++) {
    let opt = document.createElement('option');
    opt.className = 'selected_size';
    product_price_number += product_price_number_static;
    opt.value = product_price_number + size_type; opt.textContent = product_price_number + size_type;
    size.appendChild(opt);    
}

const selected_size = document.getElementsByClassName('selected_size');
size.addEventListener('change', () => {
if (selected_size[0].selected) {
        price_digits = "35"; price.textContent = '$' + price_digits;
    }
    else if (selected_size[1].selected) {
        price_digits = "70"; price.textContent = '$' + price_digits;
    }
    else if (selected_size[2].selected) {
        price_digits = "90"; price.textContent = '$' + price_digits;
    }
})
