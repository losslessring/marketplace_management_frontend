'use client'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('darkMode')
        if (saved) {
            setIsDark(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDark))
        if (isDark) {
            document.documentElement.classList.add('dark')
            document.body.classList.add('dark:bg-black')
            document.body.classList.add('dark:text-white')
        } else {
            document.documentElement.classList.remove('dark')
            document.body.classList.remove('dark:bg-black')
            document.body.classList.remove('dark:text-white')
        }
    }, [isDark])

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            // className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded"
        >
            {isDark ? 'Light' : 'Dark'}
        </button>
    )
}
