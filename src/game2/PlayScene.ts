import { Background } from '../engine/components/Background'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Scene } from '../engine/scenes/Scene'
import { FloorManager } from './FloorManager'
import { GameManager } from './GameManager'
import { Player } from './Player'
import { Text } from '../engine/components/Text'
import { Renderer } from '../engine/render/Renderer'

export class PlayScene extends Scene {
    private player: Player
    private background: Background
    private floorManager: FloorManager
    private scoreDisplay: Text
    private highScoreDisplay: Text
    private renderer: Renderer
    static scroll = 0

    constructor(renderer: Renderer) {
        super()
        this.renderer = renderer
        this.player = new Player(
            { x: 0, y: Canvas.canvas.height - 100 },
            '../assets/images/doodle.png',
            2
        )

        this.background = new Background({ x: 0, y: 0 }, '../assets/images/bck.png', 0)
        this.background.setWidth(Canvas.canvas.width)
        this.background.setHeight(Canvas.canvas.height)

        this.scoreDisplay = new Text(
            { x: 10, y: 30 },
            `High Score:${GameManager.highScore}`,
            '20px Audiowide',
            'black',
            3
        )

        this.highScoreDisplay = new Text(
            { x: 10, y: 60 },
            `Score:${GameManager.score}`,
            '20px Audiowide',
            'black',
            3
        )

        this.floorManager = new FloorManager()

        this.pushToSpriteList(this.player)
        this.pushToSpriteList(this.background)
        this.pushToSpriteList(this.scoreDisplay)
        this.pushToSpriteList(this.highScoreDisplay)
    }

    public update(): void {
        this.floorManager.update()
        this.floorManager.checkCollide(this.player)
        super.update()
        this.scoreDisplay.setContent(`Score: ${GameManager.score}`)
        this.highScoreDisplay.setContent(`High Score: ${GameManager.highScore}`)

        if (this.player.getPos().y + this.player.getHeight() >= Canvas.canvas.height) {
            GameManager.highScore = Math.max(GameManager.score, GameManager.highScore)
            this.setSleep()
            this.renderer.wakeupScene(2)
        }
    }

    public wakeup(): void {
        super.wakeup()
        this.restart()
        InputHandler.onKeydown('ArrowLeft', () => {
            this.player.setFlip(true)
            this.player.setDirection(-1, 1)
        })

        InputHandler.onKeydown('ArrowRight', () => {
            this.player.setFlip(false)
            this.player.setDirection(1, 1)
        })

        InputHandler.onKeyUp('ArrowLeft', () => {
            this.player.setDirection(0, 1)
        })

        InputHandler.onKeyUp('ArrowRight', () => {
            this.player.setDirection(0, 1)
        })
    }

    public setSleep(): void {
        super.setSleep()
        InputHandler.clearKeydown()
        InputHandler.clearKeyUp()
    }

    public draw(): void {
        super.draw()
        this.floorManager.draw()
    }

    public restart(): void {
        this.player.setPos(0, Canvas.canvas.height - 100)
        this.floorManager.initialFloor()
        this.player.setFlip(false)
        this.player.setDirection(0, 1)
        GameManager.score = 0
    }
}
