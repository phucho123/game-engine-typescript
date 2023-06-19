import { Background } from '../engine/components/Background'
import { Images } from '../engine/components/Images'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { Maths } from '../engine/math/Maths'
import { Renderer } from '../engine/render/Renderer'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Scene } from '../engine/scenes/Scene'

export class StartScene extends Scene {
    private renderer: Renderer
    private background: Background
    private startButton: Images

    constructor(renderer: Renderer) {
        super()
        this.renderer = renderer

        this.background = new Background({ x: 0, y: 0 }, '../assets/images/bck.png', 0)
        this.background.setHeight(Canvas.canvas.height)
        this.background.setWidth(Canvas.canvas.width)

        this.startButton = new Images(
            { x: Canvas.canvas.width / 2 - 60, y: Canvas.canvas.height / 2 - 50 },
            '../assets/images/start-button.png',
            1
        )
        this.startButton.setScale(0.1)

        this.pushToSpriteList(this.background)
        this.pushToSpriteList(this.startButton)
    }

    public wakeup(): void {
        super.wakeup()
        InputHandler.onClick(() => {
            if (
                Maths.checkPointInRect(InputHandler.mouseX, InputHandler.mouseY, this.startButton)
            ) {
                // console.log('hello there')
                this.setSleep()
                this.renderer.wakeupScene(1)
            }
        })
    }

    public setSleep(): void {
        super.setSleep()
        InputHandler.clearMouseClick()
    }
}
