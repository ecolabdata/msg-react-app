import { generateNumber } from '../../utils/utilityFunctions';
import classNames from 'classnames';

interface TextAreaInputProps {
  value: string;
  label: string;
  onValueChange: (value: string) => void;
  formId: string;
  errorText?: string;
  required?: boolean;
  className?: string;
  color?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  formId,
  label,
  value,
  errorText = '',
  required = false,
  onValueChange,
  className: classNameProp = '',
  color
}) => {
  const id = generateNumber(1, 1000);
  const inputId = `${formId}-${id}`;

  return (
    <>
      <label htmlFor={inputId} className="text-base fr-label">
        {label} {required && <span aria-hidden={true}>(obligatoire)</span>}
      </label>
      <textarea
        id={inputId}
        onChange={(e) => onValueChange(e.target.value)}
        value={value}
        form={formId}
        className={classNames(
          `cursor-text mt-2 w-full rounded-t-sm p-2 bg-background-inputs focus:border-1 focus:border-white focus:border-solid`,
          { [`addBorder-b border-3 border-[${color}]`]: !errorText },
          { 'addBorder border-1 border-red-500': errorText },
          classNameProp
        )}
        aria-invalid={!!errorText}
        aria-required={required}
        aria-describedby={errorText ? `${inputId}-error` : undefined}
      />
      {errorText && (
        <div
          className={`errorContainer ${errorText.length <= 0 && 'hidden'} 
        h-12 flex justify-center items-center color`}
          id={`${inputId}-error`}
          aria-live="polite">
          <p style={{ color: 'hsla(0, 100%, 65%, 0.9)' }}>{errorText}</p>
        </div>
      )}
    </>
  );
};
export default TextAreaInput;
