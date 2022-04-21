interface KeyWordsLabelProps { 
    keyWord: string;
} 

const KeyWordsLabel: React.FC<KeyWordsLabelProps> = ({keyWord}) => {
    
    const onClickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        const currentLabelValue = event.currentTarget.innerText;
        //TODO : Dispatch and delete the similar data into the array motsclefs
    };

    return (

        <>
                <button onClick={ (event) => {
                    onClickHandler(event);
                }} type="button" className="fr-tag fr-tag--sm fr-tag--dismiss" aria-label={`Retirer${keyWord}`}>{keyWord}</button>
        </>
    ) 
}; 

export default KeyWordsLabel;