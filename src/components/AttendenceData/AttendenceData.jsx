import React, { useContext } from "react";
import { themeContext } from "../../context/DarkModeContext.jsx";
import Details from "../Details/Details.jsx";
import PropTypes from "prop-types";
import "./AttendenceData.css";

function AttendenceData({ fetchedAttendence, timeTable }) {
  const { theme } = useContext(themeContext);

  const [toggleDetails, setToggleDetails] = React.useState(false);

  const [selectedKey, setSelectedKey] = React.useState(null);

  const fetchedData = [...fetchedAttendence];

  const dayArr = fetchedData.map((obj) => obj.day.split("-"));
  const fetchedDay = fetchedData.map((obj) => obj.day);
  const dateArr = dayArr.map((arr) => parseDateString(arr[1]));
  const objArr = [];
  for (let i = 0; i < dayArr.length; i++) {
    objArr.push({
      day: new Date(dateArr[i]),
      dayStr: fetchedDay[i],
    });
  }

  let weeks = [];
  let currentWeek = [];
  let selectedDate = null;

  objArr.forEach(({ day, dayStr }) => {
    let weekStartDate = getMonday(day);

    if (selectedDate && weekStartDate.getTime() !== selectedDate.getTime()) {
      let weekEndDate = new Date(selectedDate.getTime());
      weekEndDate.setDate(weekEndDate.getDate() + 4);

      weeks.push({
        startDate: selectedDate,
        endDate: weekEndDate,
        week: currentWeek,
      });
      currentWeek = [];
    }

    selectedDate = weekStartDate;
    currentWeek.push(dayStr);
  });

  if (currentWeek.length > 0) {
    let weekEndDate = new Date(selectedDate.getTime());
    weekEndDate.setDate(weekEndDate.getDate() + 4);

    weeks.push({
      startDate: selectedDate,
      endDate: weekEndDate,
      week: currentWeek,
    });
  }

  function getMonday(date) {
    const currentDate = new Date(date);
    const currentDay = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - currentDay + 1);
    return currentDate;
  }

  function parseDateString(dateStr) {
    const [date, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${date}`);
  }

  function weeklyAttendence() {
    return (
      weeks &&
      weeks.map(({ startDate, endDate, week }, index) => {
        let key = startDate.toString() + endDate.toString() + index;
        let weekDaysArr = week.map((day) => day.split("-")).flat();

        return (
          <div className="container" key={key} data-theme={theme}>
            <h4>
              Week (
              {`${startDate.getDate()}/${
                startDate.getMonth() + 1
              }/${startDate.getFullYear()}`}{" "}
              -{" "}
              {`${endDate.getDate()}/${
                endDate.getMonth() + 1
              }/${endDate.getFullYear()}`}
              )
            </h4>

            <div className={"days--container"}>
              {toggleDetails && key === selectedKey ? (
                <Details
                  startDate={startDate}
                  endDate={endDate}
                  fetchedAttendence={fetchedAttendence}
                  timeTable={timeTable}
                  weeks={weeks}
                  weekDays={weekDaysArr}
                />
              ) : (
                <>
                  <div
                    className="day--box"
                    style={
                      theme === "light"
                        ? {
                            backgroundColor: weekDaysArr.includes("Monday")
                              ? "#5FCF7F"
                              : "#C54942",
                          }
                        : {
                            backgroundColor: "transparent",
                            border: weekDaysArr.includes("Monday")
                              ? "2px solid #5FCF7F"
                              : "2px solid #C54942",
                            color: "antiquewhite",
                          }
                    }
                  >
                    <span>Monday</span>
                  </div>

                  <div
                    className="day--box"
                    style={
                      theme === "light"
                        ? {
                            backgroundColor: weekDaysArr.includes("Tuesday")
                              ? "#5FCF7F"
                              : "#C54942",
                          }
                        : {
                            backgroundColor: "transparent",
                            border: weekDaysArr.includes("Tuesday")
                              ? "2px solid #5FCF7F"
                              : "2px solid #C54942",
                            color: "antiquewhite",
                          }
                    }
                  >
                    <span>Tuesday</span>
                  </div>

                  <div
                    className="day--box"
                    style={
                      theme === "light"
                        ? {
                            backgroundColor: weekDaysArr.includes("Wednesday")
                              ? "#5FCF7F"
                              : "#C54942",
                          }
                        : {
                            backgroundColor: "transparent",
                            border: weekDaysArr.includes("Wednesday")
                              ? "2px solid #5FCF7F"
                              : "2px solid #C54942",
                            color: "antiquewhite",
                          }
                    }
                  >
                    <span>Wednesday</span>
                  </div>

                  <div
                    className="day--box"
                    style={
                      theme === "light"
                        ? {
                            backgroundColor: weekDaysArr.includes("Thursday")
                              ? "#5FCF7F"
                              : "#C54942",
                          }
                        : {
                            backgroundColor: "transparent",
                            border: weekDaysArr.includes("Thursday")
                              ? "2px solid #5FCF7F"
                              : "2px solid #C54942",
                            color: "antiquewhite",
                          }
                    }
                  >
                    <span>Thursday</span>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => handleToggleDetails(key)}
              className="details--btn"
              style={{ color: theme === "dark" ? "antiquewhite" : "black" }}
            >
              {toggleDetails && key === selectedKey
                ? "hide details"
                : "show details"}
            </button>
          </div>
        );
      })
    );
  }

  function handleToggleDetails(key) {
    setSelectedKey(key);
    setToggleDetails(!toggleDetails);
  }

  return <>{weeklyAttendence()}</>;
}

AttendenceData.propTypes = {
  fetchedAttendence: PropTypes.array,
  timeTable: PropTypes.array,
};

export default AttendenceData;
