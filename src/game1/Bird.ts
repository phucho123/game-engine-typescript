import { AnimationSprite } from '../engine/components/AnimationSprite'

export class Bird extends AnimationSprite {
    constructor(pos: Vector, src: string, drawOrder: number) {
        super(pos, src, drawOrder, 3)
        this.setDirection(1, 1)
        this.setSpeedX(2)
        this.setSpeedY(0)
        this.setGravity(0.07)
    }

    public update() {
        super.update()
        if (this.pos.x + this.getWidth() >= 400) {
            this.setDirection(-1, 1)
            this._flip()
        } else if (this.pos.x <= 0 && this.speed) {
            this.setDirection(1, 1)
            this._flip()
        }
    }

}
