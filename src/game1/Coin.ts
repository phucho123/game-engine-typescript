import { Sprite } from '../engine/components/Sprite'

export class Coin extends Sprite {
    private eaten: boolean
    constructor(pos: Vector, src: string, maxFrame: number, drawOrder: number) {
        super(pos, src, maxFrame, drawOrder)
        this.drawable = false
    }
    public setEaten(state: boolean) {
        this.eaten = state
    }
    public getEaten(): boolean {
        return this.eaten
    }
}
