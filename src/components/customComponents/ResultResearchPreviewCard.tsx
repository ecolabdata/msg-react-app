import React, { RefObject, useContext, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import { ArrowRight } from './../../assets/Icons';


export interface ResultResearchPreviewCardProps {
    cardType: CardType,
    initialState: InitialState,
    resultCount: number
}

const ResultResearchPreviewCard: React.FC<ResultResearchPreviewCardProps> = ({ cardType, initialState, children, resultCount }) => {

    const { usedNextScrollTarget } = useContext(ApplicationContext)
    const [nextScrollTarget, setNextScrollTarget] = usedNextScrollTarget
    const ref = useRef<HTMLDivElement>(null)
    const [leftArrow, setLeftArrow] = useState(false);
    const [rightArrow, setRightArrow] = useState(true);
    const handleArrowDisplay = (nextScrollLeft: number) => {
        if (ref.current) {
            setLeftArrow(true)
            setRightArrow(true)
            if (nextScrollLeft <= 0) {
                setLeftArrow(false)
            }

            if (nextScrollLeft >= (ref.current.scrollWidth - ref.current.clientWidth)) {
                setRightArrow(false)
            }
        }
    }
    const simulateScroll = (scrollSpeed: number) => {
        if (ref.current) {
            const outerCard = ref.current.getElementsByClassName("outer-card")[0] as HTMLElement | null
            if (outerCard) {
                const cardWidth = outerCard.offsetWidth
                const compFct = scrollSpeed > 0 ? Math.max : Math.min
                const minimumMouvement = compFct(window.innerWidth * scrollSpeed - cardWidth * scrollSpeed, cardWidth * scrollSpeed)
                const nextScrollLeft = Math.round((ref.current.scrollLeft + minimumMouvement) / cardWidth) * cardWidth
                handleArrowDisplay(nextScrollLeft)
                ref.current.scrollTo({ behavior: "smooth", left: nextScrollLeft })
            }
        }
    }

    return (<div className="globalContainerCard flex flex-col justify-center md:ml-10">

        <div className="cardGeneralInformations flex flex-wrap">

            <div className="cardTitle p-2 flex-auto">

                <div className="flex items-center">
                    <cardType.SVGLogo style={{ color: cardType.color }} /> &nbsp;
                    <h2 className="w-fit font-bold md:text-2xl">
                        {cardType.title} <span className="bg-yellow md:text-lg">{`(${resultCount})`}</span>
                    </h2>
                </div>

                <p className="mt-2 text-base">{cardType.description}</p>
            </div>

            <div className="seeAllbutton p-2">
                <NavLink
                    onClick={() => setNextScrollTarget({ top: 0 })}
                    to={cardType.searchLink} state={initialState} style={{ borderColor: cardType.color, color: cardType.color }} className="w-fit h-9 text-base font-bold 
                    addBorder border-2 p-1 rm-link-underline
                    flex justify-center"> <span className="my-auto">Voir tout & filtrer</span>  &nbsp;<ArrowRight className="my-auto" width="16" height="16" /> </NavLink>
            </div>
        </div >

        <div className="cardScrollContainerX
        -ml-2 h-72 overflow-x-scroll overflow-y-hidden hiddenScrollBar flex items-center" ref={ref} onScroll={e => handleArrowDisplay(e.currentTarget.scrollLeft)}>
            {leftArrow && <button className="" onClick={() => simulateScroll(-1)}>
                <span className="fr-fi-arrow-left-line absolute left-[1vw] rounded-full bg-gray-400 p-0.5  text-gray-700 z-50" aria-hidden="true"></span>
            </button>
            }
            {rightArrow && <button className="" onClick={() => simulateScroll(1)}>
                <span className="fr-fi-arrow-right-line absolute right-[2vw] rounded-full bg-gray-400 p-0.5  text-gray-700 z-50" aria-hidden="true"></span>
            </button>}
            {children}
        </div>

    </div >
    )
};

export default ResultResearchPreviewCard;