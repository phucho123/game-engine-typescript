import { Shape } from './Shape'

export class Rectangle extends Shape {
    private width = 0
    private height = 0

    constructor(pos: Position, color: string, ctx: CanvasRenderingContext2D | null) {
        super(pos, color, ctx)
    }

    public fill(): void {
        if (this.ctx) {
            this.ctx.fillStyle = this.color
            this.ctx.save()
            this.ctx.translate(this.pos.x, this.pos.y)
            this.ctx.rotate(this.angle)
            this.ctx.fillRect(
                -(this.width * this.scale) / 2,
                -(this.height * this.scale) / 2,
                this.width * this.scale,
                this.height * this.scale
            )
            this.ctx.restore()
        }
    }

    public rect(): void {
        if (this.ctx) {
            this.ctx.beginPath()
            this.ctx.strokeStyle = this.color
            this.ctx.save()
            this.ctx.translate(this.pos.x, this.pos.y)
            this.ctx.rotate(this.angle)
            this.ctx.rect(
                -(this.width * this.scale) / 2,
                -(this.height * this.scale) / 2,
                this.width * this.scale,
                this.height * this.scale
            )
            this.ctx.restore()
            this.ctx.stroke()
        }
    }

    public getPos(): Position {
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
