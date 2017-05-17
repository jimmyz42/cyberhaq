
var text = JSON.parse(window.sessionStorage.getItem("puzzleData"))["ciphertext"];
var buttonAudio = new Audio("../sound/button1.ogg ");
buttonAudio.oncanplaythrough = function ( ) { }
buttonAudio.onended = function ( ) { }

var completeAudio = new Audio("../sound/complete.ogg ");
completeAudio.oncanplaythrough = function ( ) { }
completeAudio.onended = function ( ) { }

var solvedCipher = JSON.parse(window.sessionStorage.getItem("solvedCipher"));
var startingLetters = []
var ciph_mapping = {}

$( document ).ready(function() {

	if (solvedCipher) {
		$('#plaintext-modal').modal('show');
		document.getElementById("plaintext-message-modal").innerHTML = text;
		parent.postMessage({
            type: 'chat-box-message',
            message: 'You solved this already.',
        }, '*');
	} 

	generateUnusedLetters();

	generateBottomAlphabet();

	parent.postMessage({
        type: 'chat-box-message',
        message: "Type the letters you think correspond with the ciphertext, " +
        	"and press 'Update Message' or press enter to check your answer.",
    }, '*');

    setTimeout(function() {
        parent.postMessage({
            type: 'chat-box-message',
            message: "Hint: you can check each letter. If you guess a letter correct that letter is filled out in the rest " +
            	"of the text.",
        }, '*');
      }, 6000);

   

	generateCipher(function(mapping) {
		ciph_mapping = mapping;
		encryptText(mapping, text, function(ciphertext) {
			// $( ".ciphertext" ).html(ciphertext);
			textlist = text.split("");
			wordlist = text.split(" ");
			ciphertextList = ciphertext.split("");
			cipherwordList = ciphertext.split(" ");
			cipherwordList.forEach(function(cipherword, wordIndex) {
				var cipherwordletters = cipherword.split("");
				var div = "<div class='cipherword-div'>";
				cipherwordletters.forEach(function(element, index) {
					if (element == "." || element == "," || element == "'" || element == "-") {
						div += "<div class='message-char'>"
							+ "<h3 class='cipher-char'>" + cipherwordletters[index] + "</h3>"
							+ "<input type='text' disabled class='message-letter space-box' maxlength='1' value='" 
							+ element + "'>"
							+ "</div>";
					} 
					else {
						div += "<div class='message-char'>"
							+ "<h3 class='cipher-char'>" + cipherwordletters[index] + "</h3>"
							+ "<input type='text' class='message-letter' maxlength='1'>"
							+ "</div>";
					}
				})
				$(".message").append(div + "</div>");
				$(".message").append("<div class='message-char'>"
							+ "<h3 class='cipher-char'> </h3>"
							+ "<input type='text' disabled class='message-letter space-box' maxlength='1' value=' '>"
							+ "</div>");
			})
		})

		generateStartingLetters(function(lettersList) {
			startingLetters = lettersList;
			console.log(startingLetters);
			startingLetters.forEach(function(obj, index) {
	    		var startidname = "#alph-letter-" + ciph_mapping[obj];
	    		console.log(startidname);
				if (!$(startidname).hasClass("correct")) {
					$(startidname).val(obj);
					$(startidname).addClass("correct");
				}
				var unusedid = "#unused-letter-" + obj;
				$(unusedid).remove();
	    	})
			updateMessage();
		})
	});

	$('.message-letter').on('input', function (e) {
    	e.target.value = e.target.value.toUpperCase();
        if('A' <= e.target.value && e.target.value <= 'Z') {
          var unfilled = $('.message-letter:not(.space-box, .correct)');
          unfilled.eq(unfilled.index($(this))+1).focus();
        } else {
          e.target.value = '';
        }
    });

    $('.message-letter').on("keypress", function (e) {            
	    if (e.keyCode == 13) {
	        buttonAudio.play()
	        updateMessage();
            $('.message-letter:not(.space-box, .correct):first').focus();
	    }
	});

    $('.test-message').click(function () {
    	buttonAudio.play()
    	updateMessage();
    })
	
});

var generateCipher = function(callback) {
	alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	k = Math.floor(Math.random() * (alphanum.length - 1)) + 1;
	ciphermapping = {" " : " ", "." : ".", "," : ",", "'" : "'", "-":"-"}
	alphanum.forEach(function(element, index) {
		newIndex = (index + k) % alphanum.length;
	    ciphermapping[element] = alphanum[newIndex];
	    if (index == alphanum.length - 1) {
	    	callback(ciphermapping);
	    }
	});
}

var generateStartingLetters = function(callback) {
	var textlist = text.split("");
	var specialCharacters = [" ", ".", "-", "'", ","]
	lets = [];
	while (true) {
		var letter = Math.floor(Math.random() * (textlist.length - 1)) + 1;
		if ($.inArray(textlist[letter], lets) < 0 && ($.inArray(textlist[letter], specialCharacters) < 0)) {
			lets.push(textlist[letter]);
		}
		if (lets.length == 2) {
			callback(lets);
			return;
		}
	}
}

