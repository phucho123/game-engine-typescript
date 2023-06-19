import { BaseImage } from './BaseImage'
import { Canvas } from '../render/canvas/Canvas'
import { Timer } from '../system/Timer'

export class Background extends BaseImage {
    private scrollSpeedX = 0
    private scrollSpeedY = 0

    constructor(pos: Vector, src: string, drawOrder: number) {
        super(pos, src, drawOrder)
    }

    public draw(): void {
        if (Canvas.ctx) {
            if (this.scrollSpeedX != 0) {
                Canvas.ctx.drawImage(
                    this.image,
                    this.pos.x,
                    this.pos.y,
                    this.getWidth(),
                    this.getHeight()
                )
                if (this.scrollSpeedX > 0) {
                    Canvas.ctx.drawImage(
                        this.image,
                        Canvas.canvas.width + this.pos.x,
                        this.pos.y,
                        this.getWidth(),
                        this.getHeight()
                    )
                } else {
                    Canvas.ctx.drawImage(
                        this.image,
                        -Canvas.canvas.width + this.pos.x,
                        this.pos.y,
                        this.getWidth(),
                        this.getHeight()
                    )
                }
            } else if (this.scrollSpeedY != 0) {
                Canvas.ctx.drawImage(
                    this.image,
                    this.pos.x,
                    this.pos.y,
                    this.getWidth(),
                    this.getHeight()
                )
                if (this.scrollSpeedY > 0) {
                    Canvas.ctx.drawImage(
                        this.image,
                        this.pos.x,
                        Canvas.canvas.height + this.pos.y,
                        this.getWidth(),
                        this.getHeight()
                    )
                } else {
                    Canvas.ctx.drawImage(
                        this.image,
                        this.pos.x,
                        -Canvas.canvas.height + this.pos.y,
                        this.getWidth(),
                        this.getHeight()
                    )
                }
            } else {
                Canvas.ctx.drawImage(
                    this.image,
                    this.pos.x,
                    this.pos.y,
                    this.getWidth(),
                    this.getHeight()
                )
            }
        }
    }

    public update(): void {
        this.pos.x -= this.scrollSpeedX * Timer.deltaTime
        if (this.pos.x <= -this.getWidth()) this.pos.x = 0
        else if (this.pos.x >= Canvas.canvas.width) this.pos.x = 0

        this.pos.y -= this.scrollSpeedY * Timer.deltaTime
        if (this.pos.y <= -this.getHeight()) this.pos.y = 0
        else if (this.pos.y >= Canvas.canvas.height) this.pos.y = 0
    }

    public setScrollSpeedX(speed: number): void {
        this.scrollSpeedX = speed
    }

    public setScrollSpeedY(speed: number): void {
        this.scrollSpeedY = speed
    }
}
