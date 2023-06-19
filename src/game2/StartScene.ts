import { Background } from '../engine/components/Background'
import { BaseImage } from '../engine/components/BaseImage'
import { InputHandler } from '../engine/input-handler/InputHandler'
import { Maths } from '../engine/math/Maths'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Scene } from '../engine/scenes/Scene'
import { SceneManager } from '../engine/scenes/SceneManager'

export class StartScene extends Scene {
    private sceneManager: SceneManager
    private background: Background
    private startButton: BaseImage

    constructor(sceneManager: SceneManager) {
        super()
        this.sceneManager = sceneManager

        this.background = new Background({ x: 0, y: 0 }, '../assets/images/bck.png', 0)
        this.background.setHeight(Canvas.canvas.height)
        this.background.setWidth(Canvas.canvas.width)

        this.startButton = new BaseImage(
            { x: Canvas.canvas.width / 2 - 60, y: Canvas.canvas.height / 2 - 50 },
            '../assets/images/start-button.png',
            1
        )
        this.startButton.setScale(0.1)

        this.addGameObject(this.background)
        this.addGameObject(this.startButton)
    }

    public update(): void {
        super.update()
        if (InputHandler.onClick()) {
            if (
                Maths.checkPointInRect(InputHandler.mouseX, InputHandler.mouseY, this.startButton)
            ) {
                this.sceneManager.wakeupScene(1)
                this.setSleep()
            }
        }
    }
}
