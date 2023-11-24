interface InputNumberProps {
  label: string;
  classes?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  color?: string;
  value: number;
}

const InputNumber: React.FC<InputNumberProps> = ({ label, classes, onChange, color, value }) => {
  return (
    <div className={`flex flex-col items-center lg:flex-row lg:mb-6 ${classes}`}>
      <div className="inputNumber mr-6 flex flex-col">
        <label className="mb-1 text-white text-base" htmlFor={label}>
          {label}
        </label>
        <input
          className={`text-white rounded-t-md w-64 addBorder-b border-3`}
          style={{ borderColor: color }}
          type="number"
          id={label}
          defaultValue={0}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default InputNumber;
