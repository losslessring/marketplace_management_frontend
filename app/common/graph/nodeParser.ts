export function nodeParser(node: number, prevNodeResult: any, nodeData: any) {
    const currentNodeData = nodeData[node]

    try {
        if (currentNodeData && currentNodeData.type === 'code') {
            const code = currentNodeData.data

            if (
                prevNodeResult !== undefined &&
                typeof prevNodeResult === 'string'
            ) {
                const prevNodeResultWithEscapedCharacters = prevNodeResult
                    .replace(/(\r\n|\n|\r)/gm, '\\n')
                    .replace(/'/g, "\\'")

                return eval(
                    `(async (prevNodeResult) => { ${code} })('${prevNodeResultWithEscapedCharacters}');`
                )
            } else if (
                prevNodeResult !== undefined &&
                typeof prevNodeResult === 'number'
            ) {
                return eval(
                    `(async (prevNodeResult) => { ${code} })('${prevNodeResult}');`
                )
            } else if (prevNodeResult === undefined) {
                return eval(`(async () => { ${code} })();`)
            }
        }

        if (currentNodeData && currentNodeData.type === 'text') {
            // console.log(currentNodeData.data)
            return currentNodeData.data
        }

        if (currentNodeData && currentNodeData.type === 'json') {
            return currentNodeData.data
        }
    } catch (error) {
        console.log(error)
    }
}
