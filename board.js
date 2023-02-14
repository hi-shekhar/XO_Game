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
        const element = document.createElement('li');
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
        if (!(this.player1.win || this.player1.win)) {
            event.preventDefault();
        }
    }

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
            console.log("rval > 0", rval, this.moves, playerNumber);
            this.endGame(rval, playerNumber);
        } else if (this.moves === 0) {
            console.log("move == 0", rval, this.moves, playerNumber);
            this.endGame(rval, playerNumber);
        }
        else {
            console.log("switch", rval, this.moves, playerNumber);
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
        document.querySelectorAll('#player1-box > li:not(#player1-logo)').forEach(elem => {
            elem.setAttribute('draggable', this.player1.toMove);
            this.player1.toMove ? elem.classList.remove('notAllowed') : elem.classList.add('notAllowed');
            this.player1.toMove ? elem.parentElement.firstElementChild.classList.add('active-player') : elem.parentElement.firstElementChild.classList.remove('active-player');
        })
        document.querySelectorAll('#player2-box > li:not(#player2-logo)').forEach(elem => {
            elem.setAttribute('draggable', this.player2.toMove)
            this.player2.toMove ? elem.classList.remove('notAllowed') : elem.classList.add('notAllowed');
            this.player2.toMove ? elem.parentElement.firstElementChild.classList.add('active-player') : elem.parentElement.firstElementChild.classList.remove('active-player');
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
            }
        }


        if (columnMatched.length !== this.gridSize) {
            columnMatched = [];
        }

        for (let i = 0; i < this.gridSize; i++) {
            let cell = this.grid.rows[i].cells[i].firstElementChild;
            if (cell?.innerHTML === element) {
                diagonalMatched.push(cell)
            }
        }

        if (diagonalMatched.length !== this.gridSize) {
            diagonalMatched = [];
        }

        for (let i = 0, j = this.gridSize - 1; i < this.gridSize; i++, j--) {
            let cell = this.grid.rows[i].cells[j].firstElementChild;
            if (cell?.innerHTML === element) {
                antidiagonalMatched.push(cell)
            }
        }

        if (antidiagonalMatched.length !== this.gridSize) {
            antidiagonalMatched = [];
        }

        return Array.from(new Set([...rowMatched, ...columnMatched, ...diagonalMatched, ...antidiagonalMatched]));
    }

    /**
 * After Win highlight winning position, Dispally Winner and  Game Over notification 
 */
    endGame(cells, playerNumber) {
        const winnerBoard = document.getElementById("winnerBoard"); // Show the Game winner name / Draw 
        const gameEnd = document.getElementById("gameEnd"); // Show Game end
        this.setMarksDragState();
        if (cells.length) {
            for (let i = 0; i < cells.length; i++) {
                document.getElementById(cells[i].id).parentNode.classList.add("winningCell");
                if (playerNumber === '1') {
                    this.player1.win = true;
                    this.player1.toMove = false;
                } else {
                    this.player2.win = true;
                    this.player2.toMove = false;
                }
                winnerBoard.innerHTML = `P${playerNumber} WINS`;
                gameEnd.innerHTML = "GAME OVER";
            }
        } else {
            winnerBoard.innerHTML = "NO ONE WIN";
            gameEnd.innerHTML = "GAME OVER";
        }

        this.setMarksDragState();

    }


}