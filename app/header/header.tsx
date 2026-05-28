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
        <nav className="flex">
            {isAuthenticated && (
                <>
                    <DarkModeToggle />
                    <button
                        onClick={async () => {
                            await logout()
                        }}
                    >
                        Log out
                    </button>
                </>
            )}
        </nav>
    )
}
