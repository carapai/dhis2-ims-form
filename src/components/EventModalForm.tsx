import { Form, Modal } from "antd";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useStore } from "../Context";
import { ItemField } from "./ItemField";


interface EventFormProps {
  initialValues?: any;
  visible: boolean;
  onCreate: (vals: any) => void;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const EventModalForm: FC<EventFormProps> = observer(({ initialValues = {}, onCreate, onCancel, visible }) => {

  const [form] = Form.useForm();
  const store = useStore();
  const onBlur = (id: string) => (e: any) => {
  }

  return (
    <Modal
      width="50%"
      title="Team Selection"
      visible={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form {...layout} form={form} name="control-hooks" size="large" initialValues={initialValues}>
        {store.eventModalForm.map((ps: any) => <ItemField key={ps.id} item={ps} onBlur={onBlur} />)}
      </Form>
    </Modal >
  )
})