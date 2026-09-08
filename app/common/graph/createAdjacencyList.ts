import { Connection } from '@/app/interfaces/dto/connection/Connection'
import { AdjacencyList } from '@/app/interfaces/graph/AdjacencyList'

export function createAdjacencyList(
    nodeIds: number[],
    connections: Connection[]
): AdjacencyList {
    return nodeIds.reduce((acc, currentId) => {
        return {
            ...acc,
            [currentId]: connections
                .filter((connection) => connection.fromId === currentId)
                .map((connection) => connection.toId),
        }
    }, {})
}
