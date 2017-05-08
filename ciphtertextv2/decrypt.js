
var text = JSON.parse(window.sessionStorage.getItem("puzzleData"))["ciphertext"];

// var solvedCipher = JSON.parse(window.sessionStorage.getItem("solvedCipher"));

var decryptPuzzle = JSON.parse(window.sessionStorage.getItem("puzzleData"))["ciphertext2"];
// var decryptPuzzle = {
//                 "puzzle": ["Add 420", "Subtract 69", "XOR 666", "Multiply 777", "Rotate Right 64"],
//                 "answer": ["Rotate Left 64", "Divide 777", "XOR 666", "Add 69", "Subtract 420"],
//                 "choices": ["AND 666", "OR 666", "Left Shift 64", "Rotate Left 64", "Divide 777", "XOR 666", "Right Shift 64", "Add 69", "Subtract 420", 
//                 "Multiply by 1", "Modulo 9999"]
//             }
console.log(decryptPuzzle);

$(document).ready(function () {

    // if (solvedCipher) {
    //     $('#plaintext-modal').modal('show');
    //     document.getElementById("plaintext-message-modal").innerHTML = text;
    //     parent.postMessage({
    //         type: 'chat-box-message',
    //         message: 'You solved this already.',
    //     }, '*');
    // }

    parent.postMessage({
        type: 'chat-box-message',
        message: "We uploaded the encryption scheme of the messenger.",
    }, '*');

    setTimeout(function() {
        parent.postMessage({
            type: 'chat-box-message',
            message: "Drag the blue blocks into the decryption scheme to write your decryption method.",
        }, '*');
      }, 2000);

    setTimeout(function() {
        parent.postMessage({
            type: 'chat-box-message',
            message: "If you get it right, the message will appear. If not, press the 'Reset' button",
        }, '*');
      }, 4000);

    $('#pieces>div').draggable();
    $('.dec-block').droppable({
        accept: "div.puz-piece",
//        activeClass: "ui-state-hover",
//        hoverClass: "ui-state-active",
        drop: function (event, ui) {
            $(ui.draggable).css('background-color', '#6bb0ff').css({
                top: 0,
                left: 0,
                height:73,
                width: 73
            }).appendTo(this);
            $(ui.draggable).draggable( 'disable' );
            $(this).addClass("dropped");
            var win = true;
            var answer = decryptPuzzle["answer"];
            if ($(".dropped").length == 5) {
                console.log("5");
                $(".dropped").each(function(index, obj) {
                    if ($(this).find("p").text() != answer[index]) {
                        console.log("no win")
                        win = false;
                    }
                })
                if (win) {
                    console.log("win")
                    $('#plaintext-modal').modal('show');
                    document.getElementById("plaintext-message-modal").innerHTML = text;
                    window.sessionStorage.setItem('solvedCipher', JSON.stringify(true));
            
                    parent.postMessage({
                        type: 'chat-box-message',
                        message: "Looks like you decrypted the message. The message says:",
                    }, '*');

                    setTimeout(function() {
                        parent.postMessage({
                            type: 'chat-box-message',
                            message: text,
                        }, '*');
                    }, 2000);

                    setTimeout(function() {
                        parent.postMessage({
                            type: 'chat-box-message',
                            message: "You now know the meeting spot. Use this info to hack the target's wifi. Go to the terminal to continue.",
                        }, '*');
                    }, 6000);
                }
            }
        }
    });

    $(".puz-piece").each(function(index, obj) {
        var choices = decryptPuzzle["choices"];
        $(this).append("<p>" + choices[index] + "</p>");
    })

    setupEncrypt();

    $(".reset-btn").click(function() {
        location.reload();
    })

});

var setupEncrypt = function() {
    var puzzle = decryptPuzzle["puzzle"];
    $(".enc-block").each(function(index, obj) {
        $(this).append("<p>" + puzzle[index] + "</p>");
    })
}