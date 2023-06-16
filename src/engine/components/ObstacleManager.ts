// import { Canvas } from '../render/canvas/Canvas'
// import { Sprite } from './Images'
// import { Physics } from '../physics/Physics'

// export class ObstacleManager {
//     private obstacleList: Sprite[] = []
//     private extraObstacleList: Sprite[] = []
//     private canvas: Canvas
//     private speed: number
//     private direction: Vector = { x: 0, y: 0 }

//     constructor(canvas: Canvas) {
//         this.canvas = canvas
//     }

//     public push(obstacle: Sprite) {
//         this.obstacleList.push(obstacle)
//     }

//     public createObstacle(x: number, y: number, src: string, drawOrder: number): void {
//         if (this.extraObstacleList.length) {
//             const obstacle = this.extraObstacleList.shift()
//             if (obstacle) {
//                 obstacle.setPos(x, y)
//                 obstacle.setSrc(src)
//                 obstacle.setDrawOrder(drawOrder)
//                 obstacle.setSpeedX(this.speed)
//                 obstacle.setDirection(this.direction.x, this.direction.y)
//                 this.push(obstacle)
//             }
//         } else {
//             const newObstacle = new Sprite({ x: x, y: y }, src, drawOrder)
//             newObstacle.setSpeedX(this.speed)
//             newObstacle.setDirection(this.direction.x, this.direction.y)
//             this.obstacleList.push(newObstacle)
//             console.log('Create new obtacle')
//         }
//     }

//     public deleteObstacle(index: number): void {
//         const obstacle = this.obstacleList.splice(index, 1)[0]
//         if (obstacle) this.extraObstacleList.push(obstacle)
//     }

//     public draw(): void {
//         this.obstacleList.map((obstacle) => obstacle.draw(this.canvas.ctx))
//     }

//     public update(): void {
//         this.obstacleList.map((obstacle, index) => {
//             obstacle.update()
//             if (this.checkOutOfCanvas(obstacle)) {
//                 this.deleteObstacle(index)
//                 console.log('deleted', index)
//             }
//         })
//     }

//     public checkOutOfCanvas(obstacle: Sprite): boolean {
//         // const top = obstacle.getPos().y - obstacle.getHeight() / 2
//         // const bottom = obstacle.getPos().y + obstacle.getHeight() / 2
//         // const left = obstacle.getPos().x - obstacle.getWidth() / 2
//         const right = obstacle.getPos().x + obstacle.getWidth()
//         if (right <= 0) return true
//         return false
//     }

//     public setObstacleSpeed(speed: number) {
//         this.speed = speed
//         this.obstacleList.map((obstacle) => obstacle.setSpeedX(this.speed))
//     }

//     public setObstacleDirection(x: number, y: number) {
//         const dist = Math.sqrt(x * x + y * y)

//         this.direction.x = x / dist
//         this.direction.y = y / dist

//         this.obstacleList.map((obstacle) =>
//             obstacle.setDirection(this.direction.x, this.direction.y)
//         )
//     }

//     public checkCollide(sprite: Sprite): boolean {
//         for (const obstacle of this.obstacleList) {
//             if (Physics.RectanglecollideRectangle(obstacle, sprite)) {
//                 console.log('collided')
//                 return true
//             }
//         }
//         return false
//     }

//     public clear() {
//         this.extraObstacleList = this.obstacleList
//         this.obstacleList = []
//     }
// }
