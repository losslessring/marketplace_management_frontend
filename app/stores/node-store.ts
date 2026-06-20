import { create } from 'zustand'
import { ICoreNode } from '../applications/interfaces/coreNode.interface'

//const [existingNodes, setExistingNodes] = useState<ICoreNode[]>([])
// changeNodePositionHandler((existingNodes: ICoreNode[]) =>
//                     existingNodes.map((existingNode: ICoreNode) => {
//                         return existingNode.id === Number(id)
//                             ? {
//                                   ...existingNode,
//                                   positionX: pos3,
//                                   positionY: pos4,
//                               }
//                             : existingNode
//                     })
//                 )

// addNodeHandler([
//     ...existingNodes,
//     {
//         id: currentNodeId,
//         name: coreNode.name,
//         positionX: 99,
//         positionY: 99,
//     },
// ])

interface INodeStore {
    existingNodes: ICoreNode[]
    addNode: () => void
    updateExistingNodePosition: (
        id: number,
        positionX: number,
        positionY: number
    ) => void
}

export const useNodeStore = create<INodeStore>((set) => ({
    existingNodes: [],
    addNode: () =>
        set((state) => ({
            existingNodes: [
                ...state.existingNodes,
                {
                    id: state.existingNodes.length + 1,
                    name: 'Core',
                    positionX: 99,
                    positionY: 99,
                },
            ],
        })),
    updateExistingNodePosition: (
        id: number,
        positionX: number,
        positionY: number
    ) =>
        set((state: any) => ({
            existingNodes: state.existingNodes.map(
                (existingNode: ICoreNode) => {
                    return existingNode.id === id
                        ? {
                              ...existingNode,
                              positionX,
                              positionY,
                          }
                        : existingNode
                }
            ),
        })),
}))
