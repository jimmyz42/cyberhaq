
var text = JSON.parse(window.sessionStorage.getItem("puzzleData"))["ciphertext"];
var completeAudio = new Audio("../sound/complete.ogg ");
completeAudio.oncanplaythrough = function ( ) { }
completeAudio.onended = function ( ) { }

$( document ).ready(function() {

	generateCipher(function(mapping) {
		encryptText(mapping, text, function(ciphertext) {
			// $( ".ciphertext" ).html(ciphertext);
			textlist = text.split("");
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

    $('.test-message').click(function() {
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
    	}
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