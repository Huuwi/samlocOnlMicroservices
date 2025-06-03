import { BufferGeometry, Material, SkinnedMesh } from "three";

export interface AssetProps {
    url: string,
}

export interface Item {
    type: ItemType,
    path: string
}

export interface loadedType {
    geometry: BufferGeometry;
    material: Material | Material[];
    morphTargetDictionary?: SkinnedMesh['morphTargetDictionary'];
    morphTargetInfluences?: SkinnedMesh['morphTargetInfluences'];
}


export interface MixCharacterState {
    customItems: object
    changeItem: (item: Item) => void,
    categoryTypeSelected: number,
    changeTypeSelected: (index: number) => void
}

export interface CustomItemsIgnore {
    Bottom?: string,
    Bow?: string,
    Earring?: string,
    EyeBrow?: string,
    Eyes?: string,
    Face?: string,
    FaceMask?: string,
    FacialHair?: string,
    Glasses?: string,
    Hair?: string,
    Hat?: string,
    Head?: string,
    Nose?: string,
    Outfit?: string,
    Shoes?: string,
    Top?: string,
}


export type ItemType = 'Bottom' | 'Bow' | 'Earring' | 'EyeBrow' | 'Eyes' | 'Face' |
    'FaceMask' | 'FacialHair' | 'Glasses' | 'Hair' | 'Hat' |
    'Head' | 'Nose' | 'Outfit' | 'Shoes' | 'Top';

export type CustomItemsFull = {
    [key in ItemType]: string
}

export type CustomItems = CustomItemsFull | CustomItemsIgnore