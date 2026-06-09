import BackButton from '@/app/components/BackButton'
import NodeEditor from '@/app/components/nodeEditor/NodeEditor'
import getApplication from './getApplication'

interface SingleApplicationProps {
    params: { applicationId: string }
}

export default async function SingleApplication({
    params,
}: SingleApplicationProps) {
    const application = await getApplication(+params.applicationId)

    return (
        <div>
            <BackButton>Back</BackButton>
            <div className="mb-1">{application.name}</div>
            {/* <div className="text-sm">{application.description}</div> */}
            <NodeEditor></NodeEditor>
        </div>
    )
}
