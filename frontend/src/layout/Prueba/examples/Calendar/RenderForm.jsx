import { DatePicker, Input, Form, Select, Button, ConfigProvider } from 'antd'

function RenderForm({
  onFinish,
  handleCancel,
  form,
  validClassNames,
  currentEvent,
  handleCheckEdit,
  isEdited,
}) {
  const options = validClassNames.map((event) => ({
    value: event.status,
    label: event.status,
  }))

  const validateEndDate = (_, value) => {
    const startDate = form.getFieldValue('startDate')

    if (startDate && value && value.isBefore(startDate, 'day')) {
      return Promise.reject('Ngày kết thúc không thể trước ngày bắt đầu!')
    }
    return Promise.resolve()
  }

  const handleDatePickerChange = () => {
    handleCheckEdit()
    form.validateFields(['endDate'])
  }

  const customTheme = {
    components: {
      DatePicker: {
        zIndexPopup: 1500,
      },
    },
  }

  const handleFieldsChange = (field, allField) => {}

  return (
    <div className="form-container">
      <ConfigProvider theme={customTheme}>
        <Form
          clearOnDestroy={true}
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="form"
          onFieldsChange={handleFieldsChange}
        >
          <Form.Item
            label="Tên sự kiện"
            name="content"
            className="custom-label"
            rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
          >
            <Input onChange={handleCheckEdit} placeholder="Tên sự kiện..." />
          </Form.Item>

          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            className="custom-label"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
          >
            <DatePicker
              onChange={handleDatePickerChange}
              className="full-width"
              placeholder="Chọn ngày bắt đầu"
            />
          </Form.Item>

          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            className="custom-label"
            rules={[
              { required: true, message: 'Vui lòng chọn ngày kết thúc!' },
              { validator: validateEndDate },
            ]}
            dependencies={['startDate']}
          >
            <DatePicker
              onChange={handleCheckEdit}
              className="full-width"
              placeholder="Chọn ngày kết thúc"
            />
          </Form.Item>

          <Form.Item
            label="Loại sự kiện"
            name="typeEvent"
            className="custom-label"
            rules={[{ required: true, message: 'Vui lòng chọn loại sự kiện!' }]}
            dependencies={['typeEvent']}
          >
            <Select
              showSearch
              placeholder="Chọn loại sự kiện"
              optionFilterProp="label"
              options={options}
              className="select-type-event"
              onChange={handleCheckEdit}
            />
          </Form.Item>

          <Form.Item className="form-item-footer">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button
              className="btn-submit"
              disabled={!isEdited && currentEvent !== null}
              type="primary"
              htmlType="submit"
            >
              {currentEvent == null ? 'Tạo' : 'Lưu'}
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  )
}

export default RenderForm
