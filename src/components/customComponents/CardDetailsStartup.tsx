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
    const [showContactDetails, setShowContactDetails] = useState(false);
    const { usedFavoris, usedCorbeille } = useContext(ApplicationContext)
    const [toggleFavori, isFavori] = usedFavoris

    const handleClickOnContactDetails = () => {
        setShowContactDetails(true);
    }
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

            <div className="contactAndDescription mx-auto w-[85%] h-60 flex justify-betweencls ">
                
                <div className="leftSide w-[60%] flex flex-wrap">

                    <div className="min-w-[50%] max-w-[50%] flex flex-col">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Pitch</h3>
                        {/* <p className="text-[16px]">{cardData.pitch}</p> */}
                        <p className="mt-2 text-[16px]">
                        Petite éolienne de toiture, légère et discrète</p>
                    </div>

                    <div className="min-w-[50%] max-w-[50%] flex flex-col">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Région</h3>
                        {/* <p className="text-base">{cardData.region} </p> */}
                        <p className="mt-2 text-base">Bourgogne-Franche-Comté</p>
                    </div>

                    <div className="mt-4 min-w-[50%] max-w-[50%] flex flex-col">
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

                    <div className="mt-4 min-w-[50%] max-w-[50%] flex flex-col ">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Clients publics</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap justify-start ">
                            {/* {cardData.supports.map( support => <Label>{support}</Label>)} */}
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Ville</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Commune</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Métropole</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Blabla</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">CGI</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Région Ile de France</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">Leonard Prix de l’innovation VINCI</Label>

                        </div>
                    </div>

                </div>

                <div className="contact rounded-sm w-96 h-[230px] text-2xl my-auto p-6 flex flex-col justify-evenly addBorder border-2 border-[#4EC8AE]">
                    
                    <h3 style={cardTypeColor} className="font-bold text-2xl"> Contacts et détails </h3>
                    {/* <p>{cardData.nomReferente}</p> */}
                    <p className="text-base font-bold">Nom prénom référent.e</p>
                    <button onClick={ () => handleClickOnContactDetails()} type="button" className="w-fit text-base text-left py-2 px-6 text-[#3A3A3A] bg-[#4EC8AE]">
                        
                        { !showContactDetails ?
                            <>
                                <span className="fr-fi-mail-fill mr-1 w-3 h-3 mb-[10px]" aria-hidden="true" />
                                <span >Voir les coordonnées</span>
                            </>
                            :
                            <>
                                <span >M.Dupont</span> <br/>
                                <span >Directeur de la société "Le Vert"</span> <br/>
                                <span >02.99.23.14.52</span> <br/>
                                <span >dupont@levert.fr</span> <br/>

                            </>
                        }

                    </button>

                </div>

            </div>

            <div className="contentContainer mx-auto w-[85%] ">
                
                <div className="entreprise -ml-4 mt-8 w-[60%] flex flex-col justify-around">
                <h3 style={cardTypeColor} className="font-bold text-xl m-4">Entreprise</h3>
                    {/* <p>{cardData.project}</p> */}
                    <p className="m-4">WIND my ROOF est une start-up qui développe et commercialise une éolienne de toiture innovante, la WINDBox.</p>
                </div>
                
                <div className="project mt-12 w-[60%] flex flex-col justify-around p-[14px] bg-[#353434]">
                    <h3 style={cardTypeColor} className="font-bold text-xl m-4">Le Projet</h3>
                    {/* <p>{cardData.project}</p> */}
                    <p className="m-4">La solution s’adresse en priorité aux professionnels et aux collectivités : à la différence des produits équivalents, ce module éolien mis au point par cette équipe exploite le vent de façade sur les bâtiments à toiture terrasse (toits plats), au niveau de l’acrotère en bordure de toiture. Elle prend la forme d’une « boîte » (carène) guidant le vent vers le rotor, qui permet de...</p>
                    <button  style={cardTypeColor} className="max-w-[25%] m-4 addBorder border text-sm  p-1" type="button">
                        Voir le projet complet
                    </button>
                </div>

                <div className="marketsAndChallenges mt-12 w-[60%] flex flex-wrap justify-around">
                    
                    <div className="markets mt-4 min-w-[50%] max-w-[50%] flex flex-col">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Marchés</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap justify-start ">
                            {/* {cardData.markets.map( market => <Label>{market}</Label>)} */}
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">B to B</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">B to C</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">B to A</Label>
                        </div>
                    </div>

                    <div className="challenges mt-4 min-w-[50%] max-w-[50%] flex flex-col">

                    <h3 style={cardTypeColor} className="font-bold text-xl">Enjeux ODD</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap justify-start ">
                            {/* {cardData.markets.map( market => <Label>{market}</Label>)} */}
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">B to B</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">B to C</Label>
                            <Label bgColor="#E5FFF4" textColor="text-[#37635F]">B to A</Label>
                        </div>

                    </div>

                </div>

                <p className="mt-16">Source de la donnée : <a href="#annuaur Greentech Innovation"> Annuaire Greentech</a> </p>
            
                <p className="mb-5 mt-10">Partager la page</p>

                <div className="share mb-16 -ml-6 w-64 flex justify-evenly">
                    <a className="" href="Facebook"><span className="fr-fi-facebook-circle-fill" aria-hidden="true"/></a> 
                    <a className="" href="Twitter"><span className="fr-fi-twitter-fill" aria-hidden="true"/></a> 
                    <a className="" href="LinkedIn"><span className="fr-fi-linkedin-box-fill" aria-hidden="true"/></a> 
                    <a className="" href="Mail"><span className="fr-fi-mail-fill" aria-hidden="true"/></a> 
                    <a className="" href="Copier le lien"><span className="fr-fi-links-fill" aria-hidden="true"/></a> 
                </div>

            </div>
            
        </>
    ) 
}; 
export const CardDetailsStartup = () => <DetailsStartup cardType={startups}/>

// export default CardDetailsStartup;