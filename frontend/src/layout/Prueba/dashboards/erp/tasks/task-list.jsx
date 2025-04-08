import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import ModalTaskList from './modal/modal-task-list.jsx'
import ModalTimeKeeping from './modal/modal-timekeeping.jsx'

import TimekeepingIcon from '../../../../assets/images/erp/timekeeping-icon.svg'
import WarningIcon from '../../../../assets/images/erp/warning-icon.svg'
import ClockIcon from '../../../../assets/images/erp/clock-icon.svg'
import DeadlineIcon from '../../../../assets/images/erp/deadline-icon.svg'
import JobIcon from '../../../../assets/images/erp/job-icon.svg'
import TaskIcon from '../../../../assets/images/erp/task-icon.svg'
import { Modal, Pagination } from 'antd'

const valueTaskList = [
  {
    icon: TimekeepingIcon,
    status: 'Hôm nay',
    className: 'task-1',
    connect: 'Chấm công',
  },
  {
    icon: WarningIcon,
    status: 'Quá hạn',
    className: 'task-2',
    connect: 'Trễ hạn',
  },
  {
    icon: ClockIcon,
    status: 'Đến hạn',
    className: 'task-3',
    connect: 'Đang thực hiện',
  },
  {
    icon: DeadlineIcon,
    status: 'Sắp đến hạn',
    className: 'task-4',
    connect: 'Đang thực hiện',
  },
  {
    icon: JobIcon,
    status: 'Chờ tôi duyệt',
    className: 'task-5',
    connect: 'Đang đợi xử lí',
  },
  {
    icon: TaskIcon,
    status: 'Hoàn thành',
    className: 'task-6',
    connect: 'Hoàn thành đúng hạn',
  },
]
function TaskList({ OpenPopup }) {
  const [open, setOpen] = useState(false)
  const [openTask, setOpenTask] = useState(null)
  const [api, setApi] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [checkIn, setCheckIn] = useState(false)
  const pageSize = 3

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'))
    if (storedEvents) {
      setApi(storedEvents)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [openTask])

  const onChangePage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="task-list">
      <div className="task-list-title">
        <div>Công việc hôm nay</div>
        <img className="open-popup-icon" src={OpenPopup} onClick={() => setOpen(true)} />
      </div>
      <ModalTaskList api={api} open={open} setOpen={setOpen} />
      <div className="task-list-tasks">
        {valueTaskList.map((task, index) => {
          const filterItems = api.filter((item) => item.status === task.connect)
          const count = filterItems.length
          const pageItems = filterItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          return (
            <div className="task-list-task">
              <div
                onClick={() => setOpenTask(index)}
                className={`task-list-task-icon ${task.className}`}
              >
                <img src={task.icon} />
              </div>
              <div className="task-list-task-content">
                {index === 0 ? (
                  <div>{checkIn ? 'Đã chấm công' : 'Chưa chấm công'}</div>
                ) : (
                  <div>{count} công việc</div>
                )}
                <span>{task.status}</span>
              </div>
              {openTask == index ? (
                <Modal
                  className="task-list-task-modal"
                  open={true}
                  onCancel={() => setOpenTask(null)}
                  footer={null}
                >
                  {index === 0 ? (
                    <ModalTimeKeeping checkIn={checkIn} setCheckIn={setCheckIn} />
                  ) : (
                    <>
                      <div className="task-list-task-modal-header">Số công việc {task.status}</div>
                      {pageItems.map((api, i) => (
                        <div class="card" key={i}>
                          <div className={`${api.className} card-header`}>{api.title}</div>
                          <div class="card-content">
                            <p>
                              Ngày bắt đầu: {dayjs(api.start, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                            </p>
                            <p>
                              Ngày kết thúc: {dayjs(api.end, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                            </p>
                            <p>Trạng thái: {api.status}</p>
                          </div>
                        </div>
                      ))}
                      <div className="task-list-task-modal-footer">
                        <div className="total">Tổng: {count}</div>
                        {count > pageSize ? (
                          <Pagination
                            simple
                            current={currentPage}
                            pageSize={pageSize}
                            total={count}
                            onChange={onChangePage}
                          />
                        ) : null}
                      </div>
                    </>
                  )}
                </Modal>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
