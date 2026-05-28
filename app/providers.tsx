'use client'

import { ReactElement } from 'react'
import { AuthContext } from './auth/auth-context'

interface ProviderProps {
    children: ReactElement[]
    authenticated: boolean
}

export default function Providers({ children, authenticated }: ProviderProps) {
    return (
        <AuthContext.Provider value={authenticated}>
            {children}
        </AuthContext.Provider>
    )
}
