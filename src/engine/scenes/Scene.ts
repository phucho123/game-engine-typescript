import { Images } from '../components/Images'
import { Text } from '../components/Text'
import { Shape } from '../components/Shape'

export class Scene {
    protected spriteList: (Images | Text | Shape)[]
    protected needToSort: boolean
    protected sleep = true

    constructor() {
        this.spriteList = []
        this.needToSort = false
    }

    public pushToSpriteList(sprite: Images | Text | Shape): void {
        this.needToSort = true
        this.spriteList.push(sprite)
    }

    public update(): void {
        if (this.sleep) return
        this.spriteList.map((sprite) => {
            sprite.update()
        })
    }

    public getSpriteList(): (Images | Text | Shape)[] {
        return this.spriteList
    }

    public draw(): void {
        if (this.needToSort) {
            this.needToSort = false
            this.spriteList.sort((a: Images | Text | Shape, b: Images | Text | Shape) => {
                return a.getDrawOrder() - b.getDrawOrder()
            })
        }
        this.spriteList.map((sprite) => {
            sprite.draw()
        })
    }

    public requestSort() {
        this.needToSort = true
    }

    public restart() {
        ////
    }

    public wakeup() {
        this.sleep = false
    }

    public setSleep() {
        this.sleep = true
    }

    public isSleep(): boolean {
        return this.sleep
    }

    public setDrawOrder(sprite: Images | Text | Shape, drawOrder: number) {
        const tmp = this.spriteList.filter((obj) => obj == sprite)
        tmp[0].setDrawOrder(drawOrder)
        this.needToSort = true
    }
}
