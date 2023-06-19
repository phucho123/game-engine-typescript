import { GameManager } from './game2/GameManager'

class Game {
    gameManager: GameManager
    constructor() {
        this.gameManager = new GameManager()
    }
}

new Game()
