export class Timer {
    public static deltaTime = 0
    private clock = Date.now()
    constructor() {
        ////
    }
    public run() {
        const timeNow = Date.now()
        Timer.deltaTime = (timeNow - this.clock) / 7
        this.clock = timeNow
    }
}
