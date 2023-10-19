const InterFAX = require('interfax');
require('dotenv').config();

const interfax = new InterFAX({
  username: process.env.FAX_USERNAME,
  password: process.env.FAX_PASSWORD
});

function sendFax(file_path) {
  // console.log(file_path);
  interfax.outbound.deliver({
    faxNumber: process.env.FAX_NUMBER,
    file: file_path
  })
    .then(fax => {
      console.log("Fax Sent Successfully");
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = sendFax;
