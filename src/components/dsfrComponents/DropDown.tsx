interface DropDownProps {
  borderColor: string;
  title: string;
  usedState: [string, (x: string) => void];
  values: Record<string, string>;
}
const DropDown: React.FC<DropDownProps> = ({ borderColor, title, usedState, values }) => {
  const [state, setState] = usedState;
  return (
    <div className="fr-select-group">
      <label className="mb-1 text-white text-base font-light" htmlFor="select-thematic">
        {title}
      </label>
      <select
        style={{ borderColor }}
        className={`fr-select mt-1 w-64 h-10 shadow-none addBorder-b border-3
                bg-input-background`}
        aria-describedby="select-error-desc-error"
        id="select-thematic"
        name="select-thematic"
        onChange={(e) => setState(e.target.value)}>
        {Object.entries(values).map(([key, value]) => {
          return (
            <option
              className="font-light text-md"
              value={key}
              selected={value === state}
              key={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
