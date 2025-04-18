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
    featuresAutoCopy: string[];
    featureStoreHistory: string[];
}

interface SettingStore {
    settings: Settings;
    setSettings: (settings: Settings) => void;
    setFeatureAutoCopy: (feature: string, isEnabled: boolean) => void;
    setFeatureStoreHistory: (feature: string, isEnabled: boolean) => void;
    isFeatureAutoCopy(feature: string): boolean;
    isFeatureStoreHistory(feature: string): boolean;

}

export const settingsStore = create<SettingStore>()(
    persist(
        (set, get) => ({
            settings: {
                featureOpenOnLoad: '',
                featuresAutoCopy: [],
                featureStoreHistory: []
            },
            isFeatureAutoCopy: (feature: string) => {
                if (get().settings?.featuresAutoCopy) {
                    const featuresAutoCopy = [...get().settings?.featuresAutoCopy]
                    return featuresAutoCopy.includes(feature) ? true : false;
                }
                return false
            },
            isFeatureStoreHistory: (feature: string) => {
                if (get().settings?.featureStoreHistory) {
                    const featureStoreHistory = [...get().settings?.featureStoreHistory]
                    return featureStoreHistory.includes(feature) ? true : false;
                }
                return false
            },
            setSettings: (settings: Settings) => set({ settings }),
            setFeatureAutoCopy(feature: string, isEnabled: boolean) {
                let featuresAutoCopy = get().settings.featuresAutoCopy || []

                if (isEnabled) {
                    if (!featuresAutoCopy.includes(feature)) {
                        featuresAutoCopy.push(feature)
                    }
                } else {
                    featuresAutoCopy.splice(featuresAutoCopy.indexOf(feature), 1);
                }
                return set(
                    {
                        settings: {
                            ...get().settings,
                            featuresAutoCopy: [...featuresAutoCopy]
                        }
                    }
                )

            },
            setFeatureStoreHistory(feature: string, isEnabled: boolean) {
                let featureStoreHistory = get().settings.featureStoreHistory || []

                if (isEnabled) {
                    if (!featureStoreHistory.includes(feature)) {
                        featureStoreHistory.push(feature)
                    }
                } else {
                    featureStoreHistory.splice(featureStoreHistory.indexOf(feature), 1);
                }
                return set(
                    {
                        settings: {
                            ...get().settings,
                            featureStoreHistory: [...featureStoreHistory]
                        }
                    }
                )

            }
        }),
        {
            name: 'settings-store', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)

