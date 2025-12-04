function AgendaList({ day, sharedNote }) {
  return (
    <main className="agenda-container">
      <div className="agenda-header">
        <h2>{day.name}</h2>
        <p className="day-date-main">{day.date}</p>
        {sharedNote && <p className="shared-note">{sharedNote}</p>}
      </div>
      <div className="agenda-items">
        {day.items.map((item) => (
          <div key={item.id} className="agenda-item">
            <div className="item-time">{item.time}</div>
            <div className="item-content">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default AgendaList

