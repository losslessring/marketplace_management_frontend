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
