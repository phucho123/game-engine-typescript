import { Canvas } from '../render/canvas/Canvas'

export class InputHandler {
    public static keydown: string | null = null
    public static keyup: string | null = null
    public static click = false
    public static mouseX: number
    public static mouseY: number

    public constructor() {
        ////
    }

    public static init(): void {
        window.addEventListener('keydown', (e) => {
            InputHandler.keydown = e.key
            InputHandler.keyup = null
        })

        window.addEventListener('keyup', (e) => {
            InputHandler.keydown = null
            InputHandler.keyup = e.key
        })

        Canvas.canvas.addEventListener('mousedown', () => {
            InputHandler.click = true
        })

        Canvas.canvas.addEventListener('mouseup', () => {
            InputHandler.click = false
        })

        Canvas.canvas.addEventListener('mousemove', (e) => {
            const rect = Canvas.canvas.getBoundingClientRect()
            InputHandler.mouseX = e.clientX - rect.left
            InputHandler.mouseY = e.clientY - rect.top
        })
    }

    public static onKeydown(e: string): boolean {
        return InputHandler.keydown == e
    }

    public static onKeyup(e: string): boolean {
        return InputHandler.keyup == e
    }

    public static onClick(): boolean {
        return InputHandler.click
    }
}
