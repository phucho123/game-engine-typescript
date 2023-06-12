import { Scene } from '../scenes/Scene'

export class Renderer {
    private scence: Scene
    private ctx: CanvasRenderingContext2D | null
    constructor(ctx: CanvasRenderingContext2D | null) {
        this.ctx = ctx
    }
    public draw(): void {
        if (this.ctx) {
            this.scence.getSpriteList().map((sprite) => {
                sprite.draw(this.ctx)
            })
        }
    }
    public setScene(scence: Scene) {
        this.scence = scence
    }
}
