interface ToggleButtonProps { 
    label : string
} 

const ToggleButton: React.FC<ToggleButtonProps> = ({label}) => { 

    return (

        <>
            <div className="fr-toggle w-fit mt-4">
                <input type="checkbox" className="border-private-investors" aria-describedby="toggle-698-hint-text" id="toggle-698"/>
                <label className="fr-toggle__label text-white text-base " htmlFor="toggle-698" data-fr-checked-label="Activé" data-fr-unchecked-label="Désactivé">{label}</label>
            </div>
        </>
    ) 
}; 

export default ToggleButton;