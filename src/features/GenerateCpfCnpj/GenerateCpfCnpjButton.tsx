import { IButtonInterface } from '../IButtonInterface'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { Features } from '../features.enum';
import { PiHeartFill, PiHeart } from 'react-icons/pi';
import { PiIdentificationBadge } from "react-icons/pi";


export default function GenerateCpfCnpjButton(props: IButtonInterface) {
    const FEATURE_NAME: string = Features.GENERATE_CPF_CNPJ;

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
                <PiIdentificationBadge size={50} />
            </div>
            <div className="cursor-pointer" onClick={navigate}>
                <div>CPF/CNPJ Generator</div>
                <div className="text-xs uppercase font-semibold opacity-60">Generate doc numbers</div>
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
