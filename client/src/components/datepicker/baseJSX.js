import React, { useState, useMemo, useRef, useEffect } from 'react'
import get from 'lodash/get'
import classnames from 'classnames'
import { isSelected, isCurrent } from './utils'


import {
  MONTHS,
  MIN_SEC,
  HOURS,
  SELECTION_STEPS,
  CALENDAR_HEADER_META,
  RANGE_TYPES,
  TYPES,
} from './constants'


export const getTimePicker = () => (
  <div className='timepicker-wrapper'>
    <div>
      {
        HOURS.map(el => (<div key={el} className='timepicker-wrapper_item'>{el}</div>))
      }
    </div>
    <div>
      {
        MIN_SEC.map(el => (<div className='timepicker-wrapper_item'>{el}</div>))
      }
    </div>
    <div>
      {
        MIN_SEC.map(el => (<div className='timepicker-wrapper_item'>{el}</div>))
      }
    </div>
  </div>
);


export const getMonthYearPicker = (data, eventHandler) => (
  <div className='month-year-picker-wrapper'>
    {
      data.map(el => (
        <div
          key={el.label}
          onClick={() => eventHandler(el)}
        >
          <span>{el.label}</span>
        </div>
      ))
    }
  </div>
);


export const getDayPicker = ({ data, onDateSelect, initValue, currentMonth }) => {
  return (
    <div className='calendar-wrapper'>
      <div style={{ display: 'flex' }}>
        {
          CALENDAR_HEADER_META.map(el => (
            <div className='cell' key={el.label}>{el.label}</div>
          ))
        }
      </div>
      <div>
        {
          data.map((week) => (
            <div
              style={{ display: 'flex' }}
              key={week.id}
            >
              {
                CALENDAR_HEADER_META.map((col, idx) => {
                  const day = get(week[col.weekDay], 'value', '')
                  const month = get(week[col.weekDay], 'month', '')
                  const year = get(week[col.weekDay], 'year', '')
                  return (
                    <div
                      key={week.id + idx}
                      onClick={() => onDateSelect({ day, month, year })}
                      className={classnames('cell', {
                        'cell_grey': month !== currentMonth,
                        'cell_selected': isSelected(month, day, year, initValue),
                        'cell_current': isCurrent(month, day, year)
                      })}
                    >
                      <div>{day}</div>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}


export const getHeaderContent = ({
  setType,
  type,
  currentMonth,
  currentYear,
  currentDecade,
}) => {
  const wrapContent = element => (
    <div className='header-content-itm'>
      <div>{element}</div>
    </div>
  );

  switch (type) {
    case TYPES.MONTH:
      return wrapContent(
        <button onClick={() => setType(TYPES.YEAR)}>{currentYear}</button>
      )
    case TYPES.YEAR:
      return wrapContent(
        <button onClick={() => setType(TYPES.YEAR_DECADE)}>{`${currentDecade.start} - ${currentDecade.end}`}</button>
      )
    case TYPES.YEAR_DECADE:
      return wrapContent(<>{`${currentDecade.start} - ${currentDecade.end}`}</>)
    case TYPES.DATE:
      return wrapContent(
        <>
          <button onClick={() => setType(TYPES.MONTH)}>{MONTHS[currentMonth]}</button>
          <button onClick={() => setType(TYPES.YEAR)}>{currentYear}</button>
        </>
      )
    case TYPES.DATE_TIME:
      return wrapContent(
        <>
          <button onClick={() => setType(TYPES.MONTH)}>{MONTHS[currentMonth]}</button>
          <button onClick={() => setType(TYPES.YEAR)}>{currentYear}</button>
        </>
      )
    default: return null;
  };
}