import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnyCard, search } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { all as allCardType } from '../../model/CardType';
import { ApplicationContext } from '../../App';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import ResultResearchPreviewCard from '../customComponents/ResultResearchPreviewCard';
import { PitchThematicsKeywords } from '../PitchThematicsKeywords';
import { ArrowRight, FillMagnifying, Magnifying } from '../../assets/Icons';

const ExplorePage: React.FC<{ alpha: boolean }> = ({ alpha }) => {

    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const [nextScrollTarget, setNextScrollTarget] = usedNextScrollTarget
    const navigate = useNavigate();
    const location = useLocation();
    useTitle(`Explorer `)
    const initialState = location.state as InitialState | null;
    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(initialState?.search.query.description || "")
    const [secteurs, setSecteurs] = useState<string[]>(initialState?.search.query.secteurs || [])
    const [motsclefs, setMotsclef] = useState<string[]>(initialState?.search.query.motsclefs || [])
    const [errorTxt, setErrorTxt] = useState('');
    const userFromHomePage = location.state === null;

    const handleOnSubmitForm = (ctrlPress: boolean) => {

        if (description.length > 0) {

            setIsLoading(true)
            setErrorTxt('')
            search({ description, motsclefs, secteurs }).then((search) => {
                setIsLoading(false)
                //? Scroll
                const element = document.getElementById('previews')
                if (element) setNextScrollTarget({ behavior: "smooth", top: element.offsetTop - window.innerHeight * 0.20 })
                navigate(ctrlPress ? `/explorer-alpha` : `/explorer/search`, { state: { search } })
            }).catch(e => {
                setIsLoading(false);
                console.log(e)
                setErrorTxt('Une erreur serveur inconnue est survenue');
            })

        } else {
            setErrorTxt("La description de l'entreprise est obligatoire");
        }
    };

    const previews = allCardType.filter(x => alpha || x.version === "beta").map(cardType => {

        if (!initialState) return null;

        const results: AnyCard[] = initialState.search.cards[cardType.apiName];
        if (results.length === 0) return null;
        const cardSliceSize = Math.max(Math.floor((window.innerWidth - 60) / 330) * 2 - 1, 3)
        console.log({ cardSliceSize })
        //{name: `Voir les ${results.length - cardSliceSize } autres cartes`}
        return (
            <ResultResearchPreviewCard cardType={cardType} initialState={initialState} resultCount={results.length}>
                {results.filter(x => !isInCorbeille(x)).slice(0, cardSliceSize).map(x => <div className='outer-card'><div className="md:ml-6">
                    <ResultPreviewCard pageList={false} cardData={x} cardType={cardType} />
                </div></div>
                )}
                {results.length - cardSliceSize < 0 ? null : <div className={`cardContainer ml-6
            rounded-r w-[330px] p-4 flex flex-col
            justify-center
            items-center
            align-middle
            relative`
                }
                    style={{ color: cardType.color, opacity: isLoading ? 0 : 1 }}
                >
                    <NavLink
                        onClick={() => setNextScrollTarget({ top: 0 })}
                        to={cardType.searchLink} state={initialState}>
                        {`Voir les ${results.length - cardSliceSize} autres cartes`}
                    </NavLink>
                </div>}
            </ResultResearchPreviewCard>
        )

    });

    return (
        <>

            <h1 className="font-bold my-2 mx-auto max-w-headerSize text-xl flex text-center justify-center items-center w-[90%]
            md:my-8 md:text-[30px] leading-5"> <Magnifying width="31px" height="31px" className="mr-4" /> Formulaire de recherche en 3 étapes ! </h1>

            <form onSubmit={(event) => {
                event.preventDefault()
                handleOnSubmitForm(false)
            }}
                id="keywordsForm"
                className="h-fit mx-auto max-w-headerSize
            ">

                <PitchThematicsKeywords
                    usedDescription={[description, setDescription]}
                    usedMotsClef={[motsclefs, setMotsclef]}
                    usedSecteurs={[secteurs, setSecteurs]}
                    usedInListPage={false}
                    openPitchContainerFromStart={false}
                />

            </form>

            <div className={`errorContainer ${errorTxt.length <= 0 && 'hidden'} 
            h-12 flex justify-center items-center color`}>
                <p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>
                    {errorTxt}
                </p>
            </div>

            <div className='buttonsContainer mx-auto max-w-headerSize flex justify-center flex-wrap'>

                <button className="w-48 h-14 text-base underline capitalize" onClick={() => {
                    setDescription("")
                    setSecteurs([])
                    setMotsclef([])
                }}> réinitialiser </button>

                <button onClick={(event) => {
                    event.preventDefault()
                    handleOnSubmitForm(event.ctrlKey)
                }} form="keywordsForm" disabled={isLoading} className="fr-btn fr-btn--lg fr-btn--primary capitalize" >
                    <span className="mx-auto flex items-center">

                        {!isLoading && <FillMagnifying fill="true" width="20px" height="20px" className="mr-2" />}

                        <span>
                            {isLoading ? "chargement..." : "rechercher !"}
                        </span>

                    </span>
                </button>

            </div>

            {previews && !isLoading && <div id="previews" className="researwchResultContainer mt-4 ">
                {previews}
            </div>}

            {isLoading && <div className='mx-auto'>Chargement...</div>}
        </>
    )
};

export default ExplorePage;