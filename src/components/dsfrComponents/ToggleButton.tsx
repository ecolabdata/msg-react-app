interface ToggleButtonProps { 

} 

const ToggleButton: React.FC<ToggleButtonProps> = (props) => { 

    return (

        <>
            <div className="fr-toggle">
                <input type="checkbox" className="border-private-investors" aria-describedby="toggle-698-hint-text" id="toggle-698"/>
                <label className="fr-toggle__label" htmlFor="toggle-698" data-fr-checked-label="Activé" data-fr-unchecked-label="Désactivé">Label action interrupteur</label>
            </div>
        </>
    ) 
}; 

export default ToggleButton;