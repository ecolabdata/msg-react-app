import React, { RefObject, useContext, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CardType } from '../../model/CardType';
import { ApplicationContext } from '../../App';
import { InitialState } from '../../utils/InitialState';
import { ArrowRight } from '../../assets/Icons';


export interface CardsPreviewProps {
    cardType: CardType,
    initialState: InitialState,
    resultCount: number
}

const getCardWidth = () => (document.getElementsByClassName("outer-card")[0] as HTMLElement | null)?.offsetWidth

const ResultCardsPreview: React.FC<CardsPreviewProps> = ({ cardType, initialState, children, resultCount }) => {

    const { usedNextScrollTarget } = useContext(ApplicationContext)
    const [nextScrollTarget, setNextScrollTarget] = usedNextScrollTarget
    const ref = useRef<HTMLDivElement>(null)

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
        -ml-2 flex flex-wrap justify-evenly" ref={ref} >
            {children}
        </div>

    </div >
    )
};

export default ResultCardsPreview;