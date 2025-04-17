import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


interface FeatureStore {
    favorites: string[];
    setFavorite: (feature_name: string, isFavorite: boolean) => void;
}

export const featuresStore = create<FeatureStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            setFavorite: (feature_name: string, isFavorite: boolean) => {
                let favorites = [...get().favorites]

                if (isFavorite) {
                    if (!favorites.includes(feature_name)) {
                        favorites.push(feature_name)
                    }
                } else {
                    favorites.splice(favorites.indexOf(feature_name), 1);
                }

                return set(
                    {
                        favorites: favorites
                    }
                )
            },
        }),
        {
            name: 'features-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)


interface Settings {
    featureOpenOnLoad: string;
}

interface SettingStore {
    settings: Settings;
    setSettings: (settings: Settings) => void;
}

export const settingsStore = create<SettingStore>()(
    persist(
        (set) => ({
            settings: {
                featureOpenOnLoad: ''
            },
            setSettings: (settings: Settings) => set({ settings })

        }),
        {
            name: 'settings-store', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)