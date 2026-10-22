import { create } from 'zustand'
import { Style } from '../interfaces/style/Style'

interface StyleStore {
    style: Style

    updateStyle: (style: any) => void
}

export const useNodeStore = create<StyleStore>((set, get) => ({
    style: { globalBackgroundColor: '#000000', globalFontColor: '#FFFFFF' },

    updateStyle: (style: any) =>
        set((state) => ({
            style: { ...state.style, ...style },
        })),
}))
