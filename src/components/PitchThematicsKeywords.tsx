import RocketLogo from './../assets/icons/Rockett.svg';
import KeywordsLogo from './../assets/icons/Keywords.svg';
import ThematicsLogo from './../assets/icons/Thematics.svg';
import SelectInputOptions from './customComponents/SelectInputOptions';
import { ThematicsEnum } from '../model/ThematicsEnum';
import KeyWordsLabel from './dsfrComponents/KeyWordsLabel';

type PitchThematicsKeywordsParams = {
    usedDescription : [string, React.Dispatch<React.SetStateAction<string>>]
    usedSecteurs: [string[], React.Dispatch<React.SetStateAction<string[]>>]
    usedMotsClef: [string[], React.Dispatch<React.SetStateAction<string[]>>]
}

export const PitchThematicsKeywords : React.FC<PitchThematicsKeywordsParams> = ({usedDescription, usedSecteurs, usedMotsClef}) => {
    const [description, setDescription] = usedDescription
    const [secteurs, setSecteurs] = usedSecteurs
    const [motsclefs, setMotsclef] = usedMotsClef
    const thematicsValues = Object.values(ThematicsEnum);
    return <>

        <div className='leftSideForm max-w-[48%] max-h-[400px] p-8 projectContainer flex flex-col items-around justify-center items-center bg-background-form '>

            <div className="titleContainer relative top-[-3rem] w-fit flex h-0 w-500px overflow-visible">
                <img className="h-fit" src={RocketLogo} alt="Logo" />
                <h2 className="italic text-dark-text-action text-3xl  font-[Spectral]">1. Votre projet</h2>
            </div>

            <p className="w-11/12 text-base text-center">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</p>
            <textarea onChange={e => setDescription(e.target.value)} value={description} form="keywordsForm"
                className="cursor-text my-8 min-h-[225px] rounded-t-sm mt-4 w-11/12 addBorder-b border-3 border-gray-300 p-4 bg-background-inputs"
                placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”" />

        </div>

        <div className="rightSideForm min-w-[48%] w-1/4 flex flex-col items-center">
            <div className='thematicsContainer p-8 w-full flex flex-col items-center bg-background-form'>
                <div className="titleContainer spectral relative bottom-[50px] h-0 overflow-visible w-fit flex">
                    <img className="h-fit" src={ThematicsLogo} alt="Logo" />
                    <h2 className="italic text-dark-text-action text-3xl font-[Spectral]"> 2. La thématique</h2>
                </div>

                <SelectInputOptions optionsData={thematicsValues} secteurs={secteurs} setSecteurs={setSecteurs} />

            </div>

            <div className="keyWordsContainer mt-8 w-full flex flex-col items-center p-4 pt-8 bg-background-form">

                <div className="titleContainer relative w-fit flex bottom-[47px] h-0 overflow-visible">
                    <img className="h-fit" src={KeywordsLogo} alt="Logo" />
                    <h2 className="italic text-dark-text-action text-3xl font-[Spectral]"> 3. Les mots clés</h2>
                </div>

                <p className="text-sm text-white
                    2xl:text-base text-center">Ajoutez des mots clés représentatifs de votre activité (facultatif)</p>
                <p className="italic text-xs font-bold">délimitez vos mots clés par une virgule</p>
                <textarea
                    onChange={e => {
                        if (e.target.value) {
                            const motsclefs = e.target.value.split(",").map(x => x.trim())
                            setMotsclef(motsclefs)
                        } else {
                            setMotsclef([])
                        }
                    }}
                    className="cursor-text rounded-t-sm mt-4 h-15 w-[80%] addBorder-b border-3 border-gray-300 p-4 bg-background-inputs overflow-hidden resize-none"
                    value={motsclefs.join(", ")}
                >
                </textarea>

                <ul className="keyWordsList h-[52px] w-full mt-2 p-2 flex flex-wrap">
                    {motsclefs.map(word => <li key={word}> <KeyWordsLabel keyWord={word} /> </li>)}
                </ul>

            </div>

        </div>

    </>
}