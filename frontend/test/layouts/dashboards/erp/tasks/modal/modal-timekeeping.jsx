import { useState } from 'react'
import { Switch, Modal } from 'antd'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

function ModalTimeKeeping({ checkIn, setCheckIn }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)
  const [timeDifference, setTimeDifference] = useState(null)

  const handleSwitchChange = (checked) => {
    if (checked) {
      const currentTime = dayjs()
      setCheckInTime(currentTime)
      setCheckIn(true)
    } else if (checkIn) {
      setIsModalVisible(true)
    }
  }

  const handleConfirm = () => {
    const currentTime = dayjs()
    setCheckOutTime(currentTime)
    setCheckIn(false)
    setIsModalVisible(false)

    if (checkInTime) {
      const difference = dayjs.duration(currentTime.diff(checkInTime))
      setTimeDifference(difference)
    }
  }

  return (
    <div>
      <div className="task-list-task-modal-header">Chấm công</div>
      <Switch
        checkedChildren="Trong ca"
        unCheckedChildren="Chưa vào ca"
        defaultChecked={checkIn}
        onChange={handleSwitchChange}
      />
      <Modal
        title="Xác nhận"
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={() => setIsModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn tắt trạng thái chấm công không?</p>
      </Modal>
      <div>
        <p>{checkInTime ? `Ngày làm việc: ${checkInTime.format('DD-MM-YYYY')}` : null}</p>
        <p>{checkInTime ? `Thời gian vào ca: ${checkInTime.format('HH:mm:ss')}` : null}</p>
        <p>{checkOutTime ? `Thời gian ra ca: ${checkOutTime.format('HH:mm:ss')}` : null}</p>
        <p>
          {timeDifference
            ? `Thời gian làm việc: ${timeDifference.hours()} giờ, ${timeDifference.minutes()} phút,
          ${timeDifference.seconds()} giây`
            : null}
        </p>
      </div>
    </div>
  )
}

export default ModalTimeKeeping
