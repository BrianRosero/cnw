import Calendar from 'examples/Calendar'
import { Modal } from 'antd'
function ModalCalendar({ open, setOpen, data }) {
  return (
    <div>
      {open === true ? (
        <Modal
          width={1000}
          open={open}
          footer={null}
          className="modal-calendar"
          onCancel={() => setOpen(false)}
          getContainer={() => document.getElementsByClassName('calendar')[0]}
          afterClose={() => console.log(data.current)}
        >
          <Calendar data={data} />
        </Modal>
      ) : null}
    </div>
  )
}

export default ModalCalendar
