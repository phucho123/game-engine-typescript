import { Sprite } from './Sprite'

export class AnimationSprite extends Sprite {
    private frame: number
    private maxFrame: number
    private animationTime: number
    private timeToChangeFrame: number

    constructor(pos: Position, src: string, drawOrder: number, maxFrame: number) {
        super(pos, src, drawOrder)
        this.frame = 0
        this.maxFrame = maxFrame
        this.animationTime = 20
        this.timeToChangeFrame = 0
    }

    public draw(ctx: CanvasRenderingContext2D | null): void {
        this.timeToChangeFrame++
        if (this.timeToChangeFrame >= this.animationTime) {
            this.timeToChangeFrame = 0
            this.frame = (this.frame + 1) % this.maxFrame
        }
        if (ctx && this.drawable) {
            ctx.save()
            ctx.translate(this.pos.x, this.pos.y)
            ctx.rotate(this.angle)
            ctx.drawImage(
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
            ctx.beginPath()
            ctx.strokeStyle = 'red'
            ctx.rect(
                (-this.width * this.scale) / (2 * this.maxFrame),
                (-this.height * this.scale) / 2,
                (this.width * this.scale) / this.maxFrame,
                this.height * this.scale
            )
            ctx.stroke()
            ctx.restore()
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
    }
}
