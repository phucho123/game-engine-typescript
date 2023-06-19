export class Timer {
    public static deltaTime = 1
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
