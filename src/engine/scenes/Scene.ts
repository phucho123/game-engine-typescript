import { AnimationSprite } from '../components/AnimationSprite'
import { Background } from '../components/Background'
import { Sprite } from '../components/Sprite'

export class Scene {
    private spriteList: (Sprite | AnimationSprite | Background)[]

    constructor() {
        this.spriteList = []
    }

    public pushToSpriteList(sprite: Sprite | AnimationSprite | Background): void {
        let i
        for (i = this.spriteList.length - 1; i >= 0; i--) {
            if (this.spriteList[i].getOrder() <= sprite.getOrder()) {
                this.spriteList.splice(i + 1, 0, sprite)
                break
            }
        }
        if (i < 0) this.spriteList.splice(0, 0, sprite)
    }

    // public pushToObstacleList(sprite: Sprite): void {
    //     let i
    //     for (i = this.obstacleList.length - 1; i >= 0; i--) {
    //         if (this.obstacleList[i].getOrder() <= sprite.getOrder()) {
    //             this.obstacleList.splice(i + 1, 0, sprite)
    //             break
    //         }
    //     }
    //     if (i < 0) this.obstacleList.splice(0, 0, sprite)
    // }

    public update(): void {
        this.spriteList.map((sprite) => {
            sprite.update()
        })
    }

    public getSpriteList(): (Sprite | AnimationSprite | Background)[] {
        return this.spriteList
    }

    public draw(ctx: CanvasRenderingContext2D | null): void {
        if (ctx) {
            this.spriteList.map((sprite) => {
                sprite.draw(ctx)
            })
        }
    }
}
