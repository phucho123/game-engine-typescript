import { Background } from '../engine/components/Background'
import { Images } from '../engine/components/Images'
import { Scene } from '../engine/scenes/Scene'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Renderer } from '../engine/render/Renderer'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { Maths } from '../engine/math/Maths'
import { Bird } from './Bird'

export class StartScene extends Scene {
    private background: Background
    private startButton: Images
    private renderer: Renderer
    private bird: Bird

    constructor(renderer: Renderer) {
        super()
        this.renderer = renderer

        this.background = new Background({ x: 0, y: 0 }, '../assets/images/background-night.png', 0)
        this.background.setHeight(600)
        this.background.setWidth(400)
        this.background.setScrollSpeed(2)

        this.bird = new Bird(
            { x: Canvas.canvas.width / 2 - 30, y: Canvas.canvas.height / 2 },
            '../assets/images/yellowbird-animate.png',
            1
        )
        this.bird.setDirection(1, 0)
        this.bird.setSpeedX(0)
        this.bird.setScale(1.5)

        this.startButton = new Images(
            { x: Canvas.canvas.width / 2 - 60, y: Canvas.canvas.height / 2 - 50 },
            '../assets/images/start-button.png',
            1
        )
        this.startButton.setScale(0.1)

        this.push(this.background)
        this.push(this.startButton)
        this.push(this.bird)
    }

    public wakeup(): void {
        super.wakeup()
        InputHandler.onClick(() => {
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
        InputHandler.clearMouseClick()
    }
}
