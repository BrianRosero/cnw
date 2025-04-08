import { useState, useRef } from 'react'
import Calendar from 'examples/Calendar'
import ModalCalendar from './modal/modal-calendar.jsx'
import CalendarIcon from '../../../../assets/images/erp/calendar-icon.svg'

function CalendarTask({ OpenPopup }) {
  const [open, setOpen] = useState(false)
  const data = useRef([])

  return (
    <div className="calendar">
      <div className="calendar-title">
        <div className="calendar-title-left">
          <img className="calendar-title-left-icon" src={CalendarIcon} />
          <div>Lịch công việc</div>
        </div>
        <img className="open-popup-icon" src={OpenPopup} onClick={() => setOpen(true)} />
      </div>
      <ModalCalendar data={data} open={open} setOpen={setOpen} />
      <Calendar data={data} />
    </div>
  )
}

export default CalendarTask
