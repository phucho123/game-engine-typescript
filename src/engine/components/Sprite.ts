import { Images } from './Images'
import { Canvas } from '../render/canvas/Canvas'
import { Timer } from '../system/Timer'

export class Sprite extends Images {
    private frame: number
    private maxFrame: number
    private animationTime: number
    private timeToChangeFrame: number

    constructor(pos: Vector, src: string, maxFrame: number, drawOrder: number) {
        super(pos, src, drawOrder)
        this.frame = 0
        this.maxFrame = maxFrame
        this.animationTime = 20
        this.timeToChangeFrame = 0
        this.updateCenter()
    }

    public draw(): void {
        this.timeToChangeFrame += 1 * Timer.deltaTime
        if (this.timeToChangeFrame >= this.animationTime) {
            this.timeToChangeFrame = 0
            this.frame = (this.frame + 1) % this.maxFrame
        }
        if (Canvas.ctx && this.drawable) {
            Canvas.ctx.save()
            if (this.flip) {
                Canvas.ctx.translate(this.pos.x + this.width / this.maxFrame, this.pos.y)
                Canvas.ctx.scale(-1, 1)
                Canvas.ctx.translate(this.getWidth() / 2, this.getHeight() / 2)
                Canvas.ctx.rotate(this.angle)
            } else {
                Canvas.ctx.translate(this.center.x, this.center.y)
                Canvas.ctx.rotate(this.angle)
            }

            Canvas.ctx.drawImage(
                this.image,
                (this.frame * this.image.width) / this.maxFrame,
                0,
                this.image.width / this.maxFrame,
                this.image.height,
                (-this.width * this.scale) / (2 * this.maxFrame),
                (-this.height * this.scale) / 2,
                (this.width * this.scale) / this.maxFrame,
                this.height * this.scale
            )

            // Canvas.ctx.beginPath()
            // Canvas.ctx.strokeStyle = 'red'
            // Canvas.ctx.rect(
            //     (-this.width * this.scale) / (2 * this.maxFrame),
            //     (-this.height * this.scale) / 2,
            //     (this.width * this.scale) / this.maxFrame,
            //     this.height * this.scale
            // )
            // Canvas.ctx.stroke()
            Canvas.ctx.restore()
        }
    }

    public setAnimationSpeed(speed: number) {
        this.animationTime /= speed
    }

    public getWidth(): number {
        return (this.width * this.scale) / this.maxFrame
    }

    public setWidth(width: number): void {
        this.width = width * this.maxFrame
        this.updateCenter()
    }

    public updateCenter(): void {
        this.center.x = this.pos.x + (this.width * this.scale) / (2 * this.maxFrame)
        this.center.y = this.pos.y + (this.height * this.scale) / 2
    }

    public setScale(scale: number): void {
        this.scale = scale
        this.updateCenter()
    }
}
