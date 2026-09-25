'use client'

import { createAdjacencyList } from '@/app/common/graph/createAdjacencyList'
import { dfsRecursive } from '@/app/common/graph/dfsRecursive'
import {
    useNodeConnectionStore,
    useNodeDataStore,
    useNodeStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'

function RunButton({}: React.PropsWithChildren<{}>) {
    const {} = useNodeStore()
    const {} = useNodeConnectionStore()
    const {} = useSelectedNodeStore()
    const {} = useNodeDataStore()

    return (
        <button
            className={'ml-4'}
            onClick={() => {
                const nodeIds = Array.from(useNodeStore.getState().nodes).map(
                    (node) => node.nodeId
                )
                const connections = Array.from(
                    useNodeConnectionStore.getState().connections
                )
                const selectedNodes = Array.from(
                    useSelectedNodeStore.getState().ids
                )

                const nodeData: any = useNodeDataStore
                    .getState()
                    .nodeData.reduce((acc, cur) => {
                        return {
                            ...acc,
                            [cur.id]: { type: cur.type, data: cur.data },
                        }
                    }, {})

                const adjacencyList = createAdjacencyList(nodeIds, connections)

                const startNode = selectedNodes[0]
                    ? selectedNodes[0]
                    : nodeIds[0]

                if (startNode) {
                    dfsRecursive(
                        startNode,
                        adjacencyList,
                        undefined,
                        (node: number, prevNodeResult: any) => {
                            const currentNodeData = nodeData[node]

                            try {
                                if (
                                    currentNodeData &&
                                    currentNodeData.type === 'code'
                                ) {
                                    const code = currentNodeData.data

                                    if (
                                        prevNodeResult !== undefined &&
                                        typeof prevNodeResult === 'string'
                                    ) {
                                        const prevNodeResultWithEscapedCharacters =
                                            prevNodeResult
                                                .replace(
                                                    /(\r\n|\n|\r)/gm,
                                                    '\\n'
                                                )
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
                                        return eval(
                                            `(async () => { ${code} })();`
                                        )
                                    }
                                }

                                if (
                                    currentNodeData &&
                                    currentNodeData.type === 'text'
                                ) {
                                    // console.log(currentNodeData.data)
                                    return currentNodeData.data
                                }

                                if (
                                    currentNodeData &&
                                    currentNodeData.type === 'json'
                                ) {
                                    // TODO: Figure out how to deal with JSON,
                                    //new line characters are causing it to fail parsing
                                    // console.log(currentNodeData.data)
                                    return currentNodeData.data
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    )
                }
            }}
        >
            Run
        </button>
    )
}

export default RunButton
