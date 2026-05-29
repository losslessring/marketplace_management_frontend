'use client'
import { useEffect, useRef, useState } from 'react'

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false)
    const isFirstRender = useRef(true)

    useEffect(() => {
        const saved = localStorage.getItem('darkMode')
        if (saved) {
            setIsDark(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current === false) {
            localStorage.setItem('darkMode', JSON.stringify(isDark))
        }

        isFirstRender.current = false

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
        <button onClick={() => setIsDark(!isDark)}>
            {isDark ? 'Light' : 'Dark'}
        </button>
    )
}
