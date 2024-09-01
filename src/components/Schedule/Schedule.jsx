import PropTypes from "prop-types";
import { useContext } from "react";
import { themeContext } from "../../context/DarkModeContext";
import "./Schedule.css";

function Schedule({ timeTable, day, attendedSubjects, setAttendedSubjects }) {
  const { theme } = useContext(themeContext);
  let timeT = timeTable;
  const table = timeT.map((obj) => {
    if (obj.day === day) {
      return obj;
    }
  });

  function handleClick(sub, event) {
    const prevSubjects = attendedSubjects.slice();
    event.target.checked
      ? setAttendedSubjects([...prevSubjects, sub])
      : setAttendedSubjects([...prevSubjects.filter((item) => sub !== item)]);
  }

  function selectStyle(sub) {
    let style = null;
    theme === "dark"
      ? attendedSubjects.includes(sub)
        ? (style = { backgroundColor: "#94D7A2", color: "black" })
        : (style = null)
      : (style = {
          backgroundColor: attendedSubjects.includes(sub)
            ? "#94D7A2"
            : "transparent",
        });
    return style;
  }

  return (
    <table data-theme={theme}>
      <thead>
        <tr>
          <th>Attended</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tbody>
        {table.map((obj, index) => {
          return obj
            ? obj.lectures.map((sub, subIndex) => {
                const rowKey = `${index}-${subIndex}`;
                return sub ? (
                  <tr key={rowKey}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(event) => handleClick(sub, event, rowKey)}
                      />
                    </td>
                    <td style={selectStyle(sub)}>{sub}</td>
                  </tr>
                ) : null;
              })
            : null;
        })}
      </tbody>
    </table>
  );
}

//defining the proptypes
Schedule.propTypes = {
  timeTable: PropTypes.array,
  day: PropTypes.string,
  date: PropTypes.string,
  attendedSubjects: PropTypes.array,
  setAttendedSubjects: PropTypes.func,
};

export default Schedule;
