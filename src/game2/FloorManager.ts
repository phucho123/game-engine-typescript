import { Physics } from '../engine/physics/Physics'
import { Canvas } from '../engine/render/canvas/Canvas'
import { Floor } from './Floor'
import { PlayScene } from './PlayScene'
import { Player } from './Player'

export class FloorManager {
    private floorList: Floor[] = []
    private extraFloorList: Floor[] = []
    private timeToSpawnFloor = 80
    private countTimeToSpawnFloor = this.timeToSpawnFloor
    constructor() {
        ///
    }

    public createFloor(x: number, y: number, color: string, speed: number) {
        let newFloor
        if (this.extraFloorList.length > 0) {
            newFloor = this.extraFloorList.shift()
            if (newFloor != undefined) {
                newFloor.setPos(x, y)
            }
        } else {
            console.log('create new Floor')
            newFloor = new Floor({ x: x, y: y }, color, 1)
        }
        if (newFloor != undefined) {
            newFloor.setSpeed(speed)
            newFloor.setHeight(20)
            newFloor.setWidth(100)
            newFloor.setColor(color)
            this.floorList.push(newFloor)
        }
    }

    public draw() {
        for (const floor of this.floorList) {
            floor.draw()
        }
    }

    public update() {
        for (const floor of this.floorList) {
            floor.setPos(floor.getPos().x, floor.getPos().y + PlayScene.scroll)
            if (floor.getPos().y >= Canvas.canvas.height) {
                const removeFloor = this.floorList.shift()
                if (removeFloor != undefined) {
                    this.extraFloorList.push(removeFloor)
                }
            }
        }
        this.countTimeToSpawnFloor -= PlayScene.scroll
        if (this.countTimeToSpawnFloor <= 0) {
            this.countTimeToSpawnFloor = this.timeToSpawnFloor
            const randNum = Math.floor(Math.random() * 100) % 3
            let speed = 0
            let color = 'green'
            if (randNum == 0) {
                speed = 1.5
                color = 'blue'
            }
            this.createFloor(
                Math.floor(Math.random() * (Canvas.canvas.width - 100)),
                0,
                color,
                speed
            )
        }
        for (const floor of this.floorList) {
            floor.update()
        }
    }

    public checkCollide(player: Player) {
        this.floorList.map((floor) => {
            if (
                Physics.RectanglecollideRectangle(player, floor) &&
                player.fall &&
                player.preY <= floor.getPos().y
            ) {
                player.setSpeedY(-6)
            }
        })
    }

    public initialFloor() {
        this.clear()
        for (let i = 0; i < Canvas.canvas.height; i += this.timeToSpawnFloor) {
            if (i + this.timeToSpawnFloor >= Canvas.canvas.height) {
                this.createFloor(0, i, 'green', 0)
            } else {
                this.createFloor(
                    Math.floor(Math.random() * (Canvas.canvas.width - 100)),
                    i,
                    'green',
                    0
                )
            }
        }

        this.floorList.reverse()
    }

    public clear() {
        while (this.floorList.length) {
            const removeFloor = this.floorList.shift()
            if (removeFloor != undefined) {
                this.extraFloorList.push(removeFloor)
            }
        }
    }
}
