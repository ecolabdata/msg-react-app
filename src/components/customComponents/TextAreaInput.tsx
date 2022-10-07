import { classNames, generateNumber } from '../../utils/various';

interface TextAreaInputProps {
  value: string;
  label: string;
  errorText: string;
  onValueChange: (value: string) => void;
  formId: string;
  required?: boolean;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  formId,
  label,
  value,
  errorText = '',
  required = false,
  onValueChange
}) => {
  const id = generateNumber(1, 1000);
  const inputId = `${formId}-${id}`;

  return (
    <>
      <label htmlFor={inputId} className="text-base">
        {label} {required && <span aria-hidden={true}>*</span>}
      </label>
      <textarea
        id={inputId}
        onChange={(e) => onValueChange(e.target.value)}
        value={value}
        form="keywordsForm"
        className={classNames(
          'mt-2 w-full rounded-t-sm  p-2 bg-background-inputs lg:min-h-[212px]',
          !errorText ? 'addBorder-b border-3 border-white' : 'addBorder border-1 border-red-500'
        )}
        aria-invalid={!!errorText}
        aria-required={required}
        aria-describedby={errorText ? `${inputId}-error` : undefined}
      />
      {errorText && (
        <div
          className="h-12 w-full flex justify-center items-center color"
          id={`${inputId}-error`}
          aria-live="polite">
          <p style={{ color: 'hsla(0, 100%, 65%, 0.9)' }}>{errorText}</p>
        </div>
      )}
    </>
  );
};
export default TextAreaInput;
