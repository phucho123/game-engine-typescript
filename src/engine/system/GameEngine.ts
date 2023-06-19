import { Renderer } from '../render/Renderer'
import { SceneManager } from '../scenes/SceneManager'
import { Timer } from './Timer'

export class GameEngine {
    public renderer: Renderer
    public sceneManager: SceneManager
    public timer: Timer
    constructor() {
        this.sceneManager = new SceneManager()
        this.renderer = new Renderer(this.sceneManager)
        this.timer = new Timer()
    }

    public run() {
        requestAnimationFrame(() => this.loop())
    }

    public loop() {
        this.timer.run()
        this.sceneManager.update()
        this.renderer.draw()
        requestAnimationFrame(() => this.loop())
    }
}
