export class Text {
    pos: Position
    content: string
    font: string
    color: string
    ctx: CanvasRenderingContext2D | null

    constructor(
        pos: Position,
        content: string,
        font: string,
        color: string,
        ctx: CanvasRenderingContext2D | null
    ) {
        this.pos = pos
        this.content = content
        this.font = font
        this.color = color
        this.ctx = ctx
    }

    public draw(): void {
        if (this.ctx) {
            this.ctx.beginPath()
            this.ctx.font = this.font
            this.ctx.fillStyle = this.color
            this.ctx.fillText(this.content, this.pos.x, this.pos.y)
        }
    }

    public setPos(x: number, y: number): void {
        this.pos.x = x
        this.pos.y = y
    }
}
