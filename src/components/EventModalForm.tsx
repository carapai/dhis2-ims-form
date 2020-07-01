import { Button, Card, Form } from "antd";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useStore } from "../Context";
import { ItemField } from "./ItemField";


interface EventFormProps {
  initialValues?: any,
  onFinish: (vals: any) => void
}

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

export const EventForm: FC<EventFormProps> = observer(({ initialValues = {}, onFinish }) => {

  const [form] = Form.useForm();
  const store = useStore();
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} size="large" initialValues={initialValues}>
      {store.eventModalForm.map((ps: any) => <ItemField key={ps.id} item={ps} />)}
    </Form>
  )

})