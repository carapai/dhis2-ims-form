import { Button, Form } from "antd";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useStore } from "../Context";
import { ItemField } from "./ItemField";

interface FormProps {
  onFinish: (values: any) => void
  initialValues?: any;
  remove?: string[];
  showCancel?: boolean;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


export const TrackedEntityInstanceForm: FC<FormProps> = observer(({ onFinish, showCancel = true, remove = [], initialValues = {} }) => {
  const [form] = Form.useForm();
  const store = useStore();

  const onBlur = (id: string) => (e: any) => {
  }

  const insert = (values: any) => {
    onFinish(values);
    form.resetFields();
  }

  const cancel = () => {
    form.resetFields();
    store.setCurrentPage('list')
  }


  return <Form {...layout} form={form} name="control-hooks" onFinish={insert} size="large" initialValues={initialValues}>
    {store.currentAttributes.filter((item: any) => remove.indexOf(item.id) === -1).map((attribute: any) => {
      return <ItemField key={attribute.id} item={attribute} onBlur={onBlur} />
    })}

    <Form.Item labelAlign="left" {...tailLayout}>
      <div className="flex flex-row content-around">
        {showCancel ? <Button type="default" htmlType="button" onClick={cancel}>Cancel</Button> : null}
        <Button type="primary" htmlType="submit" className={showCancel ? 'ml-auto' : ''}>Save</Button>
      </div>
    </Form.Item>
  </Form>
})