$( document ).ready(function() {

	var urldata = "https://www.galacticbank.com https://www.breakmycipher.io".split(" ");
	$(".autocomplete").autocomplete({
		source: urldata,
		messages: {
			noResults: '',
			results: function() {}
    	}
    });

	$('#urlbar').bind("enterKey",function(e){
	   if ($(this).val() == "https://www.breakmycipher.io") {
	   		document.getElementById('webpage-iframe').src = "ciphertext/ciphertext.html"
	   		document.getElementById("instruction-text").innerHTML = "You intercepted an encrypted message between the targeted drug lord and one of their super wealthy,"
	   			+ " valued customers. Break the cipher to get more information on the client!";
	   }
	   if ($(this).val() == "https://www.fakebook.com") {
			document.getElementById('webpage-iframe').src = "fakebook/fakebook.html"
			document.getElementById("instruction-text").innerHTML = "Enter the username and password for Fakebook.";
	   }
	});

	$('#urlbar').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
});
