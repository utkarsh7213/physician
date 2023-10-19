let privacy = document.getElementById('privacy');
const submit_btn = document.getElementById('submit_btn');
submit_btn.addEventListener('click', (e) => {
    const check_valid_no = phone_validation(phone_no.value);
    if(!privacy.checked) {
        e.preventDefault();
        alert("Please accept Terms & Conditions");           
    }

    if (phone_no.value.length > 9) {
        if (check_valid_no === false) {
            phone_no.style.border = 'none';
            phone_no.style.boxShadow = '0 0 3px red';
           e.preventDefault();
        }
        else {
            phone_no.style.border = '';
            phone_no.style.boxShadow = '';
        }
    }
    else {
        e.preventDefault();
    }

    if (password.value.length < 9 || confirm_pass.value.length < 9 || password.value != confirm_pass.value) {
        password.style.border = 'none'; password.style.boxShadow = '0 0 3px red'; 
        confirm_pass.style.border = 'none'; confirm_pass.style.boxShadow = '0 0 3px red';
        e.preventDefault();
    }
    else {
        confirm_pass.style.border = ''; confirm_pass.style.boxShadow = '';
        password.style.border = ''; password.style.boxShadow = '';
    }

});

function phone_validation(number) {
    let pattern = /^\d{10}$/;
    return pattern.test(number);
}
