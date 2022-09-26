interface KeyWordsLabelProps {
  keyWord: string;
}

const KeyWordsLabel: React.FC<KeyWordsLabelProps> = ({ keyWord }) => {
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentLabelValue = event.currentTarget.innerText;
    //TODO : Dispatch and delete the similar data into the array motsclefs
  };

  return (
    // fr-tag--dismiss to add delete
    <>
      <button
        onClick={(event) => {
          onClickHandler(event);
        }}
        type="button"
        className="m-1 fr-tag fr-tag--sm"
        aria-label={`Retirer${keyWord}`}
      >
        {keyWord}
      </button>
    </>
  );
};

export default KeyWordsLabel;
