import { useNavigate } from "react-router-dom"
import { categoriesItems } from "../../../constants"
import { myStore } from "../../../store"
import type { ItemType, CustomItems } from "../../../types"


const SelectTable = () => {
    const categoryTypeSelected = myStore((state) => { return state.categoryTypeSelected })
    const changeTypeSelected = myStore((state) => { return state.changeTypeSelected })
    const type: ItemType = Object.keys(categoriesItems)[categoryTypeSelected] as ItemType
    const items: any[] = categoriesItems[type]

    const customItems: CustomItems = myStore((state) => { return state.customItems as CustomItems })
    const changeItem = myStore((state) => { return state.changeItem })
    const clickDownload = myStore((state) => { return state.clickDonwload })


    const navigate = useNavigate()

    return (
        <div className="h-screen flex flex-col " style={{ gap: "50px", marginTop: "50px", alignItems: "center" }}>

            {/*items container*/}
            <div className="flex flex-col bg-[radial-gradient(circle,_rgba(255,255,255,0.8),_rgba(255,255,255,0.2))] w-9/10"  >
                {/*categories*/}
                <div className="flex" style={{ gap: "20px", flexWrap: "wrap" }}>
                    {Object.keys(categoriesItems).map((e, i) => {
                        return <button
                            key={i}
                            style={{ backgroundColor: (i == categoryTypeSelected) ? "blue" : "orange", height: "50px", width: "120px", margin: "3px" }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                            onClick={() => {
                                changeTypeSelected(i)
                            }}
                        >{e} </button>
                    })}
                </div>
                <hr />
                {/*items follow type */}
                <div className="grid gap-4 p-6 max-w-2xl mx-auto">
                    {items.map((e, i) => {
                        return (
                            <div
                                key={i}
                                className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-gradient-to-r from-blue-50 to-green-250 cursor-pointer"
                                style={{
                                    backgroundColor: (customItems[type] == e) ? "greenyellow" : "whitesmoke"
                                }}
                                onClick={() => {
                                    changeItem({
                                        path: e,
                                        type
                                    })
                                }}
                            >
                                <p className="text-gray-800 font-medium text-lg">
                                    {e.split(".glb")[0].replace("./Assets/", "").replace(".", "")}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* animate and buttons*/}
            <div>
                {/* animate */}
                <div></div>

                {/* buttons */}
                <div className="flex" style={{ gap: "50px" }}>

                    <button onClick={() => { localStorage.setItem("customItems", JSON.stringify(customItems)) }} style={{ height: "70px", width: "150px" }} className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto">Save</button>
                    <button onClick={() => { clickDownload() }} style={{ height: "70px", width: "150px" }} className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto">Download Character</button>
                    <button onClick={() => { navigate("/lobby") }} style={{ height: "70px", width: "150px" }} className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto">Go to lobby</button>

                </div>

            </div>

        </div >
    )
}

export default SelectTable
