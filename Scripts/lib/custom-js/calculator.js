//default to beginning of calculation
var startInput = 0, currentCalc = 0, percentUsed = 0;
//number storage for calculation
var firstValue = "nv", secondValue = "nv", answerValue = "nv";
//use this function when any number button is presed
$('#Button0, #Button1, #Button2, #Button3, #Button4, #Button5, #Button6, #Button7, #Button8, #Button9').click(function () {
    //get the value of the number button
    var buttonNumber = $(this).val();
    //if it is the start of the calculation and the 0 button was pressed do nothing unless it is the second value
    if (startInput == 0 && buttonNumber == 0 && firstValue == "nv") {

    }
    else {
        //if it is the start of the calculation replace the 0 with a number and set calculator to append mode
        if (startInput == 0) {
            $('#calcOut').val(buttonNumber);
            startInput = 1;
        }
        else {
            //append the number to the end of the text
            $('#calcOut').val($('#calcOut').val() + buttonNumber);
        }
    }
});
//if there is no decimal point add a decimal point
$('#ButtonDecimal').click(function () {
    if ($('#calcOut').val().indexOf('.') == -1) {
        $('#calcOut').val($('#calcOut').val() + ".");
        startInput = 1;

    }
    else if (startInput == 0) {
        //if we are starting out with 0. does not visually affect on load, 
        //but after an caculation allows for the decimal to replace the answer
        $('#calcOut').val("0.");
        startInput = 1;
    }
});

//reset the text area and return calculator to replace mode
$('#ButtonClear').click(function () {
    $('#calcOut').val("0");
    startInput = 0;
    $('#ButtonClear').text('AC');
    firstValue = "nv";
    secondValue = "nv";
    answerValue = "nv";
    $('#currentCalc').val("");
});

//use this function whenever a operand was clicked
$('#ButtonPlus, #ButtonMinus, #ButtonMultiply, #ButtonDivide').click(function () {
    //get operand
    var buttonNumber = $(this).val();
    //load in first number
    firstValue = parseFloat($('#calcOut').val());
    //allow starting of input to overwrite
    startInput = 0;
    //set calcuation to operand
    currentCalc = buttonNumber;
    //start tracking
    $('#currentCalc').val($('#currentCalc').val() + " " + firstValue.toString() + " " + $(this).text());
});

// negative-positive switch
$('#ButtonNegative').click(function () {
    $('#calcOut').val($('#calcOut').val() * -1);
});

//percent
$('#ButtonPercent').click(function () {
    if (firstValue != "nv") {
        secondValue = parseFloat($('#calcOut').val());
        secondValue = (firstValue * secondValue) / 100;
        //avoid tiny number errors
        secondValue = parseFloat(secondValue.toPrecision(12));
        percentUsed = 1;
        $('#currentCalc').val($('#currentCalc').val() + " " + secondValue.toString());
    }
});

//equals
$('#ButtonEquals').click(function () {
    //read in second number to avoid excessiv calls of the parseFloat calcOut function
    if (percentUsed == 0 && firstValue != "nv") {
        secondValue = parseFloat($('#calcOut').val());
        $('#currentCalc').val($('#currentCalc').val() + " " + secondValue.toString());
    }
    //1 - plus, 2 - minus, 3 - multiply, 4 - divide
    if (currentCalc == 1) {
        answerValue = firstValue + secondValue;
        //avoid tiny number errors
        answerValue = parseFloat(answerValue.toPrecision(12));
        $('#calcOut').val(answerValue);
        startInput = 0;
        currentCalc = 0;
    }
    else if (currentCalc == 2) {
        answerValue = (firstValue * 10 - secondValue * 10) / 10;
        //avoid tiny number errors
        answerValue = parseFloat(answerValue.toPrecision(12));
        $('#calcOut').val(answerValue);
        startInput = 0;
        currentCalc = 0;
    }
    else if (currentCalc == 3) {
        answerValue = firstValue * secondValue;
        $('#calcOut').val(answerValue);
        startInput = 0;
        currentCalc = 0;
    }
    else if (currentCalc == 4) {
        if (secondValue != 0) {
            answerValue = firstValue / secondValue;
            $('#calcOut').val(answerValue);
            startInput = 0;
            currentCalc = 0;
        }
        else {
            $('#currentCalc').val("Cannot Divide by Zero! ");
            $('#calcOut').val('0');
        }
    }
    else {
        //do nothing 
    }
    if (answerValue != "nv") {
        $('#currentCalc').val($('#currentCalc').val() + " = ");
    }
    percentUsed = 0;
    $('#ButtonClear').text('C');
});