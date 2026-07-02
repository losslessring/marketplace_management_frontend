import { IRule } from '@/app/interfaces/rulesEngine/Rule'

export default function createRules(rules: IRule[]) {
    return {
        rules,
        run(state: any) {
            for (const rule of this.rules) {
                if (rule.condition(state)) {
                    return rule.action(state)
                }
            }
        },

        runAll(state: any) {
            return this.rules.map((rule) => {
                if (rule.condition(state)) {
                    return rule.action(state)
                }
            })
        },
    }
}
