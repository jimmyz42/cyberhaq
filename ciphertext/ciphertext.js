var messageTexts = [
  "WE WILL MEET AT THE STARBUCKS ON 120 BROADWAY. I AM WEARING 2 HATS",
  "MY NAME IS JACK POTT, AKA IHEARTCRACK420. MEET ME IN THE STARBUCKS IN KENDALL SQ",
  "IHEARTCRACK420 HERE. LET US MEET IN THE CAFE IN THE KENDALL MARIOTT LOBBY FOR OUR DEAL.",
];

var text = messageTexts[Math.floor(Math.random() * (messageTexts.length))];

$( document ).ready(function() {

	var lives = 5;

	document.getElementById("attempts-left").innerHTML = "Attempts Left: " + lives;

	generateCipher(function(mapping) {
		encryptText(mapping, text, function(ciphertext) {
			$( ".ciphertext" ).html(ciphertext);
			ciphertextList = ciphertext.split("");
			ciphertextList.forEach(function(element, index) {
				if (element == " ") {
					$(".message").append("<input type='text' disabled class='message-letter space-box' maxlength='1' value=' '>");
				} 
				else if (element == ".") {
					$(".message").append("<input type='text' disabled class='message-letter space-box' maxlength='1' value='.'>");
				} 
				else if (element == ",") {
					$(".message").append("<input type='text' disabled class='message-letter space-box' maxlength='1' value=','>");
				} 
				else {
					$(".message").append("<input type='text' class='message-letter' maxlength='1'>");
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
    	$(".message-letter").each(function(index, obj) {
    		if ($(this).val() == textlist[index]) {
    			$(this).prop('disabled', true);
    		} else {
    			$(this).val("");
    			correct = false;
    		}
    	})
    	if (correct) {
    		document.getElementById("win-text").innerHTML = "Yayyyyy u win";
    	} else {
    		lives--;
    		document.getElementById("attempts-left").innerHTML = "Attempts Left: " + lives;
    	}
    })
});

var generateCipher = function(callback) {
	alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
	k = Math.floor(Math.random() * (alphanum.length - 1)) + 1;
	ciphermapping = {" " : " ", "." : ".", "," : ","}
	alphanum.forEach(function(element, index) {
		newIndex = (index + k) % alphanum.length;
	    ciphermapping[element] = alphanum[newIndex];
	    if (index == alphanum.length - 1) {
	    	console.log(ciphermapping);
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