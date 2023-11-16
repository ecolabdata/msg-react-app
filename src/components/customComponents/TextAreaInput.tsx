import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { tailwindColorUtility } from '../../utils/utilityFunctions';

interface TextAreaInputProps {
  value: string;
  label: string;
  onValueChange: (value: string) => void;
  formId: string;
  required?: boolean;
  className?: string;
  color?: string;
  error?: boolean;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  formId,
  label,
  value,
  required = false,
  onValueChange,
  className: classNameProp = '',
  color,
  error
}) => {
  const MIN_HEIGHT = 50;
  const inputId = `${formId}-${label}`;

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

  const borderColor = color && tailwindColorUtility[color].border;

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
          { [`addBorder-b border-3`]: !error },
          { 'addBorder border-2 border-red-marianne-625-hover': error },
          classNameProp
        )}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <div
          className={`errorContainer ${!error && 'hidden'} 
        h-12 flex justify-center items-center color`}
          id={`${inputId}-error`}
          aria-live="polite">
          <p className="text-red-marianne-625-hover">Ce champs est obligatoire</p>
        </div>
      )}
    </div>
  );
};
export default TextAreaInput;
