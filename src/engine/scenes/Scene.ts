import { GameObject } from '../components/GameObject'

export class Scene {
    protected gameObjectList: GameObject[]
    protected needToSort: boolean
    protected sleep: boolean

    constructor() {
        this.gameObjectList = []
        this.needToSort = false
        this.sleep = true
    }

    public addGameObject(sprite: GameObject): void {
        this.needToSort = true
        this.gameObjectList.push(sprite)
    }

    public update(): void {
        if (this.sleep) return
        this.gameObjectList.map((sprite) => {
            sprite.update()
        })
    }

    public getSpriteList(): GameObject[] {
        return this.gameObjectList
    }

    public draw(): void {
        if (this.needToSort) {
            this.needToSort = false
            this.gameObjectList.sort((a: GameObject, b: GameObject) => {
                return a.getDrawOrder() - b.getDrawOrder()
            })
        }
        this.gameObjectList.map((gameObject) => {
            gameObject.draw()
        })
    }

    public requestSort(): void {
        this.needToSort = true
    }

    public restart(): void {
        ////
    }

    public wakeup(): void {
        this.sleep = false
    }

    public setSleep(): void {
        this.sleep = true
    }

    public isSleep(): boolean {
        return this.sleep
    }

    public setDrawOrder(sprite: GameObject, drawOrder: number): void {
        const tmp = this.gameObjectList.filter((obj) => obj == sprite)
        tmp[0].setDrawOrder(drawOrder)
        this.needToSort = true
    }
}
