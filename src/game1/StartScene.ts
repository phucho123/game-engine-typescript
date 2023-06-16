import { Background } from '../engine/components/Background'
import { Images } from '../engine/components/Images'
import { Scene } from '../engine/scenes/Scene'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Renderer } from '../engine/render/Renderer'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { Maths } from '../engine/math/Maths'

export class StartScene extends Scene {
    private background: Background
    private startButton: Images
    private renderer: Renderer
    constructor(renderer: Renderer) {
        super()
        this.renderer = renderer

        this.background = new Background({ x: 0, y: 0 }, '../assets/images/background-night.png', 0)
        this.background.setHeight(600)
        this.background.setWidth(400)

        this.startButton = new Images(
            { x: Canvas.canvas.width / 2 - 60, y: Canvas.canvas.height / 2 - 100 },
            '../assets/images/start-button.png',
            1
        )
        this.startButton.setScale(0.5)

        this.push(this.background)
        this.push(this.startButton)

        // window.addEventListener('click', (e) => {
        //     const rect = Canvas.canvas.getBoundingClientRect()
        //     if (
        //         Maths.checkPointInRect(
        //             e.clientX - rect.left,
        //             e.clientY - rect.top,
        //             this.startButton
        //         )
        //     ) {
        //         this.sleep = true
        //         renderer.wakeupScene(1)
        //     }
        // })
    }

    public wakeup(): void {
        super.wakeup()
        InputHandler.click.push(() => {
            if (
                Maths.checkPointInRect(InputHandler.mouseX, InputHandler.mouseY, this.startButton)
            ) {
                console.log('hello there')
                this.setSleep()
                this.renderer.wakeupScene(1)
            }
        })
    }

    public setSleep(): void {
        super.setSleep()
        InputHandler.click.splice(0)
    }
}
