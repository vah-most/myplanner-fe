import AppDatePicker from "./AppDatePicker";
import AppTagCollection from "./AppTagCollection";

import "./AppTitledInput.scss";

const AppTitledInput = ({
  className,
  onChange,
  placeholder,
  style,
  type,
  value = "",
  ...extra
}) => {
  const getInputComponent = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            className="titledInput"
            onChange={(e) => {
              if (!e.currentTarget) return;
              const { value } = e.currentTarget;
              onChange && onChange(value);
            }}
            placeholder={placeholder}
            style={style}
            value={value}
            {...extra}
          />
        );

      case "date":
        return (
          <AppDatePicker
            className="titledInput"
            onChange={(value) => {
              onChange && onChange(value);
            }}
            placeholder={placeholder}
            style={style}
            value={value}
            {...extra}
          />
        );

      case "tag":
        return (
          <AppTagCollection
            className="titledInput"
            collection={value} //TODO: `Collection` should contain all existing groups
            onChange={(value) => {
              onChange && onChange(value);
            }}
            style={style}
            tags={value}
            {...extra}
          />
        );

      case "input":
      default:
        return (
          <input
            className="titledInput"
            onChange={(e) => {
              if (!e.currentTarget) return;
              const { value } = e.currentTarget;
              onChange && onChange(value);
            }}
            placeholder={placeholder}
            style={style}
            type={type}
            value={value}
            {...extra}
          />
        );
    }
  };
  return (
    <div className={`titledInputParentContainer ${className}`}>
      <span
        className="titledInputLabel"
        style={{
          display: value ? "unset" : "none",
        }}
      >
        {placeholder}
      </span>
      <div className="titledInputContainer">{getInputComponent()}</div>
    </div>
  );
};

export default AppTitledInput;