var messageTexts = [
  "WE WILL MEET AT THE STARBUCKS ON BROADWAY. I WILL BE WEARING GOLD SUNGLASSES SMOKING WEED.",
  "MY NAME IS JACK POTT, AKA IHEARTCRACK. MEET ME IN THE STARBUCKS IN KENDALL SQ",
  "IHEARTCRACK HERE. LET US MEET IN THE CAFE IN THE KENDALL MARIOTT LOBBY FOR OUR DEAL. BRING THE STUFF.",
  "THIS IS IHEARTCRACK. I WILL CALL YOU FROM THE STARBUCKS IN KENDALL AT FOUR TWENTY.",
  "WILL BE WAITING IN MY CAR IN FRONT OF THE STARBUCKS IN KENDALL SQ. I WILL BE SNORTING WHITE POWDER FROM MY DASHBOARD."
];

var text = messageTexts[Math.floor(Math.random() * (messageTexts.length))];

$( document ).ready(function() {

	var lives = 10;

	document.getElementById("attempts-left").innerHTML = "Attempts Left: " + lives;

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
    		document.getElementById("win-text").innerHTML = "Yayyyyy u win";
    	} else if (lives == 0) {
    		$("input.message-letter").attr("disabled", true);
    		document.getElementById("win-text").innerHTML = "Oh nooooo u loseeeeee";
    	} else {
    		lives--;
    		document.getElementById("attempts-left").innerHTML = "Attempts Left: " + lives;
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