import { useEffect, useRef, useState } from 'react'

import { Form, Modal } from 'antd'

import dayjs from 'dayjs'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import CalendarRoot from 'examples/Calendar/CalendarRoot'
import RenderForm from 'examples/Calendar/RenderForm'
import ConfirmDelete from 'examples/Calendar/ConfirmDelete'
import IconDelete from '../../assets/images/erp/delete-icon.svg'
import './styles.scss'
import { API_BASE_URL } from 'config.jsx'

function Calendar({ data }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [isEdited, setIsEdited] = useState(false)
  const [validClassNames, setValidClassNames] = useState([])
  const dateClick = useRef(null)
  const eventClick = useRef(null)
  const checkEdit = useRef(null)
  const calendarRef = useRef(null)

  data.current = events

  useEffect(() => {
    fetch(`${API_BASE_URL}/validClassNames`)
      .then((response) => response.json())
      .then((data) => setValidClassNames(data))
      .catch((error) => console.error(error))

    const storedEvents = JSON.parse(localStorage.getItem('events'))
    if (storedEvents) {
      setEvents(storedEvents)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    if (dateClick.current != null) {
      if (open) {
        form.setFieldsValue({
          content: '',
          startDate: dateClick.current,
          endDate: dateClick.current.add(1, 'day'),
          typeEvent: null,
        })
        dateClick.current = null
      }
    }
    if (eventClick.current != null) {
      if (open) {
        form.setFieldsValue({
          content: eventClick.current.title,
          startDate: dayjs(eventClick.current.start),
          endDate: dayjs(eventClick.current.end).add(-1, 'day'),
          typeEvent: eventClick.current.extendedProps.status,
        })
        setCurrentEvent(eventClick.current)
        eventClick.current = null
      }
    } else {
      setCurrentEvent(null)
    }
  }, [open])

  const handleCheckEdit = () => {
    checkEdit.current = form.isFieldsTouched(['content', 'startDate', 'endDate', 'typeEvent'])
    checkEdit.current && setIsEdited(checkEdit.current)
  }

  const handleDateClick = (info) => {
    dateClick.current = dayjs(info.dateStr)
    setOpen(true)
  }

  const handleEventClick = (info) => {
    eventClick.current = info.event
    setOpen(true)
  }

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((event) => event.id != currentEvent.id)
    setEvents(updatedEvents)
    setConfirmDelete(false)
    setOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setOpen(false)
  }

  const onFinish = (values) => {
    if (currentEvent == null) {
      validClassNames.map((type) => {
        if (type.status === values.typeEvent) {
          setEvents((props) => [
            ...props,
            {
              id: Date.now(),
              title: values.content,
              start: values.startDate.format('YYYY-MM-DD'),
              end: values.endDate.add(1, 'day').format('YYYY-MM-DD'),
              status: values.typeEvent,
              className: type.class,
            },
          ])
        }
      })
      setOpen(false)
    } else {
      setEvents(
        events.map((event) => {
          if (event.id === +currentEvent.id) {
            const foundClassName = validClassNames.find((type) => type.status === values.typeEvent)
            return {
              ...event,
              title: values.content,
              start: values.startDate.format('YYYY-MM-DD'),
              end: values.endDate.add(1, 'day').format('YYYY-MM-DD'),
              status: values.typeEvent,
              className: foundClassName ? foundClassName.class : event.className,
            }
          }
          return event
        })
      )
      setOpen(false)
      setIsEdited(false)
    }
  }

  const customButtons = {
    myPrev: {
      text: '<',
      className: 'btn-prev-next',
      click: function () {
        calendarRef.current.getApi().prev()
      },
    },
    myNext: {
      text: '>',
      className: 'btn-prev-next',
      click: function () {
        calendarRef.current.getApi().next()
      },
    },
  }

  return (
    <div>
      <CalendarRoot p={2}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          height="100%"
          headerToolbar={{
            left: 'myPrev title myNext today',
            right: 'timeGridDay timeGridWeek dayGridMonth',
          }}
          customButtons={customButtons}
          titleFormat={{ year: 'numeric', month: '2-digit' }}
          buttonText={{
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
          }}
          editable={true}
          locale="vi"
        />
        <Modal
          forceRender
          title="Tạo sự kiện"
          open={open}
          footer={null}
          onCancel={handleCancel}
          closable={currentEvent != null ? false : true}
          className="modal-form-add-event-calendar"
        >
          {currentEvent != null ? (
            <div onClick={() => setConfirmDelete(true)} className="btn-delete">
              <img src={IconDelete} alt="Delete" />
            </div>
          ) : null}

          <RenderForm
            onFinish={onFinish}
            handleCancel={handleCancel}
            form={form}
            validClassNames={validClassNames}
            currentEvent={currentEvent}
            handleCheckEdit={handleCheckEdit}
            isEdited={isEdited}
          />
        </Modal>
        <ConfirmDelete
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteEvent={handleDeleteEvent}
        />
      </CalendarRoot>
    </div>
  )
}

export default Calendar
