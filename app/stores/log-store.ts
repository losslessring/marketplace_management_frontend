import { create } from 'zustand'

interface LogStore {
    log: any[]

    pushLog: (log: any) => void
    clearLog: () => void
}

export const useLogStore = create<LogStore>((set, get) => ({
    log: [],
    pushLog: (log: any) =>
        set((state) => ({
            log: [...state.log, log],
        })),
    clearLog: () =>
        set((state) => ({
            log: [],
        })),
}))
