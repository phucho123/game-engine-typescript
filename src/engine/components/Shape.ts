import { GameObject } from './GameObject'

export class Shape extends GameObject {
    protected color: string
    protected pos: Vector
    protected scale: number
    protected angle: number
    protected drawOrder: number

    constructor(pos: Vector, color: string, drawOrder: number) {
        super()
        this.pos = pos
        this.color = color
        this.scale = 1
        this.angle = 0
        this.drawOrder = drawOrder
    }

    public setColor(color: string) {
        this.color = color
    }

    public setScale(scale: number) {
        this.scale = scale
    }

    public rotate(angle: number) {
        this.angle = angle
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

    public draw() {
        ////
    }
}
