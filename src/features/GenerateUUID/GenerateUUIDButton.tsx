import { PiHeartFill } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";
import { IoChevronForwardOutline } from "react-icons/io5";
import { Features } from "../features.enum";
import { IButtonInterface } from "../IButtonInterface";
import { VscFileBinary } from "react-icons/vsc";


export default function GenerateUUID(props: IButtonInterface) {
    const FEATURE_NAME: string = Features.UUID_GENERATOR_V4;

    function handleFavorite() {
        props.onFavorite(FEATURE_NAME, !props.isFavorite)
    }

    function navigate() {
        props.onClick(FEATURE_NAME)
    }
    return (
        <li className={`list-row border-1 border-base-300 hover:bg-base-300 ${props.active ? 'bg-base-300' : ''} `}
        >
            {props.active}
            <div>
                <VscFileBinary size={50} />

            </div>
            <div className="cursor-pointer" onClick={navigate}>
                <div>UUID Generator</div>
                <div className="text-xs uppercase font-semibold opacity-60">Gerador de UUID´s v4</div>
            </div>
            <button className="btn btn-square btn-ghost" onClick={navigate}>
                <IoChevronForwardOutline size={25} />
            </button>
            <button className="btn btn-square btn-ghost" onClick={handleFavorite}>
                {props.isFavorite ? <PiHeartFill size={25} className="text-red-500" /> : <PiHeart size={25} />}
            </button>
        </li>
    )
}
