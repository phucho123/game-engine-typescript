import { Canvas } from '../render/canvas/Canvas'
import { Scene } from './Scene'

export class SceneManager {
    private scenes: Scene[]
    private ctx: CanvasRenderingContext2D | null

    constructor() {
        this.ctx = Canvas.ctx
        this.scenes = []
    }

    public draw(): void {
        if (this.ctx) {
            for (const scene of this.scenes) {
                if (!scene.isSleep()) {
                    scene.draw()
                }
            }
        }
    }

    public update(): void {
        for (const scene of this.scenes) {
            if (!scene.isSleep()) {
                scene.update()
            }
        }
    }

    public push(scene: Scene): void {
        this.scenes.push(scene)
    }

    public sleepScene(index: number): void {
        this.scenes[index].setSleep()
    }

    public wakeupScene(index: number): void {
        this.scenes[index].wakeup()
    }

    public getScenes(): Scene[] {
        return this.scenes
    }
}
