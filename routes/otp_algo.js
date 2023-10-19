const numeric_digits = '0123456789';

function generate_OTP(otp_length) {
    let otp = '';

    for (let i = 0; i < otp_length; i++) {
        otp += numeric_digits[Math.floor(Math.random() * numeric_digits.length)];
    }

    return otp;
}

module.exports = generate_OTP;