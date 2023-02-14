export default class Board {
    grid = null
    constructor(size, player1, player2) {
        this.gridSize = size;
        this.moves = size * size;
        this.player1 = player1;
        this.player2 = player2;
        this.initializeMarks();
        this.initializeSquareGrid();
    }

    initializeMarks() {
        let i = 0
        while (i < this.gridSize + 2) {
            this.positionMarks(this.player1, i + 1, 1);
            this.positionMarks(this.player2, i + 1, 2);
            i++;
        }
    }

    initializeSquareGrid() {
        this.grid = document.getElementById('square-grid');
        for (let r = 0; r < this.gridSize; r++) {
            const row = this.grid.insertRow(r);
            for (let c = 0; c < this.gridSize; c++) {
                const cell = row.insertCell(c);
                cell.setAttribute('id', `${r}${c}`);
                cell.addEventListener('dragover', this.doDragover.bind(this));
                // cell.addEventListener('dragenter', this.allowDrop.bind(this));
                cell.addEventListener('drop', this.doDrop.bind(this));
            }
        }
    }

    positionMarks(player, id, playerNumber) {
        const element = document.createElement('h3');
        element.setAttribute('draggable', true);
        element.setAttribute('id', `${player.mark}${id}`);
        element.innerHTML = player.mark;
        document.getElementById(`player${playerNumber}-box`).append(element);
        document.getElementById(`${player.mark}${id}`).addEventListener('dragstart', this.drag.bind(this, playerNumber))
    }


    drag(playerNumber, event) {
        event.dataTransfer.setData('text', event.target.id);   //data type is 'text' and the value is the id of the draggable element
        event.dataTransfer.setData('player-number', playerNumber);
    }

    doDragover(event) {
        event.preventDefault();
    }

    // allowDrop(event) {
    //     // event.preventDefault();
    //     console.log("drag enter")
    // }

    doDrop(event) {
        const dropzone = event.target;
        if (!Boolean(dropzone.innerHTML)) {
            this.moves--;
            const id = event.dataTransfer.getData('text');
            const playerNumber = event.dataTransfer.getData('player-number');
            const draggedElement = document.getElementById(id);
            dropzone.appendChild(draggedElement);
            event.dataTransfer.clearData();
            const rval = this.checkForWinCondition(event.target.parentNode.rowIndex, event.target.cellIndex, draggedElement.innerHTML);
            this.gameProgressEvaluate(rval, playerNumber);
        }
    }

    gameProgressEvaluate(rval, playerNumber) {
        if (rval.length > 0) {
            this.endGame(rval, playerNumber);
        } else if (this.moves === 0) {
            this.endGame(rval, playerNumber);
        }
        else {
            this.switchPlayer(playerNumber)
        }
    }

    switchPlayer(playerNumber) {
        if (playerNumber == 1) {
            this.player1.toMove = false;
            this.player2.toMove = true;
        } else {
            this.player1.toMove = true;
            this.player2.toMove = false;
        }

        this.setMarksDragState();
    }

    setMarksDragState() {
        document.querySelectorAll('#player1-box > h3:not(#player1-logo)').forEach(elem => {
            elem.setAttribute('draggable', this.player1.toMove)
        })
        document.querySelectorAll('#player2-box > h3:not(#player2-logo)').forEach(elem => {
            elem.setAttribute('draggable', this.player2.toMove)
        })
    }

    checkForWinCondition(row, col, element) {
        let rowMatched = [];
        let columnMatched = [];
        let diagonalMatched = [];
        let antidiagonalMatched = [];

        for (let i = 0; i < this.gridSize; i++) {
            let cell = this.grid.rows[row].cells[i].firstElementChild;
            if (cell?.innerHTML === element) {
                rowMatched.push(cell)
            }
        }
        if (rowMatched.length !== this.gridSize) {
            rowMatched = [];
        }

        for (let i = 0; i < this.gridSize; i++) {
            let cell = this.grid.rows[i].cells[col].firstElementChild;
            if (cell?.innerHTML === element) {
                columnMatched.push(cell)
            } else {
                columnMatched = [];
            }
        }


        if (columnMatched.length !== this.gridSize) {
            columnMatched = [];
        }

        for (let i = 0; i < this.gridSize; i++) {
            let cell = this.grid.rows[i].cells[i].firstElementChild;
            if (cell?.innerHTML === element) {
                diagonalMatched.push(cell)
            } else {
                diagonalMatched = [];
            }
        }

        if (diagonalMatched.length !== this.gridSize) {
            diagonalMatched = [];
        }

        for (let i = 0, j = this.gridSize - 1; i < this.gridSize; i++, j--) {
            let cell = this.grid.rows[i].cells[j].firstElementChild;
            if (cell?.innerHTML === element) {
                antidiagonalMatched.push(cell)
            } else {
                antidiagonalMatched = [];
            }
        }

        if (antidiagonalMatched.length !== this.gridSize) {
            antidiagonalMatched = [];
        }

        return Array.from(new Set([...rowMatched, ...columnMatched, ...diagonalMatched, ...antidiagonalMatched]));
    }


    matchedCells(condition, row, col, element) {
        const cells = [];
        if (condition !== 'antiDiagonal') {
            let i = 0;
        } else {
            for (let i = 0, j = this.gridSize - 1; i < this.gridSize; i++, j--) {
                let cell = this.grid.rows[i].cells[j].firstElementChild;
                if (cell?.innerHTML === element) {
                    antidiagonalMatched.push(cell)
                } else {
                    break;
                }
            }
        }

        function cellvalue() {
            let val;
            if (condition === 'row') {
                val = this.grid.rows[row].cells[i].firstElementChild;
            } else if (condition === 'column') {
                val = this.grid.rows[i].cells[col].firstElementChild;
            } else {
                val = this.grid.rows[i].cells[i].firstElementChild;
            }
            for (let i = 0; i < this.gridSize; i++) {
                if (cell?.innerHTML === element) {
                    cells.push(cell)
                } else {
                    break;
                }
            }
        }
        return cells;
    }

    /**
 * After Win highlight winning position, Dispally Winner and  Game Over notification 
 */
    endGame(cells, playerNumber) {
        const winnerBoard = document.getElementById("winnerBoard"); // Show the Game winner name / Draw 
        const gameEnd = document.getElementById("gameEnd"); // Show Game end
        if (cells.length) {
            for (let i = 0; i < cells.length; i++) {
                document.getElementById(cells[i].id).parentNode.classList.add("winningCell");
                if(playerNumber === '1') {
                    this.player1.win = trued;
                } else {
                    this.player2.win = true;
                }
                winnerBoard.innerHTML = `P${playerNumber} WINS`;
                gameEnd.innerHTML = "GAME OVER";
            }
        } else {
            winnerBoard.innerHTML = "NO ONE WIN";
            gameEnd.innerHTML = "GAME OVER";
        }

    }


}