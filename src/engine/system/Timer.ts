export class Timer {
    public static deltaTime = 1
    private clock: number
    constructor() {
        this.clock = Date.now()
    }
    public run(): void {
        const timeNow = Date.now()
        Timer.deltaTime = (timeNow - this.clock) / 7
        this.clock = timeNow
    }
}
