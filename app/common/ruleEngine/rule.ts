import { IRule } from '@/app/interfaces/rulesEngine/Rule'

export default function rule(
    condition: (state: any) => boolean,
    action: (state: any) => any
): IRule {
    return {
        condition,
        action,
    }
}
