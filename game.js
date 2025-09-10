/**
 * The main game manager for the XO application.
 * Manages game state, turns, and win conditions.
 */
import Board from "./board.js";
import { Player } from "./player.js";

export default class XOGame {
    /* Initializes a new game instance.*/
    constructor() {
        this.boardSize = 3;
        this.moves = 0;
        this.players = [new Player('P1', 'X'), new Player('P2', 'O')];
        this.board = new Board(this.boardSize, this.handleMove.bind(this), this.players);
        this.board.setInitialDragState();
        document.querySelector('button[name="playAgain"]').addEventListener('click', this.again);
    }

    /**
     * Processes a move after a successful drop on the board.
     * @param {number} row - The row of the move.
     * @param {number} col - The column of the move.
     * @param {number} playerNumber - The number of the player who made the move.
     */
    handleMove(row, col, playerNumber) {
        this.moves++;
        const currentPlayer = this.players[playerNumber - 1];

        if (this.moves === 1) {
            this.players[0].isActive = false;
            this.players[1].isActive = false;
            currentPlayer.isActive = true;
        }

        const nextPlayerIndex = 1 - (playerNumber - 1);
        const nextPlayer = this.players[nextPlayerIndex];

        this.board.setMarksDragState(nextPlayer.name === 'P1' ? 1 : 2);

        if (this.checkForWin(row, col, currentPlayer.mark)) {
            this.endGame(currentPlayer);
        } else if (this.moves === this.boardSize * this.boardSize) {
            this.endGame(null);
        }
    }

    /**
     * Checks if the current move results in a win.
     * @param {number} row - The row of the last move.
     * @param {number} col - The column of the last move.
     * @param {string} mark - The mark of the current player.
     * @returns {boolean} True if the game is won, otherwise false.
     */
    checkForWin(row, col, mark) {
        const state = this.board.boardState;
        const size = this.boardSize;

        const rowWin = state[row].every(cell => cell === mark);
        const colWin = state.every(r => r[col] === mark);
        const diagWin = (row === col) && state.every((r, i) => r[i] === mark);
        const antiDiagWin = (row + col === size - 1) && state.every((r, i) => r[size - 1 - i] === mark);

        return rowWin || colWin || diagWin || antiDiagWin;
    }

    /**
     * Ends the game, displaying the result and disabling moves.
     * @param {Player|null} winner - The winning player object, or null for a tie.
     */
    endGame(winner) {
        const winnerBoard = document.getElementById("winnerBoard");
        const gameEnd = document.getElementById("gameEnd");
        // Disables dragging for all players
        this.board.setMarksDragState(-1);

        if (winner) {
            winnerBoard.innerHTML = `${winner.name} WINS`;
            gameEnd.innerHTML = "GAME OVER";
        } else {
            winnerBoard.innerHTML = "NO ONE WINS";
            gameEnd.innerHTML = "GAME OVER";
        }
    }

    /* Reloads the page to start a new game. */
    again() {
        location.reload();
    }
}