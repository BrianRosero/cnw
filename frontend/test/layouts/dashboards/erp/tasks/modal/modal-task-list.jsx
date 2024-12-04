import { Modal, Card, Col, Row } from 'antd'
import { useState, useEffect } from 'react'
import { API_BASE_URL } from 'config.jsx'
import dayjs from 'dayjs'

function ModalTaskList({ open, setOpen, api }) {
  /* const test = api.map((data) => data.start)
  console.log(typeof test[0]) // string

  const formattedDates = test.map((date) => dayjs(date, 'YYYY-MM-DD').format('DD-MM-YYYY'))
  console.log(formattedDates) */

  return (
    <div>
      {open === true ? (
        <Modal width={1800} open={open} footer={null} onCancel={() => setOpen(false)}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </div>
  )
}

export default ModalTaskList
