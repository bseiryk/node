export const MONTHS = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'Jun',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export const MIN_SEC = Array.from(Array(60)).map((el, idx) => ('0' + idx).slice(-2));
export const HOURS = Array.from(Array(24)).map((el, idx) => ('0' + idx).slice(-2));


export const TYPES = {
  MONTH: 'MONTH',
  MONTH_RANGE: 'MONTH_RANGE',
  YEAR: 'YEAR',
  YEAR_RANGE: 'YEAR_RANGE',
  YEAR_DECADE: 'YEAR_DECADE',
  DATE: 'DATE',
  DATE_RANGE: 'DATE_RANGE',
  DATE_TIME: 'DATE_TIME',
  DATE_TIME_RANGE: 'DATE_TIME_RANGE',
};

export const RANGE_TYPES = [
  TYPES.MONTH_RANGE,
  TYPES.YEAR_RANGE,
  TYPES.DATE_RANGE,
  TYPES.DATE_TIME_RANGE,
];


export const SELECTION_STEPS = {
  MONTH: {
    YEAR: TYPES.MONTH,
    YEAR_DECADE: TYPES.YEAR,
  },
  MONTH_RANGE: {
    YEAR: TYPES.MONTH_RANGE,
    YEAR_DECADE: TYPES.YEAR,
  },
  YEAR: {
    YEAR_DECADE: TYPES.YEAR,
  },
  YEAR_RANGE: {
    YEAR_DECADE: TYPES.YEAR_RANGE,
  },
  DATE: {
    MONTH: TYPES.DATE,
    YEAR: TYPES.MONTH,
    YEAR_DECADE: TYPES.YEAR,
  },
  DATE_RANGE: {
    MONTH: TYPES.DATE_RANGE,
    YEAR: TYPES.MONTH,
    YEAR_DECADE: TYPES.YEAR,
  },
  DATE_TIME: {
    MONTH: TYPES.DATE_TIME,
    YEAR: TYPES.MONTH,
    YEAR_DECADE: TYPES.YEAR,
  },
  DATE_TIME_RANGE: {
    MONTH: TYPES.DATE_TIME_RANGE,
    YEAR: TYPES.MONTH,
    YEAR_DECADE: TYPES.YEAR,
  },
};

export const CALENDAR_HEADER_META = [
  {
    label: 'Mo',
    weekDay: 1,
    id: 1,
  },
  {
    label: 'Tu',
    weekDay: 2,
    id: 2,
  },
  {
    label: 'We',
    weekDay: 3,
    id: 3,
  },
  {
    label: 'Th',
    weekDay: 4,
    id: 4,
  },
  {
    label: 'Fr',
    weekDay: 5,
    id: 5,
  },
  {
    label: 'Sa',
    weekDay: 6,
    id: 6,
  },
  {
    label: 'Su',
    weekDay: 7,
    id: 7,
  },
];
