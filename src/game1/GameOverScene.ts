import { Images } from '../engine/components/Images'
import { Scene } from '../engine/scenes/Scene'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Text } from '../engine/components/Text'
import { Renderer } from '../engine/render/Renderer'
import { Background } from '../engine/components/Background'
import { GameManager } from './GameManager'
import { InputHandler } from '../engine/input-handler/InputHandler'

export class GameOverScene extends Scene {
    private gameOverImage: Images
    private scoreDislay: Text
    private highScoreDisplay: Text
    private renderer: Renderer
    private background: Background

    constructor(renderer: Renderer) {
        super()
        this.renderer = renderer
        this.gameOverImage = new Images(
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

        this.pushToSpriteList(this.gameOverImage)
        this.pushToSpriteList(this.scoreDislay)
        this.pushToSpriteList(this.highScoreDisplay)
        this.pushToSpriteList(this.background)
    }

    public draw() {
        super.draw()
    }

    public update() {
        super.update()
        this.scoreDislay.setContent(`Score: ${GameManager.score}`)
        this.highScoreDisplay.setContent(`High Score: ${GameManager.highScore}`)
    }

    public wakeup(): void {
        super.wakeup()
        InputHandler.onClick(() => {
            this.setSleep()
            this.renderer.wakeupScene(1)
        })
    }

    public setSleep(): void {
        super.setSleep()
        InputHandler.clearMouseClick()
    }
}
