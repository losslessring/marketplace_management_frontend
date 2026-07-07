import { TreeNode } from '@/app/interfaces/TreeNode'
import { useEffect } from 'react'

export default function useSetInitialElementPosition(
    id: number,
    nodes: TreeNode[]
) {
    useEffect(() => {
        const nodePosition = nodes.find((node) => node.nodeId === id)
        const element = document.getElementById(String(id) + '_drag_handle')
        if (element && nodePosition) {
            // element.style.top = nodePosition?.positionY + 'px'
            // element.style.left = nodePosition?.positionX + 'px'
            // console.log('element width: ', element.style.width)
            // console.log('element height: ', element.style.height)
            // console.log('element offset width', element.offsetWidth)
        }
    }, [id])
}
