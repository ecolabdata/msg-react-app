import { SetStateAction, useEffect, useRef, useState } from 'react';
import Chevron from './../../assets/icons/chevronWhite.svg';
import ChevronBlack from './../../assets/icons/chevronBlack.svg';
import OptionItem from './OptionItem';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { tailwindColorUtility } from '../../utils/utilityFunctions';
import { ThematicsEnum } from 'model/ThematicsEnum';
import classNames from 'classnames';

interface SelectInputOptionsProps {
  optionsData: string[];
  secteurs: ThematicsEnum[];
  className?: string;
  setSecteurs: (value: ThematicsEnum[]) => void;
  color?: string;
  error?: boolean;
  required?: boolean;
}

const SelectInputOptions: React.FC<SelectInputOptionsProps> = ({
  optionsData,
  secteurs,
  setSecteurs,
  className,
  color,
  error,
  required = false
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

  const borderColor = color && tailwindColorUtility[color].border;

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <label className="fr-label" htmlFor="select-container">
        {`Thématiques ${required ? '(obligatoire)' : ''}`}
      </label>
      <button
        aria-multiselectable={true}
        aria-label="Thématiques"
        aria-expanded={displaySelect}
        ref={buttonRef}
        type="button"
        onKeyDown={handleKeyDown}
        role="combobox"
        className={classNames(
          `mt-2 w-full h-10 min-h-[50px] addBorder-b border-3 ${borderColor} p-2 pt-3 flex ${
            localStorage.getItem('scheme') === 'dark' ? 'bg-input-background' : 'bg-slate-50'
          }`,
          { [`addBorder-b border-3`]: !error },
          { 'addBorder border-2 border-red-marianne-625-hover': error }
        )}
        onClick={() => {
          setDisplaySelect(!displaySelect);
        }}>
        <p className="flex-1 overflow-hidden text-left max-w-full h-full">
          {secteurs.length <= 0 ? 'Sélectionnez une option' : secteurs.join(', ')}
        </p>
        <span
          className={`${
            localStorage.getItem('scheme') === 'dark' ? 'bg-dark-text-action' : 'bg-blue-france'
          } w-6 h-6 rounded-full  ${
            localStorage.getItem('scheme') === 'dark' && 'text-black'
          } font-bold`}>
          {' '}
          {secteurs.length}{' '}
        </span>
        <img
          className={`${displaySelect ? 'rotate-90' : ''} h-5 w-5 m-0.5`}
          src={localStorage.scheme === 'dark' ? Chevron : ChevronBlack}
          aria-hidden="true"
        />
      </button>
      {error && (
        <div
          className={`errorContainer ${!error && 'hidden'} 
        h-12 flex justify-center items-center color`}
          aria-live="polite">
          <p className="text-red-marianne-625-hover">Ce champs est obligatoire</p>
        </div>
      )}
      {displaySelect && (
        <>
          <ul
            className={`z-10 absolute w-full max-h-[320px] overflow-auto flex flex-col ${
              localStorage.getItem('scheme') === 'dark' ? 'bg-input-background' : 'bg-slate-50'
            }  shadow-slate-400 shadow-sm`}>
            {optionsData.map((option, index) => {
              return (
                <OptionItem
                  key={option}
                  option={option}
                  secteursSet={secteursSet}
                  setSecteurs={setSecteurs as (value: SetStateAction<string[]>) => void}
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
