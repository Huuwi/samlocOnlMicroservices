import { Suspense } from "react"
import type { CustomItems, ItemType } from "../../../../types"
import Asset from "../../CharacterMix/Asset"

interface propsCus {
    customItems: CustomItems
}

const Cus = (props: propsCus) => {

    const customItems: CustomItems = props.customItems
    const keys: ItemType[] = Object.keys(customItems) as ItemType[]
    const customizations = keys.map((e, i) => {
        return <Suspense key={i}>
            <Asset url={customItems[e] as string} />
        </Suspense>
    })

    return (
        <>
            {customizations}
        </>
    )
}

export default Cus
