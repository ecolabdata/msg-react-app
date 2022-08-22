import {CardType, startups} from '../../model/CardType';
import { CSSProperties, ReactNode, useContext, useState, useEffect } from 'react';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import { ApplicationContext } from '../../App';
import { Star, Trash } from '../../assets/Icons'
import Label from '../dsfrComponents/Label';
import { useLocation } from 'react-router-dom';
import { AnyCard, Startup } from '../../api/Api';
import { useQuery } from '../../hooks/useQuery';
import { useDispatch, useSelector } from 'react-redux';



interface DetailsStartupProps { 
    cardType: CardType
} 

const Details : React.FC<DetailsStartupProps> = ({cardType}) => { 

    const cardTypeColor = {
        "--border-action-high-blue-france":  cardType.color,
        color: cardType.color,
        borderColor: cardType.color
    } as CSSProperties
    
    const query = useQuery();
    const location = useLocation();
    const initialState = location.state as {cardData : AnyCard} | null;
    const cardData : Startup = initialState?.cardData || JSON.parse(query.cardData) 
    const cardSoutiens = cardData.Soutiens ? cardData.Soutiens.split(',') : [];
    const cardPublicMarkets = cardData['Références publiques'] ? cardData['Références publiques'].split(',') : [];
    const cardMarkets = cardData.Marché ? cardData.Marché.split(',') : [];
    const cardChallenges = cardData["Enjeux ODD"] ? cardData["Enjeux ODD"].split(',') : [];
    const cardProjectSmallDevices = cardData['Le projet'] && cardData['Le projet'].substring(0,453).padEnd(456,'.');
    const cardProjectBigDevices = cardData['Le projet'] && cardData['Le projet'].substring(0,686).padEnd(689,'.');
    const [showContactDetails, setShowContactDetails] = useState(false);
    const { usedFavoris, usedCorbeille } = useContext(ApplicationContext);
    const [toggleFavori, isFavori] = usedFavoris;
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille;
    const [urlCopied, setUrlCopied] = useState(false);
    const backgroundDarktheme = 'dark-text-action';
    const backgroundLighttheme = 'blue-france';
    const displayCopiedURLMessage = `
    after:content-['copié']
    after:absolute
    after:top-8 
    after:right-2
    after:w-fit
    after:h-fit
    after:p-1
    after:bg-${localStorage.scheme = 'dark' ? backgroundDarktheme : backgroundLighttheme }
    `;
    const [seeEntireProjectDescription, setSeeEntireProjectDescription] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    window.addEventListener('resize', e => setScreenWidth(window.innerWidth));
    const handleClickOnContactDetails = () => {
        setShowContactDetails(!showContactDetails);
    };
  
    const handleCopyURL =  () => {

        setUrlCopied(true);
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() =>{setUrlCopied(false)},1300)

    };

    return (

        <div className="globalContainer flex flex-col justify-around">

            <div  className="mx-auto w-[85%] headContainer">
                
                <button
                    onClick={() => window.history.back()}
                    className="text-dark-text-action flex mt-4 rm-link-underline ">
                    <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> 
                    Retour 
                </button>

             
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
                            {cardData.Projet}
                        </h2>
{/* 
                        <div className="w-fit flex justify-end">
                            <div className="flex justify-between w-[43px]">
                                <button className="cursor-pointer" style={{ color: isFavori(cardData) ? "yellow" : undefined }} onClick={() => toggleFavori(cardData)}>
                                    <Star />
                                </button>
                                <button className="cursor-pointer" style={{ color: isInCorbeille(cardData) ? "red" : undefined }} onClick={() => toggleInCorbeille(cardData)}>
                                    <Trash />
                                </button>
                            </div>
                        </div> */}

                    </div>
                    <div  style={cardTypeColor} className="thematics mt-4">
                        {cardData.Thématique}
                    </div>
                    
                </div>
            </div>

            <div className="contactAndDescription relative mx-auto max-h-[900px] h-full w-[85%] flex flex-col justify-evenly 
                xl:h-60 xl:flex-row xl:justify-between"> 
                
                <div className="leftSide order-2 flex flex-col justify-around p-1
                     xl:w-[60%] xl:flex-row xl:flex-wrap">

                    <div className="mt-4 flex flex-col  overflow-y-auto
                    xl:mt-0 xl:min-w-[50%] xl:max-w-[50%] xl:max-h-[50%]">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Pitch</h3>
                        <p className="text-base">{cardData.Pitch}</p>
                    </div>

                    <div className="mt-4 flex flex-col  overflow-y-auto 
                    xl:mt-0 xl:min-w-[50%] xl:max-w-[50%] xl:max-h-[50%]">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Région</h3>
                        <p className="text-base">{cardData.Région} </p>
                    </div>

                    <div className="mt-4 flex flex-col overflow-y-auto
                    xl:min-w-[50%] xl:max-w-[50%]">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Soutiens et clients</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap">
                            {cardSoutiens.length > 0 ? cardSoutiens.map( soutien => <Label bgColor="#E5FFF4" textColor="text-[#37635F]">{soutien}</Label>) : null}
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col overflow-y-auto
                    xl:min-w-[50%] xl:max-w-[50%]">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Clients publics</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap">
                            {cardPublicMarkets.length > 0 ? cardPublicMarkets.map( publicMarket => <Label bgColor="#E5FFF4" textColor="text-[#37635F]">{publicMarket}</Label>) : null}
                        </div>
                    </div>

                </div>

                <div className="contact rounded-sm w-96 h-[230px] flex flex-col items-center justify-evenly addBorder border-2 border-[#4EC8AE]
                xl:order-2 xl:my-auto xl:p-6">
                    
                    <h3 style={cardTypeColor} className="font-bold text-2xl"> Contacts et détails </h3>
                    {/* <p>{cardData.nomReferente}</p> */}
                    <p className="text-base font-bold">Nom prénom référent.e</p>
                        
                        { !showContactDetails ?
                            <>
                                <button onClick={ () => handleClickOnContactDetails()} type="button" className="w-fit text-base text-left py-2 px-6 flex justify-between text-[#3A3A3A] bg-[#4EC8AE]">
                                    <span className="fr-fi-mail-fill mr-4 w-3 h-3 mb-[10px]" aria-hidden="true" />
                                    <span >Voir les coordonnées</span>
                                </button>
                            </>
                            :
                            <div className="">
                                <span className="text-base" style={cardTypeColor}>{cardData.Téléphone}</span> <br/>
                                <span className="text-base" style={cardTypeColor}>{cardData.Mail}</span> <br/>
                                <span className="text-base" style={cardTypeColor}>{cardData['Site internet']}</span> <br/>

                            </div>
                        }


                </div>

            </div>

            <div className="contentContainer mx-auto w-[85%]">
                
                <div className="enterprise -ml-4 mt-8 flex flex-col justify-around
                xl:mt-0 xl:w-[60%]">
                    <h3 style={cardTypeColor} className="font-bold text-xl m-4">Entreprise</h3>
                    <p className="m-4">{cardData["L'entreprise"]}</p>
                </div>
                
                <div className={`project relative mt-12 p-3.5 bg-[#353434]
                    xl:w-[60%]
                    ${!seeEntireProjectDescription ? 'h-[285px] ' : 'w-fit'}`}>

                    <div className={`
                        ${seeEntireProjectDescription ? '' : 'overflow-hidden'}
                        max-h-[80%]`}>

                        <h3 style={cardTypeColor} className="font-bold text-xl m-4">Le Projet</h3>

                        {!seeEntireProjectDescription ?
                            <>
                                {screenWidth >= 1280 ? <p className="m-4">{cardProjectBigDevices}</p> : <p className="m-4">{cardProjectSmallDevices}</p>}
                                <div className="absolute top-0 left-0 h-full w-full overflow-gradient"></div>
                            </>
                            :
                            <p className="m-4">{cardData['Le projet']}</p> 

                        }

                    </div>

                    <button onClick={ () => setSeeEntireProjectDescription(!seeEntireProjectDescription)} style={cardTypeColor} className="relative m-4 w-fit addBorder border text-sm p-2" type="button">
                       { !seeEntireProjectDescription ? "Voir le projet complet" : "Voir moins"}
                    </button>
                </div>

                <div className="marketsAndChallenges mt-12 flex flex-wrap justify-around 
                xl:w-[60%]">
                    
                    <div className="markets mt-4 w-full flex flex-col 
                    xl:min-w-[50%] xl:max-w-[50%] xl:max-h-[50%]">
                        <h3 style={cardTypeColor} className="font-bold text-xl">Marchés</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap justify-start ">
                            {cardMarkets.length > 0 ? cardMarkets.map( market => <Label bgColor="#E5FFF4" textColor="text-[#37635F]">{market}</Label>) : null} 
                        </div>
                    </div>

                    <div className="challenges mt-4 w-full flex flex-col 
                    xl:min-w-[50%] xl:max-w-[50%] xl:max-h-[50%]">

                    <h3 style={cardTypeColor} className="font-bold text-xl">Enjeux ODD</h3>
                        <div className="mt-2 -ml-[10px] w-full flex flex-wrap justify-start">
                            {cardChallenges.length > 0 ? cardChallenges.map( challenge => <Label bgColor="#E5FFF4" textColor="text-[#37635F]">{challenge}</Label>) : null} 
                        </div>
                    </div>

                </div>

                <p className="mt-16">Source de la donnée : <a href="#annuaur Greentech Innovation"> Annuaire Greentech</a> </p>
            
                <p className="mb-5 mt-10">Partager la page</p>

                <div className="shareContainer relative share mb-16 -ml-6 w-64 flex justify-evenly">
                    <a className="rm-link-underline " href="Facebook" title="redirection vers Facebook"><span className="fr-fi-facebook-circle-line text-dark-text-action hover:" aria-hidden="true"/></a> 
                    <a className="rm-link-underline " href="Twitter" title="redirection vers Twitter"><span className="fr-fi-twitter-line text-dark-text-action" aria-hidden="true"/></a> 
                    <a className="rm-link-underline " href="LinkedIn" title="redirection vers Linkedin"><span className="fr-fi-linkedin-box-line text-dark-text-action" aria-hidden="true"/></a> 
                    <a className="rm-link-underline " href="mailto:msg@greentech.fr" title="redirection vers la boîte mail"><span className="fr-fi-mail-line text-dark-text-action" aria-hidden="true"/></a> 
                    <span 
                        onClick={ () => handleCopyURL()} 
                        className={`
                            ${urlCopied ? displayCopiedURLMessage : null }
                            rm-link-underline cursor-pointer
                            `} 
                        title="copier le lien de la page">
                            <span className="fr-fi-links-fill text-dark-text-action" aria-hidden="true"/>
                    </span> 
                </div>

            </div>
            
        </div>
    ) 
}; 
export const DetailsStartup = () => <Details cardType={startups}/>
