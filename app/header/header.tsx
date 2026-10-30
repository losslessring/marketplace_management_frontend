'use client'

import { useContext } from 'react'
import { AuthContext } from '../auth/auth-context'

interface HeaderProps {
    logout: () => Promise<void>
}

export default function Header({ logout }: HeaderProps) {
    const isAuthenticated = useContext(AuthContext)

    return (
        <nav className="">
            {isAuthenticated && (
                <div className="">
                    <button
                        className="application-control-button"
                        onClick={async () => {
                            await logout()
                        }}
                    >
                        Log out
                    </button>
                </div>
            )}
        </nav>
    )
}
