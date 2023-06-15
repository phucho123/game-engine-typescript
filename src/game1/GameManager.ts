import { Canvas } from '../engine/render/canvas/Canvas'
import { Background } from '../engine/components/Background'
import { Bird } from './Bird'
import { Scene } from '../engine/scenes/Scene'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { SpikeManager } from '../game1/SpikeManager'
import { Sprite } from '../engine/components/Sprite'
import { Renderer } from '../engine/render/Renderer'
import { Text } from '../engine/components/Text'
import { Maths } from '../engine/math/Maths'

export class GameManager {
    canvas: Canvas
    background: Background
    bird: Bird
    inputHandler: InputHandler = new InputHandler()
    gameOver = false
    spikeManager: SpikeManager
    spikeSize = 20
    gameOverImage: Sprite
    scene: Scene = new Scene()
    gameOverScene: Scene = new Scene()
    startScene: Scene = new Scene()
    renderer: Renderer
    text: Text = new Text({ x: 200, y: 300 }, '0', '30px Arial', 'white', 1)
    startbutton: Sprite
    scoreSprite: Text
    highScoreSprite: Text
    score = 0
    highScore = 0
    init = true

    constructor() {
        // this.canvas = new Canvas(288, 512)
        this.canvas = new Canvas(400, 600)
        this.background = new Background({ x: 0, y: 0 }, '../assets/images/background-night.png', 0)
        this.startbutton = new Sprite(
            { x: this.canvas.canvas.width / 2 - 120, y: this.canvas.canvas.height / 2 - 50 },
            '../assets/images/start-button.png',
            1
        )
        this.startbutton.setScale(0.5)
        this.background.setHeight(600)
        this.background.setWidth(400)
        this.bird = new Bird(
            { x: this.canvas.canvas.width / 2, y: 200 },
            '../assets/images/yellowbird-animate.png',
            2
        )
        this.gameOverImage = new Sprite(
            { x: this.canvas.canvas.width / 2 - 100, y: this.canvas.canvas.height / 2 - 100 },
            '../assets/images/gameover.png',
            3
        )
        this.scoreSprite = new Text(
            { x: this.canvas.canvas.width / 2 - 100, y: this.canvas.canvas.height / 2 },
            `Score: ${this.score}`,
            '30px Arial',
            'white',
            3
        )
        this.highScoreSprite = new Text(
            { x: this.canvas.canvas.width / 2 - 100, y: this.canvas.canvas.height / 2 + 50 },
            `High Score: ${this.highScore}`,
            '30px Arial',
            'white',
            3
        )
        this.spikeManager = new SpikeManager(this.canvas)

        this.startScene.push(this.background)
        this.startScene.push(this.startbutton)

        this.scene.push(this.background)
        this.scene.push(this.bird)
        this.scene.push(this.text)

        this.gameOverScene.push(this.gameOverImage)
        this.gameOverScene.push(this.background)
        this.gameOverScene.push(this.scoreSprite)
        this.gameOverScene.push(this.highScoreSprite)
        this.gameOverScene.push(this.bird)

        this.spikeManager.createVerticalSpike(this.spikeSize)

        this.inputHandler.push(' ', () => {
            if (!this.gameOver) this.bird.setSpeedY(-3)
        })
        this.inputHandler.push('click', () => {
            if (this.gameOver) this.restart()
            else this.bird.setSpeedY(-3)
        })

        // this.gameOverScene.push(this.bird)
        // this.gameOverScene.push(this.background)

        this.renderer = new Renderer(this.canvas.ctx)
        this.renderer.setScene(this.startScene)

        window.addEventListener('click', (e) => {
            if (this.init) {
                const rect = this.canvas.canvas.getBoundingClientRect()
                if (
                    Maths.checkPointInRect(
                        e.clientX - rect.left,
                        e.clientY - rect.top,
                        this.startbutton
                    )
                ) {
                    this.init = false
                    this.renderer.setScene(this.scene)
                }
            }
        })

        requestAnimationFrame(() => this.run())
    }

    public run() {
        if (this.init) {
            this.renderer.update()
            this.renderer.draw()
        } else if (!this.gameOver) {
            this.renderer.update()
            this.renderer.draw()
            this.spikeManager.draw()
            if (this.spikeManager.checkCollide(this.bird)) {
                this.gameOver = true
                this.renderer.setScene(this.gameOverScene)
                this.highScore = Math.max(this.score, this.highScore)
                this.scoreSprite.setContent(`Score: ${this.score}`)
                this.highScoreSprite.setContent(`High Score: ${this.highScore}`)
            }
            if (this.bird.getPos().x <= 0) {
                this.spikeManager.createRightSpike(this.spikeSize)
                this.score++
                this.text.setContent(this.score.toString())
            } else if (this.bird.getPos().x + this.bird.getWidth() >= 400) {
                this.spikeManager.createLeftSpike(this.spikeSize)
                this.score++
                this.text.setContent(this.score.toString())
            }
        } else {
            this.renderer.update()
            this.renderer.draw()
        }
        requestAnimationFrame(() => this.run())
    }

    public restart() {
        this.bird.setPos(300, 200)
        this.bird.setFlip(false)
        this.bird.setDirection(1, 1)
        this.bird.setSpeedX(2)
        this.bird.setSpeedY(0)
        this.spikeManager.clear()
        this.gameOver = false
        this.score = 0
        this.renderer.setScene(this.scene)
    }
}
