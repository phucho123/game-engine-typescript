import { Sprite } from '../engine/components/Sprite'
import { Triangle } from '../engine/components/Triangle'
import { Physics } from '../engine/physics/Physics'
import { Canvas } from '../engine/render/canvas/Canvas'

export class SpikeManager {
    private spikeList: Triangle[] = []
    private extraSpikeList: Triangle[] = []
    private verticalSpikeList: Triangle[] = []
    private ctx: CanvasRenderingContext2D | null
    private canvasHeight: number
    private canvsWidth: number
    constructor(canvas: Canvas) {
        this.ctx = canvas.ctx
        this.canvsWidth = canvas.canvas.width
        this.canvasHeight = canvas.canvas.height
    }

    public createSpike(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        drawOrder: number
    ): void {
        if (this.extraSpikeList.length) {
            const spike = this.extraSpikeList.shift()
            if (spike) {
                spike.p1.x = x1
                spike.p1.y = y1
                spike.p2.x = x2
                spike.p2.y = y2
                spike.p3.x = x3
                spike.p3.y = y3
            }

            if (spike) {
                spike.setDrawOrder(drawOrder)
                this.spikeList.push(spike)
            }
        } else {
            const newSpike = new Triangle(
                { x: x1, y: y1 },
                { x: x2, y: y2 },
                { x: x3, y: y3 },
                drawOrder
            )
            this.spikeList.push(newSpike)
            console.log('Create new spike')
        }
    }

    public deleteSpike(index: number): void {
        const obstacle = this.spikeList.splice(index, 1)[0]
        if (obstacle) this.spikeList.push(obstacle)
    }

    public draw(): void {
        this.spikeList.map((spike) => spike.draw(this.ctx))
        this.verticalSpikeList.map((spike) => spike.draw(this.ctx))
    }

    public update(): void {
        this.spikeList.map((spike) => {
            spike.update()
        })
    }

    public checkCollide(sprite: Sprite): boolean {
        for (const spike of this.spikeList) {
            if (Physics.TriaglecollideRectangle(spike, sprite)) {
                console.log('collided')
                return true
            }
        }
        for (const spike of this.verticalSpikeList) {
            if (Physics.TriaglecollideRectangle(spike, sprite)) {
                console.log('collided')
                return true
            }
        }
        return false
    }

    public clear() {
        while (this.spikeList.length) {
            const spike = this.spikeList.shift()
            if (spike) this.extraSpikeList.push(spike)
        }
    }

    public createLeftSpike(size: number) {
        this.clear()
        let numSpike = Math.floor(Math.random() * 7) + 4
        let prev = 0
        for (let i = size * 2; i < this.canvasHeight - size; i += size * 2) {
            let tmp
            if (prev == 1) {
                tmp = Math.floor(Math.random() * 30) % 3 == 0
            } else tmp = Math.floor(Math.random() * 5)
            if (tmp && numSpike > 0) {
                this.createSpike(size, i, 0, i + size, 0, i - size, 2)
                numSpike--
                prev = 1
            } else prev = 0
        }
    }

    public createRightSpike(size: number) {
        this.clear()
        let numSpike = Math.floor(Math.random() * 7) + 4
        let prev = 0
        for (let i = size * 2; i < this.canvasHeight; i += size * 2) {
            let tmp
            if (prev == 1) {
                tmp = Math.floor(Math.random() * 30) % 3 == 0
            } else tmp = Math.floor(Math.random() * 2)

            if (tmp && numSpike > 0) {
                this.createSpike(
                    this.canvsWidth - size,
                    i,
                    this.canvsWidth,
                    i + size,
                    this.canvsWidth,
                    i - size,
                    2
                )
                numSpike--
                prev = 1
            } else prev = 0
        }
    }

    public createVerticalSpike(size: number) {
        for (let i = size; i < this.canvsWidth; i += size * 2) {
            this.verticalSpikeList.push(
                new Triangle({ x: i, y: size }, { x: i - size, y: 0 }, { x: i + size, y: 0 }, 2)
            )
        }
        for (let i = size; i < this.canvsWidth; i += size * 2) {
            this.verticalSpikeList.push(
                new Triangle(
                    { x: i, y: this.canvasHeight - size },
                    { x: i - size, y: this.canvasHeight },
                    { x: i + size, y: this.canvasHeight },
                    2
                )
            )
        }
    }
}
