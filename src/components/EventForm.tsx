import { Button, Collapse, Form, Popconfirm } from "antd";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useStore } from "../Context";
import { ItemField } from "./ItemField";

interface EventFormProps {
  initialValues: any,
  onValuesChange: (form: any) => (changedValues: any, allValues: any) => void,
  onBlur: (id: string) => (e: any) => void;
}

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const { Panel } = Collapse;

export const EventForm: FC<EventFormProps> = observer(({ initialValues, onValuesChange, onBlur }) => {

  const [form] = Form.useForm();
  const store = useStore();
  const eventDate = { displayFormName: 'Todays Date', valueType: 'DATE', id: 'eventDate' }

  // const completeEvent = () => {
  //   console.log(form.getFieldsValue());
  // }

  store.setForm(form);

  return (
    <Form onValuesChange={onValuesChange(form)} {...layout} form={form} name="control-hooks" size="large" initialValues={initialValues} className="m-0 p-0">
      <ItemField key="eventDate" item={eventDate} onBlur={onBlur} />
      <Collapse accordion={true} defaultActiveKey={[store.currentProgramStageSections[0].id]} className="m-0 p-0">
        {store.currentProgramStageSections.map((ps: any) => {
          return <Panel header={ps.name} key={ps.id} >
            {ps.dataElements.map((de: any, i: number) => {
              const otherClasses = i % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              return <ItemField key={de.id} item={de} onBlur={onBlur} otherClasses={otherClasses} />
            })}
          </Panel>
        })}
      </Collapse>
      <div className="mt-3 flex">
        {/* <Button type="primary" htmlType="button" onClick={completeEvent}>
          Complete
          </Button> */}

        <div className="ml-auto">
          <Popconfirm title="Sure to delete?" onConfirm={() => store.deleteEvent()}>
            <Button type="primary" className="bg-red-700 border-0 hover:bg-red-400">
              Delete
          </Button>
          </Popconfirm>

          {/* &nbsp;
          &nbsp;
          <Button type="primary">
            Print Form
          </Button> */}
        </div>
      </div>
    </Form>
  )
})