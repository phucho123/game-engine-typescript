import { Body } from '../engine/physics/Body'
import { Canvas } from '../engine/render/canvas/Canvas'

export class Bird extends Body {
    constructor(pos: Vector, src: string, drawOrder: number) {
        super(pos, src, 3, drawOrder)
        this.setDirection(1, 1)
        this.setSpeedX(2)
        this.setSpeedY(0)
        this.setGravity(0.07)
        this.setFlip(false)
    }

    public update(): void {
        super.update()
        if (this.pos.x + this.getWidth() >= Canvas.canvas.width) {
            this.setFlip(true)
            this.setDirection(-1, 1)
        } else if (this.pos.x <= 0) {
            this.setFlip(false)
            this.setDirection(1, 1)
        }
    }
}
