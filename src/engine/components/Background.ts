import { Images } from './Images'
import { Canvas } from '../render/canvas/Canvas'
import { Timer } from '../system/Timer'

export class Background extends Images {
    private scrollSpeed = 0
    constructor(pos: Vector, src: string, drawOrder: number) {
        super(pos, src, drawOrder)
    }

    public draw() {
        if (Canvas.ctx) {
            Canvas.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
            Canvas.ctx.drawImage(this.image, 288 + this.pos.x, this.pos.y, this.width, this.height)
        }
    }

    public update() {
        this.pos.x -= this.scrollSpeed * Timer.deltaTime
        if (this.pos.x <= -this.image.width) this.pos.x = 0
    }

    public setScrollSpeed(speed: number) {
        this.scrollSpeed = speed
    }
}
