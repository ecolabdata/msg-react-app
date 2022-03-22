import ArrowInvestors from './../../assets/icons/arrow-private-investors.svg';
import {Signal, Calendar, Euro, Rocket, Eye} from './../../assets/Icons';
import { useNavigate } from 'react-router-dom';
import Scrollable from './Scrollable';
import Trash from './../../assets/icons/trash-fill.svg';
import Star from './../../assets/icons/star-fill.svg';

export interface ResultResearchPreviewCardProps { 
    investor: string;
    numberOfResultsFound: number
    investorPrecisions: string,
    emetor: string
    cardTitle: string,
} 

const ResultResearchPreviewCard: React.FC<ResultResearchPreviewCardProps> = ({investor, numberOfResultsFound, investorPrecisions, emetor, cardTitle}) => { 
    const navigate = useNavigate();

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
                        flex  justify-center
                        text-private-investors"> <span className="my-auto">Voir tout</span> <img className="my-auto ml-1.5 w-4 h-4" src={ArrowInvestors} alt="Icône de chevron"/> </button>
                    </div>
                </div>

                <div className="cardScrollContainerX -ml-2 h-72 overflow-x-scroll hiddenScrollBar flex ">
                    {/*MUST MAP HERE TO GENERATE THE DIFFERENT CARDS, ACTUALLY IS A MOCK COMPONENT : Scrollable, WHO HANDLE THIS BEHAVIOR*/}
                <div className="cardContainer rounded-r ml-3 mt-4 min-w-282 h-181 p-4 flex flex-col
                     addBorder-l border-l-3 border-private-investors 
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                     bg-research-card-preview
                    ">
                        <div className="emetor-row flex">
                            
                            <p className="text-green-500 text-xs"> {emetor}</p>
                            <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100" >
                                <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 "/>
                                <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
                            </div>

                        </div>

                        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

                        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100"> vc | ba | corporate</p>

                        <button onClick={() => navigate('/list/investisseurs-privés')} className="self-end">
                            <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
                        </button>

                    </div>

                    <Scrollable  emetor="Pexe" cardTitle="Arts et métiers business angels"/>
                    <Scrollable  emetor="Pexe" cardTitle="Arts et métiers business angels"/>
                    
                </div>

            </div>

        </>
    ) 
}; 

export default ResultResearchPreviewCard;