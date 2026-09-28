import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function parseDate(value) {
    if (!value) {
        return new Date();
    }

    const [year, month, day] =
        value.split("-").map(Number);

    return new Date(
        year,
        month - 1,
        day
    );
}

function isSameDate(first, second) {
    return (
        first.getFullYear() ===
            second.getFullYear() &&
        first.getMonth() ===
            second.getMonth() &&
        first.getDate() ===
            second.getDate()
    );
}

function getCalendarDays(year, month) {
    const firstDay = new Date(
        year,
        month,
        1
    );

    const startDay = firstDay.getDay();

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const previousMonthDays = new Date(
        year,
        month,
        0
    ).getDate();

    const days = [];

    for (
        let i = startDay - 1;
        i >= 0;
        i--
    ) {
        days.push({
            date: new Date(
                year,
                month - 1,
                previousMonthDays - i
            ),
            currentMonth: false
        });
    }

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {
        days.push({
            date: new Date(
                year,
                month,
                day
            ),
            currentMonth: true
        });
    }

    let nextDay = 1;

    while (days.length < 42) {
        days.push({
            date: new Date(
                year,
                month + 1,
                nextDay
            ),
            currentMonth: false
        });

        nextDay++;
    }

    return days;
}

function DatePicker({
    value,
    onChange,
    label = "Date"
}) {
    const [open, setOpen] =
        useState(false);

    const [view, setView] =
        useState("days");

    const [viewDate, setViewDate] =
        useState(() =>
            parseDate(value)
        );

    const [popupPosition, setPopupPosition] =
        useState({
            top: 0,
            left: 0
        });

    const wrapperRef = useRef(null);
    const buttonRef = useRef(null);

    const selectedDate =
        parseDate(value);

    const today = new Date();

    const year =
        viewDate.getFullYear();

    const month =
        viewDate.getMonth();

    const months = [
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
        "December"
    ];

    const updatePopupPosition = () => {
        if (!buttonRef.current) {
            return;
        }

        const rect =
            buttonRef.current.getBoundingClientRect();

        const popupWidth = 320;
        const popupHeight = 400;
        const gap = 8;

        let left = rect.left;

        if (
            left + popupWidth >
            window.innerWidth - 12
        ) {
            left =
                window.innerWidth -
                popupWidth -
                12;
        }

        if (left < 12) {
            left = 12;
        }

        let top =
            rect.bottom + gap;

        if (
            top + popupHeight >
            window.innerHeight - 12
        ) {
            top =
                rect.top -
                popupHeight -
                gap;
        }

        if (top < 12) {
            top = 12;
        }

        setPopupPosition({
            top,
            left
        });
    };

    useEffect(() => {
        const handleOutsideClick =
            (event) => {
                if (
                    wrapperRef.current &&
                    wrapperRef.current.contains(
                        event.target
                    )
                ) {
                    return;
                }

                const popup =
                    document.getElementById(
                        "ems-date-picker-popup"
                    );

                if (
                    popup &&
                    popup.contains(
                        event.target
                    )
                ) {
                    return;
                }

                setOpen(false);
            };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    useEffect(() => {
        if (!open) {
            return;
        }

        updatePopupPosition();

        window.addEventListener(
            "resize",
            updatePopupPosition
        );

        window.addEventListener(
            "scroll",
            updatePopupPosition,
            true
        );

        return () => {
            window.removeEventListener(
                "resize",
                updatePopupPosition
            );

            window.removeEventListener(
                "scroll",
                updatePopupPosition,
                true
            );
        };
    }, [open, view]);

    const handleOpen = () => {
        setViewDate(parseDate(value));
        setView("days");
        setOpen(true);

        setTimeout(() => {
            updatePopupPosition();
        }, 0);
    };

    const handleDateSelect = (date) => {
        onChange(formatDate(date));
        setViewDate(date);
        setView("days");
        setOpen(false);
    };

    const handlePreviousMonth = () => {
        setViewDate(
            new Date(
                year,
                month - 1,
                1
            )
        );
    };

    const handleNextMonth = () => {
        setViewDate(
            new Date(
                year,
                month + 1,
                1
            )
        );
    };

    const handlePreviousYearRange = () => {
        setViewDate(
            new Date(
                year - 12,
                month,
                1
            )
        );
    };

    const handleNextYearRange = () => {
        setViewDate(
            new Date(
                year + 12,
                month,
                1
            )
        );
    };

    const handleToday = () => {
        const todayDate = new Date();

        onChange(
            formatDate(todayDate)
        );

        setViewDate(todayDate);
        setView("days");
        setOpen(false);
    };

    const handleClear = () => {
        onChange("");
        setView("days");
        setOpen(false);
    };

    const calendarDays =
        getCalendarDays(
            year,
            month
        );

    const startYear =
        Math.floor(year / 12) * 12;

    const years = Array.from(
        { length: 12 },
        (_, index) =>
            startYear + index
    );

    const popup = open
        ? createPortal(
              <div
                  id="ems-date-picker-popup"
                  style={{
                      position: "fixed",
                      top: `${popupPosition.top}px`,
                      left: `${popupPosition.left}px`,
                      width: "320px",
                      minHeight: "380px",
                      padding: "16px",
                      backgroundColor:
                          "#FFFFFF",
                      opacity: 1,
                      border:
                          "1px solid #CBD5E1",
                      borderRadius: "12px",
                      boxShadow:
                          "0 16px 40px rgba(15, 23, 42, 0.25)",
                      zIndex: 2147483647,
                      boxSizing:
                          "border-box",
                      color: "#1F2937",
                      isolation:
                          "isolate"
                  }}
              >
                  {/* ======================
                      DAYS VIEW
                  ====================== */}

                  {view === "days" && (
                      <>
                          <div
                              style={{
                                  display:
                                      "flex",
                                  alignItems:
                                      "center",
                                  justifyContent:
                                      "space-between",
                                  marginBottom:
                                      "12px"
                              }}
                          >
                              <button
                                  type="button"
                                  onClick={
                                      handlePreviousMonth
                                  }
                                  style={{
                                      width:
                                          "34px",
                                      height:
                                          "34px",
                                      border:
                                          "none",
                                      borderRadius:
                                          "7px",
                                      backgroundColor:
                                          "#FFFFFF",
                                      color:
                                          "#1F2937",
                                      cursor:
                                          "pointer",
                                      display:
                                          "flex",
                                      alignItems:
                                          "center",
                                      justifyContent:
                                          "center"
                                  }}
                              >
                                  <ChevronLeft
                                      size={18}
                                  />
                              </button>

                              <div
                                  style={{
                                      display:
                                          "flex",
                                      alignItems:
                                          "center",
                                      gap:
                                          "2px"
                                  }}
                              >
                                  <button
                                      type="button"
                                      onClick={() =>
                                          setView(
                                              "months"
                                          )
                                      }
                                      style={{
                                          border:
                                              "none",
                                          backgroundColor:
                                              "#FFFFFF",
                                          color:
                                              "#1F2937",
                                          cursor:
                                              "pointer",
                                          fontFamily:
                                              "inherit",
                                          fontSize:
                                              "14px",
                                          fontWeight:
                                              700,
                                          padding:
                                              "5px 4px",
                                          borderRadius:
                                              "6px"
                                      }}
                                  >
                                      {
                                          months[
                                              month
                                          ]
                                      }
                                  </button>

                                  <button
                                      type="button"
                                      onClick={() =>
                                          setView(
                                              "years"
                                          )
                                      }
                                      style={{
                                          border:
                                              "none",
                                          backgroundColor:
                                              "#FFFFFF",
                                          color:
                                              "#1F2937",
                                          cursor:
                                              "pointer",
                                          fontFamily:
                                              "inherit",
                                          fontSize:
                                              "14px",
                                          fontWeight:
                                              700,
                                          padding:
                                              "5px 4px",
                                          borderRadius:
                                              "6px"
                                      }}
                                  >
                                      {year}
                                  </button>
                              </div>

                              <button
                                  type="button"
                                  onClick={
                                      handleNextMonth
                                  }
                                  style={{
                                      width:
                                          "34px",
                                      height:
                                          "34px",
                                      border:
                                          "none",
                                      borderRadius:
                                          "7px",
                                      backgroundColor:
                                          "#FFFFFF",
                                      color:
                                          "#1F2937",
                                      cursor:
                                          "pointer",
                                      display:
                                          "flex",
                                      alignItems:
                                          "center",
                                      justifyContent:
                                          "center"
                                  }}
                              >
                                  <ChevronRight
                                      size={18}
                                  />
                              </button>
                          </div>

                          <div
                              style={{
                                  display:
                                      "grid",
                                  gridTemplateColumns:
                                      "repeat(7, 1fr)",
                                  marginBottom:
                                      "4px"
                              }}
                          >
                              {[
                                  "Su",
                                  "Mo",
                                  "Tu",
                                  "We",
                                  "Th",
                                  "Fr",
                                  "Sa"
                              ].map(
                                  (day) => (
                                      <div
                                          key={
                                              day
                                          }
                                          style={{
                                              height:
                                                  "30px",
                                              display:
                                                  "flex",
                                              alignItems:
                                                  "center",
                                              justifyContent:
                                                  "center",
                                              fontSize:
                                                  "11px",
                                              fontWeight:
                                                  700,
                                              color:
                                                  "#64748B"
                                          }}
                                      >
                                          {day}
                                      </div>
                                  )
                              )}
                          </div>

                          <div
                              style={{
                                  display:
                                      "grid",
                                  gridTemplateColumns:
                                      "repeat(7, 1fr)",
                                  gap:
                                      "3px"
                              }}
                          >
                              {calendarDays.map(
                                  ({
                                      date,
                                      currentMonth
                                  }) => {
                                      const selected =
                                          isSameDate(
                                              date,
                                              selectedDate
                                          );

                                      const isToday =
                                          isSameDate(
                                              date,
                                              today
                                          );

                                      return (
                                          <button
                                              key={formatDate(
                                                  date
                                              )}
                                              type="button"
                                              onClick={() =>
                                                  handleDateSelect(
                                                      date
                                                  )
                                              }
                                              style={{
                                                  height:
                                                      "34px",
                                                  border:
                                                      isToday &&
                                                      !selected
                                                          ? "1px solid #2563EB"
                                                          : "none",
                                                  borderRadius:
                                                      "7px",
                                                  backgroundColor:
                                                      selected
                                                          ? "#2563EB"
                                                          : "#FFFFFF",
                                                  color:
                                                      selected
                                                          ? "#FFFFFF"
                                                          : currentMonth
                                                          ? "#1F2937"
                                                          : "#94A3B8",
                                                  cursor:
                                                      "pointer",
                                                  fontFamily:
                                                      "inherit",
                                                  fontSize:
                                                      "13px",
                                                  fontWeight:
                                                      selected ||
                                                      isToday
                                                          ? 700
                                                          : 500
                                              }}
                                          >
                                              {date.getDate()}
                                          </button>
                                      );
                                  }
                              )}
                          </div>

                          <div
                              style={{
                                  display:
                                      "flex",
                                  alignItems:
                                      "center",
                                  justifyContent:
                                      "space-between",
                                  marginTop:
                                      "12px",
                                  paddingTop:
                                      "10px",
                                  borderTop:
                                      "1px solid #E2E8F0"
                              }}
                          >
                              <button
                                  type="button"
                                  onClick={
                                      handleClear
                                  }
                                  style={{
                                      border:
                                          "none",
                                      backgroundColor:
                                          "#FFFFFF",
                                      color:
                                          "#2563EB",
                                      cursor:
                                          "pointer",
                                      fontFamily:
                                          "inherit",
                                      fontSize:
                                          "12px",
                                      fontWeight:
                                          600
                                  }}
                              >
                                  Clear
                              </button>

                              <button
                                  type="button"
                                  onClick={
                                      handleToday
                                  }
                                  style={{
                                      border:
                                          "none",
                                      backgroundColor:
                                          "#FFFFFF",
                                      color:
                                          "#2563EB",
                                      cursor:
                                          "pointer",
                                      fontFamily:
                                          "inherit",
                                      fontSize:
                                          "12px",
                                      fontWeight:
                                          600
                                  }}
                              >
                                  Today
                              </button>
                          </div>
                      </>
                  )}

                  {/* ======================
                      MONTH VIEW
                  ====================== */}

                  {view === "months" && (
                      <>
                          <div
                              style={{
                                  display:
                                      "flex",
                                  alignItems:
                                      "center",
                                  justifyContent:
                                      "center",
                                  marginBottom:
                                      "14px"
                              }}
                          >
                              <button
                                  type="button"
                                  onClick={() =>
                                      setView(
                                          "years"
                                      )
                                  }
                                  style={{
                                      border:
                                          "none",
                                      backgroundColor:
                                          "#FFFFFF",
                                      color:
                                          "#1F2937",
                                      cursor:
                                          "pointer",
                                      fontFamily:
                                          "inherit",
                                      fontSize:
                                          "16px",
                                      fontWeight:
                                          700
                                  }}
                              >
                                  {year}
                              </button>
                          </div>

                          <div
                              style={{
                                  display:
                                      "grid",
                                  gridTemplateColumns:
                                      "repeat(3, 1fr)",
                                  gap:
                                      "8px"
                              }}
                          >
                              {months.map(
                                  (
                                      monthName,
                                      monthIndex
                                  ) => {
                                      const selected =
                                          monthIndex ===
                                              month &&
                                          year ===
                                              selectedDate.getFullYear();

                                      return (
                                          <button
                                              key={
                                                  monthName
                                              }
                                              type="button"
                                              onClick={() => {
                                                  setViewDate(
                                                      new Date(
                                                          year,
                                                          monthIndex,
                                                          1
                                                      )
                                                  );

                                                  setView(
                                                      "days"
                                                  );
                                              }}
                                              style={{
                                                  height:
                                                      "44px",
                                                  border:
                                                      "none",
                                                  borderRadius:
                                                      "8px",
                                                  backgroundColor:
                                                      selected
                                                          ? "#2563EB"
                                                          : "#FFFFFF",
                                                  color:
                                                      selected
                                                          ? "#FFFFFF"
                                                          : "#1F2937",
                                                  cursor:
                                                      "pointer",
                                                  fontFamily:
                                                      "inherit",
                                                  fontSize:
                                                      "13px",
                                                  fontWeight:
                                                      selected
                                                          ? 700
                                                          : 500
                                              }}
                                          >
                                              {
                                                  monthName
                                              }
                                          </button>
                                      );
                                  }
                              )}
                          </div>
                      </>
                  )}

                  {/* ======================
                      YEAR VIEW
                  ====================== */}

                  {view === "years" && (
                      <>
                          <div
                              style={{
                                  display:
                                      "flex",
                                  alignItems:
                                      "center",
                                  justifyContent:
                                      "space-between",
                                  marginBottom:
                                      "14px"
                              }}
                          >
                              <button
                                  type="button"
                                  onClick={
                                      handlePreviousYearRange
                                  }
                                  style={{
                                      width:
                                          "34px",
                                      height:
                                          "34px",
                                      border:
                                          "none",
                                      borderRadius:
                                          "7px",
                                      backgroundColor:
                                          "#FFFFFF",
                                      color:
                                          "#1F2937",
                                      cursor:
                                          "pointer",
                                      display:
                                          "flex",
                                      alignItems:
                                          "center",
                                      justifyContent:
                                          "center"
                                  }}
                              >
                                  <ChevronLeft
                                      size={18}
                                  />
                              </button>

                              <div
                                  style={{
                                      fontSize:
                                          "14px",
                                      fontWeight:
                                          700,
                                      color:
                                          "#1F2937"
                                  }}
                              >
                                  {startYear} -{" "}
                                  {startYear + 11}
                              </div>

                              <button
                                  type="button"
                                  onClick={
                                      handleNextYearRange
                                  }
                                  style={{
                                      width:
                                          "34px",
                                      height:
                                          "34px",
                                      border:
                                          "none",
                                      borderRadius:
                                          "7px",
                                      backgroundColor:
                                          "#FFFFFF",
                                      color:
                                          "#1F2937",
                                      cursor:
                                          "pointer",
                                      display:
                                          "flex",
                                      alignItems:
                                          "center",
                                      justifyContent:
                                          "center"
                                  }}
                              >
                                  <ChevronRight
                                      size={18}
                                  />
                              </button>
                          </div>

                          <div
                              style={{
                                  display:
                                      "grid",
                                  gridTemplateColumns:
                                      "repeat(3, 1fr)",
                                  gap:
                                      "8px"
                              }}
                          >
                              {years.map(
                                  (yearValue) => {
                                      const selected =
                                          yearValue ===
                                          year;

                                      return (
                                          <button
                                              key={
                                                  yearValue
                                              }
                                              type="button"
                                              onClick={() => {
                                                  setViewDate(
                                                      new Date(
                                                          yearValue,
                                                          month,
                                                          1
                                                      )
                                                  );

                                                  setView(
                                                      "months"
                                                  );
                                              }}
                                              style={{
                                                  height:
                                                      "44px",
                                                  border:
                                                      "none",
                                                  borderRadius:
                                                      "8px",
                                                  backgroundColor:
                                                      selected
                                                          ? "#2563EB"
                                                          : "#FFFFFF",
                                                  color:
                                                      selected
                                                          ? "#FFFFFF"
                                                          : "#1F2937",
                                                  cursor:
                                                      "pointer",
                                                  fontFamily:
                                                      "inherit",
                                                  fontSize:
                                                      "13px",
                                                  fontWeight:
                                                      selected
                                                          ? 700
                                                          : 500
                                              }}
                                          >
                                              {
                                                  yearValue
                                              }
                                          </button>
                                      );
                                  }
                              )}
                          </div>
                      </>
                  )}
              </div>,
              document.body
          )
        : null;

    return (
        <>
            <div
                ref={wrapperRef}
                style={{
                    width: "100%"
                }}
            >
                <label
                    style={{
                        display:
                            "block",
                        marginBottom:
                            "8px",
                        fontSize:
                            "13px",
                        fontWeight:
                            600,
                        color:
                            "#1F2937"
                    }}
                >
                    {label}
                </label>

                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => {
                        if (open) {
                            setOpen(false);
                        } else {
                            handleOpen();
                        }
                    }}
                    style={{
                        width: "100%",
                        height: "46px",
                        padding:
                            "0 13px",
                        border:
                            open
                                ? "1px solid #2563EB"
                                : "1px solid #CBD5E1",
                        borderRadius:
                            "9px",
                        backgroundColor:
                            "#FFFFFF",
                        color:
                            value
                                ? "#1F2937"
                                : "#64748B",
                        fontFamily:
                            "inherit",
                        fontSize:
                            "14px",
                        fontWeight:
                            500,
                        cursor:
                            "pointer",
                        display:
                            "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "space-between",
                        boxSizing:
                            "border-box",
                        boxShadow:
                            open
                                ? "0 0 0 3px #DBEAFE"
                                : "none"
                    }}
                >
                    <span>
                        {value
                            ? selectedDate.toLocaleDateString(
                                  "en-IN",
                                  {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric"
                                  }
                              )
                            : "Select date"}
                    </span>

                    <CalendarDays
                        size={18}
                        color="#64748B"
                    />
                </button>
            </div>

            {popup}
        </>
    );
}

export default DatePicker;