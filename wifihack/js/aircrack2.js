$(document).ready(function() {

    // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var customShuffle = function(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    setTimeout(function() {
        parent.postMessage({
            type: 'chat-box-message',
            message: 'Now we need to get target\'s zmail. <br /> To do that use the Web version of WifiCrack software to set up fake wifi hotspot at the target\'s location. When target connects to fake wifi hotstop we will be able to get their zmail address.',
        }, '*');
    }, 200);

    var SPEED = 18;
    var words = [];
    var display = document.querySelectorAll('.display')[0]
    var loaderBar = document.querySelectorAll('.loader .bar')[0]
    loaderBar.style.width = '0%';
    var loaderText = document.querySelectorAll('.loader .text')[0]
    var refreshIntervalId = null;

    var jso = JSON.parse(window.sessionStorage.getItem("puzzleData"));
    var wifiName = jso["wifi"];
    var hotel = jso["location"];
    var fakeHotels = ["Hyat", "Mariot", "Endal", "Crudential", "Valker Memorial"];
    var fakeWifis = ["AT&T Wifi", "Xfinity", "eduroam", "CVS Secure"];
    for (var i = 0; i < fakeHotels.length; i++) {
        if (Math.random() < 0.5) {
            fakeWifis.push(fakeHotels[i] + " Free Wifi");
        } else {
            fakeWifis.push(fakeHotels[i] + " Wifi");
        }
    }
    fakeHotels.push(hotel);
    fakeWifis.push(wifiName);

    allHotels = customShuffle(fakeHotels);
    allWifis = customShuffle(fakeWifis);

    for (var h = 0; h < allHotels.length; h++) {
        $(".location-select").append($('<option>', {
            value: allHotels[h],
            text: allHotels[h]
        }));
    }


    for (var w = 0; w < allWifis.length; w++) {
        $(".wifi-select").append($('<option>', {
            value: allWifis[w],
            text: allWifis[w]
        }));
    }


    var connectingToLocation = {
        word: "Connecting to location servers",
        content: "Connecting to location servers...100%",
        percent: 0,
        success: true
    };

    var connectingToLocationFail = {
        word: "Connecting to location servers",
        percent: 0,
        success: false,
        failText: "Unable to connect to location selected. Try selecting different location."
    };

    var checkingWifi = {
        word: "Checking selected wifi",
        content: "Checking selected wifi...100%",
        percent: 0,
        success: true
    };

    var checkingWifiFail = {
        word: "Checking wifi",
        percent: 0,
        success: false,
        failText: "Unable to check wifi with selected name. Try selecting different wifi."
    };

    var connectingUsersMessage = {
        word: "Setting up wifi",
        content: "Setting up wifi...100% <br /><br />**********************************<br />Below are emails of <br />connected users<br />**********************************",
        percent: 0,
        success: true
    }

    var connectingUser1 = {
        word: "Connecting wifi user",
        content: "bubbles@zmail.com",
        percent: 0,
        success: true
    };
    var connectingUser2 = {
        word: "Connecting wifi user",
        content: "spencergreen@zmail.com",
        percent: 0,
        success: true
    };
    var connectingUser3 = {
        word: "Connecting wifi user",
        content: "sparklyprincess@zmail.com",
        percent: 0,
        success: true
    };
    var connectingUser4 = {
        word: "Connecting wifi user",
        content: "420blazeit@zmail.com",
        percent: 0,
        success: true
    };

    var connectingUser5 = {
        word: "Connecting wifi user",
        percent: 0,
        success: false,
        failText: window.sessionStorage.getItem('jackEmail')
    }

    $(".create-hotspot").on("click", function(event) {
        $(".display").html("");
        if ($(".location-select").val() == hotel) {
            if ($(".wifi-select").val() == wifiName) {
                words.push(jQuery.extend(true, {}, connectingToLocation));
                words.push(jQuery.extend(true, {}, checkingWifi));
                words.push(jQuery.extend(true, {}, connectingUsersMessage));
                words.push(jQuery.extend(true, {}, connectingUser1));
                words.push(jQuery.extend(true, {}, connectingUser2));
                words.push(jQuery.extend(true, {}, connectingUser3));
                words.push(jQuery.extend(true, {}, connectingUser4));
                words.push(jQuery.extend(true, {}, connectingUser5));
                refreshIntervalId = setInterval(function() {
                    for (var i = 0; i < words.length; i++) {
                        if (words[i].percent < 100) {
                            words[i].percent += Math.floor(Math.random() * SPEED)
                            loaderBar.style.display = 'block'
                            if (words[i].percent >= 100) {
                                words[i].percent = 100
                                if (words.length - 1 !== i)
                                    loaderBar.style.display = 'none'
                            }
                            break;
                        }
                    }
                    drawConnection(words);
                }, 200)
            } else {
                words.push(jQuery.extend(true, {}, connectingToLocation));
                words.push(jQuery.extend(true, {}, checkingWifiFail));
                refreshIntervalId = setInterval(function() {
                    for (var i = 0; i < words.length; i++) {
                        if (words[i].percent < 100) {
                            words[i].percent += Math.floor(Math.random() * SPEED)
                            loaderBar.style.display = 'block'
                            if (words[i].percent >= 100) {
                                words[i].percent = 100
                                if (words.length - 1 !== i)
                                    loaderBar.style.display = 'none'
                            }
                            break;
                        }
                    }
                    drawConnection(words);
                }, 200)
            }
        } else {
            words.push(jQuery.extend(true, {}, connectingToLocationFail));
            refreshIntervalId = setInterval(function() {
                for (var i = 0; i < words.length; i++) {
                    if (words[i].percent < 100) {
                        words[i].percent += Math.floor(Math.random() * SPEED)
                        loaderBar.style.display = 'block'
                        if (words[i].percent >= 100) {
                            words[i].percent = 100
                            if (words.length - 1 !== i)
                                loaderBar.style.display = 'none'
                        }
                        break;
                    }
                }
                drawConnection(words);
            }, 200)
        }
    });

    function drawConnection(words) {
        display.innerHTML = ''
        words.forEach(function(word) {
            if (word.percent > 0) {
                if (word.percent == 100 && word.success == false) {
                    display.innerHTML += '<div class="line">' + word.failText + '</div>';
                    loaderText.innerHTML = word.failText;
                    checkSuccess();
                    words.splice(0, words.length)
                    clearInterval(refreshIntervalId);
                } else if (word.percent == 100) {
                    display.innerHTML += '<div class="line">' + word.content + '</div>';
                    loaderText.innerHTML = word.word + '...' + word.percent + '%';
                } else {
                    display.innerHTML += '<div class="line">' + word.word + '...' + word.percent + '%</div>';
                    loaderText.innerHTML = word.word + '...' + word.percent + '%';
                }
                loaderBar.style.width = word.percent + '%';
                if (word.percent < 100) {
                    display.scrollTop = 100000;
                }
            }
        });
    }

    var checkSuccess = function() {
        //THE "CORRECT INPUT" check + "Correct message" IS NOT WORKING FOR THE CALL BELOW
        if (words.length == 8) {
            setTimeout(function() {
                parent.postMessage({
                    type: 'chat-box-prompt',
                    'initial prompt': 'What email did you get?',
                    'correct input': window.sessionStorage.getItem('jackEmail'),
                    'correct message': 'Never would have expected to see them use their name as an email address. What an idiot. <br /><br /> No time to waste. Go ahead and phish them.',
                    'incorrect message': 'That doesn\'t seem to be the right email.'
                }, '*');
            }, 200);
        }
    }

});
