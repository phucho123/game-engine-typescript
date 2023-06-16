import { Background } from '../engine/components/Background'
import { Scene } from '../engine/scenes/Scene'
import { Bird } from './Bird'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Renderer } from '../engine/render/Renderer'
import { SpikeManager } from './SpikeManager'
import { Text } from '../engine/components/Text'
import { GameManager } from './GameManager'
import { InputHandler } from '../engine/input-handler/InputHandler'

export class PlayScene extends Scene {
    private background: Background
    private bird: Bird
    private renderer: Renderer
    private spikeManager: SpikeManager = new SpikeManager()
    private scoreDisplay: Text

    constructor(renderer: Renderer) {
        super()
        this.renderer = renderer
        this.background = new Background({ x: 0, y: 0 }, '../assets/images/background-night.png', 0)
        this.background.setHeight(600)
        this.background.setWidth(400)

        this.bird = new Bird(
            { x: Canvas.canvas.width / 2, y: 300 },
            '../assets/images/yellowbird-animate.png',
            3
        )

        this.scoreDisplay = new Text(
            { x: Canvas.canvas.width / 2, y: Canvas.canvas.height / 2 },
            `${GameManager.score}`,
            '30px Audiowide',
            'white',
            1
        )

        this.push(this.background)
        this.push(this.bird)
        this.push(this.scoreDisplay)

        this.spikeManager.createVerticalSpike()
    }

    public update() {
        super.update()
        if (this.spikeManager.checkCollide(this.bird)) {
            GameManager.highScore = Math.max(GameManager.score, GameManager.highScore)
            this.setSleep()
            this.renderer.wakeupScene(2)
        }
        if (this.bird.getPos().x <= 0) {
            this.spikeManager.createRightSpike()
            GameManager.score++
            this.scoreDisplay.setContent(GameManager.score.toString())
        } else if (this.bird.getPos().x + this.bird.getWidth() >= Canvas.canvas.width) {
            this.spikeManager.createLeftSpike()
            GameManager.score++
            this.scoreDisplay.setContent(GameManager.score.toString())
        }
    }

    public draw(): void {
        super.draw()
        this.spikeManager.draw()
    }

    public wakeup(): void {
        super.wakeup()
        this.restart()
        InputHandler.onKeydown(' ', () => {
            this.bird.setSpeedY(-3)
            console.log('hello there')
        })
        InputHandler.onClick(() => this.bird.setSpeedY(-3))
    }

    public setSleep(): void {
        super.setSleep()
        InputHandler.clearKeydown()
        InputHandler.clearMouseClick()
    }

    public restart() {
        this.bird.setPos(300, 200)
        this.bird.setFlip(false)
        this.bird.setDirection(1, 1)
        this.bird.setSpeedX(2)
        this.bird.setSpeedY(0)
        this.spikeManager.clear()
        this.scoreDisplay.setContent('0')
        GameManager.score = 0
    }
}
