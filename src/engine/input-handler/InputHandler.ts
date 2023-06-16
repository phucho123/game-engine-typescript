// export class InputHandler {
//     private functionMap: Map<string, () => void> = new Map()

import { Canvas } from '../render/canvas/Canvas'

//     constructor() {
//         window.addEventListener('keypress', (e) => {
//             this.functionMap.get(e.key)?.()
//         })

//         window.addEventListener('click', () => {
//             this.functionMap.get('click')?.()
//         })
//     }

//     public push(key: string, func: () => void): void {
//         this.functionMap.set(key, func)
//     }
// }

export class InputHandler {
    public static keydown: Map<string, () => void> = new Map()
    public static keyup: Map<string, () => void> = new Map()
    public static click: (() => void)[] = []
    public static mouseX: number
    public static mouseY: number

    public constructor() {
        ////
    }

    public static init() {
        window.addEventListener('keydown', (e) => {
            InputHandler.keydown.get(e.key)?.()
        })

        window.addEventListener('keyup', (e) => {
            InputHandler.keyup.get(e.key)?.()
        })

        window.addEventListener('click', () => {
            InputHandler.click.map((f) => f())
        })

        window.addEventListener('mousemove', (e) => {
            const rect = Canvas.canvas.getBoundingClientRect()
            InputHandler.mouseX = e.clientX - rect.left
            InputHandler.mouseY = e.clientY - rect.top
        })
    }

    public static onKeydown(e: string, f: () => void) {
        InputHandler.keydown.set(e, f)
    }

    public static onKeyUp(e: string, f: () => void) {
        InputHandler.keyup.set(e, f)
    }

    public static onClick(f: () => void) {
        InputHandler.click.push(f)
    }

    public static clearKeydown() {
        InputHandler.keydown.clear()
    }

    public static clearKeyUp() {
        InputHandler.keyup.clear()
    }

    public static clearMouseClick() {
        InputHandler.click.splice(0)
    }
}
