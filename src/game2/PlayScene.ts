import { Background } from '../engine/components/Background'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Scene } from '../engine/scenes/Scene'
import { FloorManager } from './FloorManager'
import { GameManager } from './GameManager'
import { Player } from './Player'
import { Text } from '../engine/components/Text'
import { SceneManager } from '../engine/scenes/SceneManager'

export class PlayScene extends Scene {
    private player: Player
    private background: Background
    private floorManager: FloorManager
    private scoreDisplay: Text
    private highScoreDisplay: Text
    private sceneManager: SceneManager
    static scroll = 0

    constructor(sceneManager: SceneManager) {
        super()
        this.sceneManager = sceneManager
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

        this.addGameObject(this.player)
        this.addGameObject(this.background)
        this.addGameObject(this.scoreDisplay)
        this.addGameObject(this.highScoreDisplay)
    }

    public update(): void {
        if (InputHandler.onKeydown('ArrowLeft')) {
            this.f1()
        }
        if (InputHandler.onKeydown('ArrowRight')) {
            this.f2()
        }
        if (InputHandler.onKeyup('ArrowLeft')) {
            this.f3()
        }
        if (InputHandler.onKeyup('ArrowRight')) {
            this.f3()
        }
        super.update()
        this.scoreDisplay.setContent(`Score: ${GameManager.score}`)
        this.highScoreDisplay.setContent(`High Score: ${GameManager.highScore}`)
        this.floorManager.update()
        this.floorManager.checkCollide(this.player)

        if (this.player.getPos().y + this.player.getHeight() >= Canvas.canvas.height) {
            GameManager.highScore = Math.max(GameManager.score, GameManager.highScore)
            this.sceneManager.wakeupScene(2)
            this.setSleep()
        }
    }

    public wakeup(): void {
        super.wakeup()
        this.restart()
    }

    public setSleep(): void {
        super.setSleep()
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

    public f1(): void {
        this.player.setFlip(true)
        this.player.setDirection(-1, 1)
    }

    public f2(): void {
        this.player.setFlip(false)
        this.player.setDirection(1, 1)
    }

    public f3(): void {
        this.player.setDirection(0, 1)
    }
}
