import { TreeNode } from '@/app/interfaces/TreeNode'
import { useEffect } from 'react'

export default function useSetInitialElementPosition(
    id: number,
    nodes: TreeNode[]
) {
    useEffect(() => {
        const nodePosition = nodes.find((node) => node.nodeId === id)

        const element = document.getElementById(String(id))

        if (element && nodePosition) {
            element.style.top = nodePosition?.positionY + 'px'
            element.style.left = nodePosition?.positionX + 'px'
        }
    }, [id])
}
