$(document).ready(function() {
    if (window.sessionStorage.getItem("emailCracked") == "true") {
        window.location.href = "inbox.html";
    } else {
        $("select.subject-options").change(function() {
            $(".email-content").empty();
            // console.log($( this ).val() + ".png");
            $(".email-content").append('<img id="email-content-image" src="images/' + $(this).val() + '.png" style="width: 100%;"/>')
        }).change();

        $(".send-phishing-email").click(function(event) {
            /* Act on the event */
            event.preventDefault();
            var puzzleData = JSON.parse(window.sessionStorage.getItem('puzzleData'));
            // console.log("chosen phish: " + $(".subject-options option:checked").val());
            // console.log("correct phish: " + puzzleData["phishing"]);
            if ($("#inputTo").val() != "jackpot@zmail.com") {
                window.location.href = "wrongEmail.html";
            } else {
                if ($(".subject-options option:checked").val() == puzzleData["phishing"]) {
                    window.sessionStorage.setItem('phishingSuccess', "true");
                    window.location.href = "success.html";
                } else {
                    window.sessionStorage.setItem('phishingSuccess', "false");
                    window.location.href = "fail.html";
                }
            }
            //window.location.href = "phishing-animation.html";
        });
    }
});
