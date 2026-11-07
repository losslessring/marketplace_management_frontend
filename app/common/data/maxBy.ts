export function maxBy<
    T,
    K extends { [P in keyof T]: T[P] extends number ? P : never }[keyof T]
>(arr: readonly T[], key: K): T[K] | undefined {
    if (!arr.length) return undefined
    return arr.reduce((best, o) => (o[key] > best ? o[key] : best), arr[0][key])
}
