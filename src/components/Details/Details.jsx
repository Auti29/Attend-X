import PropTypes from "prop-types";
import timeTable from "../../timeTableHC";
import "./Details.css";

function Details({ fetchedAttendence, weeks, startDate, weekDays }) {
  const initialArr = [...fetchedAttendence];
  const combineWeeks = weeks.map(({ endDate, startDate, week }) => ({
    endDate,
    startDate,
    week: week.map((day) => ({
      day,
      lectures: initialArr
        .map((obj) => {
          return day === obj.day ? obj.lectures : null;
        })
        .flat()
        .filter((lec) => lec),
    })),
  }));

  const finalArr = combineWeeks
    .map((week) => {
      return week.startDate === startDate ? week : null;
    })
    .filter((obj) => obj);

  function detailedAttendence() {
    return (
      timeTable &&
      timeTable.map(({ day, lectures }) => {
        return (
          <div key={day} className="day--details">
            <div
              className="day"
              style={
                weekDays.includes(day)
                  ? {
                      backgroundColor: "#4D5B9E",
                      border: "2px solid black",
                      color: "white",
                    }
                  : {
                      backgroundColor: "#D6DBF5",
                      border: "2px solid #C54942",
                      color: "#4D5B9E",
                    }
              }
            >
              {day}
            </div>
            <div className="lectures">
              {lectures.map((lec) => {
                if (!lec) return null;

                const absentDay = finalArr[0]?.week.find((obj) => {
                  const [objDayName] = obj.day.split("-");
                  return (
                    objDayName !== day &&
                    timeTable
                      .map((day) => {
                        return day.day === objDayName && day.lectures;
                      })
                      .flat()
                  );
                });

                const matchingLecture = finalArr[0]?.week.find((obj) => {
                  const [objDayName] = obj.day.split("-");
                  return objDayName === day && obj.lectures.includes(lec);
                });

                return (
                  <div
                    key={lec}
                    className="lecture"
                    style={
                      weekDays.includes(day)
                        ? matchingLecture
                          ? { backgroundColor: "#5FCF7F" }
                          : { backgroundColor: "#C54942" }
                        : absentDay
                        ? {
                            backgroundColor: "#D6DBF5",
                            color: "gray",
                          }
                        : {}
                    }
                  >
                    {lec}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })
    );
  }

  return <div className="details--box">{detailedAttendence()}</div>;
}

Details.propTypes = {
  fetchedAttendence: PropTypes.array,
  startDate: PropTypes.object,
  weeks: PropTypes.array,
  weekDays: PropTypes.array,
};

export default Details;
