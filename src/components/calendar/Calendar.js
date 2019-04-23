import "./Calendar.scss";
import React, { Component } from "react";
import moment from "moment";

class Calendar extends Component {
  state = {
    dateObject: moment()
  };

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
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
    return daysShortNames.map(day => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });
  }

  renderPrevMonthDays() {
    const blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="day empty">{""}</td>);
    }
    return blanks;
  }

  renderCurrentMonthDays() {
    let daysInMonth = [];
    for (let day = 1; day <= this.daysInMonth(); day++) {
      //select today
      const currentDay = day === this.currentDay() ? " today" : "";

      daysInMonth.push(
        <td className={`day${currentDay}`} key={day}>
          {day}
        </td>
      );
    }
    return daysInMonth;
  }

  renderRowsWithDays(monthDays) {
    const weekRows = [];
    let week = [];

    monthDays.forEach((day, i) => {
      if (i === 0) {
        week.push(day); //in case i === 0 also should push day
      } else if (i % 7 !== 0) {
        week.push(day); // if index not equal 7 that means not go to next week
      } else {
        weekRows.push(week); // when reach next week we contain all td in last week to weekRows
        week = []; // empty container
        week.push(day); // in current loop we still push current row to new container
      }
      if (i === monthDays.length - 1) {
        // when end loop we add remain date
        weekRows.push(week);
        week = []; // empty container
      }
    });

    return weekRows;
  }

  renderMonthDays = days => {
    const prevMonthDays = this.renderPrevMonthDays();
    const currentMonthDays = this.renderCurrentMonthDays();
    const monthDays = [...prevMonthDays, ...currentMonthDays];

    const weekRows = this.renderRowsWithDays(monthDays);

    //render rows with weeks
    const daysToShow = weekRows.map((week, i) => {
      return <tr key={i}>{week}</tr>;
    });

    return daysToShow;
  };

  render() {
    return (
      <div className="calendar">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 offset-lg-3">
              <div className="navi">navi</div>
              <table className="days mx-auto">
                <thead>
                  <tr>{this.renderDaysNamesRow()}</tr>
                </thead>
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
