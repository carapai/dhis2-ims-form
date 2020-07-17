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

export const EventForm: FC<EventFormProps> = observer(({ initialValues, onValuesChange, onBlur, event, status = 'ACTIVE' }) => {
  const [form] = Form.useForm();
  const store = useStore();
  store.setForm(form);

  const disabledTwo = status === 'COMPLETED';

  const eventDate = { displayFormName: 'Todays Date', valueType: 'DATE', id: `${event}-eventDate`, disabled: disabledTwo }

  const complete = async () => {
    const { event, status, ...rest } = store.currentEventData
    const realValues = fromPairs(Object.entries(rest).map(([key, value]) => {
      return [String(key).split('-')[1], value]
    }));
    const { eventDate, wlEpNQNoR9F, K1YcxEoSq1B, ...others }: any = realValues;
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
    <Collapse accordion={true} defaultActiveKey={[store.currentProgramStageSections[0].id]} className="m-0 p-0">
      <Panel header="Team Type And Name" key="attributeCategoryOptions">
        {store.eventModalForm.slice(1).map((ps: any) => {
          const disabled = ps.disabled || status === 'COMPLETED';
          ps = { ...ps, disabled, id: `${event}-${ps.id}` }
          return <ItemField key={`${event}-${ps.id}`} item={ps} onBlur={onBlur} />
        })}
      </Panel>
      {store.currentProgramStageSections.map((ps: any) => {
        return <Panel header={ps.name} key={ps.id} >
          {ps.dataElements.map((de: any, i: number) => {
            const otherClasses = i % 2 === 0 ? 'bg-white' : 'bg-gray-100';
            const disabled = de.disabled || status === 'COMPLETED'
            de = { ...de, id: `${event}-${de.id}`, disabled }
            return <ItemField key={`${event}-${de.id}`} item={de} onBlur={onBlur} otherClasses={otherClasses} />
          })}
        </Panel>
      })}
    </Collapse>
    <div className="mt-3 flex">
      <div>
        <Button htmlType="button" type="primary" className="border-0" onClick={complete}>
          {initialValues.status === 'ACTIVE' ? 'Complete' : 'Incomplete'}
        </Button>
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