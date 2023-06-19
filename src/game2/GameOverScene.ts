import { Background } from '../engine/components/Background'
import { InputHandler } from '../engine/input-handler/InputHandler2'
import { Renderer } from '../engine/render/Renderer'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Scene } from '../engine/scenes/Scene'
import { Text } from '../engine/components/Text'
import { GameManager } from './GameManager'

export class GameOverScene extends Scene {
    private renderer: Renderer
    private background: Background
    private scoreDisplay: Text
    private highScoreDisplay: Text

    constructor(renderer: Renderer) {
        super()
        this.renderer = renderer

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

        this.pushToSpriteList(this.background)
        this.pushToSpriteList(this.highScoreDisplay)
        this.pushToSpriteList(this.scoreDisplay)
    }

    public update(): void {
        if (InputHandler.onClick()) {
            this.renderer.wakeupScene(1)
            this.setSleep()
        }
        super.update()
        this.scoreDisplay.setContent(`Score: ${GameManager.score}`)
        this.highScoreDisplay.setContent(`High Score: ${GameManager.highScore}`)
    }

    public wakeup(): void {
        super.wakeup()
    }

    public setSleep(): void {
        super.setSleep()
    }
}
