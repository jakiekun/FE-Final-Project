import { useState } from 'react'
import { getAvail } from '../data/academy.js'

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Booking modal: shows the coach's availability for the next 14 days.
export default function BookingCalendar({ coach, onClose }) {
  const avail = getAvail(coach.id)
  const today = new Date()
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const available = avail.days.includes(d.getDay()) && !avail.blocked.includes(iso)
    return { iso, wd: WD[d.getDay()], dd: d.getDate(), mon: MON[d.getMonth()], available, isToday: i === 0 }
  })

  const [selDay, setSelDay] = useState(null)
  const [slot, setSlot] = useState(null)
  const [tier, setTier] = useState(coach.tiers?.[0] || 'Free')
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="card modal text-center" onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: 48 }}>📅</div>
          <h3 className="mt-2">Session booked!</h3>
          <p className="muted mt-1">
            With <b>{coach.name}</b> on <b>{selDay.wd} {selDay.mon} {selDay.dd}</b> at <b>{slot}</b> · {tier}.
          </p>
          <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>They’ll confirm in chat. GLHF! 🎮</p>
          <button className="btn btn--primary btn--block mt-3" onClick={onClose}>Done</button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
        <div className="spread" style={{ marginBottom: 4 }}>
          <h3>📅 Book {coach.name}</h3>
          <button className="btn btn--ghost" style={{ padding: 4 }} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <p className="muted" style={{ fontSize: 13, marginBottom: 12 }}>Pick an available slot from the coach’s calendar.</p>

        <div className="book-cal">
          {days.map((d) => (
            <button
              key={d.iso}
              className={'book-day' + (d.available ? '' : ' is-off') + (selDay?.iso === d.iso ? ' is-sel' : '')}
              disabled={!d.available}
              onClick={() => { setSelDay(d); setSlot(null) }}
            >
              <span className="book-day__wd">{d.isToday ? 'Today' : d.wd}</span>
              <span className="book-day__dd">{d.dd}</span>
              <span className="book-day__mon">{d.mon}</span>
            </button>
          ))}
        </div>

        {selDay && (
          <>
            <div className="book-label">Time ({selDay.wd} {selDay.mon} {selDay.dd})</div>
            <div className="chip-group">
              {avail.slots.map((s) => (
                <button key={s} className={'chip' + (slot === s ? ' chip--active' : '')} onClick={() => setSlot(s)}>{s}</button>
              ))}
            </div>

            {coach.tiers?.length > 1 && (
              <>
                <div className="book-label">Session type</div>
                <div className="chip-group">
                  {coach.tiers.map((t) => (
                    <button key={t} className={'chip' + (tier === t ? ' chip--active' : '')} onClick={() => setTier(t)}>{t}</button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <button className="btn btn--primary btn--block btn--lg mt-3" disabled={!selDay || !slot} onClick={() => setDone(true)}>
          {selDay && slot ? `Book ${selDay.wd} ${selDay.dd} · ${slot}` : 'Pick a day & time'}
        </button>
      </div>
    </div>
  )
}
