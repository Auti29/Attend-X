import React, { useContext } from "react";
import { themeContext } from "../../context/DarkModeContext.jsx";
import Loading from "../Loading.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import AttendenceData from "../AttendenceData/AttendenceData.jsx";
import "./Attendence.css";

const url =
  "https://script.google.com/macros/s/AKfycbwV2CttKSxYDVvQK9GkwjBJARfQemZ3asMDXDiXBawAEj3-awCOLeKq2ppK1rB6_8u_GQ/exec";

export default function Attendence() {
  const [loading, setLoading] = React.useState(false);
  const [timeTable, setTimeTable] = React.useState([]);
  const [attendedSubjects, setAttendedSubjects] = React.useState([]);
  const [fetchedAttendence, setFetchedAttendence] = React.useState([]);
  const [submitAttendence, setsubmitAttendence] = React.useState(false);
  const [attendenceDataClicked, setAttendenceDataClicked] =
    React.useState(false);

  const { theme } = useContext(themeContext);

  React.useEffect(() => {
    if (attendenceDataClicked) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch(url + "?fetchType=fetchLectures");
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          setFetchedAttendence(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else if (!submitAttendence) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          setTimeTable(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [attendenceDataClicked, submitAttendence]);

  const toggleClick = () => {
    setsubmitAttendence(!submitAttendence);
  };

  const handleSend = async () => {
    const postObj = attendedSubjects &&
      formattedDate && {
        day: formattedDate,
        attended: attendedSubjects,
      };
    try {
      const res = await fetch(url, {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postObj),
      });

      const result = await res.json();
      console.log("Insert result: ", result);
    } catch (error) {
      console.error("Error occurred: ", error);
    } finally {
      console.log("finally block executed..");
    }
  };

  const sendClicked = () => {
    formattedDate && attendedSubjects(handleSend());
    toggleClick();
  };

  const today = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = daysOfWeek[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const formattedDate = `${day}-${date}/${month + 1}/${year}`;

  const fetchAttendence = () => {
    setAttendenceDataClicked(!attendenceDataClicked);
  };

  const checkDay = React.useMemo(() => {
    return day === "Friday" || day === "Saturday" || day === "Sunday";
  }, [day]);

  React.useEffect(() => {
    checkDay ? setsubmitAttendence(true) : setsubmitAttendence(false);
  }, [checkDay]);

  return (
    <div className="main" data-theme={theme}>
      <h3 className="title--schedule">Schedule</h3>
      <h5 className="description">
        Mark the lectures you have attended today.
      </h5>
      <h3 className="date">{formattedDate}</h3>

      {checkDay ? (
        <>
          <h3>who goes to college on {day} &#128128;</h3>
          <button
            className="send--btn"
            onClick={fetchAttendence}
            style={
              attendenceDataClicked
                ? loading
                  ? { display: "none" }
                  : null
                : null
            }
          >
            <span>
              {attendenceDataClicked
                ? "Hide Attendence data"
                : "Show Attendence Data"}
            </span>
          </button>
          {attendenceDataClicked ? (
            loading ? (
              <Loading />
            ) : (
              <AttendenceData
                fetchedAttendence={fetchedAttendence}
                timeTable={timeTable}
              />
            )
          ) : null}
        </>
      ) : submitAttendence ? (
        <>
          <h3>Todays attendence is noted &#128077;</h3>
          <button className="send--btn" onClick={fetchAttendence}>
            <span>
              {attendenceDataClicked
                ? "Hide Attendence data"
                : "Show Attendence Data"}
            </span>
          </button>
          {attendenceDataClicked && (
            <AttendenceData
              fetchedAttendence={fetchedAttendence}
              timeTable={timeTable}
            />
          )}
        </>
      ) : (
        <>
          <Schedule
            timeTable={timeTable}
            day={day}
            date={formattedDate}
            attendedSubjects={attendedSubjects}
            setAttendedSubjects={setAttendedSubjects}
          />
          <button className="send--btn" onClick={sendClicked}>
            <span>Send</span>
          </button>
        </>
      )}
    </div>
  );
}
