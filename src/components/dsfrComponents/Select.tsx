interface SelectProps {
  optionsData: string[];
  label: string;
  classes: string;
  selectClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  color?: string;
  defaultOption?: string;
  selected?: string;
}

const Select: React.FC<SelectProps> = ({
  optionsData,
  label,
  classes,
  onChange,
  color,
  defaultOption,
  selected,
  selectClassName
}) => {
  let style = {};
  if (color) style = { boxShadow: `inset 0 -2px 0 0 ${color}` };
  return (
    <div className={`${classes}`}>
      <label className="fr-label capitalize" htmlFor={`select-${label}`}>
        {label}
      </label>
      <select
        className={`fr-select ${selectClassName}`}
        onChange={onChange}
        style={style}
        id={`select-${label}`}
        value={selected || ''}>
        <option
          value=""
          disabled={!defaultOption}
          hidden={!defaultOption}>
          {defaultOption || 'Selectionnez une option'}
        </option>
        {optionsData.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
