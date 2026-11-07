import { AdjacencyList } from '@/app/interfaces/graph/AdjacencyList'
import { Visited } from '@/app/interfaces/graph/Visited'

export async function dfsRecursive(
    node: number,
    adjacencyList: AdjacencyList,
    prevNodeResult: any = undefined,
    callback: Function = (
        currentNode: number,
        prevNodeResult: any = undefined
    ) => {},
    visited: Visited = {},
    trace: number[] = []
) {
    visited[node] = true

    trace.push(node)

    const actualNodeResult = await callback(node, prevNodeResult)

    if (adjacencyList[node].length === 0) {
        return trace
    }

    for (const child of adjacencyList[node]) {
        if (!visited[child]) {
            await dfsRecursive(
                child,
                adjacencyList,
                actualNodeResult,
                callback,
                visited,
                trace
            )
        }
    }

    return trace
}
