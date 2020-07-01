import { Menu, Table, Button, Modal } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../Context";
import { EventForm } from "./EventForm";


export const TrackedEntityInstance = observer(() => {
  const store = useStore();
  const [visible, setVisible] = useState<boolean>(false);
  const { instance, program } = useParams();
  useEffect(() => {
    store.fetchProgram(instance, program);
  }, [program, instance, store]);


  const showModal = () => {
    setVisible(true)
  };

  const handleOk = (e: any) => {
    setVisible(false)
  };

  const handleCancel = (e: any) => {
    setVisible(false)
  };

  const onValuesChange = (form: any) => (changedValues: any, allValues: any) => {

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
  }
  if (!store.selectedProgram || !store.instance) {
    return <div>Loading</div>
  }

  return <div className="events">
    <div className="right">
      <div>
        {/* heading */}
      </div>
      <div className="data">
        <Menu
          style={{ width: 256 }}
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
              dataSource={store.currentProcessedData}
              rowKey="event"
              expandable={{
                expandedRowRender: (record: any) => {
                  return <EventForm initialValues={record} onValuesChange={onValuesChange} />
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
          </div> : store.currentProcessedData.length > 0 ? <EventForm initialValues={store.currentProcessedData[0]} onValuesChange={onValuesChange} /> : null}
        </div>
        <div>
          <Button disabled={store.disableAddButton} onClick={showModal}>+</Button>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        
      </Modal>
    </div>
    <div className="bg-gray-300">
      {/* Right */}
    </div>
  </div>
});