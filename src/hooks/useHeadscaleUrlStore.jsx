import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useHeadscaleUrlStore = create(
    persist(
        (set) => (
            {
                headscaleUrl: "",
                setHeadscaleUrl: (newHeadscaleUrl) => set({ headscaleUrl: newHeadscaleUrl })
            }
        ),
        {
            name: "headscaleUrl"
        }
    )
)