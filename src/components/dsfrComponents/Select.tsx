interface SelectProps { 
    optionsData : string[];
    label: string;
    classes: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
} 

const Select: React.FC<SelectProps> = ({optionsData, label, classes, onChange}) => { 
    return (

            <div className={`
            ${classes}
            fr-select-group`}>
                <label className="fr-label" htmlFor="select">
                    {label}
                </label>
                <select className="fr-select" onChange={onChange}>
                    <option value="" selected disabled hidden>Selectionnez une option</option>
                    {optionsData.map(option => <option value={option}>{option}</option>)}
                </select>
            </div>
    ) 
}; 

export default Select;