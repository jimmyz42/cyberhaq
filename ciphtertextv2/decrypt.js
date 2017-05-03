
// var decryptPuzzle = JSON.parse(window.sessionStorage.getItem("puzzleData"))["ciphertext2"];
var decryptPuzzle = {
                "puzzle": ["Add 420", "Subtract 69", "XOR 666", "Multiply 777", "Rotate Right 64"],
                "answer": ["Rotate Left 64", "Divide 777", "XOR 666", "Add 69", "Subtract 420"],
                "choices": ["AND 666", "OR 666", "Left Shift 64", "Rotate Left 64", "Divide 777", "XOR 666", "Right Shift 64", "Add 69", "Subtract 420", 
                "Multiply by 1", "Modulo 9999"]
            }
console.log(decryptPuzzle);

$(document).ready(function () {

    $('#pieces>div').draggable();
    $('#puz>div').droppable({
        accept: "div.puz-piece",
//        activeClass: "ui-state-hover",
//        hoverClass: "ui-state-active",
        drop: function (event, ui) {
            $(ui.draggable).css('background-color', 'red').css({ //you wont need this as your classes will all stay the same.
                top: 0,
                left: 0,
                height:100,
                width: 100
            }).appendTo(this);
            // disable draggable on them also..
        }
    });

    setupEncrypt();

    $(".reset-btn").click(function() {
        location.reload();
    })

});

var setupEncrypt = function() {
    var puzzle = decryptPuzzle["puzzle"];
    $(".enc-block").each(function(index, obj) {
        $(this).append("<p>" + puzzle[index] + "</p>");
        console.log(puzzle[index]);
    })
}