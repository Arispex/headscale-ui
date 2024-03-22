import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useHeadscaleApiKeyStore = create(
    persist(
        (set) => (
            {
                headscaleApiKey: "",
                setHeadscaleApiKey: (newHeadscaleApiKey) => set({ headscaleApiKey: newHeadscaleApiKey })
            }
        ),
        {
            name: "headscaleApiKey"
        }
    )
)