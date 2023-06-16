import { Renderer } from '../render/Renderer'
import { Timer } from './Timer'

export class GameEngine {
    public renderer: Renderer = new Renderer()
    public timer: Timer
    constructor() {
        ///
        this.timer = new Timer()
    }
    public run() {
        requestAnimationFrame(() => this.loop())
    }
    public loop() {
        this.timer.run()
        this.renderer.update()
        this.renderer.draw()
        requestAnimationFrame(() => this.loop())
    }
}
