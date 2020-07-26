import { Button, Collapse, Form, Popconfirm, Tooltip } from "antd";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useStore } from "../Context";
import { ItemField } from "./ItemField";
import { fromPairs } from "lodash";

interface EventFormProps {
  initialValues: any,
  onValuesChange: (form: any) => (changedValues: any, allValues: any) => void,
  onBlur: (id: string) => (e: any) => void;
  event: string,
  status?: string
}

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const { Panel } = Collapse;

export const EventForm: FC<EventFormProps> = observer(({ initialValues, onValuesChange, onBlur, event }) => {
  const [form] = Form.useForm();
  const store = useStore();
  store.setForm(form);

  const disabledTwo = initialValues[`${event}-status`] === 'COMPLETED';

  const eventDate = { displayFormName: 'Todays Date', valueType: 'DATE', id: `${event}-eventDate`, disabled: disabledTwo }
  // const status = { displayFormName: 'Status', valueType: 'TEXT', id: `${event}-status`, disabled: disabledTwo, hidden: true }

  const complete = async () => {
    const { event, ...rest } = store.currentEventData
    const realValues = fromPairs(Object.entries(rest).map(([key, value]) => {
      return [String(key).split('-')[1], value]
    }));
    const { eventDate, wlEpNQNoR9F, K1YcxEoSq1B, status, ...others }: any = realValues;
    const dataValues = Object.entries(others).map(([dataElement, value]) => {
      let currentValue: any = value;
      if (store.dateFields.indexOf(dataElement) !== -1) {
        currentValue = currentValue.format('YYYY-MM-DD')
      }
      return { dataElement, value: currentValue };
    });

    let ev: any = {
      dataValues,
      eventDate: eventDate.format('YYYY-MM-DD'),
      event,
      ...store.enrollment,
      status: status === 'ACTIVE' ? 'COMPLETED' : 'ACTIVE'
    }

    if (wlEpNQNoR9F && K1YcxEoSq1B) {
      ev = { ...ev, attributeCategoryOptions: `${wlEpNQNoR9F};${K1YcxEoSq1B}`, }
    }
    const events = [ev];
    await store.addEvent(events, false);
  }

  return (<Form onValuesChange={onValuesChange(form)} {...layout} form={form} name="control-hooks" size="large" initialValues={initialValues} className="m-0 p-0">
    <ItemField key="eventDate" item={eventDate} onBlur={onBlur} />
    {/* <ItemField key="status" item={status} onBlur={onBlur} /> */}
    <Collapse accordion={true} defaultActiveKey={[store.currentProgramStageSections[0].id]} className="m-0 p-0">
      {store.currentProgramStageSections.map((ps: any) => {
        return <Panel header={ps.name} key={ps.id} >
          {ps.dataElements.map((de: any, i: number) => {
            const otherClasses = i % 2 === 0 ? 'bg-white' : 'bg-gray-100';
            const disabled = de.disabled || disabledTwo
            de = { ...de, id: `${event}-${de.id}`, disabled }

            return <ItemField key={`${event}-${de.id}`} item={de} onBlur={onBlur} otherClasses={otherClasses} />
          })}
        </Panel>
      })}
    </Collapse>
    <div className="mt-3 flex">
      <div>
        {/* <Tooltip placement="topLeft" title={initialValues[`${event}-status`] === 'ACTIVE' ? 'Complete event to disable data entry' : 'Un complete event to enable data entry'}> */}
        <Popconfirm title={initialValues[`${event}-status`] === 'ACTIVE' ? 'Are you sure to complete event to disable data entry' : 'Are you sure to un complete event to enable data entry'} onConfirm={() => complete()}>
          <Button htmlType="button" type="primary" className="border-0">
            {initialValues[`${event}-status`] === 'ACTIVE' ? 'Complete' : 'Incomplete'}
          </Button>
        </Popconfirm>
        {/* </Tooltip> */}
      </div>
      <div className="ml-auto">
        <Tooltip placement="topLeft" title="Delete Event">
          <Popconfirm title="Sure to delete?" onConfirm={() => store.deleteEvent()}>
            <Button type="primary" className="bg-red-700 border-0 hover:bg-red-400">
              Delete
          </Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </div>
  </Form>
  )
})