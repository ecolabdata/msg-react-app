import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AnyCard, search } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { all as allCardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import ResultResearchPreviewCard from '../customComponents/ResultResearchPreviewCard';
import KeyWordsLabel from '../dsfrComponents/KeyWordsLabel';
import RocketLogo from './../../assets/icons/Rockett.svg';
import KeywordsLogo from './../../assets/icons/Keywords.svg';
import ThematicsLogo from './../../assets/icons/Thematics.svg';
import { ThematicsEnum } from '../../model/ThematicsEnum';
import SelectInputOptions from '../customComponents/SelectInputOptions';
import { PitchThematicsKeywords } from '../PitchThematicsKeywords';


const ResearchForm: React.FC<{ alpha: boolean }> = ({ alpha }) => {

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
    const userFromHomePage = location.state === null;
    const thematicsValues = Object.values(ThematicsEnum);

    const handleOnSubmitForm = (ctrlPress: boolean) => {

        if (description.length > 0) {

            setIsLoading(true)
            setErrorTxt(<></>)
            search({ description, motsclefs, secteurs }).then((search) => {
                setIsLoading(false)
                //? Scroll
                const element = document.getElementById('previews')
                if (element) setNextScrolTarget({ behavior: "smooth", top: element.offsetTop - window.innerHeight * 0.20 })
                navigate(ctrlPress ? `/explorer-alpha` : `/explorer/search`, { state: { search } })
            }).catch(e => {
                setIsLoading(false)
                navigate(ctrlPress ? `/explorer-alpha` : `/explorer/search`)
                setErrorTxt(<p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>Une erreur serveur inconnue est survenue</p>)
            })
        } else {
            setErrorTxt(<p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>La description de l'entreprise est obligatoire</p>)
        }
    };

    const previews = allCardType.filter(x => alpha || x.version === "beta").map(cardType => {

        if (!initialState) return null;

        const results: AnyCard[] = initialState.search.cards[cardType.apiName];
        if (results.length === 0) return null;

        return (
            <ResultResearchPreviewCard cardType={cardType} initialState={initialState} resultCount={results.length}>
                {results.filter(x => !isInCorbeille(x)).map(x => <div className='outer-card'><div className="md:ml-6">
                    <ResultPreviewCard pageList={false} cardData={x} cardType={cardType} />
                </div></div>
                )}
            </ResultResearchPreviewCard>
        )

    })

    return (
        <>
            <div className="formContainer flex flex-col items-center">

                <h1 className="font-bold text-2xl md:text-4xl my-2 md:my-8 lh text-center mx-auto max-w-4xl md:leading-10"> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                <div className="mt-4">
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleOnSubmitForm(false)
                }} id="keywordsForm"  className="flex flex-wrap max-w-[1920px]">
                    <PitchThematicsKeywords
                        usedDescription={[description, setDescription]}
                        usedMotsClef={[motsclefs, setMotsclef]}
                        usedSecteurs={[secteurs, setSecteurs]}
                        usedInListPage={false}
                        userFromHomePage={userFromHomePage}
                    />
                </form>
                </div>
                <div className='h-12 flex justify-center items-center color'>
                    {errorTxt}
                </div>

                <div className='buttonsContainer flex justify-around flex-wrap'>

                    <button className="w-48 h-14 text-base  underline capitalize" onClick={(event) => {
                        setDescription("")
                        setSecteurs([])
                        setMotsclef([])
                    }}> Réinitialiser </button>
                    <button onClick={(event) => {
                        event.preventDefault()
                        handleOnSubmitForm(event.ctrlKey)
                    }} form="keywordsForm" disabled={isLoading} className="w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">{isLoading ? "Chargement..." : "rechercher !"}</span> </button>

                </div>

            </div>

            {previews && !isLoading && <div id="previews" className="researwchResultContainer mt-4">
                {previews}
            </div>}
            {isLoading && <div className='mx-auto'>Ca charge</div>}
        </>
    )
};

export default ResearchForm;