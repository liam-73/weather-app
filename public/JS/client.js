const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#pOne');
const messageTwo = document.querySelector('#pTwo');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const address = input.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + address).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                    messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});