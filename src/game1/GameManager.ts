import { Canvas } from '../engine/render/canvas/Canvas'
import { Renderer } from '../engine/render/Renderer'
import { StartScene } from './StartScene'
import { PlayScene } from './PlayScene'
import { GameOverScene } from './GameOverScene'
import { GameEngine } from '../engine/system/GameEngine'
import { InputHandler } from '../engine/input-handler/InputHandler2'

export class GameManager {
    private startScene: StartScene
    private playScene: PlayScene
    private gameOverScene: GameOverScene
    public static score = 0
    public static highScore = 0
    private gameEngine: GameEngine = new GameEngine()

    constructor() {
        // this.canvas = new Canvas(288, 512)
        Canvas.init(400, 600)
        InputHandler.init()

        this.gameEngine.renderer = new Renderer()
        this.startScene = new StartScene(this.gameEngine.renderer)
        this.playScene = new PlayScene(this.gameEngine.renderer)
        this.gameOverScene = new GameOverScene(this.gameEngine.renderer)

        this.gameEngine.renderer.push(this.startScene)
        this.gameEngine.renderer.push(this.playScene)
        this.gameEngine.renderer.push(this.gameOverScene)

        this.gameEngine.renderer.wakeupScene(0)

        this.gameEngine.run()
    }
}
