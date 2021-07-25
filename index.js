// Do this when the submit button is clicked
btn1Clicked = false;

document.getElementById("btn1-id").addEventListener("click", () => {
    btn1Clicked = true;
});

window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        btn1Clicked = true;
    }

});

// Calculate the age
function calAge(birthDay, birthMonth, birthYear, hourOfBirth, minOfBirth, secOfBirth) {
    let currentDate = new Date();

    // Get current date and time

    currentDay = currentDate.getDate();
    currentMonth = currentDate.getMonth() + 1;
    currentYear = currentDate.getFullYear();
    currentHours = currentDate.getHours() - hourOfBirth;
    currentMinutes = currentDate.getMinutes() + 1 - minOfBirth;
    currentSeconds = currentDate.getSeconds() + 1 - secOfBirth;

    // getDaysOfMonth(birthMonth, birthYear);

    let noOfDaysInBirthMonth = getDaysOfMonth(birthMonth, currentYear);
    let noOfDaysInPreBirthMonth = getDaysOfMonth(birthMonth - 1, currentYear);


    // calculation of Age in year, month, days for different conditions 

    if (currentMonth < birthMonth) {
        ageYear = currentYear - birthYear - 1;
        ageMonth = (12 - birthMonth) + (currentMonth - 1);
        ageDay = (noOfDaysInBirthMonth - birthDay) + (currentDay);
    }
    else if (currentMonth > birthMonth) {
        ageYear = currentYear - birthYear;
        ageMonth = currentMonth - birthMonth - 1;
        ageDay = (noOfDaysInBirthMonth - birthDay) + (currentDay);
    }
    else if (currentMonth === birthMonth) {
        ageDay = Math.abs(currentDay - birthDay);
        if (birthDay > currentDay) {
            ageYear = currentYear - birthYear - 1;
            ageMonth = 11;
            ageDay = noOfDaysInPreBirthMonth - (birthDay - currentDay);
        }
        else if (birthDay < currentDay) {
            ageYear = currentYear - birthYear;
            ageMonth = 0;
            ageDay = currentDay - birthDay;
        }
        else if (birthDay === currentDay) {
            // console.log("happy birthday!!!")
            ageYear = currentYear - birthYear;
            ageMonth = 0;
            ageDay = 0;
        }
    }

    // If Age in days, hours, min, sec goes out of limit , then these line bring it back under the limits 

    if (ageDay >= 30) {
        ageDay -= 30;
        ageMonth += 1;
    }

    if (currentHours < 0) {
        ageDay -= 1;
        currentHours += 24;
    }

    if (currentMinutes < 0) {
        currentHours -= 1;
        currentMinutes += 60;
    }

    if (currentSeconds < 0) {
        currentMinutes -= 1;
        currentSeconds += 60;
    }



    return ("Age:" + " <br> " + ageYear + " Years " + ageMonth + " Months " + ageDay + " Days " + "<br>" + currentHours + " Hours " + currentMinutes + " Mins " + currentSeconds + " Secs");
}


