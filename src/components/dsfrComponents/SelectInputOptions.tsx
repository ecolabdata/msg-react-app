import { useState } from 'react';
import Chevron from './../../assets/icons/chevronWhite.svg'

interface SelectProps { 
    optionsData : string[];
    label: string;
    classes: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectInputOptions: React.FC<SelectProps> = ({optionsData, label, classes, onChange}) => { 
    
    const [displaySelect, setDisplaySelect] = useState(false);

    return (
        <>
            <button className="flex underline w-[80%]" onClick={() => {setDisplaySelect(!displaySelect);}}>Affichez les options <img className={`${displaySelect ? 'rotate-90': ''} h-5 w-5 m-0.5`} src={Chevron} alt="Chevron" />
            </button>

            {displaySelect &&
                <ul  className="bg-red-200">
                    {optionsData.map(option => {

                        return(
                            
                            <li className="ml-2 my-2 flex" key={option}>
                                <label className="capitalize" htmlFor={option}></label>
                                <input type="checkbox" />
                            </li>
                        
                        )})}
                </ul>
            }
        </>
    ) 
}; 

export default SelectInputOptions;
