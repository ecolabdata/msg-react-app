interface SelectProps { 
    optionsData : string[];
    label: string;
    classes: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    color?: string,
    defaultOption?: string
} 

const Select: React.FC<SelectProps> = ({optionsData, label, classes, onChange, color, defaultOption}) => {
    let style = {} 
    if (color) style = {"boxShadow": `inset 0 -2px 0 0 ${color}` }
    return (

            <div className={`
            ${classes}
            fr-select-group`}>
                <label className="fr-label" htmlFor="select">
                    {label}
                </label>
                <select className="fr-select" onChange={onChange} style={style}> 
                    <option value="" selected disabled hidden>{defaultOption || "Selectionnez une option"}</option>
                    {optionsData.map(option => <option value={option}>{option}</option>)}
                </select>
            </div>
    )
}; 

export default Select;