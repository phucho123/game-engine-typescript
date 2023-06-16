import { Shape } from './Shape'
import { Canvas } from '../render/canvas/Canvas'

export class Rectangle extends Shape {
    private width = 0
    private height = 0

    constructor(pos: Vector, color: string, drawOrder: number) {
        super(pos, color, drawOrder)
        this.color = 'black'
    }

    public fill(): void {
        if (Canvas.ctx) {
            Canvas.ctx.fillStyle = this.color
            Canvas.ctx.save()
            Canvas.ctx.translate(this.pos.x, this.pos.y)
            Canvas.ctx.rotate(this.angle)
            Canvas.ctx.fillRect(
                -(this.width * this.scale) / 2,
                -(this.height * this.scale) / 2,
                this.width * this.scale,
                this.height * this.scale
            )
            Canvas.ctx.restore()
        }
    }

    public rect(): void {
        if (Canvas.ctx) {
            Canvas.ctx.beginPath()
            Canvas.ctx.strokeStyle = this.color
            Canvas.ctx.save()
            Canvas.ctx.translate(this.pos.x, this.pos.y)
            Canvas.ctx.rotate(this.angle)
            Canvas.ctx.rect(
                -(this.width * this.scale) / 2,
                -(this.height * this.scale) / 2,
                this.width * this.scale,
                this.height * this.scale
            )
            Canvas.ctx.restore()
            Canvas.ctx.stroke()
        }
    }

    public getPos(): Vector {
        return this.pos
    }

    public getWidth(): number {
        return this.width * this.scale
    }

    public setWidth(width: number): void {
        this.width = width * this.scale
    }

    public getHeight(): number {
        return this.height * this.scale
    }

    public setHeight(height: number): void {
        this.height = height * this.scale
    }
}
