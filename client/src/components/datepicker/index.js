import React, { useState, useMemo, useEffect } from 'react'
import get from 'lodash/get'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import classnames from 'classnames'
import Picker from './Picker'
import { buildCalenederData, getDecade } from './utils'
import { SELECTION_STEPS, CALENDAR_HEADER_META, RANGE_TYPES } from './constants'
import PickerSingle from './PickerSingle'
import PickerRange from './PickerRange'
import './index.scss'

dayjs.extend(isoWeek)
dayjs.extend(customParseFormat)

const Datepicker = (props) => {
  const {
    type,
    format = 'DD/MM/YYYY',
    value,
  } = props;

  const [isOpen, setIsOpen] = useState()
  const [inputValue, setInputValue] = useState('')
  const [singlePickerValue, setSinglePickerValue] = useState()

  useEffect(() => {
    if (value) {
      const date = dayjs(value);
      const isValid = date.isValid();

      if (isValid) {
        setInputValue(date.format(format))
        setSinglePickerValue(date)
      }
    }
  }, [value]);


  const onInputBlur = (e) => {
    const date = dayjs(e.target.value, format);
    const isValid = date.isValid();

    setInputValue(isValid ? date.format(format) : '')
    setSinglePickerValue(isValid ? date : undefined)
  }

  const onInputChange = (e) => {
    setInputValue(e.target.value)

    const date = dayjs(e.target.value, format);
    const isValid = date.isValid();
    if (isValid) {
      debugger
      setSinglePickerValue(date)
    }
  }


  const onChange = (value) => {
    setIsOpen(false)
    setInputValue(value.format(format))
    setSinglePickerValue(value)
  }

  const renderPicker = () => {
    if (RANGE_TYPES.includes(type)) {
      return (
        <PickerRange
          type={type}
        />
      )
    }
    return (
      <PickerSingle
        type={type}
        onClose={() => setIsOpen(false)}
        onChange={onChange}
        value={singlePickerValue}
      />
    )
  }

  return (
    <div className='datepicker'>
      <input
        onClick={() => setIsOpen(true)}
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
        className='input'
        type="text"
        placeholder='Select date'
      />
      {isOpen && renderPicker()}
    </div>
  )
}

export default Datepicker
