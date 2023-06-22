import { Background } from '../engine/components/Background'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Scene } from '../engine/scenes/Scene'
import { Text } from '../engine/components/Text'
import { GameManager } from './GameManager'
import { SceneManager } from '../engine/scenes/SceneManager'
import { BaseImage } from '../engine/components/BaseImage'

export class GameOverScene extends Scene {
    private sceneManager: SceneManager
    private background: Background
    private scoreDisplay: Text
    private highScoreDisplay: Text
    private gameOverImage: BaseImage

    constructor(sceneManager: SceneManager) {
        super()
        this.sceneManager = sceneManager

        this.background = new Background({ x: 0, y: 0 }, '../assets/images/bck.png', 0)
        this.background.setHeight(Canvas.canvas.height)
        this.background.setWidth(Canvas.canvas.width)

        this.scoreDisplay = new Text(
            { x: 100, y: Canvas.canvas.height / 2 - 50 },
            `High Score:${GameManager.highScore}`,
            '20px Audiowide',
            'black',
            2
        )

        this.highScoreDisplay = new Text(
            { x: 100, y: Canvas.canvas.height / 2 },
            `Score:${GameManager.score}`,
            '20px Audiowide',
            'black',
            2
        )

        this.gameOverImage = new BaseImage(
            { x: 100, y: Canvas.canvas.height / 2 - 150 },
            '../assets/images/gameover.png',
            1
        )

        this.addGameObject(this.background)
        this.addGameObject(this.highScoreDisplay)
        this.addGameObject(this.scoreDisplay)
        this.addGameObject(this.gameOverImage)
    }

    public update(): void {
        if (InputHandler.onClick()) {
            this.sceneManager.wakeupScene(1)
            this.setSleep()
        }
        super.update()
        this.scoreDisplay.setContent(`Score: ${GameManager.score}`)
        this.highScoreDisplay.setContent(`High Score: ${GameManager.highScore}`)
    }
}
