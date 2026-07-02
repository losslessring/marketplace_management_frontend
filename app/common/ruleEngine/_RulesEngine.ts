import Rule from './rule'

export default class RulesEngine {
    private rules: Rule[]
    constructor(rules: Rule[]) {
        this.rules = rules
    }

    run(state: any) {
        for (const rule of this.rules) {
            if (rule.condition(state)) {
                return rule.action(state)
            }
        }
    }

    runAll(state: any) {
        return this.rules.map((rule) => {
            if (rule.condition(state)) {
                return rule.action(state)
            }
        })
    }
}
