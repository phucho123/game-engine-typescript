import { Maths } from '../math/Maths'
import { Canvas } from '../render/canvas/Canvas'

export class Images {
    protected pos: Vector
    protected image: HTMLImageElement = new Image()
    protected angle: number
    protected width: number
    protected height: number
    protected scale: number
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
                this.updateCenter()
            }
        }
        this.scale = 1
        this.drawOrder = drawOrder
    }

    public draw(): void {
        if (Canvas.ctx && this.drawable) {
            Canvas.ctx.save()
            if (this.flip) {
                Canvas.ctx.translate(this.pos.x + this.width * this.scale, this.pos.y)
                Canvas.ctx.scale(-1, 1)
                Canvas.ctx.translate(this.getWidth() / 2, this.getHeight() / 2)
                Canvas.ctx.rotate(this.angle)
            } else {
                Canvas.ctx.translate(this.center.x, this.center.y)
                Canvas.ctx.rotate(this.angle)
            }

            Canvas.ctx.drawImage(
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
            Canvas.ctx.restore()
        }
    }

    public setScale(scale: number) {
        this.scale = scale
        this.updateCenter()
    }

    public getPos(): Vector {
        return this.pos
    }

    public setPos(x: number, y: number) {
        this.pos.x = x
        this.pos.y = y
        this.updateCenter()
    }

    public getWidth(): number {
        return this.width * this.scale
    }

    public setWidth(width: number): void {
        this.width = width
        this.updateCenter()
    }

    public getHeight(): number {
        return this.height * this.scale
    }

    public setHeight(height: number): void {
        this.height = height
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

    public getDrawOrder(): number {
        return this.drawOrder
    }

    public update() {
        ///
    }

    public setSrc(src: string): void {
        this.image.src = src
    }

    public getCenter(): Vector {
        return this.center
    }

    public updateCenter() {
        this.center.x = this.pos.x + (this.width * this.scale) / 2
        this.center.y = this.pos.y + (this.height * this.scale) / 2
    }

    public _flip(): void {
        this.flip = !this.flip
    }

    public setFlip(state: boolean) {
        this.flip = state
    }

    public getDrawable(): boolean {
        return this.drawable
    }
}
