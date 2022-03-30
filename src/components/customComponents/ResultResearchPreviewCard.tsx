import { Signal, Calendar, Euro, Rocket, Eye, ArrowRight } from './../../assets/Icons';
import Scrollable from './Scrollable';

import ResultPreviewCard from './ResultPreviewCard';
import { useNavigate } from 'react-router-dom';
import { CardType } from '../../model/CardType';

export interface ResultResearchPreviewCardProps {
    cardType: CardType
}

const ResultResearchPreviewCard: React.FC<ResultResearchPreviewCardProps> = (props) => {
    const { cardType } = props;

    const navigate = useNavigate()

    return (<div className="globalContainerCard flex flex-col justify-center ml-10">

        <div className="cardGeneralInformations flex">

            <div className="cardTitle p-2 flex-auto">
                <div className="flex items-center">
                    <cardType.SVGLogo  style={{ color: cardType.color }} /> &nbsp;
                    <h2 className="w-fit font-bold text-2xl">
                        {cardType.title} <span className="bg-yellow text-lg">{`(???)`}</span>
                    </h2>
                </div>
                <p className="mt-2 text-base">{cardType.description}</p>
            </div>

            <div className="seeAllbutton p-2">
                <button style={{ borderColor: cardType.color, color: cardType.color }} className="w-36 h-9 text-xs font-bold 
                        addBorder border-2 border-private-investors p-1
                        flex justify-center" onClick={() => navigate("/liste-resultats")}> <span className="my-auto">Voir tout</span>  &nbsp;<ArrowRight class="my-auto" width="16" height="16" /> </button>
            </div>
        </div >

        <div className="cardScrollContainerX -ml-2 h-72 overflow-x-scroll hiddenScrollBar flex ">
            {props.children}
        </div>

    </div >
    )
};

export default ResultResearchPreviewCard;