/**
 * Represents a single player in the game.
 */
export class Player {
    /**
     * Initializes a new player.
     * @param {string} name - The player's name (e.g., 'P1').
     * @param {string} mark - The player's mark (e.g., 'X').
     */
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
        this.isActive = true;
        this.win = false;
    }
}