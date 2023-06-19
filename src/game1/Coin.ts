import { Sprite } from '../engine/components/Sprite'

export class Coin extends Sprite {
    private eaten: boolean
    constructor(pos: Vector, src: string, maxFrame: number, drawOrder: number) {
        super(pos, src, maxFrame, drawOrder)
        this.drawable = false
        this.eaten = false
    }

    public setEaten(state: boolean): void {
        this.eaten = state
    }

    public update(): void {
        super.update()
    }

    public getEaten(): boolean {
        return this.eaten
    }
}
