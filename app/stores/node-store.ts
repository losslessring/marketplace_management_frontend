import { create } from 'zustand'
import { TreeNode } from '../interfaces/TreeNode'

interface INodeStore {
    nodes: TreeNode[]
    initStore: () => void
    addNode: () => void

    updateNodes: (newNodes: TreeNode[]) => void
    updateNodePosition: (
        nodeId: number,
        positionX: number,
        positionY: number
    ) => void
}

export const useNodeStore = create<INodeStore>((set, get) => ({
    nodes: [],
    initStore: () =>
        set((state) => ({
            nodes: [],
        })),
    addNode: () =>
        set((state) => ({
            nodes: [
                ...state.nodes,
                {
                    nodeId: Math.floor(Math.random() * 1000000),
                    positionX: 0,
                    positionY: 0,
                },
            ],
        })),
    updateNodePosition: (
        nodeId: number,
        positionX: number,
        positionY: number
    ) =>
        set((state: any) => ({
            nodes: state.nodes.map((node: TreeNode) => {
                return node.nodeId === nodeId
                    ? {
                          nodeId,
                          positionX,
                          positionY,
                      }
                    : node
            }),
        })),
    updateNodes: (newNodes: TreeNode[]) =>
        set((state) => ({
            nodes: [...newNodes],
        })),
}))

interface SelectedIdsStore {
    ids: Set<number>
    initStore: () => void
    addId: (id: number) => void
    removeId: (id: number) => void
}

export const useSelectedNodeStore = create<SelectedIdsStore>((set, get) => ({
    ids: new Set<number>(),
    initStore: () =>
        set((state) => ({
            ids: new Set<number>(),
        })),

    addId: (id) =>
        set((state) => {
            const prev = Array.from(state.ids)
            return { ids: new Set([...prev, id]) }
        }),
    removeId: (id) =>
        set((state) => {
            state.ids.delete(id)
            const prev = Array.from(state.ids)
            return { ids: new Set([...prev]) }
        }),
}))

interface ConnectingNodePair {
    ids: Set<number>
    resetPairConnection: () => void
    addFirstId: (id: number) => void
    addSecondId: (id: number) => void
}

export const useConnectingNodePairStore = create<ConnectingNodePair>(
    (set, get) => ({
        ids: new Set<number>(),
        resetPairConnection: () =>
            set((state) => ({
                ids: new Set<number>(),
            })),

        addFirstId: (id) =>
            set((state) => {
                return { ids: new Set([id]) }
            }),
        addSecondId: (id) =>
            set((state) => {
                const prev = Array.from(state.ids)
                return { ids: new Set([...prev, id]) }
            }),
    })
)

interface NodeConnection {
    fromId: number
    toId: number
}

interface NodeConnectionStore {
    connections: Set<NodeConnection>
    resetConnectionStore: () => void
    addConnection: (connection: NodeConnection) => void
}

export const useNodeConnectionStore = create<NodeConnectionStore>(
    (set, get) => ({
        connections: new Set<NodeConnection>(),
        resetConnectionStore: () =>
            set((state) => ({
                connections: new Set<NodeConnection>(),
            })),

        addConnection: (connection) =>
            set((state) => {
                const existingConnections = Array.from(state.connections)
                if (
                    existingConnections.find(
                        (existingConnection) =>
                            existingConnection.fromId === connection.fromId &&
                            existingConnection.toId === connection.toId
                    )
                ) {
                    return {
                        state,
                    }
                } else {
                    return {
                        connections: new Set([
                            ...existingConnections,
                            { ...connection },
                        ]),
                    }
                }
            }),
    })
)
