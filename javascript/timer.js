var destination;
var countDown;
var position;
var stopped = 0;
var rounds = 1;
var round = 1;
var roundTimer;
var breakTimer;
var minute = 0;
var second = 0;
var bMin = 0;
var bSec = 0;
var beep = new Audio("assets/beep.flac");

$(document).ready(function () {//anonamous fucntion runs when page loads
    $("#reset").prop('disabled', true);
    $("#start").prop('disabled', true);
    $("#ready-spot").html("NOT\nREADY");
    $("#round-spot").html("R");

    //Loads Timer from Button click
    $("#ready").on('click', function () {
        Ready();
    });

    //Starts Timer from Button click
    $("#start").on('click', function () {
        console.log("Start");
        $("#reset").prop('disabled', true);
        RunTimer();
    });

    //Stops Timer from Button click
    $("#stop").on('click', function () {
        Stop();
    });

    //Resets Timer from Button click
    $("#reset").on('click', function () {
        Reset();
    });

    function RunTimer() {
        //Clear the timer
        clearInterval(roundTimer);
        $("#round-spot").html(round);
        $("#counter").css("color", "green");
        // Set time to count down to
        if (stopped != 1) {
            destination = new Date();
            countDown = new Date();
            countDown.setTime(destination.getTime() + (minute * 60 * 1000));
            countDown.setTime(countDown.getTime() + (second * 1000));
        }

        //Set Timer with 1000 milisecond (1 second) intervals
        roundTimer = setInterval(function () {

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
                clearInterval(roundTimer);
                $("#reset").prop('disabled', false);
                beep.play();
                if (rounds != round) {
                    Break();
                }
                else{
                    Reset();
                }
            }

        }, 1000);
    }

    function Break() {
        round += 1;
        //Clear the timer
        clearInterval(breakTimer);
        $("#counter").css("color", "darkred");
        $("#round-spot").html("B");
        // Set time to count down to
        if (stopped != 1) {
            destination = new Date();
            countDown = new Date();
            countDown.setTime(destination.getTime() + (bMin * 60 * 1000));
            countDown.setTime(countDown.getTime() + (bSec * 1000));
        }

        //Set Timer with 1000 milisecond (1 second) intervals
        breakTimer = setInterval(function () {

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
                clearInterval(breakTimer);
                $("#reset").prop('disabled', false);
                beep.play();
                RunTimer();
            }

        }, 1000);
    }

    function Ready() {
        console.log("Ready");
        $("#reset").prop('disabled', false);
        clearInterval(roundTimer);

        if ($("#rounds").val() != "") {
            rounds = parseFloat($("#rounds").val());
            $("#round-spot").html(round);
        }
        if ($("#bMin").val() != "")
            bMin = parseFloat($("#bMin").val());

        if ($("#bSec").val() != "")
            bSec = parseFloat($("#bSec").val());

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
    }

    function Stop() {
        if (minute > 0 || second > 0) {
            stopped = 1;
            console.log("Stopped");
            clearInterval(roundTimer);
            clearInterval(breakTimer);
            $("#reset").prop('disabled', false);
        }
    }

    function Reset() {
        clearInterval(roundTimer);
        clearInterval(breakTimer);
        stopped = 0;
        minute = 0;
        second = 0;
        bMin = 0;
        bSec = 0;
        rounds = 0;
        $("#minutes").val("");
        $("#seconds").val("");
        $("#bMin").val("");
        $("#bSec").val("");
        $("#rounds").val("");
        $("#counter").html("");
        $("#reset").prop('disabled', true);
        $("#ready-spot").css("background-color", "darkred");
        $("#ready-spot").html("NOT\nREADY");
        $("#start").prop('disabled', true);
        $("#round-spot").html("R");
        console.log("Reset");
    }
});