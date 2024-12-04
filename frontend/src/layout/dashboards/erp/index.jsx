import { useEffect, useState } from 'react'
import Icon from '@mui/material/Icon'
import { Tabs, Popover, Dropdown, Button, Menu, Divider, Modal } from 'antd'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import { navbarDesktopMenu } from 'examples/Navbars/DashboardNavbar/styles'
import { useSoftUIController, setMiniSidenav, setTransparentNavbar } from 'context'
import BellIcon from '../../../assets/images/erp/bell-icon.svg'
import Avatar from '../../../assets/images/erp/avatar-doraemon.jpg'
import LogOutIcon from '../../../assets/images/erp/logout-icon.svg'
import Tasks from './tasks'
import Business from './business'
import './styles.scss'

function ERP() {
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav)
  const [navbarType, setNavbarType] = useState()
  const [controller, dispatch] = useSoftUIController()
  const { miniSidenav, fixedNavbar } = controller
  const [openAvatar, setOpenAvatar] = useState(false)

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType('sticky')
    } else {
      setNavbarType('static')
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar)
    }
    window.addEventListener('scroll', handleTransparentNavbar)

    handleTransparentNavbar()

    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])

  const customTheme = {
    token: {
      colorText: '#344767',
    },
  }

  const text = <span>Thông báo</span>

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )

  const itemTabs = [
    {
      key: '1',
      label: 'Việc cần làm',
      children: <Tasks />,
    },
    {
      key: '2',
      label: 'Kinh doanh',
      children: <Business />,
    },
  ]

  const menu = (
    <Menu className="custom-menu">
      <Menu.Item className="custom-cursor" key="1" disabled>
        <div className="info" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Avatar} />
          <span className="name">Doraemon</span>
          <span className="position">Robot</span>
          <span className="email">doraemon@gmail.com</span>
        </div>
      </Menu.Item>
      <Divider />
      <Menu.Item className="custom-cursor" key="2" disabled>
        <div className="button" style={{ display: 'flex', alignItems: 'center' }}>
          <Button className="edit-avatar" type="text" onClick={() => setOpenAvatar(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="14"
              height="14"
              className="icon"
            >
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                fill="#606368" /* Màu mặc định */
              />
            </svg>
            Xem ảnh đại diện
          </Button>
          <Button className="log-out" type="text">
            <img src={LogOutIcon} />
            Đăng xuất
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="full-layout">
      <DashboardLayout>
        <div className="layout">
          <div className="layout-title">
            <div className="layout-title-left">
              <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
                {miniSidenav ? 'menu_open' : 'menu'}
              </Icon>
              <div>Xin chào, Hệ thống!</div>
            </div>
            <div className="layout-title-right">
              <Popover placement="bottomRight" title={text} content={content} trigger="click">
                <div className="bell">
                  <img src={BellIcon} />
                </div>
              </Popover>
              <Dropdown
                overlay={menu}
                className="avatar"
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                trigger={['click']}
                // open={openAvatar == true ? 'close' : null}
              >
                <img onClick={(e) => e.preventDefault()} src={Avatar} />
              </Dropdown>
            </div>
          </div>
          <div className="layout-tabs">
            <Tabs defaultActiveKey="1" items={itemTabs} />
          </div>
        </div>
        {openAvatar === true ? (
          <Modal
            open={openAvatar}
            footer={null}
            closeIcon={false}
            onCancel={() => setOpenAvatar(false)}
            className="modal-avatar"
          >
            <img src={Avatar} />
          </Modal>
        ) : null}
      </DashboardLayout>
    </div>
  )
}

export default ERP
