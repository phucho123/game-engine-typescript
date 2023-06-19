import { InputHandler } from '../engine/input-handler/InputHandler'
import { Renderer } from '../engine/render/Renderer'
import { Canvas } from '../engine/render/canvas/Canvas'
import { GameEngine } from '../engine/system/GameEngine'
import { GameOverScene } from './GameOverScene'
import { PlayScene } from './PlayScene'
import { StartScene } from './StartScene'

export class GameManager {
    public static score = 0
    public static highScore = 0
    private gameEngine: GameEngine = new GameEngine()
    private startScene: StartScene
    private playScene: PlayScene
    private gameOverScene: GameOverScene

    constructor() {
        Canvas.init(400, 600)
        InputHandler.init()

        this.gameEngine.renderer = new Renderer()

        this.startScene = new StartScene(this.gameEngine.renderer)
        this.gameEngine.renderer.push(this.startScene)

        this.playScene = new PlayScene(this.gameEngine.renderer)
        this.gameEngine.renderer.push(this.playScene)

        this.gameOverScene = new GameOverScene(this.gameEngine.renderer)
        this.gameEngine.renderer.push(this.gameOverScene)

        this.gameEngine.renderer.wakeupScene(0)

        this.gameEngine.run()
    }
}
