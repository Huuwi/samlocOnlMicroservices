import { myStore } from "../../../store"
import type { CustomItems, ItemType } from "../../../types"
import Asset from "./Asset"


const Customization = () => {

    const customItems: CustomItems = myStore((state) => { return state.customItems as CustomItems })
    const keys: ItemType[] = Object.keys(customItems) as ItemType[]
    const customizations = keys.map((e, i) => {
        return <Asset url={customItems[e] as string} key={i} />
    })

    return (
        <>
            {customizations}
        </>
    )
}

export default Customization
