import Rule from './_Rule'

export default function rule(
    condition: (state: any) => boolean,
    action: (state: any) => any
): Rule {
    return {
        condition,
        action,
    }
}
