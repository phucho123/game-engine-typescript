import { Shape } from './Shape'

export class Arc extends Shape {
    private radius = 0
    private startAngle = 0
    private endAngle = 0

    constructor(pos: Position, color: string, ctx: CanvasRenderingContext2D | null) {
        super(pos, color, ctx)
    }

    public fill(): void {
        if (this.ctx) {
            this.ctx.save()
            this.ctx.translate(this.pos.x, this.pos.y)
            this.ctx.rotate(this.angle)
            this.ctx.fillStyle = this.color
            this.ctx.arc(
                this.pos.x,
                this.pos.y,
                this.radius * this.scale,
                this.startAngle,
                this.endAngle
            )
            this.ctx.fill()
            this.ctx.restore()
        }
    }

    public arc(): void {
        if (this.ctx) {
            this.ctx.save()
            this.ctx.translate(this.pos.x, this.pos.y)
            this.ctx.rotate(this.angle)
            this.ctx.beginPath()
            this.ctx.strokeStyle = this.color
            this.ctx.arc(0, 0, this.radius * this.scale, this.startAngle, this.endAngle)
            this.ctx.stroke()
            this.ctx.restore()
        }
    }

    public getPos(): Position {
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
