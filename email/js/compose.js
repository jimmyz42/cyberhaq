$(document ).ready(function() {
    $("#inputTo").val("jack@pot.com");
    $( ".subject-options" ).change(function () {
        $(".email-content").empty();
        console.log($( this ).val() + ".png");
        $(".email-content").append('<img id="email-content-image" src="images/' + $( this ).val() + '.png" style="width: 100%;"/>')
    }).change();

    $(".send-phishing-email").click(function(event) {
        /* Act on the event */
        event.preventDefault();
        var puzzleData = JSON.parse(window.sessionStorage.getItem('puzzleData'));
        console.log("chosen phish: " + $(".subject-options option:checked").val());
        console.log("correct phish: " + puzzleData["phishing"]);
        if ($(".subject-options option:checked").val() == puzzleData["phishing"])
        {
            window.sessionStorage.setItem('phishingSuccess', true);
            //window.location.href = "success.html?phishingValue=" + $(".subject-options option:checked").val();
        } else {
            window.sessionStorage.setItem('phishingSuccess', false);
            //window.location.href = "fail.html?phishingValue=" + $(".subject-options option:checked").val();
        }
        window.location.href = "phishing-animation.html";
    });
});
