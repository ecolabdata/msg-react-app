import {useState} from 'react';
import SelectInputOptions from './customComponents/SelectInputOptions';
import { ThematicsEnum } from '../model/ThematicsEnum';
import KeyWordsLabel from './dsfrComponents/KeyWordsLabel';

type PitchThematicsKeywordsParams = {
    usedDescription: [string, React.Dispatch<React.SetStateAction<string>>]
    usedSecteurs: [string[], React.Dispatch<React.SetStateAction<string[]>>]
    usedMotsClef: [string[], React.Dispatch<React.SetStateAction<string[]>>]
    usedInListPage: boolean
}

const OverlappingTitle: React.FC<{txt: string, usedInListPage:boolean, number: number}> = ({txt, usedInListPage, number }) => {

    return <>

        <div className={`titleContainer ${!usedInListPage && 'absolute h-0 top-[-1em] left-4 overflow-visible'}`}>
            <div className="flex w-fit">
                <h2 className="text-xl italic text-dark-text-action font-[Spectral] flex items-baseline
                md:text-3xl">{number}  <span className="mx-2 elipsis"></span>  {txt}</h2>
            </div>
        </div>
    </>
};

export const PitchThematicsKeywords: React.FC<PitchThematicsKeywordsParams> = ({ usedDescription, usedSecteurs, usedMotsClef, usedInListPage }) => {
    const [description, setDescription] = usedDescription
    const [secteurs, setSecteurs] = usedSecteurs
    const [motsclefs, setMotsclef] = usedMotsClef
    const thematicsValues = Object.values(ThematicsEnum);
    const [collapsePitchContainer, setCollapsePitchContainer] = useState(true);
    return (
        <div className={`${usedInListPage && 'addBorder border border-dark-text-action bg-background-form'}
        ${collapsePitchContainer ?'h-[40px] justify-center items-center' : 'lg:h-[408px]'}
         relative container min-w-full flex flex-col items-end
         lg:flex-row`}>

             { collapsePitchContainer 
                ?
                <button type="button" onClick={ () => setCollapsePitchContainer(!collapsePitchContainer)} className="w-full text-dark-text-action flex justify-center items-center">Modifier la recherche <span className="ml-2">+</span></button>
                : <>
                    <button type="button" className="text-dark-text-action absolute top-0 right-10 m-2 w-[7%] flex justify-around items-center" onClick={() => {setCollapsePitchContainer(!collapsePitchContainer)}} > <span className="underline">Fermer</span><span className="rotate-45 block ml-2 text-3xl">+</span> </button>
                    
                    <div className='leftSideForm mb-8 h-[75%] w-full flex justify-center
                    lg:w-1/2 '>
                        
                        <div className="projectCopntainer relative mt-8 h-fit w-[92%] flex flex-col justify-center
                        lg:mt-0">

                            <OverlappingTitle usedInListPage={usedInListPage} number={1} txt="Le projet" />
                                
                            <div className="fieldsContainer mt-2 flex flex-col w-full">
                                <p className="text-base">Décrivez votre projet en quelques lignes.</p>
                                <textarea onChange={e => setDescription(e.target.value)} value={description} form="keywordsForm"
                                    className="mt-2 w-full rounded-t-sm addBorder-b border-3 border-white p-2 bg-background-inputs
                                    lg:min-h-[212px]"/>
                            </div>

                        </div>

                    </div>

                    <div className="rightSideForm mb-8 h-[75%] w-full flex flex-col items-center justify-between
                    lg:w-1/2">
                        
                        <div className='thematicsContainer relative w-[92%] h-[50%] -background-form'>
                            <OverlappingTitle usedInListPage={usedInListPage} number={2} txt="La thématique" />
                            <div className="h-fit w-full">
                                <div className='fieldsContainer mt-2 flex flex-col'>
                                    <SelectInputOptions optionsData={thematicsValues} secteurs={secteurs} setSecteurs={setSecteurs} />
                                </div>
                            </div>
                        </div>


                        <div className="keyWordsContainer relative mt-8 max-h-full w-[92%] -background-form
                        lg:mt-6">

                            <OverlappingTitle usedInListPage={usedInListPage} number={3} txt="Les mots clés" />

                                <p className="mt-4 text-base">Ajoutez des mots clés représentatifs de votre activité. (facultatif)</p>

                                <textarea
                                    onChange={e => {
                                        const motsclefs = e.target.value.split(",").map(x => x.trim()).filter(x => x)
                                        setMotsclef(motsclefs)
                                    }}
                                    className="cursor-text rounded-t-sm h-10 mt-2 w-full addBorder-b border-3 border-white overflow-hidden bg-background-inputs"
                                    defaultValue={motsclefs.join(", ")}
                                >
                                </textarea>

                                <ul className="keyWordsList max-h-[40px] mt-2 overflow-auto flex flex-wrap">
                                    {motsclefs.map(word => <li key={word}> <KeyWordsLabel keyWord={word}/> </li>)}
                                </ul>

                        </div> 

                    </div>
                </>
            }

        </div>
    )
}