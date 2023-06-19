export class Canvas {
    public static canvas: HTMLCanvasElement
    public static ctx: CanvasRenderingContext2D | null

    constructor() {
        ////
    }

    public static init(width: number, height: number): void {
        Canvas.canvas = document.createElement('canvas') as HTMLCanvasElement
        Canvas.canvas.id = 'my-canvas'
        Canvas.canvas.width = width
        Canvas.canvas.height = height
        document.getElementById('game')?.appendChild(Canvas.canvas)
        Canvas.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D | null
    }

    public draw(): void {
        if (Canvas.ctx) {
            Canvas.ctx.fillStyle = 'green'
            Canvas.ctx.fillRect(0, 0, Canvas.canvas.width, Canvas.canvas.height)
        }
    }
}
