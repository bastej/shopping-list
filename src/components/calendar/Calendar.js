import "./Calendar.scss";
import React, { Component } from "react";
import _ from "lodash";
// import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { initCalendar, setNextMonth } from "../../actions/calendar";

class Calendar extends Component {
  // state = {
  //   dateObject: moment(),
  //   selectedDate: {
  //     year: null,
  //     month: null,
  //     day: null
  //   },
  //   currentDate: {
  //     year: moment().format("YYYY"),
  //     month: moment().format("MMMM"),
  //     day: Number(moment().format("D"))
  //   }
  // };

  componentDidMount() {
    // this action should call in parent component
    this.props.initCalendar();
  }

  // getDaysInMonth = () => {
  //   return Number(this.state.dateObject.daysInMonth());
  // };
  // // getYear = () => {
  // //   return this.state.dateObject.format("Y");
  // // };
  // // getMonth = () => {
  // //   return this.state.dateObject.format("MMMM");
  // // };
  // // currentDay = () => {
  // //   return Number(this.state.dateObject.format("D"));
  // // };

  // getFirstDayOfMonth = () => {
  //   const dateObject = this.state.dateObject;
  //   const firstDay = moment(dateObject)
  //     .startOf("month")
  //     .format("d");
  //   return Number(firstDay);
  // };

  // //   renderCalendarNavigation = () => {};

  // renderPrevMonthDays() {
  //   let blanks = [];
  //   const dateObject = { ...this.state.dateObject };
  //   const prevMonthDays = moment(this.state.dateObject.toDate())
  //     .subtract(1, "month")
  //     .daysInMonth();
  //   const firstDayOfCurrentMonth = this.getFirstDayOfMonth();
  //   const firstDayToShowFromPrevMonth =
  //     prevMonthDays - firstDayOfCurrentMonth + 1;

  //   for (let i = firstDayToShowFromPrevMonth; i <= prevMonthDays; i++) {
  //     blanks.push({ key: i, isEmpty: true });
  //   }
  //   return blanks;
  // }

  // renderMonthDays() {
  //   let daysInMonth = [];
  //   for (let dayNumber = 1; dayNumber <= this.getDaysInMonth(); dayNumber++) {
  //     //select today
  //     // console.log("z state: ", typeof this.state.currentDate.month);
  //     // console.log("z petli", typeof this.getMonth());
  //     const currentDay =
  //       dayNumber === this.state.currentDate.day &&
  //       this.props.date.month === this.state.currentDate.month
  //         ? true
  //         : false;

  //     daysInMonth.push({ key: dayNumber, isToday: currentDay });
  //   }
  //   return daysInMonth;
  // }

  // renderRowsWithDays(monthDays) {
  //   let weekRows = [];
  //   let week = [];
  //   for (let i = 0; i < monthDays.length; i++) {
  //     const dayHere = (
  //       <td key={i}>
  //         <button
  //           className={`btn day ${monthDays[i].isEmpty ? "empty" : ""} ${
  //             monthDays[i].isToday ? "today" : ""
  //           }`}
  //         >
  //           {monthDays[i].key}
  //         </button>
  //       </td>
  //     );
  //     if (i % 7 !== 0 || i === 0) {
  //       week.push(dayHere); // if index not equal 7 that means not go to next week
  //     } else {
  //       weekRows.push(week);
  //       week = []; // empty container
  //       week.push(dayHere);
  //     }
  //     if (i === monthDays.length - 1) {
  //       // when end loop we add remain date
  //       weekRows.push(week);
  //       // week = []; // empty container
  //     }
  //   }
  //   return weekRows;
  // }

  // renderMonthDays = () => {
  //   const prevMonthDays = this.renderPrevMonthDays();
  //   const currentMonthDays = this.renderMonthDays();
  //   const monthDays = [...prevMonthDays, ...currentMonthDays];
  //   const weekRows = this.renderRowsWithDays(monthDays);

  //   //render rows with weeks
  //   const daysToShow = weekRows.map((week, i) => {
  //     return <tr key={i}>{week}</tr>;
  //   });

  //   return daysToShow;
  // };

  // setNextMonth = () => {
  //   const dateObject = this.state.dateObject.add(1, "month");
  //   this.setState({ dateObject });
  // };

  // setPrevMonth = () => {
  //   const dateObject = this.state.dateObject.subtract(1, "month");
  //   this.setState({ dateObject });
  // };

  renderDaysNamesRow() {
    const daysShortNames = this.props.daysNames;
    const cols = daysShortNames.map(day => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });
    return <tr>{cols}</tr>;
  }

  getMonthWeeks() {
    const monthDays = this.props.daysToShow;
    let weekRows = [];
    let week = [];
    for (let i = 0; i < monthDays.length; i++) {
      const dayHere = (
        <td key={i}>
          <button
            className={`btn day ${monthDays[i].isEmpty ? "empty" : ""} ${
              monthDays[i].isToday ? "today" : ""
            }`}
          >
            {monthDays[i].key}
          </button>
        </td>
      );
      if (i % 7 !== 0 || i === 0) {
        week.push(dayHere); // if index not equal 7 that means not go to next week
      } else {
        weekRows.push(week);
        week = []; // empty container
        week.push(dayHere);
      }
      if (i === monthDays.length - 1) {
        // when end loop we add remain date
        weekRows.push(week);
        // week = []; // empty container
      }
    }
    return weekRows;
  }

  renderMonthDays() {
    const weeks = this.getMonthWeeks();
    return weeks.map((week, i) => {
      return <tr key={i}>{week}</tr>;
    });
  }

  render() {
    const { setNextMonth, date } = this.props;
    return (
      <div className="calendar">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 offset-lg-3">
              <div className="navi mx-auto text-center">
                {/* <button onClick={() => this.setPrevMonth()} className="btn">
                  <FontAwesomeIcon className="fa-lg" icon="angle-left" />
                </button> */}
                <h4 className="month-name p-2 m-auto">
                  {date.month} {date.year}
                </h4>
                <button onClick={() => setNextMonth()} className="btn">
                  <FontAwesomeIcon className="fa-lg" icon="angle-right" />
                </button>
              </div>

              <table className="days mx-auto">
                <thead>{this.renderDaysNamesRow()}</thead>
                <tbody>{this.renderMonthDays()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ calendar }) => {
  return {
    date: calendar,
    daysNames: calendar.daysNames,
    daysToShow: calendar.daysToShow
  };
};
export default connect(
  mapStateToProps,
  {
    initCalendar,
    setNextMonth
  }
)(Calendar);
