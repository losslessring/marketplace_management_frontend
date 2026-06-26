'use client'

import { useRouter } from 'next/navigation'
import { IApplication } from '../interfaces/application.interface'

interface ApplicationProps {
    application: IApplication
}

export default function Application({ application }: ApplicationProps) {
    const router = useRouter()

    return (
        <button
            className="w-full"
            onClick={() => {
                router.push(`/applications/${application.id}`)
            }}
        >
            <div className="bg-gray-800 rounded-sm p-6 h-32 overflow-hidden">
                <div className="mb-4">{application.name}</div>
                <div className="text-sm">{application.description}</div>
            </div>
        </button>
    )
}
