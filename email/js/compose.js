$(document).ready(function() {
    var targetName = window.sessionStorage.getItem('jackName');
    console.log(window.sessionStorage.getItem("jackEmail"));
    if (window.sessionStorage.getItem("emailCracked") == "true") {
        parent.postMessage({
            type: 'chat-box-message',
            message: 'You already have access to your target\'s email.',
        }, '*');

        window.location.href = "inbox.html";
    } else {
        // chatbox message in the beginning of the game
        parent.postMessage({
            type: 'chat-box-message',
            message: 'Using information you obtained from previous parts, compose a good phishing email to get zmail credentials of your target.',
        }, '*');

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
                    message: 'You got the recipient zmail address wrong',
                }, '*');
                window.location.href = "wrongEmail.html";
            } else {
                if ($(".subject-options option:checked").val() == puzzleData["phishing"]) {
                    window.sessionStorage.setItem('phishingSuccess', "true");
                    parent.postMessage({
                        type: 'chat-box-message',
                        message: 'Good job! Now you have access to your target\'s zmail.',
                    }, '*');
                    window.location.href = "success.html";
                } else {
                    window.sessionStorage.setItem('phishingSuccess', "false");
                    parent.postMessage({
                        type: 'chat-box-message',
                        message: targetName + ' realized that your email was a phishing attack attempt.',
                    }, '*');
                    window.location.href = "fail.html";
                }
            }
            //window.location.href = "phishing-animation.html";
        });
    }
});
