import MainCharacter from "./MainCharacter"
import SelectTable from "./SelectTable"

const CharacterMix = () => {
    return (
        <div className="h-screen w-screen bg-gradient-to-r from-blue-300 to-green-600 flex justify-between" >

            {/*display main character */}
            <div className="h-screen w-2/3" >
                <MainCharacter />
            </div>


            {/*select components of chacracter */}

            <div className="h-screen w-1/3" >
                <SelectTable />
            </div>

        </div>
    )
}

export default CharacterMix