function displayAge() {

    let currentDate = new Date();

    currentYear = currentDate.getFullYear();

    // Taking all the inputs given by the user
    let dayOfBirth = parseInt(document.getElementById("day").value);
    let monthOfBirth = parseInt(document.getElementById("month").value);
    let yearOfBirth = parseInt(document.getElementById("year").value);

    let hourOfBirth = parseInt(document.getElementById("hour").value);
    let minOfBirth = parseInt(document.getElementById("min").value);
    let secOfBirth = parseInt(document.getElementById("sec").value);

    // checking if button is clicked and checking the input values

    if (btn1Clicked === true && allInputIsCorrect(dayOfBirth, monthOfBirth, yearOfBirth)) {

        // Checking hours inputs

        if (checkTimeInput(hourOfBirth, 0, 24, "hour")) {
            hourOfBirth = 0;
        }

        if (checkTimeInput(minOfBirth, 0, 60, "min")) {
            minOfBirth = 0;
        }

        if (checkTimeInput(secOfBirth, 0, 60, "sec")) {
            secOfBirth = 0;
        }

        // Setting value of birth hour min sec to 0 if not specified

        if (isNaN(hourOfBirth)) {
            hourOfBirth = 0;
        }
        if (isNaN(minOfBirth)) {
            minOfBirth = 0;
        }
        if (isNaN(secOfBirth)) {
            secOfBirth = 0;
        }


        let age = calAge(dayOfBirth, monthOfBirth, yearOfBirth, hourOfBirth, minOfBirth, secOfBirth);

        result = document.getElementById("result");
        note = document.getElementById("note");
        timeInput = document.getElementById("time-input");
        result.innerHTML = (age);
        result.style.display = "flex";
        note.style.display = "flex";
        timeInput.style.display = "flex";

        document.getElementById("day").style.backgroundColor = "white";
        document.getElementById("day").style.border = " none";

        document.getElementById("month").style.backgroundColor = "white";
        document.getElementById("month").style.border = " none";

        document.getElementById("year").style.backgroundColor = "white";
        document.getElementById("year").style.border = " none";
    }

    // if given inputs are wrong

    else {

        timeInput = document.getElementById("time-input");
        result.style.display = "none";
        note.style.display = "none";
        timeInput.style.display = "none";

        document.getElementById("day").style.backgroundColor = "white";
        document.getElementById("day").style.border = " none";

        document.getElementById("month").style.backgroundColor = "white";
        document.getElementById("month").style.border = " none";

        document.getElementById("year").style.backgroundColor = "white";
        document.getElementById("year").style.border = " none";

        if (dayOfBirth >= 32 || dayOfBirth <= 0) {
            document.getElementById("day").style.backgroundColor = "rgb(238, 167, 167)";
            document.getElementById("day").style.border = " 2px solid red";

        }

        if (monthOfBirth >= 13 || monthOfBirth <= 0) {
            document.getElementById("month").style.backgroundColor = "rgb(238, 167, 167)";
            document.getElementById("month").style.border = " 2px solid red";
        }

        if (yearOfBirth > currentYear || yearOfBirth < 1000) {
            document.getElementById("year").style.backgroundColor = "rgb(238, 167, 167)";
            document.getElementById("year").style.border = " 2px solid red";
        }

    }
}

setInterval(displayAge, 1000);


// Leap year function

function isLeapYear(year) {
    if (year % 4 == 0) {
        return true;
    }
    else {
        return false;
    }
}

// Calculation of days in month

function getDaysOfMonth(month, currentYear) {
    monthsWithThirtyDays = [4, 6, 9, 11];
    monthsWithThirtyOneDays = [1, 3, 5, 7, 8, 10, 12];

    result = 0

    if (month == 0) {
        month = 12;
    }

    monthsWithThirtyDays.forEach(element => {
        if (element == month) {
            // console.log("30");
            result = 30;
        }
    });

    monthsWithThirtyOneDays.forEach(element => {
        if (element == month) {
            // console.log("31");
            result = 31;
        }
    });

    if (month == 2) {
        if (isLeapYear(currentYear)) {
            // console.log("29"); 
            result = 29;
        }
        else {
            // console.log("28");
            result = 28;
        }
    }

    return (result);

}

// All inputs correct

function allInputIsCorrect(dayOfBirth, monthOfBirth, yearOfBirth) {
    isCorrect = false;
    let currentDate = new Date();
    currentYear = currentDate.getFullYear();
    if (dayOfBirth < 32 && monthOfBirth < 13 && yearOfBirth <= currentYear && dayOfBirth > 0 && monthOfBirth > 0 && yearOfBirth >= 1000) {
        isCorrect = true;
    }
    return isCorrect;
}

function checkTimeInput(hourOfBirth, lowerLimit, upperLimit, id) {
    isWrong = false;
    if (hourOfBirth >= lowerLimit && hourOfBirth < upperLimit) {
        document.getElementById(id).style.border = "none";
        document.getElementById(id).style.backgroundColor = "white";

    }
    else if (hourOfBirth < lowerLimit || hourOfBirth >= upperLimit) {
        document.getElementById(id).style.border = "2px solid red";
        document.getElementById(id).style.backgroundColor = "rgb(238, 167, 167)";
        isWrong = true
    }
    return (isWrong);
}
