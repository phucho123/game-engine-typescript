import { GameManager } from './game1/GameManager'

class Game {
    gameManager: GameManager
    constructor() {
        this.gameManager = new GameManager()
    }
}

new Game()
