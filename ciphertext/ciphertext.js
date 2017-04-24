
var text = JSON.parse(window.sessionStorage.getItem("puzzleData"))["ciphertext"];
var completeAudio = new Audio("../sound/complete.ogg ");
completeAudio.oncanplaythrough = function ( ) { }
completeAudio.onended = function ( ) { }
var solvedCipher = JSON.parse(window.sessionStorage.getItem("solvedCipher"));

$( document ).ready(function() {

	if (solvedCipher) {
		$('#plaintext-modal').modal('show');
		document.getElementById("plaintext-message-modal").innerHTML = text;
	}

	// generateBottomAlphabet();

	generateCipher(function(mapping) {
		encryptText(mapping, text, function(ciphertext) {
			// $( ".ciphertext" ).html(ciphertext);
			textlist = text.split("");
			wordlist = text.split(" ");
			ciphertextList = ciphertext.split("");
			ciphertextList.forEach(function(element, index) {
				if (element == " " || element == "." || element == "," || element == "'") {
					$(".message").append("<div class='message-char'>"
						+ "<h3 class='cipher-char'>" + ciphertextList[index] + "</h3>"
						+ "<input type='text' disabled class='message-letter space-box' maxlength='1' value='" 
						+ element + "'>"
						+ "</div>");
				} 
				else {
					$(".message").append("<div class='message-char'>"
						+ "<h3 class='cipher-char'>" + ciphertextList[index] + "</h3>"
						+ "<input type='text' class='message-letter' maxlength='1'>"
						+ "</div>");
				}
			})
		})
	});

	$('.message-letter').on('input', function (e) {
    	e.target.value = e.target.value.toUpperCase();
        $(this).next().focus();
    });

    $('.message-letter').on("keypress", function (e) {            
	    if (e.keyCode == 13) {
	        updateMessage();
	    }
	});

    $('.test-message').click(function () {
    	updateMessage();
    })
});

var generateCipher = function(callback) {
	alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	k = Math.floor(Math.random() * (alphanum.length - 1)) + 1;
	ciphermapping = {" " : " ", "." : ".", "," : ",", "'" : "'"}
	alphanum.forEach(function(element, index) {
		newIndex = (index + k) % alphanum.length;
	    ciphermapping[element] = alphanum[newIndex];
	    if (index == alphanum.length - 1) {
	    	callback(ciphermapping);
	    }
	});
}

// var generateBottomAlphabet = function() {
// 	alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// 	letters = alphabet.split("");
// 	letters.forEach(function(element, index) {
// 		$(".alphabet").append("<div class='alphabet-char'>"
// 			+ "<h3 class='alpha-letter'>" + element + "</h3>"
// 			+ "<input type='text' disabled id=alph-letter-" + element + "class='message-letter correct space-box' maxlength='1' value='" 
// 			+ "?" + "'>"
// 			+ "</div>");
// 	})
// }

var updateMessage = function() {
    	var correct = true;
    	var textlist = text.split('');
    	var correctletters = []
    	$(".message-letter").each(function(index, obj) {
    		if ($(this).val() == textlist[index]) {
    			correctletters.push($(this).val());
    			$(this).addClass("correct");
    			$(this).prop('disabled', true);
    		} else {
    			$(this).val("");
    			// correct = false;
    		}
    	})
    	$(".message-letter").each(function(index, obj) {
    		if ($.inArray(textlist[index], correctletters) >= 0 || $(this).val() == textlist[index]) {
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
    		alert("Excellent! You decrypted the message. Check this off on your list. Next, go back to the home screen to do the next task.")
    		document.getElementById("win-text").innerHTML = "Excellent! You decrypted the message. Check this off on your list. Next, go back to the home screen to do the next task.";
    		// document.getElementById("win-text").innerHTML = "Yayyyyy u win";
    		$('#plaintext-modal').modal('show');
    		document.getElementById("plaintext-message-modal").innerHTML = text;
    		window.sessionStorage.setItem('solvedCipher', JSON.stringify(true));
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