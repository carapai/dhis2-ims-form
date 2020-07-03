import { Form, Button } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { useStore } from "../Context";
import { ItemField } from "./ItemField";

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 12 },
};

export const TrackedEntityInstanceForm = observer(() => {
  const [form] = Form.useForm();
  const store = useStore();

  const onBlur = (id: string) => (e: any) => {
  }

  const onFinish = async (values: any) => {
    let { enrollmentDate, ...others } = values;
    enrollmentDate = enrollmentDate.format('YYYY-MM-DD')
    const attributes = Object.entries(others).map(([attribute, value]) => {
      return { attribute, value }
    });
    const enrollments = [{
      enrollmentDate,
      incidentDate: enrollmentDate,
      orgUnit: store.selectedOrgUnit,
      program: store.currentProgram
    }];

    const trackedEntityInstances = [{
      attributes,
      trackedEntityType: store.selectedProgram.trackedEntityType.id,
      orgUnit: store.selectedOrgUnit,
      program: store.currentProgram,
      enrollments
    }];

    await store.addTrackedEntityInstance(trackedEntityInstances);
  };
  return <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} size="large" style={{ width: '40%' }}>
    {store.currentAttributes.map((attribute: any) => {
      return <ItemField key={attribute.id} item={attribute} onBlur={onBlur} />
    })}

    <Form.Item labelAlign="left" {...tailLayout}>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form.Item>
  </Form>
})