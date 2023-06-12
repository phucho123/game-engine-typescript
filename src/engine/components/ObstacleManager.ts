import { Sprite } from './Sprite'

export class ObstacleManager {
    private obstacleList: Sprite[] = []
    private extraObstacleList: Sprite[] = []

    constructor() {
        ///
    }

    public push(obstacle: Sprite) {
        this.obstacleList.push(obstacle)
    }

    public createObstacle(pos: Position, src: string, drawOrder: number): void {
        if (this.extraObstacleList.length) {
            const obstacle = this.extraObstacleList.shift()
            if (obstacle) {
                obstacle?.setPos(pos.x, pos.y)
                this.obstacleList.push(obstacle)
            }
        } else {
            this.obstacleList.push(new Sprite(pos, src, drawOrder))
        }
    }

    public deleteObstacle(): void {
        const obstacle = this.obstacleList.shift()
        if (obstacle) this.extraObstacleList.push(obstacle)
    }
}
