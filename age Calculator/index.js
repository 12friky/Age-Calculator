let btn = document.querySelector('#smt');
let day = document.querySelector('#day');
let month = document.querySelector('#month');
let year = document.querySelector('#year');
let wrong = document.querySelector('#wrong');
let yr = document.querySelector('#yr');
let mth = document.querySelector('#mth');
let dayss = document.querySelector('#dayss');
let birthMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

btn.addEventListener('click', () => {
    let myDay = parseInt(day.value);
    let myMonth = parseInt(month.value);
    let myYear = parseInt(year.value);

    // Check if any of the input fields are empty
    if (!day.value || !month.value || !year.value) {
        showError('Please fill in all fields.');
        return; // Stop execution if any field is empty
    }

    if (isNaN(myDay) || isNaN(myMonth) || isNaN(myYear)) {
        showError('Please enter valid numeric values for day, month, and year.');
    } else if (myDay < 1 || myDay > 32) {
        showError('The day must be between 1 and 32');
    } else if (myMonth < 1 || myMonth > 12) {
        showError('The month must be between 1 and 12');
    } else if (myYear < 1000 || myYear > 10000) {
        showError('The year must be between 1000 and 10000');
    } else {
        let currentDate = new Date();
        let userBirthDate = new Date(myYear, myMonth - 1, myDay); // Month is 0-indexed
        let ageInMilliseconds = currentDate - userBirthDate;

        let ageYear = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
        let ageMonth = Math.floor((ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
        let ageDay = Math.floor((ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));

        yr.textContent = ageYear + ' years';
        mth.textContent = ageMonth + ' months';
        dayss.textContent = ageDay + ' days';

        // Check if it's the user's birthday
        if (myMonth === currentDate.getMonth() + 1 && myDay === currentDate.getDate()) {
            displayBirthdayMessage('Hurray! Today is your birthday!');
        } else {
            displayNextBirthdayMessage(myMonth, myDay);
        }
    }
});

function showError(message) {
    wrong.style.display = 'flex';
    wrong.style.color = 'red';
    wrong.textContent = message;
}

function displayBirthdayMessage(message) {
    wrong.style.display = 'flex';
    wrong.style.color = 'green';
    wrong.textContent = message;
}

function displayNextBirthdayMessage(birthMonth, birthDay) {
    let currentDate = new Date();
    let nextBirthday = new Date(currentDate.getFullYear(), birthMonth - 1, birthDay);

    if (currentDate > nextBirthday) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }

    let daysUntilNextBirthday = Math.floor((nextBirthday - currentDate) / (24 * 60 * 60 * 1000));

    wrong.style.display = 'flex';
    wrong.style.color = 'green';
    wrong.textContent = 'Your next birthday will be in ' + daysUntilNextBirthday + ' days on ' + birthMonths[birthMonth - 1] + ' ' + birthDay;
}
