import { Maths } from '../math/Maths'

export class Sprite {
    protected pos: Position
    protected image: HTMLImageElement = new Image()
    protected angle: number
    protected width: number
    protected height: number
    protected scale: number
    protected direction: Position
    protected speed: number
    protected acceleration: number
    protected drawable = true
    protected drawOrder: number

    constructor(pos: Position, src: string, drawOrder: number) {
        this.pos = pos
        this.angle = 0
        this.image.src = src
        this.image.onload = () => {
            if (this.width == undefined) this.width = this.image.width
            if (this.height == undefined) this.height = this.image.height
        }
        this.scale = 1
        this.direction = { x: 0, y: 0 }
        this.speed = 0
        this.acceleration = 0
        this.drawOrder = drawOrder
    }

    public draw(ctx: CanvasRenderingContext2D | null): void {
        if (ctx && this.drawable) {
            ctx.save()
            ctx.translate(this.pos.x, this.pos.y)
            ctx.rotate(this.angle)
            ctx.drawImage(
                this.image,
                (-this.width * this.scale) / 2,
                (-this.height * this.scale) / 2,
                this.width * this.scale,
                this.height * this.scale
            )
            ctx.beginPath()
            ctx.strokeStyle = 'red'
            ctx.rect(
                (-this.width * this.scale) / 2,
                (-this.height * this.scale) / 2,
                this.width * this.scale,
                this.height * this.scale
            )
            ctx.stroke()
            ctx.restore()
        }
    }

    public setScale(scale: number) {
        this.scale = scale
    }

    public getPos(): Position {
        return this.pos
    }

    public setPos(x: number, y: number) {
        this.pos.x = x
        this.pos.y = y
    }

    public getWidth(): number {
        return this.width * this.scale
    }

    public setWidth(width: number): void {
        this.width = width
    }

    public getHeight(): number {
        return this.height * this.scale
    }

    public setHeight(height: number): void {
        this.height = height
    }

    public setDirection(xpos: number, ypos: number): void {
        const dist = Math.sqrt(xpos * xpos + ypos * ypos)

        this.direction.x = xpos / dist
        this.direction.y = ypos / dist
    }

    public setSpeed(speed: number): void {
        this.speed = speed
    }

    public setAcceleration(acceleration: number) {
        this.acceleration = acceleration
    }

    public rotate(angle: number) {
        this.angle = Maths.deg2rad * angle
    }

    public setDrawable(state: boolean): void {
        this.drawable = state
    }

    public setDrawOrder(drawOrder: number): void {
        this.drawOrder = drawOrder
    }

    public getOrder(): number {
        return this.drawOrder
    }

    public update(): void {
        this.speed += this.acceleration
        this.pos.x += this.direction.x * this.speed
        this.pos.y += this.direction.y * this.speed
    }
}
