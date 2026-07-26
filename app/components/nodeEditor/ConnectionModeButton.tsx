'use client'

import { useModesStore } from '@/app/stores/node-store'

function ConnectionModeButton({}: React.PropsWithChildren<{}>) {
    const { switchConnectionMode } = useModesStore()

    return (
        <button
            className={'ml-4'}
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
