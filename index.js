var messageTexts = [
  "WE WILL MEET AT THE STARBUCKS ON 120 BROADWAY. I AM WEARING 2 HATS",
  "MY NAME IS JACK POTT, AKA IHEARTCRACK420. MEET ME IN THE STARBUCKS IN KENDALL SQ",
  "IHEARTCRACK420 HERE. LET US MEET IN THE CAFE IN THE KENDALL MARIOTT LOBBY FOR OUR DEAL.",
];

$( document ).ready(function() {

	$('#urlbar').bind("enterKey",function(e){
	   if ($(this).val() == "https://www.breakmycipher.io") {
	   	
	   }
	});

	$('#urlbar').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
});