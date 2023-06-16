import { Images } from './Images'
import { Canvas } from '../render/canvas/Canvas'

export class Background extends Images {
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
        // this.pos.x -= 2
        // if (this.pos.x <= -this.image.width) this.pos.x = 0
    }
}
