'use client'

import { useContext } from 'react'
import { AuthContext } from '../auth/auth-context'
import DarkModeToggle from '../components/ThemeToggle'

interface HeaderProps {
    logout: () => Promise<void>
}

export default function Header({ logout }: HeaderProps) {
    const isAuthenticated = useContext(AuthContext)

    return (
        <nav className="flex flex-row justify-end px-2">
            {isAuthenticated && (
                <div className="flex gap-2">
                    <DarkModeToggle />
                    <button
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
