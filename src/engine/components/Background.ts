import { Sprite } from './Sprite'

export class Background extends Sprite {
    constructor(pos: Position, src: string, drawOrder: number) {
        super(pos, src, drawOrder)
    }
    public draw(ctx: CanvasRenderingContext2D | null) {
        if (ctx) {
            ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
        }
    }
}
