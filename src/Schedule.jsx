import PropTypes from 'prop-types';
import {useMemo, useState} from 'react';
import ScheduleBodyRow from './ScheduleBodyRow.jsx';

function Schedule({data}) {

    const [monthHeaderRanges, setMonthHeaderRanges] = useState([])

    useMemo(() => {
        let earliestDate = new Date();
        let latestDate = new Date();
        data.forEach(listItem => {
            const schedules = Object.keys(listItem.schedule);
            const earliestSchedule = new Date(schedules[0]);
            const latestSchedule = new Date(schedules[schedules.length-1]);
            if (earliestSchedule < earliestDate) {
                earliestDate = earliestSchedule
            }
            if (latestSchedule > latestDate) {
                latestDate = latestSchedule
            }
        })
        const newFirstDisplayDate = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
        const newLastDisplayDate = new Date(latestDate.getFullYear(), latestDate.getMonth() + 1, 0);

        let monthHeaderRanges = [];
        for (let i = newFirstDisplayDate; i <= newLastDisplayDate; i = new Date(i.getFullYear(), i.getMonth()+1, 1)) {
            monthHeaderRanges.push({
                firstDate: new Date(i.getFullYear(), i.getMonth(), 1),
                lastDate: new Date(i.getFullYear(), i.getMonth() + 1, 0),
                label: i.toLocaleString('default', {month: 'short'})
            })
        }
        setMonthHeaderRanges(monthHeaderRanges);
    }, [data])

    return (
        <div className="ScheduleContainer">
            <div className="ScheduleContainer-FilterRow">
                {`Amortization (${data.length})`}
                <div className='ScheduleContainer-FilterRow-SortDropdown'>
                    Sort By
                </div>
                <div className='ScheduleContainer-HeaderRow'>
                    <div className='LeftColumn Header'>
                        ID VENDOR ACCOUNT AMOUNT PERIOD
                    </div>
                    <div className='MonthHeaderContainer'>
                        {
                            monthHeaderRanges.map(month =>
                                (<div className='MonthHeader' key={`month-header-${month.firstDate}`}>
                                    {month.label}
                                </div>)
                        )}
                    </div>
                </div>
                {
                    data.map(scheduleRow =>
                        (
                        <>
                        <div className='LeftColumn ScheduleRow' key={`schedule-row-${scheduleRow.id}`}>
                            <span>{scheduleRow.id}</span>
                            <span>{scheduleRow.vendor}</span>
                            <span>{scheduleRow.account}</span>
                            <span>{scheduleRow.amount}</span>
                            <span>{scheduleRow.period}</span>
                        </div>
                        <ScheduleBodyRow 
                            id={scheduleRow.id}
                            schedule={scheduleRow.schedule}
                            monthHeaderRanges={monthHeaderRanges}
                        />
                        </>
                        )
                )}
            </div>
        </div>
    )
}

Schedule.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        account: PropTypes.string,
        amount: PropTypes.string,
        id: PropTypes.string,
        period: PropTypes.string,
        schedule: PropTypes.object,
        vendor: PropTypes.string,
    }))
}

export default Schedule;

// {
//     "account": "Software",
//     "amount": "$27,995.00",
//     "id": "130001",
//     "period": "2023-06-01 to 2024-05-31",
//     "schedule": {
//       "2023-06-01": "$2,332.92",
//       "2023-07-01": "$2,332.92",
//       "2023-08-01": "$2,332.92",
//       "2023-09-01": "$2,332.92",
//       "2023-10-01": "$2,332.92",
//       "2023-11-01": "$2,332.92",
//       "2023-12-01": "$2,332.92",
//       "2024-01-01": "$2,332.92",
//       "2024-02-01": "$2,332.92",
//       "2024-03-01": "$2,332.92",
//       "2024-04-01": "$2,332.92",
//       "2024-05-01": "$2,332.88"
//     },
//     "vendor": "Intercom"
//   },