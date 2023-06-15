import { Sprite } from './Sprite'

export class Background extends Sprite {
    constructor(pos: Vector, src: string, drawOrder: number) {
        super(pos, src, drawOrder)
    }

    public draw(ctx: CanvasRenderingContext2D | null) {
        if (ctx) {
            ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
            ctx.drawImage(this.image, 288 + this.pos.x, this.pos.y, this.width, this.height)
        }
    }

    public update() {
        // this.pos.x -= 2
        // if (this.pos.x <= -this.image.width) this.pos.x = 0
    }
}
