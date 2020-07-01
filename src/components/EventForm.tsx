import { Button, Card, Form } from "antd";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useStore } from "../Context";
import { ItemField } from "./ItemField";


interface EventFormProps {
  initialValues: any,
  onValuesChange: (form: any) => (changedValues: any, allValues: any) => void
}

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 12 },
};

export const EventForm: FC<EventFormProps> = observer(({ initialValues, onValuesChange }) => {

  const [form] = Form.useForm();
  const store = useStore();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const eventDate = { displayFormName: 'Todays Date', valueType: 'DATE', id: 'eventDate' }

  return (
    <Form onValuesChange={onValuesChange(form)} {...layout} form={form} name="control-hooks" onFinish={onFinish} size="large" initialValues={initialValues}>
      <ItemField key="eventDate" item={eventDate} />
      {store.currentProgramStageSections.map((ps: any) => {
        return <Card title={ps.name} key={ps.id} style={{ margin: 0, padding: 0 }}>
          {ps.dataElements.map((de: any) => {
            return <ItemField key={de.id} item={de} />
          })}
        </Card>
      })}

      <Card>
        <Form.Item labelAlign="left" {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Complete
          </Button>
        </Form.Item>
      </Card>
    </Form>
  )

})