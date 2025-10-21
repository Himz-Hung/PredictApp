import { useState, useRef, useEffect } from "react";
import "./CustomSelectField.scss";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectFieldProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string | number | null;
  onChange?: (value: string | number) => void;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
}

export default function CustomSelectField({
  label,
  placeholder = "Select...",
  options,
  value,
  onChange,
  width = "100%",
  height = "36px",
  disabled = false,
}: CustomSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  // 🔥 fix: so sánh linh hoạt, tránh lỗi khi kiểu dữ liệu khác nhau
  const selectedOption = options.find(
    (opt) => String(opt.value) === String(value)
  );

  const handleOptionClick = (val: string | number) => {
    onChange?.(val);
    setOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      className={`select-container ${disabled ? "disabled" : ""}`}
      ref={selectRef}
      style={{ width }}
    >
      {label && <label className="select-label">{label}</label>}

      <div
        className={`select-box ${open ? "active" : ""}`}
        onClick={() => !disabled && setOpen(!open)}
        style={{ height }}
      >
        <span
          className={`select-text ${!selectedOption ? "placeholder" : ""}`}
          title={selectedOption ? selectedOption.label : ""}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className={`select-dropdown ${open ? "open" : "close"}`}>
        {options.length > 0 ? (
          options.map((opt) => (
            <div
              key={opt.value}
              className={`select-option ${
                String(opt.value) === String(value) ? "selected" : ""
              }`}
              title={opt.label}
              onClick={() => handleOptionClick(opt.value)}
            >
              {opt.label}
            </div>
          ))
        ) : (
          <div className="select-option empty">No options</div>
        )}
      </div>
    </div>
  );
}
