'use client'
import useDrag from '@/app/components/nodeEditor/coreNodes/hooks/useDrag'
import { useApplicationsNodeStore, useNodeStore } from '@/app/stores/node-store'

export default function CoreNode({
    id,
    name,
    className,
}: React.PropsWithChildren<{
    id: string
    name: string
    className?: string
}>) {
    const { updateExistingNodePosition } = useNodeStore()
    const { applicationsNodes, updateNodePosition } = useApplicationsNodeStore()

    useDrag(id, updateExistingNodePosition)
    // useEffect(() => console.log('existing nodes store', existingNodes))

    return (
        <div id={id} className={className}>
            {name}
        </div>
    )
}
