import { useEffect, useRef, useState } from 'react';
import Chevron from './../../assets/icons/chevronWhite.svg';
import OptionItem from './OptionItem';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';

interface SelectInputOptionsProps {
  optionsData: string[];
  secteurs: string[];
  className?: string;
  setSecteurs: React.Dispatch<React.SetStateAction<string[]>>;
  color?: string;
}

const SelectInputOptions: React.FC<SelectInputOptionsProps> = ({
  optionsData,
  secteurs,
  setSecteurs,
  className,
  color
}) => {
  const [displaySelect, setDisplaySelect] = useState(false);
  const secteursSet = new Set(secteurs);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const focusField = () => {
    buttonRef?.current?.focus();
  };

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef?.current?.focus();
    }
  }, [firstInputRef.current]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      setDisplaySelect(false);
      focusField();
    }
  };

  useOutsideAlerter(wrapperRef, () => {
    setDisplaySelect(false);
  });

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <label className="fr-label" htmlFor="select-container">
        Thématique du projet
      </label>
      <button
        aria-multiselectable={true}
        aria-label="Thématique du projet"
        aria-expanded={displaySelect}
        ref={buttonRef}
        type="button"
        onKeyDown={handleKeyDown}
        role="combobox"
        className={`mt-2 w-full h-10 addBorder-b border-3 border-[${color}] p-2 flex bg-input-background`}
        onClick={() => {
          setDisplaySelect(!displaySelect);
        }}
      >
        <p className="flex-1 truncate text-left max-w-full">
          {secteurs.length <= 0 ? 'Sélectionnez une option' : secteurs.join(', ')}
        </p>
        <span
          className={`${
            localStorage.scheme === 'dark' ? 'bg-dark-text-action' : 'bg-blue-france'
          } w-6 h-6 rounded-full text-white font-bold`}
        >
          {' '}
          {secteurs.length}{' '}
        </span>
        <img
          className={`${displaySelect ? 'rotate-90' : ''} h-5 w-5 m-0.5`}
          src={Chevron}
          alt="Chevron"
        />
      </button>

      {displaySelect && (
        <>
          <ul className="z-10 absolute w-full max-h-[320px] overflow-auto flex flex-col bg-background-inputs  shadow-slate-400 shadow-sm">
            {optionsData.map((option, index) => {
              return (
                <OptionItem
                  key={option}
                  option={option}
                  secteursSet={secteursSet}
                  setSecteurs={setSecteurs}
                  ref={index === 0 ? firstInputRef : null}
                  setDisplaySelect={setDisplaySelect}
                  focusField={focusField}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default SelectInputOptions;