var generateBottomAlphabet = function() {
	alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	letters = alphabet.split("");
	letters.forEach(function(element, index) {
		$(".alphabet").append("<div class='alphabet-char'>"
			+ "<h4 class='alpha-letter'>" + element + "</h4>"
			+ "<input type='text' disabled id='alph-letter-" + element + "' class='alph-message-letter space-box' maxlength='1' value='" 
			+ "-" + "'>"
			+ "</div>");
	})
}

var generateUnusedLetters = function() {
	var ualphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var uletters = ualphabet.split("");
	console.log(uletters);
	uletters.forEach(function(element, index) {
		console.log(element);
		$(".unused-letters").append("<div class='unused-letter'>"
			+ "<h4 id='unused-letter-" + element + "'>" + element + "</h4>"
			+ "</div>");
	});
}

var updateMessage = function() {
    	var correct = true;
    	var textlist = text.split('');
    	var correctletters = startingLetters;
    	$(".message-letter").each(function(index, obj) {
    		if ($(this).val() == textlist[index]) {
    			correctletters.push($(this).val());
    			$(this).addClass("correct");
    			$(this).prop('disabled', true);
    			var ltr = $(this).val();
    			if (document.getElementById("unused-letter-" + ltr)) {
					$("#unused-letter-" + ltr).remove();
    			}
    		} else {
    			$(this).val("");
    			// correct = false;
    		}
    	})
    	$(".message-letter").each(function(index, obj) {
    		if ($(this).hasClass("space-box")) {
    			$(this).css("border", "none");
    			$(this).prop('disabled', true);
    		} else if ($.inArray(textlist[index], correctletters) >= 0 || $(this).val() == textlist[index]) {
    			var idname = "#alph-letter-" + ciph_mapping[$(this).val()];
    			if (!$(idname).hasClass("correct")) {
    				$(idname).val(textlist[index]);
    				$(idname).addClass("correct");
    			}
    			$(this).val(textlist[index]);
    			$(this).addClass("correct");
    			$(this).css("border", "none");
    			$(this).prop('disabled', true);
    		} else {
    			$(this).val("");
    			correct = false;
    		}
    	})
    	if (correct) {
    		completeAudio.play();
    		$('#plaintext-modal').modal('show');
    		document.getElementById("plaintext-message-modal").innerHTML = text;
    		window.sessionStorage.setItem('solvedCipher', JSON.stringify(true));
    		
    		parent.postMessage({
	            type: 'chat-box-message',
	            message: "Looks like you decrypted the message. " + 
	            "I need a meeting location or an email or application he uses. Let's go, time is money.",
	        }, '*');

	        setTimeout(function() {
		        parent.postMessage({
		            type: 'chat-box-prompt',
				    'initial prompt': "Where's the meeting place?",
				    'correct input': JSON.parse(window.sessionStorage.getItem("puzzleData"))["location"],
				    'correct message': "That's right.",
				    'incorrect message': "Not quite. Read the message again.",
                    'opts': ['ignoreCase', 'contains'],
				}, '*');
	        }, 2000);

	        setTimeout(function() {
		        parent.postMessage({
		            type: 'chat-box-prompt',
				    'initial prompt': "Did the message mention any special app/program? What was the name?",
				    'correct input': JSON.parse(window.sessionStorage.getItem("puzzleData"))["phishing"],
				    'correct message': "Right again.",
				    'incorrect message': "Not quite. Read the message again.",
                    'opts': ['ignoreCase'],
				}, '*');
	        }, 4000);

	    	// setTimeout(function() {
		    //     parent.postMessage({
		    //         type: 'chat-box-message',
		    //         message: text,
		    //     }, '*');
	     //    }, 2000);

	        setTimeout(function() {
		        parent.postMessage({
		            type: 'chat-box-message',
		            message: "As far as we know it's probably a drug deal, " + 
		            "but it doesn't seem like it's based on Bexley Co.'s usual pattern of operation. I'll do some research on this.",
		        }, '*');
	        }, 6000);

	        setTimeout(function() {
		        parent.postMessage({
		            type: 'chat-box-message',
		            message: "For now, try to get their email. " + 
		            "You could probably get it by setting up a wi-fi network at the client meeting place. " + 
		            "Minimize this window " + 
		            "and open the aircrack application on Zicronium and create a fake hotspot.",
		        }, '*');
	        }, 10000);

    		// alert("Excellent! You decrypted the message. Check this off on your list. Next, go back to the home screen to do the next task.")
    		
    	}
    }

var encryptText = function(mapping, text, callback) {
	message = text.split('');
	ciphertext = "";
	message.forEach( function(letter, index) {
		ciphertext += mapping[letter];
		if (index == message.length - 1) {
			callback(ciphertext);
		}
	})
}
