import dayjs from 'dayjs'


export const buildCalenederData = (
  meta,
  fullCurrentDate,
) => {
  let currentDay = 1
  const currentFirstDayOfWeek = fullCurrentDate.set('date', 1).isoWeekday();
  const currentCountOfDays = fullCurrentDate.daysInMonth()
  const currentYear = fullCurrentDate.year();
  const currentMonth = fullCurrentDate.month();

  const prevMonth = fullCurrentDate.subtract(1, 'month').month();
  const prevYear = fullCurrentDate.subtract(1, 'month').year();
  const prevCountOfDays = fullCurrentDate.subtract(1, 'month').daysInMonth()

  const nextMonth = fullCurrentDate.add(1, 'month').month()
  const nextYear = fullCurrentDate.add(1, 'month').year();

  const data = Array.from(new Array(6)).map((_, rowNumber) => {
    const row = { id: rowNumber };
    meta.forEach(el => {
      if (el.weekDay >= currentFirstDayOfWeek && !rowNumber) {
        row[el.weekDay] = {
          value: currentDay,
          month: currentMonth,
          year: currentYear
        }
        currentDay++
      } else if (el.weekDay < currentFirstDayOfWeek && !rowNumber) {
        row[el.weekDay] = {
          value: (prevCountOfDays - (currentFirstDayOfWeek - el.weekDay)) + 1,
          month: prevMonth,
          year: prevYear
        }
      } else if (currentDay <= currentCountOfDays && rowNumber) {
        row[el.weekDay] = {
          value: currentDay,
          month: currentMonth,
          year: currentYear
        }
        currentDay++
      } else if (currentDay > currentCountOfDays && rowNumber) {
        row[el.weekDay] = {
          value: currentDay - currentCountOfDays,
          month: nextMonth,
          year: nextYear
        }
        currentDay++
      }
    })
    return row
  })
  return data
}

export const getDecade = (date) => {
  const fullYear = date.year();
  const mode = fullYear % 10;
  const start = fullYear - mode;
  const end = start + 9;
  return { start, end };
}

export const getMonthesForPicker = (monthes) => {
  const data = Object.keys(monthes).map(key => ({ label: monthes[key], value: key }))
  return data
}

export const getYearsForPicker = (localValue) => {
  const fullYear = localValue.year();
  const mode = fullYear % 10;
  const start = fullYear - mode;

  const data = Array.from(Array(10)).map((_, idx) => (
    { label: start + idx, value: start + idx }
  ));
  data.push({ label: start + 10, value: start + 10 });
  data.unshift({ label: start - 1, value: start - 1 });
  return data
}

export const getDecadesForPicker = (date) => {
  let startYear = Math.floor(date.year() / 100) * 100;
  const arr = [];

  const template = Array.from(Array(12));
  while (template.length) {
    const start = startYear - 10;
    const end = startYear - 1;
    arr.push({
      label: `${start} - ${end}`,
      value: { start, end }
    })
    startYear = startYear + 10;
    template.shift()
  }
  return arr
}

export const isCurrent = (m, d, y) => {
  const currentDate = dayjs();
  const cYear = currentDate.year();
  const cMonth = currentDate.month();
  const cDate = currentDate.date();
  return d === cDate && m === cMonth && y === cYear
}

export const isSelected = (m, d, y, value) => {
  if (!value) return false;
  const currentDate = dayjs(value);
  const cYear = currentDate.year();
  const cMonth = currentDate.month();
  const cDate = currentDate.date();
  return d === cDate && m === cMonth && y === cYear
}