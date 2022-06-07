import RocketLogo from './../assets/icons/Rockett.svg';
import KeywordsLogo from './../assets/icons/Keywords.svg';
import ThematicsLogo from './../assets/icons/Thematics.svg';
import SelectInputOptions from './customComponents/SelectInputOptions';
import { ThematicsEnum } from '../model/ThematicsEnum';
import KeyWordsLabel from './dsfrComponents/KeyWordsLabel';

type PitchThematicsKeywordsParams = {
    usedDescription: [string, React.Dispatch<React.SetStateAction<string>>]
    usedSecteurs: [string[], React.Dispatch<React.SetStateAction<string[]>>]
    usedMotsClef: [string[], React.Dispatch<React.SetStateAction<string[]>>]
}

const OverlappingTitle: React.FC<{ logo: string, txt: string }> = ({ logo, txt }) => <>
    <div className="titleContainer absolute flex h-0 top-[-1em] overflow-visible">
        <div className="flex h-fit w-full">
            <img className="h-fit" src={logo} alt="Logo" />
            <h2 className="italic text-dark-text-action text-xl md:text-3xl font-[Spectral]">{txt}</h2>
        </div>
    </div>
    <div className="spacer mt-4 md:mt-8"></div>
</>

export const PitchThematicsKeywords: React.FC<PitchThematicsKeywordsParams> = ({ usedDescription, usedSecteurs, usedMotsClef }) => {
    const [description, setDescription] = usedDescription
    const [secteurs, setSecteurs] = usedSecteurs
    const [motsclefs, setMotsclef] = usedMotsClef
    const thematicsValues = Object.values(ThematicsEnum);
    return <>
        <div className='leftSideForm flex justify-center items-stretch basis-[50%] flex-shrink flex-grow'>
            <div className={"flex flex-col items-around justify-center items-center  bg-background-form relative m-2"}>
                <OverlappingTitle logo={RocketLogo} txt={"1. Votre projet"} />
                <div className="flex flex-col items-stretch">
                    <div className="fieldsContainer m-4 flex flex-col items-stretch">
                        <p className="text-base text-center m-2">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</p>
                        <textarea onChange={e => setDescription(e.target.value)} value={description} form="keywordsForm"
                            className="cursor-text my-8 min-h-[225px] rounded-t-sm mt-4 addBorder-b border-3 border-gray-300 bg-background-inputs"
                            placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”" />
                    </div>
                </div>
            </div>
        </div>

        <div className="rightSideForm flex flex-col items-stretch  basis-[50%] flex-shrink flex-grow">
            
            <div className='thematicsContainer flex flex-col items-center bg-background-form relative m-2'>
                <OverlappingTitle logo={ThematicsLogo} txt={"2. La thématique"} />
                <div className="flex flex-col items-stretch">
                    <div className="fieldsContainer m-4 flex flex-col items-stretch">
                        <div className='fieldsContainer m-4 flex flex-col items-stretch'>
                            <SelectInputOptions optionsData={thematicsValues} secteurs={secteurs} setSecteurs={setSecteurs} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="keyWordsContainer mt-8 flex flex-col items-center  relative bg-background-form m-2">
                <OverlappingTitle logo={KeywordsLogo} txt="3. Les mots clés" />
                <div className="w-full flex flex-col items-stretch">
                    <div className="fieldsContainer m-4 flex flex-col items-stretch">
                        <p className="text-base text-center">Ajoutez des mots clés représentatifs de votre activité. (facultatif)</p>
                        <textarea
                            onChange={e => {
                                const motsclefs = e.target.value.split(",").map(x => x.trim()).filter(x => x)
                                setMotsclef(motsclefs)
                            }}
                            className="cursor-text rounded-t-sm mt-4 h-15 addBorder-b border-3 border-gray-300 bg-background-inputs overflow-hidden resize-none"
                            defaultValue={motsclefs.join(", ")}
                        >
                        </textarea>

                        <ul className="keyWordsList h-[52px] mt-2 flex flex-wrap">
                            {motsclefs.map(word => <li key={word}> <KeyWordsLabel keyWord={word} /> </li>)}
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    </>
}