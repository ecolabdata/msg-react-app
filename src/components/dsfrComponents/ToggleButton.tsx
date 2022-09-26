interface ToggleButtonProps {
  label: string;
  checked: boolean;
  color: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, checked, color, onChange }) => {
  const style = {
    '--text-active-blue-france': color,
    '--border-action-high-blue-france': color
  } as React.CSSProperties;
  const inputStyle = checked ? { backgroundColor: color } : {};

  return (
    <>
      <div className="fr-toggle h-10" style={style}>
        <input
          className=""
          onChange={onChange}
          checked={checked}
          type="checkbox"
          style={inputStyle}
          aria-describedby="toggle-698-hint-text"
          id={label}
        />
        <label
          className="fr-toggle__label text-white text-base
                "
          htmlFor={label}
          data-fr-checked-label=""
          data-fr-unchecked-label=""
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default ToggleButton;
