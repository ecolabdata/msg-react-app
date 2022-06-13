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
        <div className="relative">
            <label className="fr-label" htmlFor="select">Thématique du projet</label>
            <button type="button" className="mt-2 w-full max-h-10 addBorder-b border-3 border-b-white p-2 flex bg-input-background" onClick={() => { setDisplaySelect(!displaySelect); }}>
                    <p className="flex-1 truncate text-left max-w-full">
                        {secteurs.length <= 0 ? "Sélectionnez une option" : secteurs.join(", ")}
                    </p>
                    <span className={`${localStorage.scheme === "dark" ? "bg-dark-text-action" : "bg-blue-france"} w-6 h-6 rounded-full text-white font-bold`}> {secteurs.length} </span>
                    <img className={`${displaySelect ? 'rotate-90' : ''} h-5 w-5 m-0.5`} src={Chevron} alt="Chevron" />
            </button>

            {displaySelect && <>
                    <ul className="z-10 absolute w-full max-h-[320px] overflow-auto flex flex-col bg-background-inputs  shadow-slate-400 shadow-sm">
                        {optionsData.map( option => {
                            return (

                                <li className="flex content-center items-center" key={option}>
                                    <input
                                        className="appearance-on addBorder border text-black border-black  mx-4"
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

                            )
                        })}
                    </ul>
            </>
            }
        </div>
    )
};

export default SelectInputOptions;
