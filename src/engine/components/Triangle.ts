import { Shape } from './Shape'
import { Canvas } from '../render/canvas/Canvas'

export class Triangle extends Shape {
    public p1: Vector
    public p2: Vector
    public p3: Vector

    constructor(p1: Vector, p2: Vector, p3: Vector, drawOrder: number) {
        super(p1, 'black', drawOrder)
        this.color = 'black'
        this.p1 = p1
        this.p2 = p2
        this.p3 = p3
    }
    public draw(): void {
        if (Canvas.ctx) {
            Canvas.ctx.beginPath()
            Canvas.ctx.fillStyle = this.color
            Canvas.ctx.moveTo(this.p1.x, this.p1.y)
            Canvas.ctx.lineTo(this.p2.x, this.p2.y)
            Canvas.ctx.lineTo(this.p3.x, this.p3.y)
            Canvas.ctx.fill()
        }
    }
    public setColor(color: string): void {
        this.color = color
    }
    public setDrawOrder(drawOrder: number): void {
        this.drawOrder = drawOrder
    }
    public update(): void {
        ///
    }
}
