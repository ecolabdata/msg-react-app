
interface DropDownProps {
    borderColor: string;
}
const DropDown: React.FC<DropDownProps> = (props) => { 


    return (

        <>
            <div className="fr-select-group">

                <label className="mb-1 text-white text-base font-light" htmlFor="select-thematic">
                    Thématiques
                </label>

                <select className={`fr-select mt-1 w-64 h-10 shadow-none addBorder-b border-3 border-${props.borderColor}
                bg-input-background`} aria-describedby="select-error-desc-error" id="select-thematic" name="select-thematic">
                    <option className="font-light text-md" value="" selected disabled hidden>Toutes</option>
                    <option className="font-light text-md" value="1">Organismes publics ouverts à l’innovation</option>
                    <option className="font-light text-md" value="2">Achats publics prévisionnels</option>
                    <option className="font-light text-md" value="3">Investisseurs privés</option>
                    <option className="font-light text-md" value="4">Aides à l’innovation</option>
                    <option className="font-light text-md" value="5">Aides aux clients</option>
                </select>
            </div>
        </>
    ) 
}; 

export default DropDown;