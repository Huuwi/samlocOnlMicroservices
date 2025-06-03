import { create, type StateCreator } from 'zustand'
import { categoriesItems } from './constants'
import type { MixCharacterState, CustomItems, Item, ItemType, CustomItemsFull } from './types'

let customItemsLocal: CustomItems | null
if (localStorage.getItem("customItems")) {
    customItemsLocal = JSON.parse(localStorage.getItem("customItems") as string)
}

let initValueCustomItems: CustomItems = {
    Bottom: categoriesItems.Bottom[0],
    // Bow: categoriesItems.Bow[0],
    // Earring: categoriesItems.Earring[0],
    // EyeBrow: categoriesItems.EyeBrow[0],
    Eyes: categoriesItems.Eyes[4],
    Face: categoriesItems.Face[0],
    // FaceMask: categoriesItems.FaceMask[0],
    // FacialHair: categoriesItems.FacialHair[0],
    // Glasses: categoriesItems.Glasses[0],
    Hair: categoriesItems.Hair[0],
    // Hat: categoriesItems.Hat[0],
    Head: categoriesItems.Head[0],
    // Outfit: categoriesItems.Outfit[0],
    Shoes: categoriesItems.Shoes[0],
    Top: categoriesItems.Top[0],
    Nose: categoriesItems.Nose[0]
}


const createMixCharacterSlice: StateCreator<MixCharacterState> = (set, get, store) => ({
    categoryTypeSelected: 0,
    customItems: customItemsLocal || initValueCustomItems,
    download: 0,
    changeItem: (item: Item) => {
        set((state) => {

            const type: ItemType = item.type

            if (item.path == (state.customItems as CustomItemsFull)[type]) {
                let newCustoms: CustomItems = { ...state.customItems }
                delete newCustoms[type]
                return {
                    customItems: newCustoms
                };
            }

            return {
                customItems: {
                    ...state.customItems,
                    [item.type]: item.path
                }
            };
        });
    },
    changeTypeSelected: (index) => {
        set((state) => ({
            categoryTypeSelected: index
        }))
    },
    clickDonwload: () => {
        set((state) => ({
            download: state.download + 1
        }))
    }
})

type Store = MixCharacterState

export const myStore = create<Store>((set, get, store) => ({
    ...createMixCharacterSlice(set, get, store),
}))
