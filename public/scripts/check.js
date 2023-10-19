var selectedPatients = [];
var selectedPatientsData = [];

function storeSelectedPatient(patientID, firstname, lastname, phoneno, email, day, month, year) {
  var isSelected = selectedPatients.some(patient => patient.ID === patientID);
  if (isSelected) {
    selectedPatients = selectedPatients.filter(patient => patient.ID !== patientID);
    selectedPatientsData = selectedPatientsData.filter(data => data.id !== patientID);
  } else {
    selectedPatients.push({ ID: patientID, FirstName: firstname, LastName: lastname, phoneno: phoneno, email: email, day: day, month: month, year: year });

    const formula = document.getElementById('formula').value;
    const vehicle = document.getElementById('vehicle').value;
    const medicine = document.getElementById('medicine').innerText;
    const size = document.getElementById('size').value;
    const price = document.getElementById('cost').innerText;

    const data = {
      formula: formula,
      vehicle: vehicle,
      size: size,
      medicine: medicine,
      id: patientID,
      price: price,
    };
    selectedPatientsData.push(data);
  }
  // console.log(selectedPatients);
}

function submit_form(patientID, button, firstname, lastname, phoneno, email, day, month, year) {
  storeSelectedPatient(patientID, firstname, lastname, phoneno, email, day, month, year);
  button.textContent = selectedPatients.some(patient => patient.ID === patientID) ? 'selected' : 'select';
  // console.log(selectedPatients); 
}

function updateTotalSelect() {
  var totalSelectDiv = $('#total_selected_patients');

  var selectedPatientsDetails = selectedPatients.map(patient => `
  <div class="white-box patient-box patient-informations-box-v2">
  <div class="info-col">
      <div class="info-item">
          <div class="icon-holder">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person icon" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
</svg>
          </div>
          <div class="text-holder">
              <div class="title">Name</div>
              <p>${patient.FirstName} ${patient.LastName}</p>
              
          </div>
      </div>
      <div class="info-item">
          <div class="icon-holder">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope icon" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
</svg>
          </div>
          <div class="text-holder">
              <div class="title">Email Address</div>
              <p><a class="" href="mailto:${patient.email}">${patient.email}</a></p>
          </div>
      </div>
      <div class="info-item">
          <div class="icon-holder">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-rolodex icon" viewBox="0 0 16 16">
  <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
  <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z"/>
</svg>
          </div>
          <div class="text-holder">
              <div class="title">Contact Number</div>
              <p><a href="tel:${patient.phoneno}">${patient.phoneno}</a></p>
          </div>
      </div>
      <div class="info-item">
          <div class="icon-holder">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill icon" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
</svg>
          </div>
          <div class="text-holder">
              <div class="title">Patient ID </div>
              <p>${patient.ID}</p>
          </div>
      </div>

      <div class="info-item">
          <div class="icon-holder">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cake2 icon" viewBox="0 0 16 16">
  <path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683c-.149.034-.293.07-.432.107-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16c2.102 0 4.022-.227 5.432-.603.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12.418 12.418 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22.03 22.03 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a28.708 28.708 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802l-.598-.79Zm-.668 5.556L3 5.524v.967c.311.074.646.141 1 .201V5.315a21.05 21.05 0 0 1 2-.242v1.855c.325.024.659.042 1 .054V5.018a27.685 27.685 0 0 1 2 0v1.964c.341-.012.675-.03 1-.054V5.073c.72.054 1.393.137 2 .242v1.377c.354-.06.689-.127 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356 0 .006-.012.139-.356.356-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5c0-.006.012-.139.356-.356.319-.2.814-.4 1.47-.575ZM15 7.806v1.027l-.68.907a.938.938 0 0 1-1.17.276 1.938 1.938 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9c2.102 0 4.022-.227 5.432-.603.612-.163 1.149-.36 1.568-.591Zm0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.938.938 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426Z"/>
</svg>
          </div>
          <div class="text-holder">
              <div class="title">Patient DOB </div>
              <p>${patient.day}/${patient.month}/${patient.year}</p>
          </div>
      </div>
     
  </div>
</div>`);

  totalSelectDiv.html(selectedPatientsDetails.join('\n'));

  // console.log(selectedPatientsData);
}


