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
}

interface SettingStore {
    settings: Settings;
    setSettings: (settings: Settings) => void;
    setFeatureAutoCopy: (features: string, isEnabled: boolean) => void;
    isFeatureAutoCopy(feature: string): boolean;
}

export const settingsStore = create<SettingStore>()(
    persist(
        (set, get) => ({
            settings: {
                featureOpenOnLoad: '',
                featuresAutoCopy: [],
            },
            isFeatureAutoCopy: (feature: string) => {
                if (get().settings?.featuresAutoCopy) {
                    const featuresAutoCopy = [...get().settings?.featuresAutoCopy]
                    return featuresAutoCopy.includes(feature) ? true : false;
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

            }
        }),
        {
            name: 'settings-store', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)

interface HistoryGenerated {
    value: any;
    feature: string;
    copied: boolean;
    generatedAt: Date;
}

interface HistoryGeneratedStore {
    history: HistoryGenerated[];
    addRecord: (record: HistoryGenerated) => void;
}

export const historyGeneratedStore = create<HistoryGeneratedStore>()(
    persist(
        (set, get) => ({
            history: [],
            addRecord(record: HistoryGenerated) {
                const newRecord = {
                    ...record,
                    generatedAt: new Date(),
                }
                return set(
                    (state) => ({
                        history: [...state.history, newRecord]
                    })
                )
            },
            // addRecord(): (record: HistoryGenerated) => {
            //     const newRecord = {
            //         value: record.value,
            //         feature: record.feature,
            //         copied: record.copied,
            //         generatedAt: new Date()
            //     }
            //     return set(
            //         (state) => ({
            //             history: [...state.history, newRecord]
            //         })
            //     )
            // }
        }),

        {
            name: 'settings-store', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    ));