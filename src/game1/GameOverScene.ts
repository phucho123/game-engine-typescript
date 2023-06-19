import { BaseImage } from '../engine/components/BaseImage'
import { Scene } from '../engine/scenes/Scene'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Text } from '../engine/components/Text'
import { Background } from '../engine/components/Background'
import { GameManager } from './GameManager'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { SceneManager } from '../engine/scenes/SceneManager'

export class GameOverScene extends Scene {
    private gameOverImage: BaseImage
    private scoreDislay: Text
    private highScoreDisplay: Text
    private sceneManager: SceneManager
    private background: Background

    constructor(sceneManager: SceneManager) {
        super()
        this.sceneManager = sceneManager
        this.gameOverImage = new BaseImage(
            { x: Canvas.canvas.width / 2 - 90, y: Canvas.canvas.height / 2 - 100 },
            '../assets/images/gameover.png',
            3
        )
        this.scoreDislay = new Text(
            { x: Canvas.canvas.width / 2 - 100, y: Canvas.canvas.height / 2 },
            `Score: ${GameManager.score}`,
            '30px Audiowide',
            'white',
            3
        )
        this.highScoreDisplay = new Text(
            { x: Canvas.canvas.width / 2 - 100, y: Canvas.canvas.height / 2 + 50 },
            `High Score: ${GameManager.highScore}`,
            '30px Audiowide',
            'white',
            3
        )
        this.background = new Background({ x: 0, y: 0 }, '../assets/images/background-night.png', 0)
        this.background.setHeight(600)
        this.background.setWidth(400)

        this.addGameObject(this.gameOverImage)
        this.addGameObject(this.scoreDislay)
        this.addGameObject(this.highScoreDisplay)
        this.addGameObject(this.background)
    }

    public update() {
        if (InputHandler.onClick()) {
            this.setSleep()
            this.sceneManager.wakeupScene(1)
        }
        super.update()
        this.scoreDislay.setContent(`Score: ${GameManager.score}`)
        this.highScoreDisplay.setContent(`High Score: ${GameManager.highScore}`)
    }

    public wakeup(): void {
        super.wakeup()
    }

    public setSleep(): void {
        super.setSleep()
    }
}
