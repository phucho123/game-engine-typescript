import { Sprite } from '../components/Sprite'
import { Timer } from '../system/Timer'

export class Body extends Sprite {
    private direction: Vector
    private speed: Vector
    private gravity: number
    private acceleration: number

    constructor(pos: Vector, src: string, maxFrame: number, drawOrder: number) {
        super(pos, src, maxFrame, drawOrder)
        this.gravity = 0
        this.speed = { x: 0, y: 0 }
        this.direction = { x: 0, y: 0 }
        this.acceleration = 0
    }

    public setDirection(xpos: number, ypos: number): void {
        const dist = Math.sqrt(xpos * xpos + ypos * ypos)

        this.direction.x = xpos / dist
        this.direction.y = ypos / dist
    }

    public setSpeedX(speed: number): void {
        this.speed.x = speed
    }

    public getSpeedX(): number {
        return this.speed.x
    }

    public setSpeedY(speed: number): void {
        this.speed.y = speed
    }

    public getSpeedY(): number {
        return this.speed.y
    }

    public setAcceleration(acceleration: number): void {
        this.acceleration = acceleration
    }

    public setGravity(gravity: number): void {
        this.gravity = gravity
    }

    public update(): void {
        super.update()
        this.speed.x += this.acceleration * Timer.deltaTime
        this.speed.y += (this.gravity + this.acceleration) * Timer.deltaTime
        this.pos.x += this.direction.x * this.speed.x * Timer.deltaTime
        this.pos.y += this.direction.y * this.speed.y * Timer.deltaTime
        this.updateCenter()
    }
}
