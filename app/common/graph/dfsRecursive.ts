import { AdjacencyList } from '@/app/interfaces/graph/AdjacencyList'
import { Visited } from '@/app/interfaces/graph/Visited'

export function dfsRecursive(
    startNode: number,
    adjacencyList: AdjacencyList,
    callback: Function = (node: number) => {},
    visited: Visited = {},
    trace: number[] = []
): number[] {
    visited[startNode] = true
    trace.push(startNode)
    callback(startNode)

    if (adjacencyList[startNode].length === 0) {
        return trace
    }
    for (const child of adjacencyList[startNode]) {
        if (!visited[child]) {
            dfsRecursive(child, adjacencyList, callback, visited, trace)
        }
    }

    return trace
}
