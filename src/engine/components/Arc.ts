import { Canvas } from '../render/canvas/Canvas'
import { Shape } from './Shape'

export class Arc extends Shape {
    private radius = 0
    private startAngle = 0
    private endAngle = 0

    constructor(pos: Vector, color: string, drawOrder: number) {
        super(pos, color, drawOrder)
        this.color = 'black'
    }

    public fill(): void {
        if (Canvas.ctx) {
            Canvas.ctx.save()
            Canvas.ctx.translate(this.pos.x, this.pos.y)
            Canvas.ctx.rotate(this.angle)
            Canvas.ctx.fillStyle = this.color
            Canvas.ctx.arc(
                this.pos.x,
                this.pos.y,
                this.radius * this.scale,
                this.startAngle,
                this.endAngle
            )
            Canvas.ctx.fill()
            Canvas.ctx.restore()
        }
    }

    public arc(): void {
        if (Canvas.ctx) {
            Canvas.ctx.save()
            Canvas.ctx.translate(this.pos.x, this.pos.y)
            Canvas.ctx.rotate(this.angle)
            Canvas.ctx.beginPath()
            Canvas.ctx.strokeStyle = this.color
            Canvas.ctx.arc(0, 0, this.radius * this.scale, this.startAngle, this.endAngle)
            Canvas.ctx.stroke()
            Canvas.ctx.restore()
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
