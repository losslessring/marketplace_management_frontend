import { IApplication } from './interfaces/application.interface'

interface ApplicationProps {
    application: IApplication
}

export default function Application({ application }: ApplicationProps) {
    return (
        <div className="bg-gray-800 rounded-sm p-6 h-32 overflow-hidden">
            <div className="">{application.name}</div>
            <div>{application.description}</div>
        </div>
    )
}
