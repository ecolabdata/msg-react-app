import { useEffect, useState } from 'react';
import Chevron from './../../assets/icons/chevronWhite.svg'

interface SelectProps { 
    optionsData : string[];
    label: string;
    classes: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
interface SelectInputOptionsProps { 
    optionsData : string[];
    secteurs : string[];
    setSecteurs: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectInputOptions: React.FC<SelectInputOptionsProps> = ({optionsData, secteurs, setSecteurs}) => { 
    
    const [displaySelect, setDisplaySelect] = useState(false);
    const [checkBoxesArrayData, setCheckBoxesArrayData] = useState(new Array(optionsData.length).fill(false));

    const handleOnChange = (checkboxIndex:number) => {
       
        const newCheckBoxesArrayState = checkBoxesArrayData.map((checkbox, index) => {
            return index === checkboxIndex ? !checkbox : checkbox
        });
        

        setCheckBoxesArrayData(newCheckBoxesArrayState);
    }

    useEffect(() => {
        

        checkBoxesArrayData.filter((checkbox, currentCheckboxIndex) => {

            if (checkbox && !secteurs.includes(optionsData[currentCheckboxIndex])) {

                return setSecteurs([...secteurs, optionsData[currentCheckboxIndex]]);
            }

            if(!checkbox && secteurs.includes(optionsData[currentCheckboxIndex])) {

                const indexOfTheValueToDelete = secteurs.indexOf(optionsData[currentCheckboxIndex]);

                secteurs.splice(indexOfTheValueToDelete, 1);

            }

            return null;
        })

    }, [checkBoxesArrayData, secteurs])

    return (
        <>

            <button type="button" className=" z-[10] h-10 w-[80%] flex justify-between py-2 px-3 bg-input-background addBorder-b border-3 border-b-white " onClick={() => {setDisplaySelect(!displaySelect);}}> 
                <p> Sélectionnez une option </p>
                <img className={`${displaySelect ? 'rotate-90': ''} h-5 w-5 m-0.5`} src={Chevron} alt="Chevron" />
            </button>

            {displaySelect &&
                
                <ul  className="w-[80%] z-[10] bg-input-background">
                    {optionsData.map((option, index) => {
                        return(
                            
                            <li className="ml-2 my-2" key={option}>
                                <input 
                                className="bg-red-200 appearance-on addBorder border text-black border-black  mx-1"
                                id={option}
                                type="checkbox"
                                value={checkBoxesArrayData[index]}
                                onChange={() => {handleOnChange(index)}}
                                checked={checkBoxesArrayData[index]}
                                />
                                <label className="capitalize" htmlFor={option}>{option}</label>        
                            </li>
                        
                        )})}
                </ul>
            }
        </>
    ) 
}; 

export default SelectInputOptions;
