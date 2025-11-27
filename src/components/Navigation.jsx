function Navigation({ days, selectedDay, onSelectDay }) {
  return (
    <nav className="navigation">
      <h2>Schedule</h2>
      <ul className="day-list">
        {days.map((day) => (
          <li 
            key={day.id}
            className={selectedDay.id === day.id ? 'day-item active' : 'day-item'}
            onClick={() => onSelectDay(day)}
          >
            <div className="day-name">{day.name}</div>
            <div className="day-date">{day.date}</div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

