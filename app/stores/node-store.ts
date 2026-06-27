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

export const useNodeStore = create<INodeStore>((set) => ({
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
                    nodeId: state.nodes.length + 1,
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
