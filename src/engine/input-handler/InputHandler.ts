export class InputHandler {
    private functionMap: Map<string, () => void> = new Map()
    constructor() {
        window.addEventListener('keypress', (e) => {
            this.functionMap.get(e.key)?.()
        })

        window.addEventListener('click', () => {
            this.functionMap.get('click')?.()
        })
    }

    public push(key: string, func: () => void): void {
        this.functionMap.set(key, func)
    }
}
