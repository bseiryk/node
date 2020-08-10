import React, { useState, useMemo, useRef, useEffect } from 'react'
import get from 'lodash/get'
import moment from 'moment'
import classnames from 'classnames'
import dayjs from 'dayjs'



import Picker from './Picker'
import { buildCalenederData, getDecade, getYearsForPicker, getDecadesForPicker, getMonthesForPicker, isCurrent, isSelected } from './utils'
import { getTimePicker, getMonthYearPicker, getDayPicker, getHeaderContent } from './baseJSX'
import {
  MONTHS,
  MIN_SEC,
  HOURS,
  SELECTION_STEPS,
  CALENDAR_HEADER_META,
  RANGE_TYPES,
  TYPES,
} from './constants'

import './index.scss'


// accessability
// position of picker

// tz 
// ranges
// inputs
// features


const PickerSingle = (props) => {
  const {
    type: initType = 'DATE',
    value: initValue,
    onChange,
  } = props

  const typesStack = useRef([])
  const [type, setType] = useState(initType)
  const [date, setDate] = useState(dayjs(initValue))

  const currentYear = date.year();
  const currentMonth = date.month();
  const currentDate = date.date();
  const currentDecade = getDecade(date)

  useEffect(() => {
    setDate(dayjs(initValue))
  }, [initValue]);


  const data = buildCalenederData(CALENDAR_HEADER_META, date);

  const setValue = (value) => {
    const newType = typesStack.current.shift() || type;
    if (type === newType) onChange(value)
    setDate(value);
    setType(newType);
  }

  const onDateSelect = ({ day, month, year }) => (
    setValue(dayjs().set('D', day).set('M', month).set('y', year))
  )

  const onYearSelect = (itm) => setValue(date.year(itm.value));

  const onMonthSelect = (itm) => setValue(date.month(itm.value))

  const onDecadeSelect = (itm) => setValue(date.year(itm.value.start))

  const onInreaseMonth = () => setDate(date.add(1, 'M'))

  const onReduceMonth = () => setDate(date.subtract(1, 'M'))

  const onInreaseYear = () => setDate(date.add(1, 'y'))

  const onReduceYear = () => setDate(date.subtract(1, 'y'))

  const onInreaseDecade = () => setDate(date.add(10, 'y'))

  const onReduceDecade = () => setDate(date.subtract(10, 'y'))

  const onInreaseCenture = () => setDate(date.add(100, 'y'))

  const onReduceCenture = () => setDate(date.subtract(100, 'y'))


  // icon handlers
  const onDoublePrevClick = () => {
    switch (type) {
      case TYPES.DATE_TIME:
      case TYPES.MONTH:
      case TYPES.DATE:
        onReduceYear()
        break;
      case TYPES.YEAR:
        onReduceDecade()
        break;
      case TYPES.YEAR_DECADE:
        onReduceCenture()
        break;
      default:
        break;
    }

  }

  const onDoubleNextClick = () => {
    switch (type) {
      case TYPES.DATE_TIME:
      case TYPES.MONTH:
      case TYPES.DATE:
        onInreaseYear()
        break;
      case TYPES.YEAR:
        onInreaseDecade()
        break;
      case TYPES.YEAR_DECADE:
        onInreaseCenture()
        break;
      default:
        break;
    }
  }
  // icon handlers


  // const renderMonthYearRange = () => (
  //   <>
  //     {getMonthYearPicker()}
  //     {getMonthYearPicker()}
  //   </>
  // );


  const renderMonthView = () => {
    const data = getMonthesForPicker(MONTHS)
    return getMonthYearPicker(data, onMonthSelect)
  };


  const renderYearView = () => {
    const data = getYearsForPicker(date)
    return getMonthYearPicker(data, onYearSelect)
  };


  const renderDecadeView = () => {
    const data = getDecadesForPicker(date)
    return getMonthYearPicker(data, onDecadeSelect)
  };


  const renderCalendarView = () => (
    getDayPicker({ data, onDateSelect, initValue, currentMonth })
  )

  // const renderViewRange = () => (
  //   <>
  //     {getDayPicker()}
  //     {getDayPicker()}
  //   </>
  // );


  const renderHeaderContent = () => {
    const ssetType = (newType) => {
      setType(newType);
      typesStack.current.unshift(type);
    }

    return getHeaderContent({ setType: ssetType, type, currentMonth, currentYear, currentDecade })
  }


  const renderMainContent = () => {
    switch (type) {
      case TYPES.MONTH:
        return renderMonthView();
      case TYPES.YEAR:
        return renderYearView();
      case TYPES.YEAR_DECADE:
        return renderDecadeView();
      case TYPES.DATE:
        return renderCalendarView();
      case TYPES.DATE_TIME:
        return renderCalendarView();
      default: return null;
    }
  }


  const renderRightContent = () => {
    switch (type) {
      case TYPES.DATE_TIME: return getTimePicker();
      default: return null;
    }
  }


  return (
    <Picker
      showSingleIcons={type === TYPES.DATE_TIME || type === TYPES.DATE}
      handleDoublePrevClick={onDoublePrevClick}
      handleDoubleNextClick={onDoubleNextClick}
      handlePrevClick={onReduceMonth}
      handleNextClick={onInreaseMonth}
      renderHeaderContent={renderHeaderContent}
      renderMainContent={renderMainContent}
      renderRightContent={renderRightContent}
    />
  )
}

export default PickerSingle

