function phone_validation(number) {
    let pattern = /^\d{10}$/;
    return pattern.test(number);
}

let phone_no = document.getElementById('phone-number');
phone_no.addEventListener('input', (e) => {
    const valid_no = phone_validation(phone_no.value);
    if (phone_no.value.length > 9) {
        if (valid_no === false) {
            phone_no.style.border = 'none';
            phone_no.style.boxShadow = '0 0 3px red';
            // e.preventDefault();
        }
        else {
            phone_no.style.border = '';
            phone_no.style.boxShadow = '';
        }
    }
});

let password = document.getElementById('password');
password.addEventListener('input', () => {
    if (password.value.length < 9) {
        password.style.border = 'none';
        password.style.boxShadow = '0 0 3px red';
        // e.preventDefault();
    }
    else {
        password.style.border = '';
        password.style.boxShadow = '';
    }
});

let confirm_pass = document.getElementById('confirm-password');
confirm_pass.addEventListener('input', () => {
    if (confirm_pass.value != password.value) {
        confirm_pass.style.border = 'none';
        confirm_pass.style.boxShadow = '0 0 3px red';
        // e.preventDefault();
        
    }
    else {
        confirm_pass.style.border = '';
        confirm_pass.style.boxShadow = '';
    }
});
