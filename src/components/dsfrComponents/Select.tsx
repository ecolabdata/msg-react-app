interface SelectProps { 
    optionsData : string[];
    label: string;
    classes: string;
} 

const Select: React.FC<SelectProps> = ({optionsData, label, classes}) => { 

    return (

            <div className={`
            ${classes}
            fr-select-group`}>
                <label className="fr-label" htmlFor="select">
                    {label}
                </label>
                <select className="fr-select" id="select" name="select">
                    <option value="" selected disabled hidden>Selectionnez une option</option>
                    {optionsData.map(option => <option value={option}>{option}</option>)}
                </select>
            </div>
    ) 
}; 

export default Select;