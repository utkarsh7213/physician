const medicine = document.getElementById('medicine2').textContent;
const wrap_details = document.getElementById('wrap_details');
const string = medicine.replace(/\//g, "");
// const extract_medicine_per = string.match(/\S+\s\d+%/g);
const extract_medicine_per = string.match(/\S+\s\d+(\.\d+)?%/g);

for (let i = 0; i < extract_medicine_per.length; i++) {
    const div_element = document.createElement('div');
    div_element.className = "selection-item small-item final wrap";
    wrap_details.appendChild(div_element);
    const input_element = document.createElement('input');
    input_element.type = "text"; input_element.readOnly = true;
    input_element.value = extract_medicine_per[i];
    div_element.appendChild(input_element);
}


let medicine_title = document.getElementById('medicine2');
// const updatedMedicineText = medicine_title.textContent.replace(/\S+\s\d+%\/?/g, '');

const updatedMedicineText = medicine_title.textContent.replace(/\d+(\.\d+)?% ?/g, '');
medicine_title.textContent = updatedMedicineText;
