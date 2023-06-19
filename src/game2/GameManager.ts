import { Canvas } from '../engine/render/canvas/Canvas'
import { GameEngine } from '../engine/system/GameEngine'
import { GameOverScene } from './GameOverScene'
import { PlayScene } from './PlayScene'
import { StartScene } from './StartScene'
import { InputHandler } from '../engine/input-handler/InputHandler'

export class GameManager {
    public static score = 0
    public static highScore = 0
    private gameEngine: GameEngine
    private startScene: StartScene
    private playScene: PlayScene
    private gameOverScene: GameOverScene

    constructor() {
        Canvas.init(400, 600)
        InputHandler.init()

        this.gameEngine = new GameEngine()

        this.startScene = new StartScene(this.gameEngine.sceneManager)
        this.gameEngine.sceneManager.push(this.startScene)

        this.playScene = new PlayScene(this.gameEngine.sceneManager)
        this.gameEngine.sceneManager.push(this.playScene)

        this.gameOverScene = new GameOverScene(this.gameEngine.sceneManager)
        this.gameEngine.sceneManager.push(this.gameOverScene)

        this.gameEngine.sceneManager.wakeupScene(0)

        this.gameEngine.run()
    }
}
