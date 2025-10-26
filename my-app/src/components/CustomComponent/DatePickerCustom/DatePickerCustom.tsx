import { useState, useRef, useEffect } from "react";
import "./DatePickerCustom.scss";

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  isDateTo?: boolean;
  isDefaultNone?: boolean;
  isDisabled?: boolean; // ✅ thêm mới
}

export default function DatePickerCustom({
  value,
  onChange,
  label,
  placeholder = "MM/DD/YYYY",
  minDate,
  maxDate,
  disablePast = false,
  disableFuture = false,
  isDateTo = false,
  isDefaultNone = false,
  isDisabled = false,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? value : isDefaultNone ? null : new Date()
  );

  useEffect(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      setSelectedDate(value);
    } else if (value === null) {
      setSelectedDate(null);
    }
  }, [value]);

  const [show, setShow] = useState(false);
  const [view, setView] = useState<"day" | "month" | "year">("day");
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const safeDate = selectedDate ?? new Date();
  const currentYear = safeDate.getFullYear();
  const currentMonth = safeDate.getMonth();
  const currentDay = safeDate.getDate();

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const handleDayClick = (day: number) => {
    if (isDisabled) return;
    const newDate = new Date(currentYear, currentMonth, day);
    if (isDateDisabled(newDate)) return;
    setSelectedDate(newDate);
    onChange?.(newDate);
    setShow(false);
  };

  const handlePrevMonth = () => {
    if (isDisabled) return;
    const prev = new Date(currentYear, currentMonth - 1, 1);
    setSelectedDate(prev);
  };

  const handleNextMonth = () => {
    if (isDisabled) return;
    const next = new Date(currentYear, currentMonth + 1, 1);
    setSelectedDate(next);
  };

  const handleMonthSelect = (month: number) => {
    if (isDisabled) return;
    const newDate = new Date(currentYear, month, currentDay);
    setSelectedDate(newDate);
    setView("day");
  };

  const handleYearSelect = (year: number) => {
    if (isDisabled) return;
    const newDate = new Date(year, currentMonth, currentDay);
    setSelectedDate(newDate);
    setView("month");
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target as Node)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const yearRange = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

  const handleTodayClick = () => {
    if (isDisabled) return;
    const today = new Date();
    if (isDateDisabled(today)) return;
    setSelectedDate(today);
    onChange?.(today);
    setShow(false);
  };

  const isDateDisabled = (date: Date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (minDate && normalizedDate < minDate) return true;
    if (maxDate && normalizedDate > maxDate) return true;

    if (disablePast && normalizedDate < today) return true;
    if (disableFuture && normalizedDate > today) return true;

    return false;
  };

  return (
    <div className="date-picker-container" ref={calendarRef}>
      {label && <label className="date-label">{label}</label>}

      <div
        className={`date-input ${show ? "active" : ""} ${
          isDisabled ? "disabled" : ""
        }`}
        onClick={() => {
          if (!isDisabled) setShow(!show);
        }}
      >
        {selectedDate ? selectedDate.toLocaleDateString("en-US") : placeholder}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400 pointer-events-none pl-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 
            00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
          />
        </svg>
      </div>

      {!isDisabled && (
        <div
          className={`calendar-popup ${
            isDateTo ? "calendar-popup-dateTo" : ""
          } ${show ? "open" : "close"}`}
        >
          <div className="calendar-header">
            <button type="button" onClick={handlePrevMonth}>
              &lt;
            </button>
            <div className="calendar-title">
              {view === "day" && (
                <>
                  <span onClick={() => setView("month")}>
                    {monthNames[currentMonth]}
                  </span>
                  <span onClick={() => setView("year")}>{currentYear}</span>
                </>
              )}
              {view === "month" && (
                <span onClick={() => setView("year")}>{currentYear}</span>
              )}
              {view === "year" && <span>Select Year</span>}
            </div>
            <button type="button" onClick={handleNextMonth}>
              &gt;
            </button>
          </div>

          {view === "day" && (
            <div className="calendar-grid">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                <div key={d} className="calendar-day-name">
                  {d}
                </div>
              ))}
              {Array.from({
                length: new Date(currentYear, currentMonth, 1).getDay(),
              }).map((_, i) => (
                <div key={`empty-${i}`} className="calendar-empty" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const dateObj = new Date(currentYear, currentMonth, day);
                const disabled = isDateDisabled(dateObj);

                return (
                  <div
                    key={day}
                    className={`calendar-day 
                    ${day === currentDay ? "selected" : ""} 
                    ${disabled ? "disabled" : ""}`}
                    onClick={() => !disabled && handleDayClick(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          )}

          {view === "month" && (
            <div className="calendar-grid month-grid">
              {monthNames.map((m, i) => (
                <div
                  key={m}
                  className={`calendar-month ${
                    i === currentMonth ? "selected" : ""
                  }`}
                  onClick={() => handleMonthSelect(i)}
                >
                  {m.slice(0, 3)}
                </div>
              ))}
            </div>
          )}

          {view === "year" && (
            <div className="calendar-grid year-grid">
              {yearRange.map(y => (
                <div
                  key={y}
                  className={`calendar-year ${
                    y === currentYear ? "selected" : ""
                  }`}
                  onClick={() => handleYearSelect(y)}
                >
                  {y}
                </div>
              ))}
            </div>
          )}

          <div className="calendar-footer">
            <button
              type="button"
              className="today-btn"
              onClick={handleTodayClick}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
