function ScheduleBodyRow({
    id,
    schedule,
    monthHeaderRanges
}) {

    function findEntry(monthRange) {
        
        console.log(monthRange.firstDate, Object.keys(schedule))
        console.log(typeof monthRange.firstDate)
        const match = Object.keys(schedule).find(scheduleItem => 
            (new Date(scheduleItem) >= monthRange.firstDate && new Date(scheduleItem) <= monthRange.lastDate));
        if (match) { console.log('MATCH', match, Object.values(match)[0])}
        return match ? Object.values(match)[0] : '';
    }

    return (
        monthHeaderRanges.map( monthRange =>
            (<div key={`${id}-${monthRange.firstDate}`} className="ScheduleEntry">
                {findEntry(monthRange)}
            </div>)
        )

    )
}

export default ScheduleBodyRow;