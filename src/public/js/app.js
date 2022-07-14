const contactform = document.querySelector('.contact-form');

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactform.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == 'sucess') {
            alert('Email sent');
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            alert('Something went wrong!');
        }
    }
    xhr.send(JSON.stringify(formData));
})