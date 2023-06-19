import { Rectangle } from '../engine/components/Rectangle'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Timer } from '../engine/system/Timer'

export class Floor extends Rectangle {
    private dir = -1
    private speed = 1
    constructor(pos: Vector, color: string, drawOrder: number) {
        super(pos, color, drawOrder)
        this.updateCenter()
    }

    public update(): void {
        super.update()
        this.pos.x += this.dir * this.speed * Timer.deltaTime
        if (this.pos.x <= 0) this.dir = 1
        if (this.pos.x + this.getWidth() >= Canvas.canvas.width) this.dir = -1
        this.updateCenter()
    }

    public setSpeed(speed: number): void {
        this.speed = speed
    }

    public setDir(dir: number): void {
        this.dir = dir
    }
}
