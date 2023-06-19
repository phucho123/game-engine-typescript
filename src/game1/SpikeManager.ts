import { Sprite } from '../engine/components/Sprite'
import { Triangle } from '../engine/components/Triangle'
import { Physics } from '../engine/physics/Physics'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Coin } from './Coin'
import { GameManager } from './GameManager'

export class SpikeManager {
    private spikeList: Triangle[] = []
    private extraSpikeList: Triangle[] = []
    private verticalSpikeList: Triangle[] = []
    private ctx: CanvasRenderingContext2D | null
    private canvasHeight: number
    private canvasWidth: number
    private spikeSize = 30
    private coin: Coin = new Coin({ x: 0, y: 0 }, '../../assets/images/coin-animation.png', 10, 3)

    constructor() {
        this.ctx = Canvas.ctx
        this.canvasWidth = Canvas.canvas.width
        this.canvasHeight = Canvas.canvas.height
        this.coin.setScale(0.15)
        this.coin.setAnimationSpeed(8)
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
        this.spikeList.map((spike) => spike.draw())
        this.verticalSpikeList.map((spike) => spike.draw())
        this.coin.draw()
    }

    public update(): void {
        this.coin.update()
        this.spikeList.map((spike) => {
            spike.update()
        })
    }

    public checkCollide(sprite: Sprite): boolean {
        if (this.coin.getDrawable() && Physics.RectanglecollideRectangle(this.coin, sprite)) {
            GameManager.score += 5
            this.coin.setDrawable(false)
        }
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

    public clear(): void {
        while (this.spikeList.length) {
            const spike = this.spikeList.shift()
            if (spike) this.extraSpikeList.push(spike)
        }
    }

    public createLeftSpike(): void {
        this.clear()
        this.coin.setDrawable(false)
        let numSpike = Math.floor(Math.random() * 7) + 4
        let prev = 0
        for (
            let i = this.spikeSize * 2;
            i < this.canvasHeight - this.spikeSize;
            i += this.spikeSize * 2
        ) {
            let tmp
            if (prev == 1) {
                tmp = Math.floor(Math.random() * 30) % 3 == 0
            } else tmp = Math.floor(Math.random() * 5)
            if (tmp && numSpike > 0) {
                this.createSpike(this.spikeSize, i, 0, i + this.spikeSize, 0, i - this.spikeSize, 2)
                numSpike--
                prev = 1
            } else {
                const tmp = Math.floor(Math.random() * 30) % 5
                if (!this.coin.getDrawable() && tmp == 1) {
                    this.coin.setPos(0, i - this.spikeSize)
                    this.coin.setDrawable(true)
                }
                prev = 0
            }
        }
    }

    public createRightSpike(): void {
        this.clear()
        this.coin.setDrawable(false)
        let numSpike = Math.floor(Math.random() * 7) + 4
        let prev = 0
        for (let i = this.spikeSize * 2; i < this.canvasHeight; i += this.spikeSize * 2) {
            let tmp
            if (prev == 1) {
                tmp = Math.floor(Math.random() * 60) % 3 == 0
            } else tmp = Math.floor(Math.random() * 2)

            if (tmp && numSpike > 0) {
                this.createSpike(
                    this.canvasWidth - this.spikeSize,
                    i,
                    this.canvasWidth,
                    i + this.spikeSize,
                    this.canvasWidth,
                    i - this.spikeSize,
                    2
                )
                numSpike--
                prev = 1
            } else {
                const tmp = Math.floor(Math.random() * 30) % 5
                if (!this.coin.getDrawable() && tmp == 1) {
                    this.coin.setPos(this.canvasWidth - this.coin.getWidth(), i - this.spikeSize)
                    this.coin.setDrawable(true)
                }
                prev = 0
            }
        }
    }

    public createVerticalSpike(): void {
        for (let i = this.spikeSize; i < this.canvasWidth; i += this.spikeSize * 2) {
            this.verticalSpikeList.push(
                new Triangle(
                    { x: i, y: this.spikeSize },
                    { x: i - this.spikeSize, y: 0 },
                    { x: i + this.spikeSize, y: 0 },
                    2
                )
            )
        }
        for (let i = this.spikeSize; i < this.canvasWidth; i += this.spikeSize * 2) {
            this.verticalSpikeList.push(
                new Triangle(
                    { x: i, y: this.canvasHeight - this.spikeSize },
                    { x: i - this.spikeSize, y: this.canvasHeight },
                    { x: i + this.spikeSize, y: this.canvasHeight },
                    2
                )
            )
        }
    }
}
