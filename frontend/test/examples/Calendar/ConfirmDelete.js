import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

function ConfirmDelete({ confirmDelete, setConfirmDelete, handleDeleteEvent }) {
  return (
    <Modal
      title={
        <span>
          <ExclamationCircleOutlined style={{ color: 'red', marginRight: '8px' }} />
          Xác nhận xóa sự kiện
        </span>
      }
      className="modal-confirm-delete"
      open={confirmDelete}
      onCancel={() => setConfirmDelete(false)}
      maskClosable={false}
      footer={[
        <Button key="cancel" onClick={() => setConfirmDelete(false)}>
          Hủy
        </Button>,
        <Button
          key="confirm"
          type="primary"
          className="btn-submit"
          onClick={() => {
            handleDeleteEvent()
          }}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa sự kiện này không?</p>
    </Modal>
  )
}

export default ConfirmDelete
