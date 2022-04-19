interface SelectProps { 
    optionsData : string[];
} 

const Select: React.FC<SelectProps> = ({optionsData}) => { 

    return (

            <div className="fr-select-group">
            <label className="fr-label" htmlFor="select">
                Thématique du projet
            </label>
            <select className="fr-select" id="select" name="select">
                <option value="" selected disabled hidden>Selectionnez une thématique</option>
                {optionsData.map(option => <option value={option}>{option}</option>)}
            </select>
            </div>
    ) 
}; 

export default Select;