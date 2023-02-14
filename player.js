export class Player {
    #toMove = true;
    #win = false;
    constructor(name, mark, id) {
        this.name = name;
        this.mark = mark;
    }

    getName() {
        return this.name;
    }

    getMark() {
        return this.mark;
    }

    get toMove() {
        return this.#toMove;
    }


    set toMove(val) {
        this.#toMove = val;
    }

    get win() {
        return this.#win;
    }


    set win(val) {
        this.#win = val;
    }
}