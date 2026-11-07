'use client'

import { useModesStore } from '@/app/stores/node-store'

function ConnectionModeButton({}: React.PropsWithChildren<{}>) {
    const { switchConnectionMode } = useModesStore()

    return (
        <button
            onClick={() => {
                switchConnectionMode()
            }}
        >
            {useModesStore.getState().modes.connection
                ? 'Connection mode On'
                : 'Connection mode Off'}
        </button>
    )
}

export default ConnectionModeButton
