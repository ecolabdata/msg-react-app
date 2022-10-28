import { generateNumber, tailwindColorUtility } from '../../utils/utilityFunctions';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

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
  const MIN_HEIGHT = 50;
  const inputId = `${formId}-${id}`;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState(`${MIN_HEIGHT}px`);
  const [parentHeight, setParentHeight] = useState(`${MIN_HEIGHT}px`);

  useEffect(() => {
    if (textAreaRef.current && textAreaRef.current?.scrollHeight > MIN_HEIGHT) {
      setParentHeight(`${textAreaRef.current?.scrollHeight + 10}px`);
      setTextAreaHeight(`${textAreaRef.current?.scrollHeight + 10}px`);
    }
  }, [text]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight('auto');
    if (textAreaRef.current && textAreaRef.current?.scrollHeight > MIN_HEIGHT) {
      setParentHeight(`${textAreaRef.current?.scrollHeight + 10}px`);
    }
    setText(event.target.value);
    onValueChange && onValueChange(event.target.value);
  };

  const borderColor = color && tailwindColorUtility.border[color];

  return (
    <div
      style={{
        minHeight: parentHeight
      }}>
      <label htmlFor={inputId} className="text-base fr-label">
        {label} {required && <span aria-hidden={true}>(obligatoire)</span>}
      </label>
      <textarea
        id={inputId}
        ref={textAreaRef}
        onChange={handleChange}
        style={{
          height: textAreaHeight
        }}
        value={value}
        form={formId}
        className={classNames(
          `cursor-text mt-2 w-full rounded-t-sm p-2 bg-background-inputs ${borderColor}`,
          { [`addBorder-b border-3`]: !errorText },
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
    </div>
  );
};
export default TextAreaInput;