$(document).ready(function () {
  var offset = 0;
  var limit = 6;
  var dataCache = {};

  function fetchData() {
    $.ajax({
      url: '/next',
      type: 'GET',
      data: { offset: offset, limit: limit },
      success: function (data) {
        $('#tbodydata').empty();
        $.each(data, function (index, row) {
          var isSelected = selectedPatients.some(patient => patient.ID === row.ID);
          var selectButtonText = isSelected ? 'selected' : 'select';

          var row_data = $('<tr>');
          row_data.append($('<td class="table-name">').text(row.FIRST_NAME));
          row_data.append($('<td class="table-name">').text(row.LAST_NAME));
          row_data.append($('<td class="dob" colspan="2">').text(row.DAY + '/' + row.MONTH + '/' + row.YEAR));
          row_data.append($('<td class="empty">').text(row.PHONENO));
          row_data.append('<td class="empty">' + `<div class="top-flex-item flex-change"> <button type="submit" class="select_btn" onclick="submit_form(${row.ID}, this, '${row.FIRST_NAME}', '${row.LAST_NAME}', '${row.PHONENO}', '${row.EMAIL}', '${row.DAY}', '${row.MONTH}', '${row.YEAR}'), updateTotalSelect()" data-id="${row.ID}">${selectButtonText}</button> </div>` + '</td>');
          $('#table-data #tbodydata').append(row_data);
        });
        dataCache[offset] = data;
        if (data.length < limit) {
          $('#next_btn').prop('disabled', true);
        }
        updateTotalSelect();
        updateSelectedState();
      }
    });
  }

  function updateSelectedState() {
    $('.select_btn').each(function () {
      var button = $(this);
      var patientID = button.data('id');
      var isSelected = selectedPatients.some(patient => patient.ID === patientID);
      button.text(isSelected ? 'selected' : 'select');
    });
  }

  fetchData();

  $('#next_btn').on('click', function () {
    offset += limit;
    fetchData();
  });

  $('#back_btn').on('click', function () {
    if (offset >= limit) {
      $('#next_btn').prop('disabled', false);
      offset -= limit;
      if (dataCache[offset]) {
        $('#tbodydata').empty();
        $.each(dataCache[offset], function (index, row) {
          var isSelected = selectedPatients.includes(row.ID);
          var selectButtonText = isSelected ? 'selected' : 'select';

          var row_data = $('<tr>');
          row_data.append($('<td class="table-name">').text(row.FIRST_NAME));
          row_data.append($('<td class="table-name">').text(row.LAST_NAME));
          row_data.append($('<td class="dob" colspan="2">').text(row.DAY + '/' + row.MONTH + '/' + row.YEAR));
          row_data.append($('<td class="empty">').text(row.PHONENO));
          row_data.append('<td class="empty">' + `<div class="top-flex-item flex-change"> <button type="submit" class="select_btn" onclick="submit_form(${row.ID}, this, '${row.FIRST_NAME}', '${row.LAST_NAME}', '${row.PHONENO}', '${row.EMAIL}', '${row.DAY}', '${row.MONTH}', '${row.YEAR}'), updateTotalSelect()" data-id="${row.ID}">${selectButtonText}</button> </div>` + '</td>');
          $('#table-data #tbodydata').append(row_data);
        });
        updateSelectedState();
      } else {
        offset += limit;
      }
    }
  });

  $('#submit_selected_btn').on('click', function () {
    submit_selected();
  });
});


$(document).ready(function () {
  $('#searchForm').on('submit', function (event) {
    event.preventDefault();
    var search = $('#search').val();
    $.ajax({
      url: '/search_patient',
      method: 'post',
      data: { search: search },
      success: function (response) {
        $('#table-data #tbody').empty();
        response.forEach(function (data) {
          var isSelected = selectedPatients.includes(data.ID);
          var selectButtonText = isSelected ? 'Selected' : 'Select';

          var row = $('<tr>');
          row.append($('<td class="table-name">').text(data.ROW1));
          row.append($('<td class="table-name">').text(data.ROW2));
          row.append($('<td class="dob" colspan="2">').text(data.DATE + '/' + data.MON + '/' + data.YR));
          row.append($('<td class="empty">').text(data.PHONENO));
          row.append('<td class="empty">' + `<div class="top-flex-item flex-change"> <button type="submit" class="select_btn" onclick="submit_form(${data.ID}, this, '${data.ROW1}', '${data.ROW2}', '${data.PHONENO}', '${data.EMAIL}', '${data.DATE}', '${data.MON}', '${data.YR}'), updateTotalSelect()" data-id="${data.ID}">${selectButtonText}</button> </div>` + '</td>');

          $('#table-data #tbody').append(row);
        });
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
});


function submit_selected() {
  if (selectedPatientsData.length > 0) {

    $('#submit_data').html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat spin" viewBox="0 0 16 16">
    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
</svg>`);


    let refills = document.getElementById('options_value');
    let instructions = document.getElementById('instruction');

    const additionalData = {
      refills: refills.value,
      instructions: instructions.value
    };

    // Combine the selectedPatientsData and additionalData
    const requestData = {
      selectedPatientsData: selectedPatientsData,
      additionalData: additionalData
    };

    fetch(`/upload_patient_data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network Error');
        }
        return response.text();
      })
      .then(result => {
        // alert(`Prescription added successfully for selected patients`);
        $('#submit_data').html(`UPLOADED`);
    
        window.location.href = `/patient/id/${selectedPatientsData[0].id}`;
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
}
