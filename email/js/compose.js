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
        var correctPhish = window.sessionStorage.getItem('puzzleData');
        console.log($(".subject-options option:checked").val());
        if ($(".subject-options option:checked").val() == correctPhish)
        {
            window.location.href = "success.html?phishingValue=" + $(".subject-options option:checked").val();
        } else {
            window.location.href = "fail.html?phishingValue=" + $(".subject-options option:checked").val();
        }
    });
});
