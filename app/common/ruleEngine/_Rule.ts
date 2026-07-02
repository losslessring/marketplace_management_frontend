export default class Rule {
    public condition: (state: any) => boolean
    public action: (state: any) => any
    constructor(
        condition: (state: any) => boolean,
        action: (state: any) => any
    ) {
        this.condition = condition
        this.action = action
    }
}
