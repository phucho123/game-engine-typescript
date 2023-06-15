import { Sprite } from './Sprite'

export class Triangle extends Sprite {
    private color: string
    public p1: Vector
    public p2: Vector
    public p3: Vector

    constructor(p1: Vector, p2: Vector, p3: Vector, drawOrder: number) {
        super(p1, '', drawOrder)
        this.color = 'black'
        this.p1 = p1
        this.p2 = p2
        this.p3 = p3
    }
    public draw(ctx: CanvasRenderingContext2D | null) {
        if (ctx) {
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.moveTo(this.p1.x, this.p1.y)
            ctx.lineTo(this.p2.x, this.p2.y)
            ctx.lineTo(this.p3.x, this.p3.y)
            ctx.fill()
        }
    }
    public setColor(color: string) {
        this.color = color
    }
}
