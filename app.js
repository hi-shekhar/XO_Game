
var flag = 0; // flag for win/loss
var step = 0; // No. of steps to complete game Max= 8

// for three dimensional array
var xArray = new Array(3);
for (var k = 0; k < 3; k++) {
    xArray[k] = new Array(3);
}

var oArray = new Array(3);
for (var k = 0; k < 3; k++) {
    oArray[k] = new Array(3);
}

var oxBox = document.getElementById("crossBox"); //game  board on which 'X' and 'O' will be placed
var winnerBoard = document.getElementById("winnerBoard"); // Show the Game winner name / Draw 
var gameEnd = document.getElementById("gameEnd"); // Show Game end


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);   //data type is "text" and the value is the id of the draggable element
}

function allowDrop(ev) {
    if (!flag)
        ev.preventDefault(); //To allow a drop,  the default handling of the element is prevented.
}

function drop(ev, pos) {

    var i = pos.parentNode.rowIndex;
    var j = pos.cellIndex;
    var m, n, data;


    ev.preventDefault();  //to prevent the browser default handling of the data

    if (oxBox.rows[i].cells[j].innerHTML != "X" && oxBox.rows[i].cells[j].innerHTML != "O") {

        data = ev.dataTransfer.getData("text");  //This(= dataTransfer.getData("text")) method will return any data that was set to the same type in the setData() method
        ev.target.appendChild(document.getElementById(data));
        //console.log(data);	
        /*The dragged data is the id of the dragged element ("drag1") Append the dragged element into the drop element*/
        //console.log(ev.cellIndex);
    }

    else {
        alert("This place is already occupied");
    }

    var element = document.getElementById(data).innerHTML;

    oxBox.rows[i].cells[j].innerHTML = element;

    step++;

    if (element == "X") {
        // condition for 'X' win
        var inputX = document.getElementById("xBox").getElementsByTagName('h3');
        for (var ix = 0; ix < inputX.length; ix++) {
            inputX[ix].draggable = false;
        }
        var inputO = document.getElementById("oBox").getElementsByTagName('h3');
        for (var io = 0; io < inputO.length; io++) {
            inputO[io].draggable = true;
        }
        xArray[i][j] = element;
        if (xArray[0][0] == "X" && xArray[0][1] == "X" && xArray[0][2] == "X") {
            winnerBoard.innerHTML = "X WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }

        if (xArray[1][0] == "X" && xArray[1][1] == "X" && xArray[1][2] == "X") {
            winnerBoard.innerHTML = "X WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }

        if (xArray[2][0] == "X" && xArray[2][1] == "X" && xArray[2][2] == "X") {
            winnerBoard.innerHTML = "X WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (xArray[0][0] == "X" && xArray[1][0] == "X" && xArray[2][0] == "X") {
            winnerBoard.innerHTML = "X WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (xArray[0][1] == "X" && xArray[1][1] == "X" && xArray[2][1] == "X") {
            winnerBoard.innerHTML = "X WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (xArray[0][2] == "X" && xArray[1][2] == "X" && xArray[2][2] == "X") {
            winnerBoard.innerHTML = "X WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (xArray[0][0] == "X" && xArray[1][1] == "X" && xArray[2][2] == "X") {
            winnerBoard.innerHTML = "X WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (xArray[0][2] == "X" && xArray[1][1] == "X" && xArray[2][0] == "X") {
            winnerBoard.innerHTML = "X WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }

    }
    else {
        // condition for 'O' win
        var inputO = document.getElementById("oBox").getElementsByTagName('h3');
        for (var ix = 0; ix < inputO.length; ix++) {
            inputO[ix].draggable = false;
        }
        var inputX = document.getElementById("xBox").getElementsByTagName('h3');
        for (var io = 0; io < inputX.length; io++) {
            inputX[io].draggable = true;
        }
        oArray[i][j] = element;
        if (oArray[0][0] == "O" && oArray[0][1] == "O" && oArray[0][2] == "O") {
            winnerBoard.innerHTML = "O WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (oArray[1][0] == "O" && oArray[1][1] == "O" && oArray[1][2] == "O") {
            winnerBoard.innerHTML = "O WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (oArray[2][0] == "O" && oArray[2][1] == "O" && oArray[2][2] == "O") {
            winnerBoard.innerHTML = "O WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (oArray[0][0] == "O" && oArray[1][0] == "O" && oArray[2][0] == "O") {
            winnerBoard.innerHTML = "O WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (oArray[0][1] == "O" && oArray[1][1] == "O" && oArray[2][1] == "O") {
            winnerBoard.innerHTML = "O WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (oArray[0][2] == "O" && oArray[1][2] == "O" && oArray[2][2] == "O") {
            winnerBoard.innerHTML = "O WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (oArray[0][0] == "O" && oArray[1][1] == "O" && oArray[2][2] == "O") {
            winnerBoard.innerHTML = "O WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }
        if (oArray[0][2] == "O" && oArray[1][1] == "O" && oArray[2][0] == "O") {
            winnerBoard.innerHTML = "O WIN";
            gameEnd.innerHTML = "GAME OVER";
            flag = 1;
        }

    }
    // If game is draw
    if (step == 8 && flag == 0) {
        winnerBoard.innerHTML = "NO ONE WIN";
        gameEnd.innerHTML = "GAME OVER";
        flag = 1;
    }
}

// Again Reload game
function again() {
    location.reload();
}