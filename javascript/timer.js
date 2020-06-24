var destination;
var countDown;
var position;
var stopped = 0;
var myTimer
var minute = 0;
var second = 0;
var beep = new Audio("assets/beep.flac");

$(document).ready(function () {//anonamous fucntion runs when page loads
    $("#reset").prop('disabled', true);
    $("#start").prop('disabled', true);
    $("#ready-spot").html("NOT\nREADY");

    //Loads Timer from Button click
    $("#ready").on('click', function () {
        console.log("Ready");
        $("#reset").prop('disabled', false);
        clearInterval(myTimer);

        if ($("#minutes").val() != "")
            minute = parseFloat($("#minutes").val());

        if ($("#seconds").val() != "")
            second = parseFloat($("#seconds").val());

        if (minute != 0 || second != 0) {
            $("#ready-spot").css("background-color", "green");
            $("#ready-spot").html("NOW\nREADY");
            $("#start").prop('disabled', false);
            $("#counter").html(String("0" + minute).slice(-2) + "." + String("0" + second).slice(-2));
        }

    });

    //Starts Timer from Button click
    $("#start").on('click', function () {
        console.log("Start");
        $("#reset").prop('disabled', true);

        //Clear the timer
        clearInterval(myTimer);

        // Set time to count down to
        if (stopped != 1) {
            destination = new Date();
            countDown = new Date();
            countDown.setTime(destination.getTime() + (minute * 60 * 1000));
            countDown.setTime(countDown.getTime() + (second * 1000));
            //countDown.setTime(countDown.getTime() + (1 * 1000));
        }

        //Set Timer with 1000 milisecond (1 second) increment
        myTimer = setInterval(function () {

            // Get the distance between current time and coundown time
            position = countDown - destination;
            //Increment current time every interval
            destination.setTime(destination.getTime() + (1 * 1000));

            // Time calculations for days, hours, minutes and secondsvar days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((position % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((position % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((position % (1000 * 60)) / 1000);

            //Display Results to HTML Element
            $("#counter").html(String("0" + minutes).slice(-2) + "." + String("0" + seconds).slice(-2));

            //Stop timer when minutes ans seconds both = zero
            if (minutes == 0 && seconds == 0 && hours == 0) {
                clearInterval(myTimer);
                $("#reset").prop('disabled', false);
                beep.play();
            }

        }, 1000);

    });

    //Stops Timer from Button click
    $("#stop").on('click', function () {
        if (minute > 0 || second > 0) {
            stopped = 1;
            console.log("Stopped");
            clearInterval(myTimer);
            $("#reset").prop('disabled', false);
        }

    });

    //Resets Timer from Button click
    $("#reset").on('click', function () {
        clearInterval(myTimer);
        stopped = 0;
        minute = 00;
        second = 00;
        $("#minutes").val("");
        $("#seconds").val("");
        $("#counter").html("");
        $("#reset").prop('disabled', true);
        $("#ready-spot").css("background-color", "darkred");
        $("#start").prop('disabled', true);
        console.log("Reset");
    });
});