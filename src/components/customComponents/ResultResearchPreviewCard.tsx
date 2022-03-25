import ArrowInvestors from './../../assets/icons/arrow-private-investors.svg';
import {Signal, Calendar, Euro, Rocket, Eye} from './../../assets/Icons';
import Scrollable from './Scrollable';

import ResultPreviewCard from './ResultPreviewCard';

export interface ResultResearchPreviewCardProps { 
    investor: string;
    numberOfResultsFound: number
    investorPrecisions: string,
    emetor: string
    cardTitle: string,
    redirectionButton: string,
} 

const ResultResearchPreviewCard: React.FC<ResultResearchPreviewCardProps> = ({investor, numberOfResultsFound, investorPrecisions, emetor, cardTitle, redirectionButton}) => { 
    

    // const SVGEuroLogo = () => {
    //     return (
    //         <>
            
    //             {Euro({color:"#68A532", viewBox:"0 0 14 14", height:"42", width:"42"})}
            
    //         </>
    //     )
    // };

    // hover:scale-95 hover:h-60

    return (

        <>
            <div className="globalContainerCard flex flex-col justify-center">
                
                <div className="cardGeneralInformations flex justify-between">

                    <div className="cardTitle p-2">
                        {/* <img src={Euro({color:"#68A532", viewBox:"0 0 14 14", height:"42", width:"42"})} alt="Logo Euro"/> */}
                        <h2 className="w-fit font-bold text-2xl">
                            {investor} <span className="bg-yellow text-lg">{`(${numberOfResultsFound})`}</span>
                        </h2> 
                        <p className="mt-2 text-base">{investorPrecisions}</p>
                    </div>

                    <div className="seeAllbutton p-2">
                        <button className="w-36 h-9 text-xs font-bold 
                        addBorder border-2 border-private-investors p-1
                        flex justify-center
                        text-private-investors"> <span className="my-auto">Voir tout</span> <img className="my-auto ml-1.5 w-4 h-4" src={ArrowInvestors} alt="Icône de chevron"/> </button>
                    </div>
                </div>

                <div className="cardScrollContainerX -ml-2 h-72 overflow-x-scroll hiddenScrollBar flex ">
                    {/*MUST MAP HERE TO GENERATE THE DIFFERENT CARDS, ACTUALLY IS A MOCK COMPONENT : Scrollable, WHO HANDLE THIS BEHAVIOR*/}
               
                    <ResultPreviewCard emetor={emetor} cardTitle={cardTitle} redirectionButton={redirectionButton} />

                    <Scrollable  emetor="Pexe" cardTitle="Arts et métiers business angels"/>
                    <Scrollable  emetor="Pexe" cardTitle="Arts et métiers business angels"/>
                    
                </div>

            </div>

        </>
    ) 
}; 

export default ResultResearchPreviewCard;