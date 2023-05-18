import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";
import { HostEaseHandlerFunction } from "../../Types/Types";

interface CustomDatePickerProps {
  onChangeStart?: HostEaseHandlerFunction;
  onChangeEnd?: HostEaseHandlerFunction;
  className?: string;
  nameStart: string;
  nameEnd: string;
  valueStart?: string;
  valueEnd?: string;
  required: boolean;
  type?: "time" | "date";
  theme?: "light" | "dark";
}

const CustomDatePicker = ({
  nameStart,
  nameEnd,
  onChangeStart,
  onChangeEnd,
  type = "date",
  theme = "light",
  valueStart,
  valueEnd,
  required = false
}: CustomDatePickerProps) => {
  const currentDate = new Date();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const formatHour = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formattedCurrentDate = formatDate(currentDate.toISOString());

  const initialStartHour = formatHour(currentDate);
  const initialEndHour = formatHour(
    new Date(currentDate.getTime() + 60 * 60 * 1000)
  );
  
  const [startHour, setStartHour] = useState<string>(
    valueStart ? valueStart : initialStartHour
  );
  const [endHour, setEndHour] = useState<string>(
    valueEnd ? valueEnd : initialEndHour
  );

  const [startDate, setStartDate] = useState<Date | null>(currentDate);
  const [endDate, setEndDate] = useState<Date | null>(startDate);

  const [endEnabled, setEndEnabled] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const handleStartChange = (data: any) => {
    if (type === "date") {
      const formattedDate = formatDate(data.toISOString());
      setStartDate(data);
      if (onChangeStart) {
        onChangeStart(formattedDate, nameStart);
      }
      if (!endEnabled) {
        setEndDate(data);
        onChangeEnd && onChangeEnd(formattedDate, nameEnd);
      }
    } else if (type === "time") {
      setStartHour(data);
      if (onChangeStart) {
        onChangeStart(data, nameStart);
      }
      if (!endEnabled) {
        const startTime = new Date(`1970-01-01T${data}`);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        const formattedEndTime = formatHour(endTime);
        setEndHour(formattedEndTime);
        onChangeEnd && onChangeEnd(formattedEndTime, nameEnd);
      }
    }
  };

  const handleEndChange = (data: any) => {
    setEndEnabled(true);
    if (type === "date") {
      setEndDate(data);
      if (onChangeEnd) {
        const formattedDate = formatDate(data.toISOString());
        onChangeStart &&
          startDate &&
          onChangeStart(formatDate(startDate.toISOString()), nameStart);
        onChangeEnd(formattedDate, nameEnd);
      }
    } else if (type === "time") {
      setEndHour(data);
      if (onChangeEnd) {
        onChangeStart && startHour && onChangeStart(startHour, nameStart);
        onChangeEnd(data, nameEnd);
      }
    }
  };

  const handleDefaultButtonClick = () => {
    const currentDate = new Date();
    if (!isBlocked) {
      if (type === "date") {
        if (onChangeStart) {
          onChangeStart(formattedCurrentDate, nameStart);
          setStartDate(currentDate);
        }
        if (onChangeEnd) {
          onChangeEnd(formattedCurrentDate, nameEnd);
          setEndDate(currentDate);
          setEndEnabled(false);
        }
      } else if (type === "time") {
        if (onChangeStart) {
          onChangeStart(initialStartHour, nameStart);
          setStartHour(initialStartHour);
        }
        if (onChangeEnd) {
          onChangeEnd(initialEndHour, nameEnd);
          setEndHour(initialEndHour);
          setEndEnabled(false);
        }
      }
    }
  };

  const handleBlockButtonClick = () => {
    setIsBlocked((prevState) => !prevState);
  };

  return (
    <div
      className={`datepicker-container ${
        isBlocked ? "blocked" : ""
      } ${theme}-datepicker`}
    >
      <div className="datepicker-row">
        <div className={`datepicker-column ${theme}-datepicker`}>
          <label className="datepicker-label">
            {type === "time" ? "Start Hour:" : "Start Date:"}
          </label>
          {type === "time" ? (
            <input
              type="time"
              onChange={(e) => handleStartChange(e.target.value)}
              className="datepicker-input"
              disabled={isBlocked}
              name={nameStart}
              value={startHour}
              required={required}
            />
          ) : (
            <DatePicker
              selected={startDate}
              onChange={handleStartChange}
              dateFormat="dd/MM/yyyy"
              className="datepicker-input"
              disabled={isBlocked}
              name={nameStart}
              value={valueStart}
              required={required}
            />
          )}
        </div>
        {type === "time" ? (
          <div className={`datepicker-column ${theme}-datepicker`}>
            <label className="datepicker-label">End Hour:</label>
            <input
              type="time"
              onChange={(e) => handleEndChange(e.target.value)}
              className="datepicker-input"
              disabled={isBlocked}
              name={nameEnd}
              value={endHour}
              required={required}
            />
          </div>
        ) : (
          <div className={`datepicker-column ${theme}-datepicker`}>
            <label className="datepicker-label">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndChange}
              dateFormat="dd/MM/yyyy"
              className="datepicker-input"
              disabled={isBlocked}
              name={nameEnd}
              value={valueEnd}
              required={required}
            />
          </div>
        )}
      </div>
      <div className={`datepicker-row button-panel ${theme}-datepicker`}>
        <button
          type="button"
          onClick={handleDefaultButtonClick}
          className="datepicker-button"
          disabled={isBlocked}
        >
          Default
        </button>
        <button
          type="button"
          onClick={handleBlockButtonClick}
          className={`datepicker-button ${
            isBlocked ? "blocked" : ""
          } ${theme}-datepicker`}
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    </div>
  );
};

export default CustomDatePicker;
