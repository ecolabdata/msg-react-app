import React, { RefObject, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CardType } from '../../model/CardType';
import { ArrowRight } from './../../assets/Icons';


export interface ResultResearchPreviewCardProps {
    cardType: CardType,
    searchId: string,
    resultCount: number
}

const ResultResearchPreviewCard: React.FC<ResultResearchPreviewCardProps> = ({ cardType, searchId, children, resultCount }) => {

    const navigate = useNavigate()
    const scrollable = useRef<RefObject<HTMLDivElement>>();

    const ref = useRef<HTMLDivElement>(null)
    const [leftArrow, setLeftArrow] = useState(false);
    const [rightArrow, setRightArrow] = useState(true);
    const simulateScroll = (scrollSpeed : number) => {
        setLeftArrow(true)
        setRightArrow(true)
        if (ref.current) {
            const nextScrollLeft = ref.current.scrollLeft + window.innerWidth * scrollSpeed
            if (nextScrollLeft <= 0) {
                setLeftArrow(false)
            }

            if (nextScrollLeft >= (ref.current.scrollWidth - ref.current.clientWidth)) {
                setRightArrow(false)
            }
            ref.current.scrollTo({ behavior: "smooth", left: nextScrollLeft})
        }
    }

    return (<div className="globalContainerCard flex flex-col justify-center ml-10">

        <div className="cardGeneralInformations flex">

            <div className="cardTitle p-2 flex-auto">

                <div className="flex items-center">
                    <cardType.SVGLogo style={{ color: cardType.color }} /> &nbsp;
                    <h2 className="w-fit font-bold text-2xl">
                        {cardType.title} <span className="bg-yellow text-lg">{`(${resultCount})`}</span>
                    </h2>
                </div>

                <p className="mt-2 text-base">{cardType.description}</p>
            </div>

            <div className="seeAllbutton p-2">
                <NavLink to={cardType.searchLink + "/" + searchId} style={{ borderColor: cardType.color, color: cardType.color }} className="w-36 h-9 text-xs font-bold 
                        addBorder border-2 p-1 rm-link-underline
                        flex justify-center"> <span className="my-auto">Voir tout</span>  &nbsp;<ArrowRight class="my-auto" width="16" height="16" /> </NavLink>
            </div>
        </div >

        <div className="cardScrollContainerX
        -ml-2 h-72 overflow-x-scroll overflow-y-hidden hiddenScrollBar flex items-center" ref={ref} >
            {leftArrow && <button className="" onClick={() => simulateScroll(-0.80)}>
                <span className="fr-fi-arrow-left-line absolute left-14 rounded-full bg-gray-400 p-0.5  text-gray-700" aria-hidden="true"></span>
            </button>
            }
            {rightArrow && <button className="" onClick={() => simulateScroll(0.80)}>
                <span className="fr-fi-arrow-right-line absolute right-14 rounded-full bg-gray-400 p-0.5  text-gray-700" aria-hidden="true"></span>
            </button>}
            {children}
        </div>

    </div >
    )
};

export default ResultResearchPreviewCard;