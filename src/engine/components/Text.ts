import { Canvas } from '../render/canvas/Canvas'
import { GameObject } from './GameObject'
export class Text extends GameObject {
    private pos: Vector
    private content: string
    private font: string
    private color: string
    private drawOrder: number
    private drawable = true

    constructor(pos: Vector, content: string, font: string, color: string, drawOrder: number) {
        super()
        this.pos = pos
        this.content = content
        this.font = font
        this.color = color
        this.drawOrder = drawOrder
    }

    public draw(): void {
        if (Canvas.ctx && this.drawable) {
            Canvas.ctx.beginPath()
            Canvas.ctx.font = this.font
            Canvas.ctx.fillStyle = this.color
            Canvas.ctx.fillText(this.content, this.pos.x, this.pos.y)
        }
    }

    public setPos(x: number, y: number): void {
        this.pos.x = x
        this.pos.y = y
    }

    public setContent(content: string) {
        this.content = content
    }

    public getDrawOrder(): number {
        return this.drawOrder
    }

    public setDrawOrder(drawOrder: number) {
        this.drawOrder = drawOrder
    }

    public update() {
        ///
    }
}
