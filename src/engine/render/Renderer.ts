import { SceneManager } from '../scenes/SceneManager'

export class Renderer {
    private sceneManager: SceneManager

    constructor(sceneManager: SceneManager) {
        this.sceneManager = sceneManager
    }

    public draw(): void {
        this.sceneManager.draw()
    }
}
