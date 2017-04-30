$(document).ready(function() {
    var $messages = $('.messages-content'),
        d, h, m,
        i = 0;

    $(window).on('load', function() {
        $messages.mCustomScrollbar();
        setTimeout(function() {
            welcomeMessage();
        }, 100);
    });

    function updateScrollbar() {
        $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
            scrollInertia: 10,
            timeout: 0
        });
    }

    function setDate() {
        d = new Date()
        if (m != d.getMinutes()) {
            m = d.getMinutes();
            $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
        }
    }

    function insertMessage() {
        msg = $('.message-input').val();
        if ($.trim(msg) == '') {
            return false;
        }
        $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        $('.message-input').val(null);
        updateScrollbar();
        if (msg == "help") {
            var helpMessage = window.sessionStorage.getItem("helpMessage");
            sendMessage(helpMesage);
        } else {
            setTimeout(function() {
                sendMessage("Do not use this chat unless you need help. We don't want to attract too much attention, in case someone is eavesdropping on our conversation.");
            }, 1000 + (Math.random() * 20) * 100);
        }
    }

    $('.message-submit').click(function() {
        insertMessage();
    });

    $(window).on('keydown', function(e) {
        if (e.which == 13) {
            insertMessage();
            return false;
        }
    })

    var tasks = [
        "You intercepted an encrypted message between the targeted drug lord and one of their super wealthy," +
        " valued customers. Break the cipher to get more information on the client. Be careful though, if there are too many" +
        " attempts you will leave a trail for the drug lord to trace back to you!",
        "Your job is to hack into this person's bank account. Use the URL bar to navigate to different webpages.",
        "Your job is to choose good phishing email (subject options) to get the drug lord's zmail password. Make sure to select the phishing email which will not raise any suspision. Use the credentials to access their Fakebook page.",
        "Your next hack takes place at the meeting place at the scheduled time" +
        "You need to create a rogue wifi hotspot that is named similarly to the official free wifi at the meeting place" +
        "Your goal is to attract people to access to the internet through your wifi"
    ];

    function welcomeMessage() {
        sendMessage("Hi! I'm Anonymous and I will help you hack this guy's bank account. Follow my instructions and do everything as I say to avoid detection. Also, if you're stuck and need help, message 'help' and I'll help you out.")
    }

    function sendMessage(messageText) {
        /*
        if ($('.message-input').val() != '') {
            return false;
        }
        */
        $('<div class="message loading new"><figure class="avatar"><img src="https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
        updateScrollbar();

        setTimeout(function() {
            $('.message.loading').remove();
            $('<div class="message new"><figure class="avatar"><img src="https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji.jpg" /></figure>' + messageText + '</div>').appendTo($('.mCSB_container')).addClass('new');
            setDate();
            updateScrollbar();
            i++;
        }, 1000 + (Math.random() * 20) * 100);
    }
});
