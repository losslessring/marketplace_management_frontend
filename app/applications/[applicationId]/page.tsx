import BackButton from '@/app/components/BackButton'
import NodeEditor from '@/app/components/nodeEditor/NodeEditor'
import getApplication from './getApplication'
import getCoreNodes from './getCoreNodes'

interface SingleApplicationProps {
    params: { applicationId: string }
}

export default async function SingleApplication({
    params,
}: SingleApplicationProps) {
    const [application, coreNodes] = await Promise.all([
        getApplication(+params.applicationId),
        getCoreNodes(),
    ]).then((values) => {
        return values
    })

    return (
        <div>
            <BackButton>Back</BackButton>
            <div className="mb-1">{application.name}</div>
            <NodeEditor coreNodes={coreNodes}></NodeEditor>
        </div>
    )
}
