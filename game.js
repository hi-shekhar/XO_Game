import Board from "./board.js";
import { Player } from "./player.js";

export default class XOGame {
    constructor() {
        console.log("Get the XO Game");
        // this.initialize();
        this.boardSize = 3;
        this.initializeBoard();
    }


    // initialize() {
    //     document.querySelectorAll(["input[name='board-size'"]).forEach((elem) => {
    //         elem.addEventListener('change', (event) => {
    //             // this.boardSize = event.target.value;
    //             // this.initializeBoard();
    //             this.resetBoard()
    //         })
    //     })
    // }

    initializeBoard() {
        const player1 = new Player('P1', 'X');
        const player2 = new Player('P2', 'O');
        const board = new Board(this.boardSize, player1, player2);
        document.querySelector('button[name = "playAgain"]').addEventListener('click', this.again)
    }

    // resetBoard() {
    //     document.querySelectorAll('div.marks-reserve').forEach(elem =>{
    //         console.log("elem", elem)
    //         elem.childNodes.forEach(child => {
    //             console.log("child", child);
    //             child.remove();
    //         })
    //     })
    // }

    again() {
        location.reload();
    }
}