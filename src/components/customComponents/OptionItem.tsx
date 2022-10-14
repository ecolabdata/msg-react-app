import React from 'react';

interface OptionItemProps {
  option: string;
  secteursSet: Set<string>;
  setSecteurs: (value: React.SetStateAction<string[]>) => void;
  setDisplaySelect: React.Dispatch<React.SetStateAction<boolean>>;
  focusField: () => void;
}

const OptionItem = React.forwardRef<HTMLInputElement, OptionItemProps>(
  ({ option, secteursSet, setSecteurs, setDisplaySelect, focusField }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        focusField();
      }

      if (e.key === 'Escape') {
        setDisplaySelect(false);
        focusField();
      }
    };

    return (
      <li className="flex content-center items-center" key={option}>
        <input
          className="appearance-on addBorder border text-black border-black  mx-4"
          id={option}
          type="checkbox"
          value={option}
          ref={ref}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            if (e.target.checked) {
              secteursSet.add(option);
            } else {
              secteursSet.delete(option);
            }
            setSecteurs(Array.from(secteursSet));
          }}
          checked={secteursSet.has(option)}
        />
        <label className="capitalize h-12 flex items-center" htmlFor={option}>
          {option}
        </label>
      </li>
    );
  }
);

export default OptionItem;
