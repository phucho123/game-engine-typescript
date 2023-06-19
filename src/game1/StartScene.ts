import { Background } from '../engine/components/Background'
import { BaseImage } from '../engine/components/BaseImage'
import { Scene } from '../engine/scenes/Scene'
import { Canvas } from '../engine/render/canvas/Canvas'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { Maths } from '../engine/math/Maths'
import { Bird } from './Bird'
import { SceneManager } from '../engine/scenes/SceneManager'

export class StartScene extends Scene {
    private background: Background
    private startButton: BaseImage
    private sceneManager: SceneManager
    private bird: Bird

    constructor(sceneManager: SceneManager) {
        super()
        this.sceneManager = sceneManager

        this.background = new Background({ x: 0, y: 0 }, '../assets/images/background-night.png', 0)
        this.background.setHeight(600)
        this.background.setWidth(400)
        this.background.setScrollSpeedX(2)

        this.bird = new Bird(
            { x: Canvas.canvas.width / 2 - 30, y: Canvas.canvas.height / 2 },
            '../assets/images/yellowbird-animate.png',
            1
        )
        this.bird.setDirection(1, 0)
        this.bird.setSpeedX(0)
        this.bird.setScale(1.5)

        this.startButton = new BaseImage(
            { x: Canvas.canvas.width / 2 - 60, y: Canvas.canvas.height / 2 - 50 },
            '../assets/images/start-button.png',
            1
        )
        this.startButton.setScale(0.1)

        this.addGameObject(this.background)
        this.addGameObject(this.startButton)
        this.addGameObject(this.bird)
    }

    public update(): void {
        if (InputHandler.onClick()) {
            this.f1()
        }
        super.update()
    }

    public wakeup(): void {
        super.wakeup()
    }

    public setSleep(): void {
        super.setSleep()
    }

    public f1() {
        if (Maths.checkPointInRect(InputHandler.mouseX, InputHandler.mouseY, this.startButton)) {
            this.setSleep()
            this.sceneManager.wakeupScene(1)
        }
    }
}
