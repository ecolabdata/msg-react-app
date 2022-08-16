import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { search } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { ThematicsEnum } from '../../model/ThematicsEnum';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import KeyWordsLabel from '../dsfrComponents/KeyWordsLabel';
import KeywordsLogo from './../../assets/icons/Keywords.svg';
import RocketLogo from './../../assets/icons/Rockett.svg';
import ThematicsLogo from './../../assets/icons/Thematics.svg';
interface DetailsExplorePageProps { 

} 

const DetailsExplorePage: React.FC<DetailsExplorePageProps> = (props) => { 

    
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const navigate = useNavigate();
    const location = useLocation();
    useTitle(`Explorer `)
    const initialState = location.state as InitialState | null;
    const [isLoading, setIsLoading] = useState(false)

    const [description, setDescription] = useState(initialState?.search.query.description || "")
    const [secteurs, setSecteurs] = useState<string[]>(initialState?.search.query.secteurs || [])
    const [motsclefs, setMotsclef] = useState<string[]>(initialState?.search.query.motsclefs || [])
    const [errorTxt, setErrorTxt] = useState(<></>)
    
    //? Liste des Thématiques
    const thematicsValues = Object.values(ThematicsEnum);

    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        
        if (description.length > 0) {

            setIsLoading(true)
            setErrorTxt(<></>)

            //? Requête récupération des cards
            search({description, motsclefs, secteurs }).then((search) => {

                setIsLoading(false)

                const element = document.getElementById('previews')

                //? offsetTop :  renvoie la distance entre l'élément courant et le haut du nœud offsetParent.
                //? innerHeight: Récupère la hauteur (en pixels) de la partie visible de la fenêtre de navigation en incluant, si elle est affichée, la barre de défilement horizontale.
                //? scrollTop: Récupère la position verticale (en pixels) de la zone de défilement courante.
                
                if (element) setNextScrolTarget({ behavior: "smooth", top: element.offsetTop - window.innerHeight * 0.20 })

                navigate(`/recherche`, {
                    state: {
                        description,
                        secteurs,
                        motsclefs,
                        cardsById: search.cardsById
                    }
                })
            })
        } else {

            //? Afficher un message d'erreur
            setErrorTxt(<p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>La description de l'entreprise est obligatoire</p>)
        }
    };

    return (

        <>
            <form onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm" className="m-8 w-[80%] p-4 flex justify-around">

                <div className='leftSideForm max-w-[48%] max-h-[400px] p-4 projectContainer flex flex-col items-around justify-center items-center bg-background-form '>
                    
                    <div className="tilteContainer relative bottom-9 w-fit flex">
                        <img src={RocketLogo} alt="Logo" />
                        <h2 className="italic text-dark-text-action text-3xl  font-[Spectral]">1. Votre projet</h2>
                    </div>

                    <p className="w-11/12 text-base text-center">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</p>
                    <textarea onChange={e => setDescription(e.target.value)} value={description} form="keywordsForm"
                        className="cursor-text my-8 min-h-[225px] rounded-t-sm mt-4 w-11/12 addBorder-b border-3 border-gray-300 p-4 bg-background-inputs" 
                        placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”">

                    </textarea>

                </div>

                <div className="rightSideForm min-w-[48%] w-1/4 max-h-[400px] flex flex-col items-center">

                    <div className='thematicsContainer h-[200px] w-full flex flex-col items-center  bg-background-form'>

                        <div className="tilteContainer spectral relative bottom-4 w-fit flex">
                            <img src={ThematicsLogo} alt="Logo" />
                            <h2 className="italic text-dark-text-action text-3xl font-[Spectral]"> 2. La thématique</h2>
                        </div>

                        {/* <Select classes="w-[80%] my-4"label="Thématique du projet" optionsData={thematicsValues}/> */}

                    </div>

                    <div className="keyWordsContainer mt-8 h-[200px] w-full flex flex-col items-center p-2  bg-background-form">

                        <div className="tilteContainer bottom-6 relative w-fit flex">
                            <img src={KeywordsLogo} alt="Logo" />
                            <h2 className="italic text-dark-text-action text-3xl font-[Spectral]"> 3. Les mots clés</h2>
                        </div>

                        <p className="w-fit -ml-10 text-sm text-white
                        2xl:text-base">Ajoutez des mots clés représentatifs de votre activité (facultatif)</p>
                        <p className="italic text-xs font-bold">délimitez vos mots clés par une virgule</p>
                        <textarea
                            onChange={e => {

                                const motsclefs = e.target.value.split(",").map(x => x.trim())

                            
                                console.log({ motsclefs })
                                setMotsclef(motsclefs)
                            }}
                            className="cursor-text rounded-t-sm mt-4 h-15 w-[80%] addBorder-b border-3 border-gray-300 p-4 bg-background-inputs"
                        >
                            {motsclefs.join(", ")}
                        </textarea>
                            
                        <ul className="keyWordsList h-full w-[80%] -ml-4 mt-2 p-2 flex flex-wrap ">

                            {motsclefs.map( word => { 
                                console.log('word :>> ', word);
                                return <li> <KeyWordsLabel keyWord={word}/> </li>
                                
                            })}

                        </ul>

                    </div>

                </div>

            </form>
        </>
    ) 
}; 

export default DetailsExplorePage;