import {CardType, startups} from '../../model/CardType';
import { CSSProperties, ReactNode, useContext, useState } from 'react';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import { ApplicationContext } from '../../Router';
import { Star, Trash } from '../../assets/Icons'
import Label from '../dsfrComponents/Label';



interface DetailsStartupProps { 
    cardType: CardType
} 

const DetailsStartup : React.FC<DetailsStartupProps> = ({cardType}) => { 
    
    const cardTypeColor = {
        "--border-action-high-blue-france":  cardType.color,
        color: cardType.color,
        borderColor: cardType.color
    } as CSSProperties

    const { usedFavoris, usedCorbeille } = useContext(ApplicationContext)
    const [toggleFavori, isFavori] = usedFavoris

    return (

        <>
            <div  className="mx-auto w-[85%] headContainer">
                <button
                    onClick={() => window.history.back()}
                    className="text-dark-text-action flex mt-4 rm-link-underline ">
                    <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retour </button>

                <div style={cardTypeColor} className="categoryName mt-10 min-w-40 flex">
                    <div>
                        <cardType.SVGLogo className="mt-1.5 mr-2 text-sm" style={cardTypeColor} width="11" height="11" />
                    </div>
                    <p className="text-sm">{cardType.title}</p>
                    &nbsp;
                </div>

                <div className="cardTitle my-10 text-base   mx-auto">

                    <div className="flex justify-between">

                        <h2 className="font-bold text-xl
                        lg:text-4xl">
                            Wind my roof
                            {/* {cardData.name} */}
                        </h2>

                        <div className="w-fit flex justify-end">
                            <div className="flex justify-between w-[43px]">
                                {/* <button className="cursor-pointer" style={{ color: isFavori(cardData) ? "yellow" : undefined }} onClick={() => toggleFavori(cardData)}> */}
                                <button className="cursor-pointer">
                                    <Star />
                                </button>
                                {/* <button className="cursor-pointer" style={{ color: isInCorbeille(cardData) ? "red" : undefined }} onClick={() => toggleInCorbeille(cardData)}> */}
                                <button className="cursor-pointer" >
                                    <Trash />
                                </button>
                            </div>
                        </div>

                    </div>
                    <div  style={cardTypeColor} className="thematocs mt-4">
                        {/* {cardData.thematics.map(thematic => thematic.name).join(" | ")} */}
                        Energies renouvelables | Thématique 2 | Thématique 3
                    </div>

                    {/* La div suivante est-elle toujours utile ? ( Structure reprise depuis les pages détails aide client, inno)  */}
                    <div className='flex mr-[50px]'>
                        <div className='flex justify-start flex-1 min-w-1/2'>
                            {/* <p style={cardTypeColor} className="mt-6 w-fit text-base">{displayableFinancers}</p> */}
                        </div>
                        <div className='flex justify-end flex-1 min-w-1/2' >
                            {/* <p style={{ opacity: 0.6 }} className="mt-6 w-fit text-base font-thin">
                                Source: <a href={"https://aides-territoires.beta.gouv.fr" + cardData["url"]} target="_blank">Aides territoires</a>
                            </p> */}
                            
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="contactAndDescription mx-auto w-[85%] h-60 flex">
                
                <div className="leftSide w-3/5 max-h-full flex flex-wrap justify-between">

                    <div className="relative min-w-[50%] flex flex-col">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Pitch</h3>
                        {/* <p className="text-[16px]">{cardData.pitch}</p> */}
                        <p className="mt-2 text-[16px]">
                        Petite éolienne de toiture, légère et discrète</p>
                    </div>

                    <div className="relative min-w-[50%] flex flex-col">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Région</h3>
                        {/* <p className="text-base">{cardData.region} </p> */}
                        <p className="mt-2 text-base">Bourgogne-Franche-Comté</p>
                    </div>

                    <div className="mt-4 max-w-[50%] flex flex-col">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Soutiens et clients</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap">
                            {/* {cardData.supports.map( support => <Label>{support}</Label>)} */}
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">ParisTech</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">BPI France</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Pépite France</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Petit Poucet</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">CGI</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Région Ile de France</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Leonard Prix de l’innovation VINCI</Label>
                        </div>
                    </div>

                    <div className="mt-4 max-w-[50%] flex flex-col">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Clients publics</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap justify-start ">
                            {/* {cardData.supports.map( support => <Label>{support}</Label>)} */}
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">ParisTech</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">BPI France</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Pépite France</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Petit Poucet</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">CGI</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Région Ile de France</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Leonard Prix de l’innovation VINCI</Label>
                        </div>
                    </div>

                </div>

                <div className="contact w-96 h-[230px] text-2xl mx-auto my-auto p-6 flex flex-col justify-evenly items-center addBorder border-2 border-[#4EC8AE]">
                    <h3 style={cardTypeColor} className="text-base"> Contacts et Détails </h3>
                    {/* <p>{cardData.nomReferente}</p> */}
                    <p className="">Nom prénom référent.e</p>
                    <button type="button" className="text-base bg-[#4EC8AE] p-2">
                        <span className="fr-fi-mail-fill mr-1 w-3 h-3 mb-[10px]" aria-hidden="true" />
                        Voir les coordonnées
                    </button>

                </div>

            </div>
            
        </>
    ) 
}; 
export const CardDetailsStartup = () => <DetailsStartup cardType={startups}/>

// export default CardDetailsStartup;