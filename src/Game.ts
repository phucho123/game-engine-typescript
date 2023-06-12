import { AnimationSprite } from './engine/components/AnimationSprite'
import { Sprite } from './engine/components/Sprite'
import { Canvas } from './engine/render/canvas/Canvas'
import { Scene } from './engine/scenes/Scene'
import { Physics } from './engine/physics/Physics'
import { InputHandler } from './engine/input-handler/InputHandler'
import { Text } from './engine/components/Text'
import { Renderer } from './engine/render/Renderer'
import { Background } from './engine/components/Background'

class Game {
    canvas: Canvas
    background: Background
    bird: AnimationSprite
    pipe: Sprite
    scene: Scene = new Scene()
    physics: Physics = new Physics()
    inputHandler: InputHandler = new InputHandler()
    gameOver = false
    text: Text
    renderer: Renderer

    constructor() {
        this.canvas = new Canvas(288, 512)
        this.renderer = new Renderer(this.canvas.ctx)
        this.text = new Text(
            { x: 100, y: 100 },
            'Hello there',
            '30px Arial',
            'red',
            this.canvas.ctx
        )
        this.background = new Background({ x: 0, y: 0 }, '../assets/images/background-night.png', 0)
        this.bird = new AnimationSprite(
            { x: 30, y: 288 },
            '../assets/images/yellowbird-animate.png',
            1,
            3
        )

        // this.background.setWidth(1024)
        // this.background.setHeight(576)

        // this.bird.setScale(1)
        this.bird.setAnimationSpeed(2)
        this.bird.setAcceleration(0.1)
        this.bird.setSpeed(0)
        this.bird.setDirection(0, 1)
        this.bird.setScale(1)

        this.pipe = new Sprite({ x: 1024, y: 100 }, '../assets/images/down-pipe.png', 2)
        this.pipe.setSpeed(2)
        this.pipe.setDirection(-1, 0)

        this.scene.pushToSpriteList(this.bird)
        this.scene.pushToSpriteList(this.background)
        this.scene.pushToSpriteList(this.pipe)

        this.renderer.setScene(this.scene)

        this.inputHandler.push(' ', () => this.bird.setSpeed(-3))

        this.inputHandler.push('click', () => this.bird.setSpeed(-3))

        requestAnimationFrame(() => this.draw())
    }

    public draw() {
        if (!this.gameOver) {
            this.canvas.draw()
            this.scene.update()
            this.renderer.draw()
            if (this.physics.collide(this.bird, this.pipe)) this.gameOver = true
        }
        requestAnimationFrame(() => this.draw())
    }
}

new Game()
