import { BaseImage } from '../components/BaseImage'
import { Sprite } from '../components/Sprite'

export class Maths {
    public static deg2rad = Math.PI / 180
    public static rad2deg = 180 / Math.PI

    constructor() {
        ///
    }

    public static checkPointInRect(x: number, y: number, rect: Sprite | BaseImage): boolean {
        const diff_x = Math.abs(x - rect.getCenter().x)
        const diff_y = Math.abs(y - rect.getCenter().y)

        if (diff_x <= rect.getWidth() / 2 && diff_y <= rect.getHeight() / 2) return true

        return false
    }

    public static intersects(
        a: number,
        b: number,
        c: number,
        d: number,
        p: number,
        q: number,
        r: number,
        s: number
    ): boolean {
        const det = (c - a) * (s - q) - (r - p) * (d - b)
        if (det === 0) {
            return false
        } else {
            const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det
            const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det
            return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1
        }
    }
}
