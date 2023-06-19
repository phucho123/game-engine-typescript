import { Canvas } from '../engine/render/canvas/Canvas'
import { StartScene } from './StartScene'
import { PlayScene } from './PlayScene'
import { GameOverScene } from './GameOverScene'
import { GameEngine } from '../engine/system/GameEngine'
import { InputHandler } from '../engine/input-handler/InputHandler'

export class GameManager {
    private startScene: StartScene
    private playScene: PlayScene
    private gameOverScene: GameOverScene
    public static score = 0
    public static highScore = 0
    private gameEngine: GameEngine

    constructor() {
        Canvas.init(400, 600)
        InputHandler.init()

        this.gameEngine = new GameEngine()

        this.startScene = new StartScene(this.gameEngine.sceneManager)
        this.playScene = new PlayScene(this.gameEngine.sceneManager)
        this.gameOverScene = new GameOverScene(this.gameEngine.sceneManager)

        this.gameEngine.sceneManager.push(this.startScene)
        this.gameEngine.sceneManager.push(this.playScene)
        this.gameEngine.sceneManager.push(this.gameOverScene)

        this.gameEngine.sceneManager.wakeupScene(0)

        this.gameEngine.run()
    }
}
