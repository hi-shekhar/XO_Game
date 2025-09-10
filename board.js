/**
 * Manages the game board's state and UI.
 * Handles user interactions via drag-and-drop events.
 */
export default class Board {
    /**
     * Initializes the board with the given size and player information.
     * @param {number} size - The size of the grid (e.g., 3 for a 3x3 board).
     * @param {function} onMoveCallback - A callback to notify the game manager of a move.
     * @param {Player[]} players - The list of player objects.
     */
    constructor(size, onMoveCallback, players) {
        this.gridSize = size;
        this.onMoveCallback = onMoveCallback;
        this.players = players;
        this.grid = null;
        this.boardState = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(''));
        this.moves = 0;
        this.initializeSquareGrid();
        this.initializeMarks();
    }

    /* Creates and positions the draggable marks for each player. */
    initializeMarks() {
        const marksNeeded = Math.ceil((this.gridSize * this.gridSize) / 2);
        let i = 0;
        while (i < marksNeeded) {
            this.positionMark(this.players[0], i + 1, 1);
            this.positionMark(this.players[1], i + 1, 2);
            i++;
        }
    }

    /**
     * Creates a single draggable mark element.
     * @param {Player} player - The player object.
     * @param {number} id - The unique ID for the mark.
     * @param {number} playerNumber - The player's number (1 or 2).
     */
    positionMark(player, id, playerNumber) {
        const element = document.createElement('li');
        element.setAttribute('draggable', true);
        element.setAttribute('id', `${player.mark}${id}`);
        element.innerHTML = player.mark;
        document.getElementById(`player${playerNumber}-box`).append(element);
        element.addEventListener('dragstart', this.drag.bind(this, playerNumber));
    }

    /* Renders the HTML grid for the game board. */
    initializeSquareGrid() {
        this.grid = document.getElementById('square-grid');
        this.grid.innerHTML = '';
        for (let r = 0; r < this.gridSize; r++) {
            const row = this.grid.insertRow(r);
            for (let c = 0; c < this.gridSize; c++) {
                const cell = row.insertCell(c);
                cell.setAttribute('id', `cell-${r}-${c}`);
                cell.addEventListener('dragover', this.doDragover.bind(this));
                cell.addEventListener('drop', this.doDrop.bind(this, r, c));
            }
        }
    }

    /**
     * Handles the `dragstart` event, setting the data to be transferred.
     * @param {number} playerNumber - The player's number (1 or 2).
     * @param {Event} event - The drag event.
     */
    drag(playerNumber, event) {
        const player = this.players[playerNumber - 1];
        if (player.isActive) {
            event.dataTransfer.setData('text/plain', event.target.id);
            event.dataTransfer.setData('player-number', playerNumber);
            event.dataTransfer.setData('mark', player.mark);
        } else {
            event.preventDefault();
        }
    }

    /**
     * Handles the `dragover` event, allowing a drop on empty cells.
     * @param {Event} event - The drag event.
     */
    doDragover(event) {
        const cell = event.target;
        if (cell.tagName === 'TD' && cell.innerHTML === '') {
            event.preventDefault();
        }
    }

    /**
     * Handles the `drop` event, updating the board state and UI.
     * @param {number} row - The row index of the drop.
     * @param {number} col - The column index of the drop.
     * @param {Event} event - The drag event.
     */
    doDrop(row, col, event) {
        event.preventDefault();
        const dropzone = event.target;
        const draggedElementId = event.dataTransfer.getData('text/plain');
        const playerNumber = event.dataTransfer.getData('player-number');
        const draggedMark = event.dataTransfer.getData('mark');

        if (dropzone.innerHTML === '') {
            const draggedElement = document.getElementById(draggedElementId);
            dropzone.appendChild(draggedElement);
            this.moves++;
            this.boardState[row][col] = draggedMark;
            this.onMoveCallback(row, col, parseInt(playerNumber));
        }
    }

    /**
     * Sets the draggable state and visual style for the players' marks.
     * @param {number} activePlayerNumber - The number of the currently active player.
     */
    setMarksDragState(activePlayerNumber) {
        this.players.forEach((player, index) => {
            const playerNumber = index + 1;
            const isActive = playerNumber === activePlayerNumber;
            player.isActive = isActive;
            const playerBox = document.getElementById(`player${playerNumber}-box`);

            playerBox.querySelector('li').classList.toggle('active-player', isActive);

            playerBox.querySelectorAll('li:not(:first-child)').forEach(elem => {
                elem.setAttribute('draggable', isActive);
                elem.classList.toggle('notAllowed', !isActive);
            });
        });
    }

    /* Sets the initial state where all players are active to start the game. */
    setInitialDragState() {
        this.players.forEach((player, index) => {
            const playerBox = document.getElementById(`player${index + 1}-box`);
            player.isActive = true;
            playerBox.querySelector('li').classList.add('active-player');
            playerBox.querySelectorAll('li:not(:first-child)').forEach(elem => {
                elem.setAttribute('draggable', true);
            });
        });
    }
}
