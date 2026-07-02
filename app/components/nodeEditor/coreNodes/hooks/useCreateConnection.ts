import {
    useConnectingNodePairStore,
    useNodeConnectionStore,
} from '@/app/stores/node-store'
import { useEffect } from 'react'

export default function useCreateConnection() {
    const { addConnection } = useNodeConnectionStore()

    const { resetPairConnection } = useConnectingNodePairStore()

    useEffect(() => {
        const ids = Array.from(useConnectingNodePairStore.getState().ids)
        if (ids.length === 2) {
            addConnection({
                fromId: ids[0],
                toId: ids[1],
            })

            resetPairConnection()
        }
    })
}
