import { Modal, Tabs } from 'antd'

function ModalTaskReport({
  open,
  setOpen,
  DoughnutChart,
  dataChart,
  dataChartRelateTo,
  selectReport,
}) {
  const items = [
    { label: `Việc của tôi`, key: '1', children: <DoughnutChart data={dataChart} /> },
    {
      label: `Việc liên quan đến tôi`,
      key: '2',
      children: <DoughnutChart data={dataChartRelateTo} />,
    },
  ]
  return (
    <div>
      {open === true ? (
        <Modal forceRender width={1000} open={open} footer={null} onCancel={() => setOpen(false)}>
          <Tabs
            defaultActiveKey={selectReport === 'Việc của tôi' ? '1' : '2'}
            type="card"
            items={items}
          />
        </Modal>
      ) : null}
    </div>
  )
}

export default ModalTaskReport
