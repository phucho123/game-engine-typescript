import { AnimationSprite } from '../components/AnimationSprite'
import { Rectangle } from '../components/Rectangle'
import { Sprite } from '../components/Sprite'

export class Physics {
    constructor() {
        ////
    }
    public collide(
        sprite1: Sprite | AnimationSprite | Rectangle,
        sprite2: Sprite | AnimationSprite | Rectangle
    ): boolean {
        const diff_x = Math.abs(sprite1.getPos().x - sprite2.getPos().x)
        const diff_y = Math.abs(sprite1.getPos().y - sprite2.getPos().y)

        const totalWidth = (sprite1.getWidth() + sprite2.getWidth()) / 2
        const totalHeight = (sprite1.getHeight() + sprite2.getHeight()) / 2

        if (diff_x <= totalWidth && diff_y <= totalHeight) {
            console.log(sprite1.getPos(), sprite2.getPos())
            console.log(sprite1.getWidth())
            return true
        }

        return false
    }
}
