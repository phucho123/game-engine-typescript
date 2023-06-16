import { Shape } from './Shape'

export class Arc extends Shape {
    private radius = 0
    private startAngle = 0
    private endAngle = 0

    constructor(pos: Vector, color: string, drawOrder: number) {
        super(pos, color, drawOrder)
        this.color = 'black'
    }

    public fill(ctx: CanvasRenderingContext2D | null): void {
        if (ctx) {
            ctx.save()
            ctx.translate(this.pos.x, this.pos.y)
            ctx.rotate(this.angle)
            ctx.fillStyle = this.color
            ctx.arc(
                this.pos.x,
                this.pos.y,
                this.radius * this.scale,
                this.startAngle,
                this.endAngle
            )
            ctx.fill()
            ctx.restore()
        }
    }

    public arc(ctx: CanvasRenderingContext2D | null): void {
        if (ctx) {
            ctx.save()
            ctx.translate(this.pos.x, this.pos.y)
            ctx.rotate(this.angle)
            ctx.beginPath()
            ctx.strokeStyle = this.color
            ctx.arc(0, 0, this.radius * this.scale, this.startAngle, this.endAngle)
            ctx.stroke()
            ctx.restore()
        }
    }

    public getPos(): Vector {
        return this.pos
    }

    public getRadius(): number {
        return this.radius * this.scale
    }

    public setRadius(radius: number): void {
        this.radius = radius
    }

    public setStartAngle(angle: number): void {
        this.startAngle = angle
    }

    public setEndAngle(angle: number): void {
        this.endAngle = angle
    }
}
