export interface IRule {
    condition: (state: any) => boolean
    action: (state: any) => any
}
