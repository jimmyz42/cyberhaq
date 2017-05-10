$(document).ready(function() {
    var targetName = window.sessionStorage.getItem('jackName');
    console.log(window.sessionStorage.getItem("jackEmail"));
    if (window.sessionStorage.getItem("solvedMail") == "true") {
        parent.postMessage({
            type: 'chat-box-message',
            message: 'You already have access to your target\'s email.',
        }, '*');

        window.location.href = "inbox.html";
    } else {
        // chatbox message in the beginning of the game
        parent.postMessage({
            type: 'chat-box-message',
            message: 'This should be self explanatory, right? Let\'s send Jack a good email and get them to give away all their information.'
,
        }, '*');

        $('#inputTo').focus();

        $("select.subject-options").change(function() {
            $(".email-content").empty();
            // console.log($( this ).val() + ".png");
            $(".email-content").append('<img id="email-content-image" src="images/' + $(this).val() + '.png" style="width: 100%;"/>')
        }).change();

        $(".send-phishing-email").click(function(event) {
            /* Act on the event */
            event.preventDefault();
            var puzzleData = JSON.parse(window.sessionStorage.getItem('puzzleData'));
            if ($("#inputTo").val() !== window.sessionStorage.getItem('jackEmail')) {
                parent.postMessage({
                    type: 'chat-box-message',
                    message: 'No, no, no, that email is going lead them on. Pick a better one, based on the cipher.',
                }, '*');
                window.location.href = "wrongEmail.html";
            } else {
                var optionName = $(".subject-options option:checked").val();
                if (optionName == puzzleData["phishing"]) {
                    window.sessionStorage.setItem('phishingSuccess', "true");
                    window.sessionStorage.setItem('phishingEmailData', JSON.stringify({
                      name: optionName.charAt(0).toUpperCase() + optionName.substr(1),
                      subject: $(".subject-options option:checked").html(),
                      image: 'images/' + optionName + '.png',
                    }));
                    parent.postMessage({
                        type: 'chat-box-message',
                        message: 'Good job! Now you have access to your target\'s zmail.',
                    }, '*');
                    window.location.href = "success.html";
                } else {
                    window.sessionStorage.setItem('phishingSuccess', "false");
                    parent.postMessage({
                        type: 'chat-box-message',
                        message: 'No, no, no, that email is going lead them on. Pick a better one, based on the cipher.',
                    }, '*');
                    window.location.href = "fail.html";
                }
            }
            //window.location.href = "phishing-animation.html";
        });
    }
});
