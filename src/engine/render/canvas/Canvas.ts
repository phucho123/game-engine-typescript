export class Canvas {
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D | null

    constructor(width: number, height: number) {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement
        this.canvas.id = 'my-canvas'
        this.canvas.width = width
        this.canvas.height = height
        document.getElementById('game')?.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D | null
    }

    public draw(): void {
        if (this.ctx) {
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }
}
