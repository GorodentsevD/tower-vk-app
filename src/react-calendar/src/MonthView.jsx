import React from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days.jsx';
import Weekdays from './MonthView/Weekdays.jsx';
import WeekNumbers from './MonthView/WeekNumbers.jsx';

import {CALENDAR_TYPE_LOCALES, CALENDAR_TYPES} from './shared/const';
import {isCalendarType} from './shared/propTypes';

function getCalendarTypeFromLocale(locale) {
    return (
        Object.keys(CALENDAR_TYPE_LOCALES)
            .find(calendarType => CALENDAR_TYPE_LOCALES[calendarType].includes(locale))
        || CALENDAR_TYPES.ISO_8601
    );
}

export default function MonthView(props) {
    const {
        activeStartDate,
        locale,
        onMouseLeave,
        showFixedNumberOfWeeks,
    } = props;
    const {
        calendarType = getCalendarTypeFromLocale(locale),
        formatShortWeekday,
        onClickWeekNumber,
        showWeekNumbers,
        ...childProps
    } = props;

    function renderWeekdays() {
        return (
            <Weekdays
                calendarType={calendarType}
                formatShortWeekday={formatShortWeekday}
                locale={locale}
                onMouseLeave={onMouseLeave}
            />
        );
    }

    function renderWeekNumbers() {
        if (!showWeekNumbers) {
            return null;
        }

        return (
            <WeekNumbers
                activeStartDate={activeStartDate}
                calendarType={calendarType}
                onClickWeekNumber={onClickWeekNumber}
                onMouseLeave={onMouseLeave}
                showFixedNumberOfWeeks={showFixedNumberOfWeeks}
            />
        );
    }

    function renderDays() {
        return (
            <Days
                calendarType={calendarType}
                weeksToShow={props}
                countWeeksToSwitch={props}
                {...childProps}
            />
        );
    }

    const className = 'react-calendar__month-view';

    return (
        <div
            className={[
                className,
                showWeekNumbers ? `${className}--weekNumbers` : '',
            ].join(' ')}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                {renderWeekNumbers()}
                <div
                    style={{
                        flexGrow: 1,
                        width: '100%',
                    }}
                >
                    {renderWeekdays()}
                    {renderDays()}
                </div>
            </div>
        </div>
    );
}

MonthView.propTypes = {
    activeStartDate: PropTypes.instanceOf(Date).isRequired,
    calendarType: isCalendarType,
    formatShortWeekday: PropTypes.func,
    locale: PropTypes.string,
    onClickWeekNumber: PropTypes.func,
    onMouseLeave: PropTypes.func,
    showFixedNumberOfWeeks: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    weeksToShow: PropTypes.number,
    countWeeksToSwitch: PropTypes.number
};
