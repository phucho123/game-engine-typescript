export class Shape {
    protected color: string
    protected pos: Vector
    protected ctx: CanvasRenderingContext2D | null
    protected scale: number
    protected angle: number

    constructor(pos: Vector, color: string, ctx: CanvasRenderingContext2D | null) {
        this.pos = pos
        this.color = color
        this.ctx = ctx
        this.scale = 1
        this.angle = 0
    }

    public setColor(color: string) {
        this.color = color
    }

    public _scale(scale: number) {
        this.scale = scale
    }

    public rotate(angle: number) {
        this.angle = angle
    }
}
