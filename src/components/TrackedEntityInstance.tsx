import { Button, Menu, Table, Select, Card } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../Context";
import { EventForm } from "./EventForm";
import { EventModalForm } from "./EventModalForm";
import { generateUid } from "../utils";
import { fromPairs } from "lodash";
import { useHistory } from 'react-router-dom'
import Loading from "./Loading";

const { Option } = Select;

export const TrackedEntityInstance = observer(() => {
  const store = useStore();
  const [visible, setVisible] = useState<boolean>(false);
  const { instance, program } = useParams();
  const [expandedRows, setExpandedRows] = useState<any[]>([]);
  const [values, setValues] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    store.fetchProgram(instance, program);
  }, [program, instance, store]);


  const showModal = () => {
    setVisible(true)
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const addModalForm = async (val: any) => {
    const { eventDate, ...others } = val;
    const attributeCategoryOptions = Object.values(others).join(';');
    const event = generateUid();

    const events = [{
      attributeCategoryOptions,
      event,
      eventDate,
      dataValues: [],
      notes: [],
      ...store.enrollment
    }];
    await store.addEvent(events);
    await store.queryTrackedEntityInstance(store.enrollment.trackedEntityInstance);
    setExpandedRows([event]);
    setVisible(false);
  }

  const onExpand = (expanded: any, record: any) => {
    if (expanded) {
      setExpandedRows([record.event]);
      store.setCurrentEvent(record.event);
      setValues(record);
    } else {
      setExpandedRows([]);
    }
  }

  const onValuesChange = (form: any) => async (changedValues: any, allValues: any) => {
    if (changedValues.aRfwyyBIHjp && form.getFieldValue('T8LURcyruHH')) {
      const newValue = Number(form.getFieldValue('aRfwyyBIHjp') / form.getFieldValue('T8LURcyruHH')).toFixed(0)
      form.setFieldsValue({ gY8m7JwBy9p: newValue })
    }

    if (changedValues.T8LURcyruHH && form.getFieldValue('aRfwyyBIHjp')) {
      const newValue = Number(Number(form.getFieldValue('aRfwyyBIHjp') / form.getFieldValue('T8LURcyruHH')).toFixed(0))
      form.setFieldsValue({ gY8m7JwBy9p: newValue });
    }

    if ((changedValues.Pn0OtdJRu86 || form.getFieldValue('Pn0OtdJRu86')) && form.getFieldValue('gY8m7JwBy9p')) {
      const val = Number(form.getFieldValue('gY8m7JwBy9p')) * Number(form.getFieldValue('Pn0OtdJRu86'))
      form.setFieldsValue({ sFBv4FIYydi: val });
    }

    if ((changedValues.gY8m7JwBy9p || form.getFieldValue('gY8m7JwBy9p')) && form.getFieldValue('Pn0OtdJRu86')) {
      const val = Number(form.getFieldValue('gY8m7JwBy9p')) * Number(form.getFieldValue('Pn0OtdJRu86'))
      form.setFieldsValue({ sFBv4FIYydi: val })
    }

    if ((changedValues.FElEeHFA2h5 || form.getFieldValue('FElEeHFA2h5')) && form.getFieldValue('sFBv4FIYydi')) {
      form.setFieldsValue({ RU20DkMfdnO: Number(Number(form.getFieldValue('sFBv4FIYydi') / form.getFieldValue('FElEeHFA2h5')).toFixed(0)) })
    }

    if ((changedValues.hJDbRV78VWp || form.getFieldValue('hJDbRV78VWp')) && form.getFieldValue('uGhQNyatC3M')) {
      const newValue = Number(form.getFieldValue('hJDbRV78VWp') / form.getFieldValue('uGhQNyatC3M')).toFixed(0)
      form.setFieldsValue({ GeiyLk2U1qI: newValue })
    }

    if ((changedValues.uGhQNyatC3M || form.getFieldValue('uGhQNyatC3M')) && form.getFieldValue('hJDbRV78VWp')) {
      const newValue = Number(form.getFieldValue('hJDbRV78VWp') / form.getFieldValue('uGhQNyatC3M')).toFixed(0)
      form.setFieldsValue({ GeiyLk2U1qI: newValue })
    }

    if ((changedValues.PGCvDSP3Y9S || form.getFieldValue('PGCvDSP3Y9S')) && form.getFieldValue('GeiyLk2U1qI')) {
      const newValue = Number(form.getFieldValue('PGCvDSP3Y9S')) + Number(form.getFieldValue('GeiyLk2U1qI'))
      form.setFieldsValue({ H6lgwocDrTy: newValue })
    }

    if ((changedValues.lum3A7SVxKV || form.getFieldValue('lum3A7SVxKV')) && form.getFieldValue('GeiyLk2U1qI')) {
      const newValue = Number(Number(form.getFieldValue('GeiyLk2U1qI') / form.getFieldValue('lum3A7SVxKV')).toFixed(0))
      form.setFieldsValue({ TX3vq0b6f8R: newValue })
    }

    if (changedValues.tyCCqrl6t1v && form.getFieldValue('gsPwEWxXI6e')) {
      const newValue = Number(form.getFieldValue('tyCCqrl6t1v') / form.getFieldValue('gsPwEWxXI6e')).toFixed(0)
      form.setFieldsValue({ W83hRUEbXjo: newValue })
    }

    if (changedValues.gsPwEWxXI6e && form.getFieldValue('tyCCqrl6t1v')) {
      const newValue = Number(form.getFieldValue('tyCCqrl6t1v') / form.getFieldValue('gsPwEWxXI6e')).toFixed(0)
      form.setFieldsValue({ W83hRUEbXjo: newValue });
    }

    const data = Object.entries(allValues).filter(([k, v]) => {
      return store.trueOnly.indexOf(k) === -1 || (store.trueOnly.indexOf(k) !== -1 && v)
    }).map(([k, v]) => {
      console.log(k, v)
      return [k, v]
    });

    if (changedValues.sBHTpu7aWMW && form.getFieldValue('sBHTpu7aWMW')) {
      Object.entries(store.inheritable).forEach(([de, value]) => {
        const val = store.getTemplateData[value];
        if (val) {
          form.setFieldsValue({ [de]: val });
          store.disableFields(Object.keys(store.inheritable), true);
        }
        store.disable(de);
      });
      store.disableFields(Object.keys(store.inheritable), true);

      const { event, eventDate, ...others } = values;
      const dataValues = Object.entries(others).map(([dataElement, value]) => {
        let currentValue: any = value;
        if (store.dateFields.indexOf(dataElement) !== -1) {
          currentValue = currentValue.format('YYYY-MM-DD')
        }
        return { dataElement, value: currentValue };
      });
      const events = [{
        dataValues,
        eventDate,
        event,
        ...store.enrollment
      }];
      await store.addEvent(events);

    } else if (form.getFieldValue('sBHTpu7aWMW') === false) {
      store.disableFields(Object.keys(store.inheritable), false);
    }
    setValues(fromPairs(data));

  }

  const onBlur = (id: string) => async (e: any) => {
    const { event, eventDate, ...others } = values;
    const dataValues = Object.entries(others).map(([dataElement, value]) => {
      let currentValue: any = value;
      if (store.dateFields.indexOf(dataElement) !== -1) {
        currentValue = currentValue.format('YYYY-MM-DD')
      }
      return { dataElement, value: currentValue };
    });
    const events = [{
      dataValues,
      eventDate,
      event,
      ...store.enrollment
    }];
    store.changeClassName(id, 'bg-green-400');
    await store.addEvent(events);
    store.changeClassName(id, '');
  }

  if (!store.selectedProgram || !store.instance) {
    return <Loading />
  }

  return <div className="events p-1">
    <div className="right">
      <div className="flex">
        <Button size="large" onClick={() => history.push('/')}>Back</Button>&nbsp;&nbsp;
        <div className="w-1/2">
          <Select style={{ width: "60%" }} allowClear={true} onChange={store.setSelectedProgram} size="large" value={store.currentProgram}>
            {store.orgUnitPrograms.map((p: any) => <Option value={p.id} key={p.id}>{p.name}</Option>)}
          </Select>
        </div>
      </div>
      <div className="data">
        <Menu
          style={{ width: 192 }}
          selectedKeys={[store.currentProgramStage]}
          mode="inline"
        >
          {store.selectedProgram.programStages.map((stage: any) => <Menu.Item key={stage.id} onClick={store.setCurrentProgramStage(stage.id)}>{stage.name}</Menu.Item>)}
        </Menu>
        <div className="">
          {store.isRepeatable ? <div>
            <Table
              rowClassName={() => "cursor-pointer"}
              columns={store.programStageColumns}
              dataSource={store.allData}
              rowKey="event"
              expandable={{
                expandRowByClick: true,
                expandedRowRender: (record: any) => {
                  return <EventForm initialValues={record} onValuesChange={onValuesChange} onBlur={onBlur} />
                },
                expandedRowKeys: expandedRows,
                onExpand: onExpand,
                rowExpandable: (record: any) => { 
                  return record.event !== 'total' 
                }
              }}
            // onChange={store.handleChange}
            // style={{ textTransform: "uppercase", fontSize: 12 }}
            // loading={store.loading}
            // pagination={{
            //   showSizeChanger: true,
            //   total: store.total,
            //   pageSize: store.pageSize,
            //   showQuickJumper: true,
            //   pageSizeOptions: ["5", "10", "15", "20", "25", "50", "100"],
            // }}
            />
          </div> : store.currentProcessedData.length > 0 ? <EventForm initialValues={store.currentProcessedData[0]} onValuesChange={onValuesChange} onBlur={onBlur} /> : null}
        </div>
        <div>
          <Button size="large" disabled={store.disableAddButton} onClick={showModal}>+</Button>
        </div>
      </div>
      <EventModalForm visible={visible} onCreate={addModalForm} onCancel={handleCancel} />
    </div>
    <div className="flex flex-col">
      <div className="text-right mb-3">
        <Button type="primary" className="bg-red-700 border-0 hover:bg-red-400" size="large">
          Delete
          </Button>
      </div>
      <Card title="Current Selections" className="mb-3">

      </Card>

      <Card title="Profile">

      </Card>
    </div>
  </div>
});