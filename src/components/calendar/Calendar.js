import "./Calendar.scss";
import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Calendar extends Component {
  state = {
    dateObject: moment(),
    selectedDate: {
      year: null,
      month: null,
      day: null
    },
    selectedMonth: "",
    currentDate: {
      year: moment().format("YYYY"),
      month: moment().format("MMMM"),
      day: moment().format("D")
    }
  };

  getDaysInMonth = () => {
    return Number(this.state.dateObject.daysInMonth());
  };
  getYear = () => {
    return this.state.dateObject.format("Y");
  };
  getMonth = () => {
    return this.state.dateObject.format("MMMM");
  };
  // currentDay = () => {
  //   return Number(this.state.dateObject.format("D"));
  // };

  getFirstDayOfMonth = () => {
    const dateObject = this.state.dateObject;
    const firstDay = moment(dateObject)
      .startOf("month")
      .format("d");
    return Number(firstDay);
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
    let blanks = [];
    for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
      // alert(!!(i < this.getFirstDayOfMonth()));
      blanks.push({ key: i, isEmpty: true });
    }
    return blanks;
  }

  renderCurrentMonthDays() {
    let daysInMonth = [];
    for (let dayNumber = 1; dayNumber <= this.getDaysInMonth(); dayNumber++) {
      //select today
      const currentDay =
        dayNumber === this.state.currentDay &&
        this.state.currentMonth === this.getMonth()
          ? true
          : false;

      daysInMonth.push({ key: dayNumber, isToday: currentDay });
    }
    return daysInMonth;
  }

  renderRowsWithDays(monthDays) {
    let weekRows = [];
    let week = [];
    // console.log("test: ", monthDays);
    for (let i = 0; i < monthDays.length; i++) {
      // const key = toString(i);

      const dayHere = (
        <td key={i} className={`${monthDays[i].isToday ? "today" : ""}`}>
          {!monthDays[i].isEmpty && monthDays[i].key}
        </td>
      );
      // console.log("pojedynczy dzien: ", monthDays[i]);
      if (i % 7 !== 0 || i === 0) {
        // console.log("day: ", typeof monthDays[i].key);
        week.push(dayHere); // if index not equal 7 that means not go to next week
      } else {
        weekRows.push(week);
        week = []; // empty container
        week.push(dayHere);
      }
      if (i === monthDays.length - 1) {
        // console.log(`tutaj jest dzien ${i}`);
        // when end loop we add remain date
        weekRows.push(week);
        // week = []; // empty container
      }
    }
    return weekRows;
  }

  renderMonthDays = days => {
    const prevMonthDays = this.renderPrevMonthDays();
    // console.log("prevmonth days: ", prevMonthDays);
    const currentMonthDays = this.renderCurrentMonthDays();
    // console.log("nextmonth days: ", currentMonthDays);
    const monthDays = [...prevMonthDays, ...currentMonthDays];
    // console.log("days: ", monthDays);
    // setTimeout(() => console.log(monthDays), 2000);
    const weekRows = this.renderRowsWithDays(monthDays);
    setTimeout(() => console.log(weekRows), 2000);

    //render rows with weeks
    const daysToShow = weekRows.map((week, i) => {
      return <tr key={i}>{week}</tr>;
    });

    return daysToShow;
  };

  setNextMonth = () => {
    const dateObject = this.state.dateObject.add(1, "month");
    this.setState({ dateObject });
  };

  setPrevMonth = () => {
    const dateObject = this.state.dateObject.subtract(1, "month");
    this.setState({ dateObject });
  };

  render() {
    console.log("now:", moment().format("MMMM"));
    console.log("miesiac:", this.getMonth());
    return (
      <div className="calendar">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 offset-lg-3">
              <div className="navi mx-auto text-center">
                <button onClick={() => this.setPrevMonth()} className="btn">
                  <FontAwesomeIcon className="fa-lg" icon="angle-left" />
                </button>
                <h4 className="month-name p-2 m-auto">
                  {this.getMonth()} {this.getYear()}
                </h4>
                <button onClick={() => this.setNextMonth()} className="btn">
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
