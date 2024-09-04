const apiUrl = 'http://localhost:3000/test'; 

async function fetchRecords() {
    const response = await fetch(apiUrl);
    const records = await response.json();
    const tbody = document.querySelector('#recordsTable tbody');
    tbody.innerHTML = '';
    records.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${record.CustomerID}</td>
            <td>${record.Title}</td>
            <td>${record.FirstName}</td>
            <td>${record.LastName}</td>
            <td>${record.Address}</td>
            <td>${record.NationalID}</td>
            <td>${record.Gender}</td>
            <td>${record.DateOfBirth.substring(0, 10)}</td>
            <td>${record.Size}</td>
            <td>${record.Grade}</td>
            <td>${record.ParentCustomerID || ''}</td>
        `;
        tbody.appendChild(tr);
    });
}

async function createRecord() {
    const data = {
        Title: document.getElementById('createTitle').value,
        FirstName: document.getElementById('createFirstName').value,
        LastName: document.getElementById('createLastName').value,
        Address: document.getElementById('createAddress').value,
        NationalID: document.getElementById('createNationalID').value,
        Gender: document.getElementById('createGender').value,
        DateOfBirth: document.getElementById('createDateOfBirth').value,
        Size: document.getElementById('createSize').value,
        Grade: document.getElementById('createGrade').value,
        ParentCustomerID: document.getElementById('createParentCustomerID').value
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Record created successfully');
        fetchRecords();
    } else {
        alert('Error creating record');
    }
}



async function updateRecord() {
    const customerID = document.getElementById('updateCustomerID').value;
    const data = {
        Title: document.getElementById('updateTitle').value,
        FirstName: document.getElementById('updateFirstName').value,
        LastName: document.getElementById('updateLastName').value,
        Address: document.getElementById('updateAddress').value,
        NationalID: document.getElementById('updateNationalID').value,
        Gender: document.getElementById('updateGender').value,
        DateOfBirth: document.getElementById('updateDateOfBirth').value,
        Size: document.getElementById('updateSize').value,
        Grade: document.getElementById('updateGrade').value,
        ParentCustomerID: document.getElementById('updateParentCustomerID').value
    };

    const response = await fetch(`${apiUrl}/${customerID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Record updated successfully');
        fetchRecords();
    } else {
        alert('Error updating record');
    }
}

async function deleteRecord() {
    const customerID = document.getElementById('deleteCustomerID').value;

    const response = await fetch(`${apiUrl}/${customerID}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Record deleted successfully');
        fetchRecords();
    } else {
        alert('Error deleting record');
    }
}



document.addEventListener('DOMContentLoaded', fetchRecords);
