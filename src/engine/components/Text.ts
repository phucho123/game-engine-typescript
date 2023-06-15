import { Sprite } from './Sprite'

export class Text extends Sprite {
    content: string
    font: string
    color: string
    ctx: CanvasRenderingContext2D | null

    constructor(pos: Vector, content: string, font: string, color: string, drawOrder: number) {
        super(pos, '', 1)
        this.content = content
        this.font = font
        this.color = color
        this.drawOrder = drawOrder
    }

    public draw(ctx: CanvasRenderingContext2D | null): void {
        if (ctx) {
            ctx.beginPath()
            ctx.font = this.font
            ctx.fillStyle = this.color
            ctx.fillText(this.content, this.pos.x, this.pos.y)
        }
    }

    public setPos(x: number, y: number): void {
        this.pos.x = x
        this.pos.y = y
    }

    public setContent(content: string) {
        this.content = content
    }
}
