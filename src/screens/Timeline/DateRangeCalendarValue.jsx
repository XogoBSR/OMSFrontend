import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import PropTypes from 'prop-types';


export default function DateRangeCalendarValue({settingTheRange}) {

    function getStartDate() {
        const startDate = new Date()
        const day = String(startDate.getUTCDate()).padStart(2,'0')
        const month = String(startDate.getUTCMonth() +1).padStart(2,'0')
        const year = startDate.getUTCFullYear()
        return `${year}-${month}-${day}`
    }

    function getEndDate() {
        const startDate = new Date()
        const day = String(startDate.getUTCDate()+1).padStart(2,'0')
        const month = String(startDate.getUTCMonth()+1).padStart(2,'0')
        const year = startDate.getUTCFullYear()
        return `${year}-${month}-${day}`
    }

  const [value, setValue] = React.useState([
    dayjs(getStartDate()),
    dayjs(getEndDate()),
  ]);

  React.useEffect(() => {
    console.log("Date Picker ",value)
    if(value.length > 1) {
      settingTheRange(value[0].$d,value[1].$d)
    }
  },[])

  function settingDate(newValue) {
    console.log("Setting Date ",new Date())
    setValue(newValue)
    if(newValue.length > 1) {
      settingTheRange(newValue[0].$d,newValue[1].$d)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DemoItem component="DateRangePicker">
          <DateRangePicker
            value={value}
            onChange={settingDate}
            id="datePicker"
          />
        </DemoItem>
      </DemoContainer>
      <br></br>
    </LocalizationProvider>
    
  );
}

DateRangeCalendarValue.propTypes = {
  settingTheRange : PropTypes.func
}