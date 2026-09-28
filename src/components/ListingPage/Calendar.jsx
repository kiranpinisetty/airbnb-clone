import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';
import './Calendar.css';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isDateUnavailable(year, month, day) {
  // Any date before 1 Oct 2026 (month is 0-indexed: 9 = Oct)
  if (year < 2026) return true;
  if (year === 2026 && month < 9) return true;
  // November 2026 (month 10): 18-24 and 29-30
  if (year === 2026 && month === 10) {
    if (day >= 18 && day <= 24) return true;
    if (day >= 29 && day <= 30) return true;
  }
  return false;
}

function hasUnavailableInRange(start, end) {
  if (!start || !end) return false;
  const current = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
  const target = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  while (current < target) {
    if (isDateUnavailable(current.getFullYear(), current.getMonth(), current.getDate())) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }
  return false;
}

function formatDateHeader(d) {
  if (!d) return '';
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatDateKey(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export default function Calendar({ checkIn, checkOut, onDatesChange }) {
  // Default to October 2026
  const [viewMonth, setViewMonth] = useState(() => new Date(2026, 9, 1));
  const [hoverDate, setHoverDate] = useState(null);
  const [userFocusedDate, setUserFocusedDate] = useState(null);
  const focusedDate = useMemo(
    () => userFocusedDate || checkIn || new Date(2026, 9, 18),
    [userFocusedDate, checkIn]
  );

  const dayRefs = useRef({});

  // Month 1 and Month 2
  const month1Date = viewMonth;
  const month2Date = useMemo(
    () => new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1),
    [viewMonth]
  );

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(
      0,
      Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    );
  }, [checkIn, checkOut]);

  // Focus day element when focusedDate changes via keyboard
  useEffect(() => {
    if (!focusedDate) return;
    const key = formatDateKey(focusedDate);
    const el = dayRefs.current[key];
    if (
      el &&
      document.activeElement &&
      document.activeElement.classList.contains('calendar-day-btn')
    ) {
      el.focus();
    }
  }, [focusedDate]);

  const handlePrevMonth = () => {
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const isPrevDisabled =
    viewMonth.getFullYear() === 2026 && viewMonth.getMonth() <= 9;

  const handleDateClick = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    if (isDateUnavailable(y, m, d)) return;

    if (!checkIn || (checkIn && checkOut)) {
      // First click: sets check-in and clears check-out
      onDatesChange(date, null);
    } else if (checkIn && !checkOut) {
      // Second click: sets check-out if later than check-in and no unavailable days in range
      if (date > checkIn && !hasUnavailableInRange(checkIn, date)) {
        onDatesChange(checkIn, date);
      } else {
        // Otherwise becomes new check-in
        onDatesChange(date, null);
      }
    }
  };

  const handleClearDates = () => {
    onDatesChange(null, null);
    setHoverDate(null);
    setUserFocusedDate(null);
  };

  const handleDayKeyDown = (e, date, isUnavailable) => {
    let nextDate = null;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() - 7);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      nextDate = new Date(date);
      nextDate.setMonth(nextDate.getMonth() - 1);
      setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      nextDate = new Date(date);
      nextDate.setMonth(nextDate.getMonth() + 1);
      setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isUnavailable) {
        handleDateClick(date);
      }
      return;
    }

    if (nextDate) {
      setUserFocusedDate(nextDate);
      const m1 = viewMonth.getFullYear() * 12 + viewMonth.getMonth();
      const nextM = nextDate.getFullYear() * 12 + nextDate.getMonth();
      if (nextM < m1) {
        setViewMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
      } else if (nextM > m1 + 1) {
        setViewMonth(new Date(nextDate.getFullYear(), nextDate.getMonth() - 1, 1));
      }
    }
  };

  // Render a single month
  const renderMonth = (monthDate, isFirstMonth) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun

    const cells = [];

    // Empty placeholder cells
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(
        <div
          key={`empty-${year}-${month}-${i}`}
          className="calendar-cell-empty"
          aria-hidden="true"
        />
      );
    }

    // Days in month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateKey = formatDateKey(date);
      const dayOfWeek = (firstDayOfWeek + d - 1) % 7;
      const isUnavailable = isDateUnavailable(year, month, d);

      const isSelectedStart = isSameDay(date, checkIn);
      const isSelectedEnd = isSameDay(date, checkOut);
      const isInSelectedRange =
        Boolean(checkIn && checkOut && date > checkIn && date < checkOut);

      // Hover preview band
      const isHoveringLater =
        Boolean(checkIn &&
        !checkOut &&
        hoverDate &&
        hoverDate > checkIn &&
        !hasUnavailableInRange(checkIn, hoverDate));
      const isInPreviewRange =
        Boolean(isHoveringLater && date > checkIn && date < hoverDate);
      const isPreviewEnd =
        Boolean(isHoveringLater && isSameDay(date, hoverDate));

      const inRange = isInSelectedRange || isInPreviewRange;
      const isStart =
        isSelectedStart &&
        Boolean(checkOut || (isHoveringLater && hoverDate > checkIn));
      const isEnd = isSelectedEnd || isPreviewEnd;

      // Band rounding
      const isRowStart = dayOfWeek === 0 || d === 1;
      const isRowEnd = dayOfWeek === 6 || d === daysInMonth;

      // Accessibility label
      const statusText = isUnavailable
        ? 'unavailable'
        : isSelectedStart
        ? 'selected check-in date'
        : isSelectedEnd
        ? 'selected checkout date'
        : inRange
        ? 'selected'
        : 'available';
      const accessibleName = `${d} ${MONTH_NAMES[month]} ${year}, ${statusText}`;

      const isFocused = isSameDay(date, focusedDate);

      cells.push(
        <div key={dateKey} className="calendar-cell">
          {/* Continuous range band */}
          {inRange && (
            <div
              className={`calendar-range-band ${
                isRowStart ? 'calendar-range-band-rounded-left' : ''
              } ${isRowEnd ? 'calendar-range-band-rounded-right' : ''}`}
            />
          )}

          {/* Half bands for start and end dates */}
          {isStart && !isRowEnd && (
            <div className="calendar-range-band calendar-range-band-start" />
          )}
          {isEnd && !isRowStart && (
            <div className="calendar-range-band calendar-range-band-end" />
          )}

          <button
            ref={(el) => {
              dayRefs.current[dateKey] = el;
            }}
            type="button"
            className={`calendar-day-btn ${
              isUnavailable ? 'calendar-day-unavailable' : ''
            } ${
              isSelectedStart || isSelectedEnd ? 'calendar-day-selected' : ''
            } ${isPreviewEnd ? 'calendar-day-preview-end' : ''}`}
            onClick={() => handleDateClick(date)}
            onMouseEnter={() => {
              if (checkIn && !checkOut) {
                setHoverDate(date);
              }
            }}
            onMouseLeave={() => {
              if (checkIn && !checkOut) {
                setHoverDate(null);
              }
            }}
            onKeyDown={(e) => handleDayKeyDown(e, date, isUnavailable)}
            tabIndex={isFocused ? 0 : -1}
            aria-disabled={isUnavailable ? 'true' : undefined}
            aria-label={accessibleName}
          >
            {d}
          </button>
        </div>
      );
    }

    return (
      <div className="calendar-month">
        <div className="calendar-month-header">
          {isFirstMonth ? (
            <button
              type="button"
              className="calendar-nav-btn"
              onClick={handlePrevMonth}
              disabled={isPrevDisabled}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          ) : (
            <div className="calendar-nav-spacer" aria-hidden="true" />
          )}

          <h3 className="calendar-month-title">
            {`${MONTH_NAMES[month]} ${year}`}
          </h3>

          {!isFirstMonth ? (
            <button
              type="button"
              className="calendar-nav-btn"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          ) : (
            <div className="calendar-nav-spacer" aria-hidden="true" />
          )}
        </div>

        <div className="calendar-weekdays" aria-hidden="true">
          {WEEKDAYS.map((wd, i) => (
            <span key={i} className="calendar-weekday">
              {wd}
            </span>
          ))}
        </div>

        <div className="calendar-days-grid">{cells}</div>
      </div>
    );
  };

  // Header texts
  let headerTitle = 'Select check-in date';
  let headerRange = 'Add your travel dates for exact pricing';

  if (nights > 0 && checkIn && checkOut) {
    headerTitle = `${nights} ${nights === 1 ? 'night' : 'nights'} in Candolim`;
    headerRange = `${formatDateHeader(checkIn)} - ${formatDateHeader(checkOut)}`;
  } else if (checkIn && !checkOut) {
    headerTitle = 'Select checkout date';
    headerRange = `Minimum stay: 1 night`;
  }

  return (
    <section className="calendar-section" aria-labelledby="calendar-heading">
      <div className="calendar-header">
        <h2 id="calendar-heading" className="calendar-header-title">
          {headerTitle}
        </h2>
        <p className="calendar-header-range">{headerRange}</p>
      </div>

      <div className="calendar-months-container">
        {renderMonth(month1Date, true)}
        {renderMonth(month2Date, false)}
      </div>

      <div className="calendar-bottom-row">
        <button
          type="button"
          className="calendar-keyboard-btn"
          aria-label="Keyboard shortcuts"
        >
          <Keyboard size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="calendar-clear-dates-btn"
          onClick={handleClearDates}
        >
          Clear dates
        </button>
      </div>
    </section>
  );
}
