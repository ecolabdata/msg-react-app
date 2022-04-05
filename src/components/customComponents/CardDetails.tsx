import { CardData } from '../../model/CardData';
import { CardType } from '../../model/CardType';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import{ Rocket } from './../../assets/Icons';
import { Link } from 'react-router-dom';
import Trash from './../../assets/icons/trash-fill.svg';
import Star from './../../assets/icons/star-fill.svg';
interface CardDetailsProps { 
    cardType: CardType,
    cardData: CardData,
} 

const CardDetails = () => {
     
    return (
        <>
            <div className="headContainer mx-auto w-3/5 ">

                <button onClick={() => window.history.back()} className="ml-4 text-dark-text-action flex mt-4 rm-link-underline "> <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retour </button>
                
                <div className="categoryName mt-10 min-w-40 flex">
                    
                    <div  className="text-[#8585F6]">
                        <Rocket className="mt-1.5 mr-2 text-sm" width="11" height="11"/>
                    </div>
                    <p className="text-dark-text-action">Aide à l'innovation</p>

                </div>

                <div className="cardTitle my-10 text-base">
                    
                    <div className="flex justify-between">
                        <h2 className="w-1/2 font-bold text-xl
                        lg:text-4xl">

                            Soutenir la méthanisation
                        </h2>
                        <div className="w-[49%] flex justify-end">
                            <img src={Star} alt="Icône d'étoile" className="mr-4 w-6 h-6 cursor-pointer" />
                            <img src={Trash} alt="Icône de poubelle" className="w-6 h-6 cursor-pointer" />
                        </div>
                    </div>

                    <p className="mt-6 w-full text-xs">ADEME OU REGION NOUVELLE AQUITAINE</p>

                </div>

            </div>

            <div className="contentContainer w-3/5 mx-auto">

                <div className="objectivesAndContext flex flex-col ">

                    <h2 className="text-dark-text-action text-[22px] font-bold">Objectifs et contexte</h2>

                    <div className="flex justify-between mt-4">
                        
                        <div className="textContainer w-1/2">
                            <p> La méthanisation contribue significativement aux objectifs de la région Nouvelle-Aquitaine en matière de transition énergétique. Ces derniers,  rappelés dans la feuille de route Néoterra (ambition 6), portent sur : </p> <br/>

                            <ul>
                                <li className="ml-6 list-disc">
                                    la réduction de 45% des émissions de gaz à effet de serre7
                                </li>
                                <li className="ml-6 list-disc">
                                    l’augmentation à 45% de la part des énergies renouvelables
                                </li>
                            </ul> <br/>
                            
                            <p>
                                La méthanisation constitue par ailleurs un levier de la transition agro-écologique des exploitations agricoles et offre des solutions de valorisation des déchets du territoire dans une logique d'économie circulaire. 
                            </p> <br/>

                            <p> 
                                Pour aider au développement cette filière  très vertueuse et accompagner les porteurs de projet, la Région co-pilote avec l'ADEME le dispositif MethaN-Action. Visant à accompagner toutes les initiatives du territoire (de la phase d’émergence à l’exploitation) et à professionnaliser les maîtres d'ouvrage, ce dispositif  propose des circuits de visite, des formations, des journées techniques, des échanges avec le réseau des  exploitants d'unité de méthanisation, des guides, des newsletters, etc…
                            </p>
                        </div>
                        
                        <div className="contactCard w-fit h-fit rounded-2xl addBorder border-4 p-12 border-dark-text-action flex flex-col items-start">


                            <h2 className="text-[22px] font-bold text-dark-text-action ">Contact</h2>

                            <p className="text-base w-[280px]">Service Biogaz Chaleur renouvelable Direction de l'énergie et du climat</p>
                            
                            <button
                                onClick={() => {console.log("bouton numéro cliqué - afficher le numéro");}} 
                                className="
                                fr-btn fr-btn--primary
                                w-fit px-4 h-3 py-2
                                hover:bg-claire-bf__hover
                                mt-6 
                                "> 
                                <span className="fr-fi-phone-fill w-3 h-3 mb-[10px]" aria-hidden="true"/>
                                <span className="mt-1 ml-4 text-base">Voir les coordonnées</span>
                            </button>

                            <button
                                onClick={() => {console.log("bouton contact cliqué - rediriger vers la ressource");}} 
                                className="
                                fr-btn fr-btn--secondary
                                w-fit px-4 h-3 py-2
                                hover:bg-claire-bf__hover
                                my-6
                                "> 
                                <span className="fr-fi-external-link-line w-3 h-3 mb-[10px]" aria-hidden="true"/>
                                <span className="mt-1 ml-4 text-base">Consulter la source de l'aide</span>
                            </button>

                        </div>

                    </div>

                </div>

                <div className="otherTitles w-1/2 flex justify-between mt-12">

                    <div className="leftSideContainer w-[45%]">

                        <div className="beneficiaries">

                            <h2 className="text-[22px] font-bold text-dark-text-action ">Bénéficiaires</h2>
                            
                            <ul className="mt-8">
                                <li className="ml-6 list-disc">
                                    Entreprises (société dédiées type SAS, entreprises agricoles, développeur, coopératives, …)
                                </li>
                                <li className="ml-6 list-disc">
                                    Collectivités territoriales
                                </li>
                                <li className="ml-6 list-disc">
                                    Associations
                                </li>
                            </ul>

                        </div>

                        <div className="eligibilityRequirements mt-4">

                            <h2 className="text-[22px] font-bold text-dark-text-action ">Conditions d’éligibilité</h2>
                            <a className="mt-8" href="/google.com">Voir détail sur le site internet ci-contre</a>

                        </div>

                        <div className="dataSource mt-4">

                            <h2 className="text-[22px] font-bold text-dark-text-action "> Source de la donnée </h2>
                            <a className="mt-8" href="#">Mission transition</a>

                        </div>

                        <div className="socialNetworks mt-16">

                            <p>Partager la page</p>

                            <ul className="mt-8 flex">
                                <li className=""><span className="hover:bg-gray-500 0w-5 h-5 rounded-full addBorder border-2 border-white p-2 text-white fr-fi-twitter-line" aria-hidden="true"></span></li>
                                <li className=""><span className="hover:bg-gray-500 ml-2 w-5 h-5 rounded-full addBorder border-2 border-white p-2 text-white fr-fi-linkedin-box-line" aria-hidden="true"></span></li>
                                <li className=""><span className="hover:bg-gray-500 ml-2 w-5 h-5 rounded-full addBorder border-2 border-white p-2 text-white fr-fi-mail-line" aria-hidden="true"></span></li>
                                <li className=""><span className="hover:bg-gray-500 ml-2 w-5 h-5 rounded-full addBorder border-2 border-white p-2 text-white fr-fi-links-fill" aria-hidden="true"></span></li>
                            </ul>
                        </div>

                    </div>

                    <div className="rightSideContainer w-[45%]">

                        <div className="ammount">
                            <h2 className="text-[22px] font-bold text-dark-text-action ">Montant</h2>
                            <p className="mt-8">
                                Aides à la décision : les études de faisabilité et études détaillées d’injection sont finançables par la Région Nouvelle-Aquitaine ou l’ADEME à hauteur de 50% à 70 % du montant des dépenses éligibles
                            </p> <br/>

                            <p>
                                Aides financières à l’investissement : en complément des tarifs de rachat du gaz ou de l’électricité, la subvention vise à améliorer l’économie globale des projets. Le niveau d’aide est défini à l’issue de l’instruction technico-économique menée conjointement avec l’ADEME.
                            </p>

                        </div>
                    </div>
                    
                </div>

            </div>
        </>
    ) 
}; 

export default CardDetails;