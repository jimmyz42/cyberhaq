$( document ).ready(function() {

	var urldata = "https://www.galacticbank.com https://www.breakmycipher.io https://www.fakebook.com https://www.cybermail.com".split(" ");
	$(".autocomplete").autocomplete({
		source: urldata,
		messages: {
			noResults: '',
			results: function() {}
    	}
    });

	$('#urlbar').bind("enterKey",function(e){
	   if ($(this).val() === "https://www.breakmycipher.io") {
	   		document.getElementById('webpage-iframe').src = "ciphertext/ciphertext.html"
	   		document.getElementById("instruction-text").innerHTML = "You intercepted an encrypted message between the targeted drug lord and one of their super wealthy,"
	   			+ " valued customers. Break the cipher to get more information on the client. Be careful though, if there are too many"
	   			+ " attempts you will leave a trail for the drug lord to trace back to you!"
	   }
	   if ($(this).val() == "https://www.fakebook.com") {
			document.getElementById('webpage-iframe').src = "fakebook/fakebook.html"
			document.getElementById("instruction-text").innerHTML = "Enter the username and password for Fakebook.";
	   }
       if ($(this).val() === "https://www.galacticbank.com") {
            document.getElementById('webpage-iframe').src = "bank/login.html"
            document.getElementById("instruction-text").innerHTML = "Your job is to hack into this person's bank account. Use the URL bar to navigate to different webpages.";
       }
	   if ($(this).val() === "https://www.cybermail.com") {
			document.getElementById('webpage-iframe').src = "email/compose.html"
			document.getElementById("instruction-text").innerHTML = "Your job is to choose good phishing email (subject options) to get the person's cybermail password. Make sure to select most convincing phishing email.";
	   }
       if ($(this).val() === "terminal") {
            document.getElementById('webpage-iframe').src = "wifihack/index.html"
            document.getElementById("instruction-text").innerHTML = "Your job is to hack into this person's bank account. Use the URL bar to navigate to different webpages.";
       }
	});

	$('#urlbar').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
});
