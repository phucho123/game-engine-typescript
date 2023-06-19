import { Scene } from '../scenes/Scene'
import { Canvas } from './canvas/Canvas'

export class Renderer {
    public sceneList: Scene[] = []
    private ctx: CanvasRenderingContext2D | null

    constructor() {
        this.ctx = Canvas.ctx
    }

    public draw(): void {
        if (this.ctx) {
            for (const scene of this.sceneList) {
                if (!scene.isSleep()) {
                    scene.draw()
                }
            }
        }
    }

    public update() {
        for (const scene of this.sceneList) {
            if (!scene.isSleep()) {
                scene.update()
            }
        }
    }

    public push(scene: Scene) {
        this.sceneList.push(scene)
    }

    public sleepScene(index: number) {
        this.sceneList[index].setSleep()
    }

    public wakeupScene(index: number) {
        this.sceneList[index].wakeup()
    }
}
