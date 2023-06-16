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
            this.sceneList.map((scene) => {
                if (!scene.sleep) {
                    scene.draw()
                }
            })
        }
    }

    public update() {
        this.sceneList.map((scene) => {
            if (!scene.sleep) scene.update()
        })
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
