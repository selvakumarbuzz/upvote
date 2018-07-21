var Appname = "";
 function modalhide(modalid) {
    var modalid = "#" + modalid
    $(modalid).modal('hide');

}
function modalshow(modalid) {
    var modalid = "#" + modalid
    $(modalid).modal('show');
}

function convertdate(input) {
            //Eg:dd/mm/yyyy or dd-mm-yyyy
    var map = {
            jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
            jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
        };
        input = input.split(/[-\/]/);
        return new Date(input[2], (map[input[1].toLowerCase()] || input[1]) - 1, input[0]);
}
function formatDate(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day , month,year ].join('/');
}

function yeardiff(fdate, tdate) {
    fdate = convertdate(fdate);
    tdate = convertdate(tdate);
    return parseInt(tdate.getFullYear()) - parseInt(fdate.getFullYear());
}
function monthdiff(d1,d2) {
    var months;
    d1 = convertdate(d1);
    d2 = convertdate(d2);
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
function datediff(d1,d2){
    d1 = convertdate(d1);
    d2 = convertdate(d2);
    var timeDiff = d2.getTime() - d1.getTime();
    return  Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function passwordValidation(myinput, err_id) {
    var myInput = document.getElementById(myinput.id);
    document.getElementById(err_id).innerHTML = ""
    if (myInput.value.length >= 8) {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            valid(myInput);
        } else {
            document.getElementById(err_id).innerHTML = "lowercase missing";
            invalid(myInput);
            return false;
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            valid(myInput);
        } else {
            document.getElementById(err_id).innerHTML = "upperCase missing";
            invalid(myInput);
            return false;
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            valid(myInput);
        } else {
            document.getElementById(err_id).innerHTML = "numbers missing";
            invalid(myInput);
            return false;
        }

        // Validate specialcharacters
        var special = /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/g;
        if (myInput.value.match(special)) {
            valid(myInput);
        } else {
            document.getElementById(err_id).innerHTML = "Special character missing";
            invalid(myInput);
            return false;
        }
    }
    else {
        document.getElementById(err_id).innerHTML = "minimum 8 characters";
        invalid(myInput);
        return false;
    }
    if (myInput.value.length <= 13) {
        valid(myInput);
    } else {
        document.getElementById(err_id).innerHTML = "maximum 13 characters";
        invalid(myInput);
        return false;

    }

}

function valid(myInput) {
    myInput.classList.remove("invalid");
    myInput.classList.add("valid");
}

function invalid(myInput) {
    myInput.classList.remove("valid");
    myInput.classList.add("invalid");
}


function history_previous(){
    var previous=document.referrer;
    if (document.referrer==window.location.origin +'/')
    {
        var confirm_string = confirm("Do you want Logout.!");
        if (confirm_string == true) {
            window.history.back();
        } else {
            return false;
        }
    }
    else
    {
        window.history.back();
    }

}

function history_next(){
    window.history.forward();
}
