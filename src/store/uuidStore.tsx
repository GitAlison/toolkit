import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UUIDGenerated {
    value: any;
    copied: boolean;
    generatedAt: Date;
}

interface HistoryGeneratedStore {
    list: UUIDGenerated[];
    addRecords: (record: UUIDGenerated[]) => void;
    updateToCopyRecord: (index: number) => void;
}

export const uuidv4Store = create<HistoryGeneratedStore>()(
    persist(
        (set, get) => ({
            list: [],
            addRecords(records: UUIDGenerated[]) {
                return set(
                    () => ({
                        list: records.slice(0, 100)
                    })
                )
            },
            updateToCopyRecord: (index: number) => {
                const newList = [...get().list];
                newList[index].copied = true;
                set({ list: newList });
            }
        }),

        {
            name: 'uuidv4-store',
            storage: createJSONStorage(() => localStorage),
        }
    ));