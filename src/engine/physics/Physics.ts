import { Sprite } from '../components/Sprite'
import { Triangle } from '../components/Triangle'
import { Maths } from '../math/Maths'

export class Physics {
    constructor() {
        ////
    }
    static RectanglecollideRectangle(sprite1: Sprite, sprite2: Sprite): boolean {
        const diff_x = Math.abs(sprite1.getCenter().x - sprite2.getCenter().x)
        const diff_y = Math.abs(sprite1.getCenter().y - sprite2.getCenter().y)

        const totalWidth = (sprite1.getWidth() + sprite2.getWidth()) / 2
        const totalHeight = (sprite1.getHeight() + sprite2.getHeight()) / 2

        if (diff_x <= totalWidth && diff_y <= totalHeight) {
            return true
        }

        return false
    }

    static TriaglecollideRectangle(sprite1: Triangle, sprite2: Sprite): boolean {
        const p1 = Maths.intersects(
            sprite1.p1.x,
            sprite1.p1.y,
            sprite1.p2.x,
            sprite1.p2.y,
            sprite2.getPos().x,
            sprite2.getPos().y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y
        )
        const p2 = Maths.intersects(
            sprite1.p1.x,
            sprite1.p1.y,
            sprite1.p2.x,
            sprite1.p2.y,
            sprite2.getPos().x,
            sprite2.getPos().y,
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )
        const p3 = Maths.intersects(
            sprite1.p1.x,
            sprite1.p1.y,
            sprite1.p2.x,
            sprite1.p2.y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y,
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )
        const p4 = Maths.intersects(
            sprite1.p1.x,
            sprite1.p1.y,
            sprite1.p2.x,
            sprite1.p2.y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y + sprite2.getHeight(),
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )

        const p5 = Maths.intersects(
            sprite1.p1.x,
            sprite1.p1.y,
            sprite1.p3.x,
            sprite1.p3.y,
            sprite2.getPos().x,
            sprite2.getPos().y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y
        )
        const p6 = Maths.intersects(
            sprite1.p1.x,
            sprite1.p1.y,
            sprite1.p3.x,
            sprite1.p3.y,
            sprite2.getPos().x,
            sprite2.getPos().y,
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )
        const p7 = Maths.intersects(
            sprite1.p1.x,
            sprite1.p1.y,
            sprite1.p3.x,
            sprite1.p3.y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y,
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )
        const p8 = Maths.intersects(
            sprite1.p1.x,
            sprite1.p1.y,
            sprite1.p3.x,
            sprite1.p3.y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y + sprite2.getHeight(),
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )

        const p9 = Maths.intersects(
            sprite1.p3.x,
            sprite1.p3.y,
            sprite1.p2.x,
            sprite1.p2.y,
            sprite2.getPos().x,
            sprite2.getPos().y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y
        )
        const p10 = Maths.intersects(
            sprite1.p3.x,
            sprite1.p3.y,
            sprite1.p2.x,
            sprite1.p2.y,
            sprite2.getPos().x,
            sprite2.getPos().y,
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )
        const p11 = Maths.intersects(
            sprite1.p3.x,
            sprite1.p3.y,
            sprite1.p2.x,
            sprite1.p2.y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y,
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )
        const p12 = Maths.intersects(
            sprite1.p3.x,
            sprite1.p3.y,
            sprite1.p2.x,
            sprite1.p2.y,
            sprite2.getPos().x + sprite2.getWidth(),
            sprite2.getPos().y + sprite2.getHeight(),
            sprite2.getPos().x,
            sprite2.getPos().y + sprite2.getHeight()
        )

        return p1 || p2 || p3 || p4 || p5 || p6 || p7 || p8 || p9 || p10 || p11 || p12
    }
}
