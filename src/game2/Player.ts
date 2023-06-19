import { Body } from '../engine/physics/Body'
import { Canvas } from '../engine/render/canvas/Canvas'
import { GameManager } from './GameManager'
import { PlayScene } from './PlayScene'

export class Player extends Body {
    public fall: boolean
    public preY: number

    constructor(pos: Vector, src: string, drawOrder: number) {
        super(pos, src, 1, drawOrder)
        this.setGravity(0.1)
        this.setDirection(0, 1)
        this.setSpeedX(3)
        this.preY = this.pos.y + this.getHeight()
    }

    public update(): void {
        this.preY = this.pos.y + this.getHeight()
        super.update()
        if (this.getPos().y + this.getHeight() >= Canvas.canvas.height) {
            console.log('Game Over')
        }
        if (this.getSpeedY() >= 0) this.fall = true
        else this.fall = false

        if (this.pos.x >= Canvas.canvas.width) this.pos.x = 0
        else if (this.pos.x + this.getWidth() <= 0) this.pos.x = Canvas.canvas.width

        if (this.pos.y <= Canvas.canvas.height / 2) {
            PlayScene.scroll = Canvas.canvas.height / 2 - this.pos.y
            this.setPos(this.pos.x, Canvas.canvas.height / 2)
            GameManager.score += Math.floor(PlayScene.scroll)
        } else {
            PlayScene.scroll = 0
        }
    }
}
