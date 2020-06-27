var destination;
var countDown;
var position;
var stopRound = 0;
var stopBreak = 0
var rounds = 1;
var round = 1;
var roundTimer;
var breakTimer;
var running = 1;
var minute = 0;
var second = 0;
var bMin = 0;
var bSec = 0;
var buzzer = new Audio("assets/buzzer.mp3");
var startBell = new Audio("assets/bell-one.mp3");
var endBell = new Audio("assets/bell-two.mp3");

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
        if (running == 1) {
            RunTimer();
        } else {
            Break();
        }
    });

    //Stops Timer from Button click
    $("#stop").on('click', function () {
        Stop();
    });

    //Resets Timer from Button click
    $("#reset").on('click', function () {
        Reset();
    });

    //This function controlls the Rounds time
    function RunTimer() {
        running = 1;
        //Clear the timer
        clearInterval(roundTimer);
        $("#round-spot").html(round);
        $("#counter").css("color", "green");
        $("#start").prop('disabled', true);
        $("#stop").prop('disabled', true);
        startBell.play();
        // Set time to count down to
        if (stopRound != 1) {
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

            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((position % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((position % (1000 * 60)) / 1000);

            //Display Results to HTML Element
            $("#counter").html(String("0" + minutes).slice(-2) + "." + String("0" + seconds).slice(-2));

            //Play Buzzer when does to last 3 seconds
            if (seconds <= 3 && seconds > 0) {
                buzzer.play();
            }
            //Stop timer when minutes ans seconds both = zero
            if (minutes == 0 && seconds == 0) {
                clearInterval(roundTimer);
                $("#reset").prop('disabled', false);
                beep.play();
                if (rounds > round) {
                    endBell.play();
                    Break();
                } else {
                    endBell.play();
                    Reset();
                }
            }

        }, 1000);
    }

    //This function controlls the Break time between rounds 
    function Break() {
        running = 2;
        //Clear the timer
        clearInterval(breakTimer);
        $("#counter").css("color", "darkred");
        $("#round-spot").html("B");
        $("#stop").prop('disabled', false);
        // Set time to count down to
        if (stopBreak != 1) {
            destination = new Date();
            countDown = new Date();
            countDown.setTime(destination.getTime() + (bMin * 60 * 1000));
            countDown.setTime(countDown.getTime() + (bSec * 1000));
        }
        //If break or round stopped decrement round number
        if (stopBreak == 1) {
            stopBreak = 0;
            round -= 1;
        }
        //Increment Round Number
        round += 1;
        //Set Timer with 1000 milisecond (1 second) intervals
        breakTimer = setInterval(function () {

            // Get the distance between current time and coundown time
            position = countDown - destination;
            //Increment current time every interval
            destination.setTime(destination.getTime() + (1 * 1000));

            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((position % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((position % (1000 * 60)) / 1000);

            //Display Results to HTML Element
            $("#counter").html(String("0" + minutes).slice(-2) + "." + String("0" + seconds).slice(-2));

            //Play Buzzer when does to last 3 seconds
            if (seconds <= 3 && seconds > 0) {
                buzzer.play();
            }
            //Stop timer when minutes ans seconds both = zero
            if (minutes == 0 && seconds == 0) {
                clearInterval(breakTimer);
                $("#reset").prop('disabled', false);
                RunTimer();
            }

        }, 1000);
    }

    function Ready() {
        console.log("Ready");
        $("#reset").prop('disabled', false);
        clearInterval(roundTimer);
        clearInterval(breakTimer);

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
            $("#ready-spot").html("NOW\nREADY");
            $("#ready-spot").css("background-color", "green");
            $("#start").prop('disabled', false);
            $("#counter").css("color", "darkred");
            $("#counter").html(String("0" + minute).slice(-2) + "." + String("0" + second).slice(-2));
        }
    }

    function Stop() {
        console.log("Stopped");
        $("#start").prop('disabled', false);
        if (running != 1) {
            if (bMin > 0 || bSec > 0) {
                stopBreak = 1;
                stopRound = 0;
                clearInterval(breakTimer);
            }
        }

        $("#reset").prop('disabled', false);
    }

    function Reset() {
        clearInterval(roundTimer);
        clearInterval(breakTimer);
        stopRound = 0;
        stopBreak = 0;
        minute = 0;
        second = 0;
        bMin = 0;
        bSec = 0;
        rounds = 1;
        round = 1;
        $("#minutes").val("");
        $("#seconds").val("");
        $("#bMin").val("");
        $("#bSec").val("");
        $("#rounds").val("");
        $("#counter").html("");
        $("#counter").css("color", "darkred");
        $("#reset").prop('disabled', true);
        $("#ready-spot").css("background-color", "darkred");
        $("#ready-spot").html("NOT\nREADY");
        $("#start").prop('disabled', true);
        $("#round-spot").html("R");
        console.log("Reset");
    }
});