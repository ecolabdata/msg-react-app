import { useEffect, useState } from 'react';
import Chevron from './../../assets/icons/chevronWhite.svg'

interface SelectProps {
    optionsData: string[];
    label: string;
    classes: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
interface SelectInputOptionsProps {
    optionsData: string[];
    secteurs: string[];
    setSecteurs: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectInputOptions: React.FC<SelectInputOptionsProps> = ({ optionsData, secteurs, setSecteurs }) => {

    const [displaySelect, setDisplaySelect] = useState(false);

    const secteursSet = new Set(secteurs)

    return (
        <>
            <label className="fr-label" htmlFor="select">Thématique du projet</label>
            <button type="button" className=" z-[10] h-10 w-[80%] flex justify-between py-2 px-3 bg-input-background addBorder-b border-3 border-b-white " onClick={() => { setDisplaySelect(!displaySelect); }}>
                
                {secteurs.length <= 0

                    ? 
                    <p> Sélectionnez une option </p>
                    :
                    <>
                        <p className="w-5/6 truncate"> {secteurs.map(secteur => {
                            return (
                                <span>{secteur}, </span>
                            )
                        })} </p>
                        <span className={`
                        ${localStorage.scheme === "dark" ? "bg-dark-text-action" : "bg-blue-france"}
                            w-6 h-6 rounded-full text-white font-bold`
                        }> {secteurs.length} </span>
                    </>
                }

                <img className={`${displaySelect ? 'rotate-90' : ''} h-5 w-5 m-0.5`} src={Chevron} alt="Chevron" />
            </button>

            {displaySelect && <>
                <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, left: 0, zIndex: 5 }} onClick={e => setDisplaySelect(false)}></div>
                <ul className="w-[700px] mh-[350px] z-[10] bg-input-background flex flex-wrap content-evenly shadow-slate-400 shadow-sm">
                    {optionsData.map((option, index) => {
                        return (
                            
                            <li className="p-0 w-[350px] flex content-center items-center" key={option}>
                                <input
                                    className="bg-red-200 appearance-on addBorder border text-black border-black  mx-4"
                                    id={option}
                                    type="checkbox"
                                    value={option}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            secteursSet.add(option)
                                        } else {
                                            secteursSet.delete(option)
                                        }
                                        setSecteurs(Array.from(secteursSet))
                                    }}
                                    checked={secteursSet.has(option)}
                                    />
                                <label className="capitalize h-12 flex items-center" htmlFor={option}>{option}</label>
                            </li>

                        )})}
                </ul>
            </>
            }
        </>
    )
};

export default SelectInputOptions;
