import "./Calendar.scss";
import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Calendar extends Component {
  state = {
    dateObject: moment(),
    selectedMonth: ""
  };

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  currentDay = () => {
    return parseInt(this.state.dateObject.format("D"));
  };

  firstDayOfMonth = () => {
    const dateObject = this.state.dateObject;
    const firstDay = moment(dateObject)
      .startOf("month")
      .format("d");
    return firstDay;
  };

  //   renderCalendarNavigation = () => {};

  renderDaysNamesRow() {
    const daysShortNames = moment.weekdaysShort();
    const cols = daysShortNames.map(day => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });
    return <tr>{cols}</tr>;
  }

  renderPrevMonthDays() {
    const blanks = {};
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      return { ...blanks, [i]: { key: i, isEmpty: true } };
    }
  }

  renderCurrentMonthDays() {
    let daysInMonth = {};
    for (let dayNumber = 1; dayNumber <= this.daysInMonth(); dayNumber++) {
      //select today
      const currentDay = dayNumber === this.currentDay() ? true : false;

      daysInMonth = {
        ...daysInMonth,
        [dayNumber]: { key: dayNumber, isToday: currentDay }
      };
    }
    return daysInMonth;
  }

  renderRowsWithDays(monthDays) {
    let weekRows = [];
    let week = [];

    for (var i in monthDays) {
      // const key = toString(i);
      const dayHere = (
        <td
          key={monthDays[i].key}
          className={`${monthDays[i].isEmpty && "empty"} ${monthDays[i]
            .isToday && "today"}`}
        >
          {monthDays[i].key}
        </td>
      );
      if (monthDays[i].key % 7 !== 0 || monthDays[i].key === 0) {
        console.log("day: ", typeof monthDays[i].key);
        week.push(dayHere); // if index not equal 7 that means not go to next week
      } else {
        weekRows.push(week);
        week = []; // empty container
        week.push(dayHere);
      }
      if (monthDays[i].key === _.size(monthDays) - 1) {
        console.log(`tutaj jest dzien ${i}`);
        // when end loop we add remain date
        weekRows.push(week);
        // week = []; // empty container
      }
    }
    return weekRows;
  }

  renderMonthDays = days => {
    const prevMonthDays = this.renderPrevMonthDays();
    console.log("prevmonth days: ", prevMonthDays);
    const currentMonthDays = this.renderCurrentMonthDays();
    console.log("nextmonth days: ", currentMonthDays);
    const monthDays = { ...prevMonthDays, ...currentMonthDays };
    console.log("days: ", monthDays);

    const weekRows = this.renderRowsWithDays(monthDays);

    //render rows with weeks
    const daysToShow = weekRows.map((week, i) => {
      return <tr key={i}>{week}</tr>;
    });

    return daysToShow;
  };

  nextMonth = month => {
    const dateObject = this.state.dateObject.add(1, "month");
    this.setState({ dateObject });
  };

  prevMonth = month => {
    const dateObject = this.state.dateObject.subtract(1, "month");
    this.setState({ dateObject });
  };

  render() {
    return (
      <div className="calendar">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 offset-lg-3">
              <div className="navi mx-auto text-center">
                <button
                  onClick={() => this.prevMonth(this.month())}
                  className="btn"
                >
                  <FontAwesomeIcon className="fa-lg" icon="angle-left" />
                </button>
                <h4 className="month-name p-2 m-auto">
                  {this.month()} {this.year()}
                </h4>
                <button
                  onClick={() => this.nextMonth(this.month())}
                  className="btn"
                >
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

export default Calendar;
