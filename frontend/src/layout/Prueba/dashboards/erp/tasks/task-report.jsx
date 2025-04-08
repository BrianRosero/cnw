import { useState } from 'react'
import { Button, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import DoughnutChart from 'components/Erp/Chart'
import ModalTaskReport from './modal/modal-task-report.jsx'

const time = 'Tuần này'

const dataChart = [
  { label: 'Hoàn thành trước hạn', data: 2, backgroundColor: '#04B9A7' },
  { label: 'Hoàn thành đúng hạn', data: 3, backgroundColor: '#2275FF' },
  { label: 'Hoàn thành trễ hạn', data: 0, backgroundColor: '#F9757E' },
  { label: 'Chờ duyệt', data: 1, backgroundColor: '#C327E2' },
  { label: 'Chưa hoàn thành', data: 2, backgroundColor: '#A0AEC0' },
  { label: 'Quá hạn', data: 2, backgroundColor: '#F1252B' },
]

const dataChartRelateTo = [
  { label: 'Hoàn thành trước hạn', data: 4, backgroundColor: '#04B9A7' },
  { label: 'Hoàn thành đúng hạn', data: 2, backgroundColor: '#2275FF' },
  { label: 'Hoàn thành trễ hạn', data: 1, backgroundColor: '#F9757E' },
  { label: 'Chờ duyệt', data: 1, backgroundColor: '#C327E2' },
  { label: 'Chưa hoàn thành', data: 2, backgroundColor: '#A0AEC0' },
  { label: 'Quá hạn', data: 2, backgroundColor: '#F1252B' },
]

function TaskReport({ OpenPopup }) {
  const [selectReport, setSelectReport] = useState('Việc của tôi')
  const [open, setOpen] = useState(false)

  const items = [
    {
      key: '1',
      label: <a onClick={() => setSelectReport('Việc của tôi')}>Việc của tôi</a>,
    },
    {
      key: '2',
      label: (
        <a onClick={() => setSelectReport('Việc liên quan đến tôi')}>Việc liên quan đến tôi</a>
      ),
    },
  ]

  return (
    <div className="task-report">
      <div className="task-report-title">
        <div className="task-report-title-left">Báo cáo công việc</div>
        <div className="task-report-title-right">
          <div>
            <Dropdown
              menu={{
                items,
              }}
              arrow={true}
              placement="bottomRight"
            >
              <Button>
                {selectReport}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="time">{time}</div>
          <img className="open-popup-icon" src={OpenPopup} onClick={() => setOpen(true)} />
        </div>
      </div>
      <ModalTaskReport
        open={open}
        setOpen={setOpen}
        DoughnutChart={DoughnutChart}
        dataChart={dataChart}
        dataChartRelateTo={dataChartRelateTo}
        selectReport={selectReport}
      />
      <DoughnutChart data={selectReport === 'Việc của tôi' ? dataChart : dataChartRelateTo} />
    </div>
  )
}

export default TaskReport
