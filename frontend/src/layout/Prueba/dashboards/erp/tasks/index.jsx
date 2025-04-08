import TaskList from './task-list'
import TaskReport from './task-report'
import Calendar from './calendar'
import OpenPopup from '../../../../assets/images/erp/open-popup.svg'

function Tasks() {
  return (
    <div className="layout-tab-task">
      <div className="layout-left">
        <TaskList OpenPopup={OpenPopup}></TaskList>
        <TaskReport OpenPopup={OpenPopup}></TaskReport>
      </div>
      <div className="layout-right">
        <Calendar OpenPopup={OpenPopup}></Calendar>
      </div>
    </div>
  )
}

export default Tasks
