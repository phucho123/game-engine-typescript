import { Maths } from '../math/Maths'

export class Sprite {
    protected pos: Vector
    protected image: HTMLImageElement = new Image()
    protected angle: number
    protected width: number
    protected height: number
    protected scale: number
    protected direction: Vector
    protected speed: Vector
    protected gravity: number
    protected acceleration: number
    protected drawable = true
    protected drawOrder: number
    protected center: Vector = { x: 0, y: 0 }
    protected flip = false

    constructor(pos: Vector, src: string, drawOrder: number) {
        this.pos = pos
        this.angle = 0
        if (src != '') {
            this.image.src = src
            this.image.onload = () => {
                if (this.width == undefined) this.width = this.image.width
                if (this.height == undefined) this.height = this.image.height
            }
        }

        this.scale = 1
        this.direction = { x: 0, y: 0 }
        this.speed = { x: 0, y: 0 }
        this.acceleration = 0
        this.drawOrder = drawOrder
        this.gravity = 0
        this.updateCenter()
    }

    public draw(ctx: CanvasRenderingContext2D | null): void {
        if (ctx && this.drawable) {
            ctx.save()
            if (this.flip) {
                ctx.translate(this.pos.x + this.width, this.pos.y)
                ctx.scale(-1, 1)
                ctx.translate(this.getWidth() / 2, this.getHeight() / 2)
                ctx.rotate(this.angle)
            } else {
                ctx.translate(this.center.x, this.center.y)
                ctx.rotate(this.angle)
            }
            ctx.drawImage(
                this.image,
                (-this.width * this.scale) / 2,
                (-this.height * this.scale) / 2,
                this.width * this.scale,
                this.height * this.scale
            )
            // ctx.beginPath()
            // ctx.strokeStyle = 'red'
            // ctx.rect(
            //     (-this.width * this.scale) / 2,
            //     (-this.height * this.scale) / 2,
            //     this.width * this.scale,
            //     this.height * this.scale
            // )
            // ctx.stroke()
            ctx.restore()
        }
    }

    public setScale(scale: number) {
        this.scale = scale
    }

    public getPos(): Vector {
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

    public setSpeedX(speed: number): void {
        this.speed.x = speed
    }

    public setSpeedY(speed: number) {
        this.speed.y = speed
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
        // this.angle = Math.min(this.angle + (this.acceleration * 2 * Math.PI) / 20, Math.PI / 3)
        this.speed.x += this.acceleration
        this.speed.y += this.gravity
        this.pos.x += this.direction.x * this.speed.x
        this.pos.y += this.direction.y * this.speed.y
        this.updateCenter()
    }

    public setSrc(src: string): void {
        this.image.src = src
    }

    public getCenter(): Vector {
        return this.center
    }

    public updateCenter() {
        this.center.x = this.pos.x + this.width / 2
        this.center.y = this.pos.y + this.height / 2
    }

    public _flip(): void {
        this.flip = !this.flip
    }

    public setFlip(state: boolean) {
        this.flip = state
    }

    public setGravity(gravity: number) {
        this.gravity = gravity
    }
}
