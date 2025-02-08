import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.light,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.primary.dark,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB === null) {
    return false;
  }

  return dayA.isSame(dayB, 'week');
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

Day.propTypes = {
  day: PropTypes.object.isRequired,
  selectedDay: PropTypes.object,
  hoveredDay: PropTypes.object,
};

export default function WeeklyDateCalenderValue({ settingTheRange }) {
  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [isCalendarVisible, setIsCalendarVisible] = React.useState(true);

  const startOfWeek = React.useMemo(() => value.startOf('week'), [value]);
  const endOfWeek = React.useMemo(() => value.endOf('week'), [value]);

  React.useEffect(() => {
    if (!isCalendarVisible) {
      console.log("Start of the week:", startOfWeek.format('YYYY-MM-DD'));
      console.log("End of the week:", endOfWeek.format('YYYY-MM-DD'));
      settingTheRange(startOfWeek, endOfWeek);
      setIsCalendarVisible(false);
    }
  }, [value, startOfWeek, endOfWeek, settingTheRange, isCalendarVisible]);

  return (
    <>
      {isCalendarVisible ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setIsCalendarVisible(false);
            }}
            showDaysOutsideCurrentMonth
            displayWeekNumber
            slots={{ day: Day }}
            slotProps={{
              day: (ownerState) => ({
                selectedDay: value,
                hoveredDay,
                onPointerEnter: () => setHoveredDay(ownerState.day),
                onPointerLeave: () => setHoveredDay(null),
              }),
            }}
          />
        </LocalizationProvider>
      ) : null}
    </>
  );
}

WeeklyDateCalenderValue.propTypes = {
  settingTheRange: PropTypes.func.isRequired,
};
