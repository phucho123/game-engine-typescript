import { AnimationSprite } from '../components/AnimationSprite'
import { Rectangle } from '../components/Rectangle'
import { Sprite } from '../components/Sprite'

export class Maths {
    public static deg2rad = Math.PI / 180
    public static rad2deg = 180 / Math.PI

    constructor() {
        ///
    }

    public checkPointInRect(pos: Position, rect: Sprite | AnimationSprite | Rectangle) {
        const diff_x = Math.abs(pos.x - rect.getPos().x)
        const diff_y = Math.abs(pos.y - rect.getPos().y)

        if (diff_x <= rect.getWidth() && diff_y <= rect.getHeight()) return true

        return false
    }
}
