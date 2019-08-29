import {
  INIT_CALENDAR,
  SET_NEXT_MONTH,
  SET_PREV_MONTH,
  SELECT_START_DATE,
  SELECT_END_DATE,
  CREATE_DIET_PLAN
} from "../types";
import moment from "moment";

const renderPrevMonthDays = dateObj => {
  let blanks = [];
  // const dateObject = dateObj;
  const prevMonthDays = moment(dateObj.toDate())
    .subtract(1, "month")
    .daysInMonth();
  const firstDayOfCurrentMonth = Number(
    moment(dateObj)
      .startOf("month")
      .format("d")
  );
  const firstDayToShowFromPrevMonth =
    prevMonthDays - firstDayOfCurrentMonth + 1;

  for (let i = firstDayToShowFromPrevMonth; i <= prevMonthDays; i++) {
    blanks.push({ key: i, isEmpty: true });
  }
  return blanks;
};

const renderMonthDays = (dateObj, today) => {
  let days = [];
  const daysCount = Number(dateObj.daysInMonth());
  for (let dayNumber = 1; dayNumber <= daysCount; dayNumber++) {
    //select today
    // console.log("z state: ", typeof this.state.currentDate.month);
    // console.log("z petli", typeof this.getMonth());
    const currentDay =
      dayNumber === today.day && dateObj.month === today.month ? true : false;

    days.push({ key: dayNumber, isToday: currentDay });
  }
  return days;
};

const getMonthDays = (dateObj, today) => {
  const prevMonthDays = renderPrevMonthDays(dateObj);
  const currentMonthDays = renderMonthDays(dateObj, today);
  const monthDays = [...prevMonthDays, ...currentMonthDays];
  //   const weekRows = renderRowsWithDays(monthDays);

  return monthDays;
};

export const initCalendar = () => {
  const baseDateObject = moment();
  const year = moment().format("YYYY");
  const month = moment().format("MMMM");
  const day = Number(moment().format("D"));
  const today = {
    year,
    month,
    day
  };
  const daysNames = moment.weekdaysShort();
  const daysToShow = getMonthDays(baseDateObject, today);

  return {
    type: INIT_CALENDAR,
    payload: {
      baseDateObject,
      year,
      month,
      day,
      today,
      daysNames,
      daysToShow
    }
  };
};

export const setNextMonth = () => {
  return { type: SET_NEXT_MONTH };
};

export const setPrevtMonth = () => {
  return { type: SET_PREV_MONTH };
};
