
var flag = 0; // flag for win/loss
var step = 0; // No. of steps to complete game Max= 8
// for three dimensional array
var xArray = new Array(3);
for (let ind = 0; ind < 3; ind++) {
    xArray[ind] = new Array(3);
}

var oArray = new Array(3);
for (let ind = 0; ind < 3; ind++) {
    oArray[ind] = new Array(3);
}

var oxBox = document.getElementById("crossBox"); //game  board on which 'X' and 'O' will be placed
var winnerBoard = document.getElementById("winnerBoard"); // Show the Game winner name / Draw 
var gameEnd = document.getElementById("gameEnd"); // Show Game end

/**
 * Start drag evebt
 */
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);   //data type is "text" and the value is the id of the draggable element
}

/**
 * To allow a drop,  the default handling of the element is prevented.
 */
function allowDrop(ev) {
    if (!flag)
        ev.preventDefault();
}

/**
 *  Event when element is dropped
 */
function drop(ev, pos) {

    let i = pos.parentNode.rowIndex;
    let j = pos.cellIndex;
    let data, element, inputX, inputO;


    ev.preventDefault();  //to prevent the browser default handling of the data

    // Check if the dropped area containe any element or not
    if (oxBox.rows[i].cells[j].innerHTML != "X" && oxBox.rows[i].cells[j].innerHTML != "O") {
        //This(= dataTransfer.getData("text")) method will return any data that was set to the same type in the setData() method
        data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));

        element = document.getElementById(data).innerHTML;
        oxBox.rows[i].cells[j].innerHTML = element;
        step++;
        // update inputX and inputO with number of 'X' and 'O' remaining in xBox and oBox 
        inputX = document.getElementById("xBox").getElementsByTagName('h3');
        inputO = document.getElementById("oBox").getElementsByTagName('h3');

        if (element == "X") {
            // disable drag event in xBox
            for (let ix = 0; ix < inputX.length; ix++) {
                document.getElementById("xBox").classList.add("notAllowed");
                inputX[ix].draggable = false;
            }
            // Enable drag event in oBox
            for (let io = 0; io < inputO.length; io++) {
                document.getElementById("oBox").classList.remove("notAllowed");
                inputO[io].draggable = true;
            }
            xArray[i][j] = element;
            // id step > 4 then only check for win condition
            if (step > 4) {
                let moves = this.numberOfMoveRequired(i, j);
                this.checkForWinCondition(moves, xArray, xArray[i][j], i, j);
            }
        }

        else {
            // disable drag event in oBox
            for (let io = 0; io < inputO.length; io++) {
                document.getElementById("oBox").classList.add("notAllowed");
                inputO[io].draggable = false;
            }
            // Enable drag event in xBox
            for (let ix = 0; ix < inputX.length; ix++) {
                document.getElementById("xBox").classList.remove("notAllowed");
                inputX[ix].draggable = true;
            }
            oArray[i][j] = element;
            // id step > 4 then only check for win condition
            if (step > 4) {
                let moves = this.numberOfMoveRequired(i, j);
                this.checkForWinCondition(moves, oArray, oArray[i][j], i, j);
            }
        }
    }
    else {
        alert("This place is already occupied");
    }
    // If game is draw
    if (step == 8 && flag == 0) {
        winnerBoard.innerHTML = "NO ONE WIN";
        gameEnd.innerHTML = "GAME OVER";
        flag = 1;
    }
}

/**
 * Check how many direction(LeftRight, UpDown, Diagonal) we have to move to check win condition
 */
function numberOfMoveRequired(row, col) {
    if (row === col) {
        return 4;
    } else if ((row + col) - 3 == 2 || (row + col) - 3 == 0) {
        return 2;
    } else {
        // (row + col) - 3 == 3 || (row + col) - 3 == 1
        return 3;
    }
}

/**
 * On basis of move value scan the 3X3 Array for win condition
 */
function checkForWinCondition(mov, selectedArray, selectedElement, row, col) {
    let cell1, cell2, cell3;
    if (mov >= 2) {
        if (selectedArray[row][col == 0 ? 2 : Math.abs(col - 1)] == selectedElement && selectedArray[row][col] == selectedElement && selectedArray[row][col == 2 ? 0 : (col + 1) > 2 ? 0 : (col + 1)] == selectedElement) {
            cell1 = '' + row + '' + (col == 0 ? 2 : Math.abs(col - 1));
            cell2 = '' + row + '' + col;
            cell3 = '' + row + '' + (col == 2 ? 0 : (col + 1) > 2 ? 0 : (col + 1));
            this.xoWinnerAndHiglightCells(cell1, cell2, cell3, selectedElement);
        }

        if (selectedArray[row == 0 ? 2 : Math.abs(row - 1)][col] == selectedElement && selectedArray[row][col] == selectedElement && selectedArray[row == 2 ? 0 : (row + 1) > 2 ? 0 : (row + 1)][col] == selectedElement) {
            cell1 = '' + (row == 0 ? 2 : Math.abs(row - 1)) + '' + col;
            cell2 = '' + row + '' + col;
            cell3 = '' + (row == 2 ? 0 : (row + 1) > 2 ? 0 : (row + 1)) + '' + col;
            this.xoWinnerAndHiglightCells(cell1, cell2, cell3, selectedElement);
        }
        if (mov >= 3) {
            if (selectedArray[row == 0 ? 2 : Math.abs(row - 1)][col == 0 ? 2 : Math.abs(col - 1)] == selectedElement && selectedArray[row][col] == selectedElement && selectedArray[row == 2 ? 0 : (row + 1) > 2 ? 0 : (row + 1)][col == 2 ? 0 : (col + 1) > 2 ? 0 : (col + 1)] == selectedElement) {
                cell1 = '' + (row == 0 ? 2 : Math.abs(row - 1)) + '' + (col == 0 ? 2 : Math.abs(col - 1));
                cell2 = '' + row + '' + col;
                cell3 = '' + (row == 2 ? 0 : (row + 1) > 2 ? 0 : (row + 1)) + '' + (col == 2 ? 0 : (col + 1) > 2 ? 0 : (col + 1));
                this.xoWinnerAndHiglightCells(cell1, cell2, cell3, selectedElement);
            }
            if (selectedArray[row == 0 ? 2 : Math.abs(row - 1)][col == 2 ? 0 : (col + 1) > 2 ? 0 : (col + 1)] == selectedElement && selectedArray[row][col] == selectedElement && selectedArray[row == 2 ? 0 : (row + 1) > 2 ? 0 : (row + 1)][col == 0 ? 2 : Math.abs(col - 1)] == selectedElement) {
                cell1 = '' + (row == 0 ? 2 : Math.abs(row - 1)) + '' + (col == 0 ? 2 : Math.abs(col - 1));
                cell2 = '' + row + '' + col;
                cell3 = '' + (row == 2 ? 0 : (row + 1) > 2 ? 0 : (row + 1)) + '' + (col == 0 ? 2 : Math.abs(col - 1));
                this.xoWinnerAndHiglightCells(cell1, cell2, cell3, selectedElement);
            }
        }
    }
}

/**
 * After Win highlight winning position, Dispally Winner and  Game Over notification 
 */
function xoWinnerAndHiglightCells(cell1, cell2, cell3, selectedElement) {
    winnerBoard.innerHTML = `${selectedElement} WIN`;
    gameEnd.innerHTML = "GAME OVER";
    flag = 1;
    document.getElementById(cell1).classList.add("winningCell");
    document.getElementById(cell2).classList.add("winningCell");
    document.getElementById(cell3).classList.add("winningCell");
}

/**
 * Again Reload game
 */
function again() {
    location.reload();
}