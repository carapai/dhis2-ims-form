import { Button, Card, Input, Menu, Popconfirm, Table } from "antd";
import { FormInstance } from "antd/lib/form";
import { fromPairs } from "lodash";
import { observer } from "mobx-react";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../Context";
import { generateUid } from "../utils";
import { EventForm } from "./EventForm";
import { EventModalForm } from "./EventModalForm";
import Loading from "./Loading";
import { TrackedEntityInstanceForm } from "./TrackedEntityInstanceForm";

const addDataElements = (dataElements: string[], form: any, affectedDataElement: string) => {
  let sum = 0;

  dataElements.forEach((de: string) => {
    sum = sum + (Number(form.getFieldValue(de)) || 0)
  });
  form.setFieldsValue({ [affectedDataElement]: sum });
}

const convert = (rate: number, dataElement: string, affectedDataElement: string, form: any) => {
  const value = Number(form.getFieldValue(dataElement)) || 0;
  form.setFieldsValue({ [affectedDataElement]: value * rate });
}

export const TrackedEntityInstance: FC<any> = observer(() => {
  const store = useStore();
  // const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const { instance, program } = useParams();
  const [expandedRows, setExpandedRows] = useState<any[]>([]);
  const [values, setValues] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    store.setCurrentProgramId(program);
    store.queryTrackedEntityInstance(instance)
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
    await store.addEvent(events, false);
    await store.queryTrackedEntityInstance(store.enrollment.trackedEntityInstance, false);
    store.setCurrentEvent(event);
    setExpandedRows([event]);
    setVisible(false);
  }

  const onExpand = (expanded: any, record: any) => {
    if (expanded) {
      setExpandedRows([record.event]);
      store.setCurrentEvent(record.event);
      if (Number(record.YRk2FTJDPx3) === 0) {
        store.hideSection('JFpLMcht3jv')
        store.hideSection('cYE1pL5JvWE')
        store.hideSection('VURM40an49J')
      } else if (Number(record.YRk2FTJDPx3) > 0) {
        store.unHideSection('JFpLMcht3jv');
        store.unHideSection('cYE1pL5JvWE');
        store.unHideSection('VURM40an49J');
        if (record.AKcvH7719Wp !== 'No') {
          store.unHideSection('cYE1pL5JvWE')
        } else {
          store.hideSection('cYE1pL5JvWE')
        }
      }

      if (String(record.AKcvH7719Wp) === 'No') {
        store.hideSection('TtGM27Gdc2H');
        store.hideSection('cYE1pL5JvWE');
        store.hideDataElement('F4PyCcIgvZ1')
        store.hideDataElement('DwH5Iwha3UU')
        store.hideDataElement('jZLnPmp18hY')
        store.hideDataElement('kJPWSamlUAK')
        store.hideDataElement('puXos8qdR9S')
        store.hideDataElement('j8heE20u1T9')
        store.hideDataElement('m0MhcXsb60u')
        store.hideDataElement('mybOLY5lriU')
        store.hideDataElement('CFn6FkmHuHH')
        store.hideDataElement('c6D0SVzxt7A')
        store.hideDataElement('LaBr26m8aNY')
        store.hideDataElement('F4PyCcIgvZ1')
      } else if (record.AKcvH7719Wp === 'Yes') {
        store.unHideSection('TtGM27Gdc2H');
        store.unHideDataElement('F4PyCcIgvZ1')
        store.unHideDataElement('DwH5Iwha3UU')
        store.unHideDataElement('jZLnPmp18hY')
        store.unHideDataElement('kJPWSamlUAK')
        store.unHideDataElement('puXos8qdR9S')
        store.unHideDataElement('j8heE20u1T9')
        store.unHideDataElement('m0MhcXsb60u')
        store.unHideDataElement('mybOLY5lriU')
        store.unHideDataElement('CFn6FkmHuHH')
        store.unHideDataElement('c6D0SVzxt7A')
        store.unHideDataElement('LaBr26m8aNY')
        store.unHideDataElement('F4PyCcIgvZ1')
        if (Number(record.YRk2FTJDPx3) !== 0) {
          store.unHideSection('cYE1pL5JvWE')
        } else {
          store.hideSection('cYE1pL5JvWE')
        }
      }

      if (record.sBHTpu7aWMW === 'true') {
        Object.entries(store.inheritable).forEach(([de, value]) => {
          const val = store.getTemplateData[value];
          if (val) {
            store.form.setFieldsValue({ [de]: val });
          }
        });
        store.disableFields(Object.keys(store.inheritable), true);
      }

    } else {
      setExpandedRows([]);
    }
  }

  const onValuesChange = (form: FormInstance) => async (changedValues: any, allValues: any) => {
    const rate = Number(store.getTemplateData['vz7oWyEKTv2'] || 1);
    if (changedValues.aRfwyyBIHjp && form.getFieldValue('T8LURcyruHH')) {
      const newValue = Math.ceil(form.getFieldValue('aRfwyyBIHjp') / form.getFieldValue('T8LURcyruHH'))
      form.setFieldsValue({ gY8m7JwBy9p: newValue })
    }

    if (changedValues.T8LURcyruHH && form.getFieldValue('aRfwyyBIHjp')) {
      const newValue = Math.ceil(form.getFieldValue('aRfwyyBIHjp') / form.getFieldValue('T8LURcyruHH'));
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
      form.setFieldsValue({ RU20DkMfdnO: Math.ceil(Number(form.getFieldValue('sFBv4FIYydi') / form.getFieldValue('FElEeHFA2h5'))) })
    }

    if ((changedValues.hJDbRV78VWp || form.getFieldValue('hJDbRV78VWp')) && form.getFieldValue('uGhQNyatC3M')) {
      const newValue = Math.ceil(form.getFieldValue('hJDbRV78VWp') / form.getFieldValue('uGhQNyatC3M')).toFixed(0)
      form.setFieldsValue({ GeiyLk2U1qI: newValue })
    }

    if ((changedValues.uGhQNyatC3M || form.getFieldValue('uGhQNyatC3M')) && form.getFieldValue('hJDbRV78VWp')) {
      const newValue = Math.ceil(form.getFieldValue('hJDbRV78VWp') / form.getFieldValue('uGhQNyatC3M')).toFixed(0)
      form.setFieldsValue({ GeiyLk2U1qI: newValue })
    }

    if ((changedValues.PGCvDSP3Y9S || form.getFieldValue('PGCvDSP3Y9S')) && form.getFieldValue('GeiyLk2U1qI')) {
      const newValue = Number(form.getFieldValue('PGCvDSP3Y9S')) + Number(form.getFieldValue('GeiyLk2U1qI'))
      form.setFieldsValue({ H6lgwocDrTy: newValue })
    }

    if ((changedValues.lum3A7SVxKV || form.getFieldValue('lum3A7SVxKV')) && form.getFieldValue('GeiyLk2U1qI')) {
      const newValue = Math.ceil(form.getFieldValue('GeiyLk2U1qI') / form.getFieldValue('lum3A7SVxKV'))
      form.setFieldsValue({ TX3vq0b6f8R: newValue })
    }

    if (changedValues.tyCCqrl6t1v && form.getFieldValue('gsPwEWxXI6e')) {
      const newValue = Math.ceil(form.getFieldValue('tyCCqrl6t1v') / form.getFieldValue('gsPwEWxXI6e'));
      form.setFieldsValue({ W83hRUEbXjo: newValue })
    }

    if (changedValues.gsPwEWxXI6e && form.getFieldValue('tyCCqrl6t1v')) {
      const newValue = Math.ceil(form.getFieldValue('tyCCqrl6t1v') / form.getFieldValue('gsPwEWxXI6e'));
      form.setFieldsValue({ W83hRUEbXjo: newValue });
    }


    if ((changedValues.XIqu530X3BA || form.getFieldValue('XIqu530X3BA')) && form.getFieldValue('W83hRUEbXjo')) {
      const val = Number(form.getFieldValue('W83hRUEbXjo')) * Number(form.getFieldValue('XIqu530X3BA'))
      form.setFieldsValue({ PGoc4AXIskG: val });
    }


    if ((changedValues.W83hRUEbXjo || form.getFieldValue('W83hRUEbXjo')) && form.getFieldValue('XIqu530X3BA')) {
      const val = Number(form.getFieldValue('W83hRUEbXjo')) * Number(form.getFieldValue('XIqu530X3BA'))
      form.setFieldsValue({ PGoc4AXIskG: val });
    }

    if ((changedValues.uvWrgEqv06F || form.getFieldValue('uvWrgEqv06F')) && form.getFieldValue('PGoc4AXIskG')) {
      const val = Math.ceil(Number(form.getFieldValue('PGoc4AXIskG')) / Number(form.getFieldValue('uvWrgEqv06F')));
      form.setFieldsValue({ WEV1hAZk1zl: val });
    }

    if ((changedValues.PGoc4AXIskG || form.getFieldValue('PGoc4AXIskG')) && form.getFieldValue('uvWrgEqv06F')) {
      const val = Math.ceil(Number(form.getFieldValue('PGoc4AXIskG')) / Number(form.getFieldValue('uvWrgEqv06F')));
      form.setFieldsValue({ WEV1hAZk1zl: val });
    }

    if ((changedValues.Z9LUqA3qR3i || form.getFieldValue('Z9LUqA3qR3i')) && form.getFieldValue('Jhix7kMMW5f')) {
      const val = Math.ceil(Number(form.getFieldValue('Z9LUqA3qR3i')) / Number(form.getFieldValue('Jhix7kMMW5f')));
      form.setFieldsValue({ zCSkGEoyFkV: val });
    }
    if ((changedValues.Jhix7kMMW5f || form.getFieldValue('Jhix7kMMW5f')) && form.getFieldValue('Z9LUqA3qR3i')) {
      const val = Math.ceil(Number(form.getFieldValue('Z9LUqA3qR3i')) / Number(form.getFieldValue('Jhix7kMMW5f')));
      form.setFieldsValue({ zCSkGEoyFkV: val });
    }
    if ((changedValues.pin6sarb8cc || form.getFieldValue('pin6sarb8cc')) && form.getFieldValue('zCSkGEoyFkV')) {
      const val = Number(form.getFieldValue('zCSkGEoyFkV')) + Number(form.getFieldValue('pin6sarb8cc'));
      form.setFieldsValue({ cEQikKW778D: val });
    }
    if ((changedValues.zCSkGEoyFkV || form.getFieldValue('zCSkGEoyFkV')) && form.getFieldValue('pin6sarb8cc')) {
      const val = Number(form.getFieldValue('zCSkGEoyFkV')) + Number(form.getFieldValue('pin6sarb8cc'));
      form.setFieldsValue({ cEQikKW778D: val });
    }
    if ((changedValues.sqckP81B8Go || form.getFieldValue('sqckP81B8Go')) && form.getFieldValue('zCSkGEoyFkV')) {
      const val = Math.ceil(Number(form.getFieldValue('zCSkGEoyFkV')) / Number(form.getFieldValue('sqckP81B8Go')));
      form.setFieldsValue({ fLD4wuUVi1i: val });
    }
    if ((changedValues.zCSkGEoyFkV || form.getFieldValue('zCSkGEoyFkV')) && form.getFieldValue('sqckP81B8Go')) {
      const val = Math.ceil(Number(form.getFieldValue('zCSkGEoyFkV')) / Number(form.getFieldValue('sqckP81B8Go')));
      form.setFieldsValue({ fLD4wuUVi1i: val });
    }

    addDataElements(['BoM0YNDBUdy', 'VxTZaIwIfS8', 'gtPZBBL7rhj', 'UazX97Kqd3p'], form, 'dr6OgCteAUm');
    addDataElements(['IZdmRdDWZpX', 'klxMWtWKP3v', 'Qs4QGZ9HoDC', 'tSZLIplM0Xg'], form, 'DT02jGe9med');
    addDataElements(['dr6OgCteAUm', 'DT02jGe9med'], form, 'OmOmbzDM4iZ');

    convert(rate, 'BoM0YNDBUdy', 'DwH5Iwha3UU', form);
    convert(rate, 'VxTZaIwIfS8', 'jZLnPmp18hY', form);
    convert(rate, 'gtPZBBL7rhj', 'kJPWSamlUAK', form);
    convert(rate, 'UazX97Kqd3p', 'puXos8qdR9S', form);
    convert(rate, 'dr6OgCteAUm', 'j8heE20u1T9', form);


    convert(rate, 'IZdmRdDWZpX', 'm0MhcXsb60u', form);
    convert(rate, 'klxMWtWKP3v', 'mybOLY5lriU', form);
    convert(rate, 'Qs4QGZ9HoDC', 'CFn6FkmHuHH', form);
    convert(rate, 'tSZLIplM0Xg', 'c6D0SVzxt7A', form);
    convert(rate, 'DT02jGe9med', 'LaBr26m8aNY', form);

    const i = Number(form.getFieldValue('g3segTGp2yD')) || 0;
    const c = Number(form.getFieldValue('W83hRUEbXjo')) || 0;
    const j = Number(form.getFieldValue('oyXv9gX46VO')) || 0;
    const g = Number(form.getFieldValue('WEV1hAZk1zl')) || 0;
    const h = Number(form.getFieldValue('oMZGOrVDzlQ')) || 0;
    const k = Number(form.getFieldValue('pbr4BhkiWtL')) || 0;
    const v = Number(form.getFieldValue('Wxa3cC9tjUK')) || 0;
    const t = Number(form.getFieldValue('fLD4wuUVi1i')) || 0;
    const u = Number(form.getFieldValue('YUH3uoLn1me')) || 0;
    const e = Number(form.getFieldValue('PGoc4AXIskG')) || 0;
    const l = Number(form.getFieldValue('uA3G2zQ14rk')) || 0;
    const r = Number(form.getFieldValue('cEQikKW778D')) || 0;
    const w = Number(form.getFieldValue('qKTeyWi7MVz')) || 0;
    const m = Number(form.getFieldValue('nDgN4uKcSPo')) || 0;
    const ab = Number(form.getFieldValue('eiHYxW2Ybjv')) || 0;
    const x = Number(form.getFieldValue('JbckYmJRNSl')) || 0;
    const y = Number(form.getFieldValue('F04W7zc8KgV')) || 0;
    const z = Number(form.getFieldValue('PNleJ4ejsuW')) || 0;
    const aa = Number(form.getFieldValue('rE38dvsAtEw')) || 0;
    const ac = Number(form.getFieldValue('CiOsAwrfUaP')) || 0;

    const transportGrant = (i * 3 * c / 40) + (j * 3 * 4) + (g * h * k) + (v * t * u);
    const mpEventSnaks = e * l;
    const tgjEventMeals = r * w;
    const admin = m * c;

    form.setFieldsValue({ WyNHgVjv97i: Math.ceil(transportGrant) })
    form.setFieldsValue({ PTeqHUCZVFd: Math.ceil(mpEventSnaks) })
    form.setFieldsValue({ qP3onIBOoJa: Math.ceil(tgjEventMeals) })
    form.setFieldsValue({ fFe4xMmrPZZ: Math.ceil(admin) })

    form.setFieldsValue({ KLzfFndIPqo: x * ab * 2 })
    form.setFieldsValue({ lOzK4T2eTga: y * ab * 2 })
    form.setFieldsValue({ M9pi5hjxhWr: z * ab * 2 })
    form.setFieldsValue({ awxAGJwj83W: aa * ac })

    addDataElements(['WyNHgVjv97i', 'PTeqHUCZVFd', 'qP3onIBOoJa', 'fFe4xMmrPZZ'], form, 'JZo5Iw4geHp')
    addDataElements(['KLzfFndIPqo', 'lOzK4T2eTga', 'M9pi5hjxhWr', 'awxAGJwj83W'], form, 'iSDnwU0GRAL')

    addDataElements(['j8heE20u1T9', 'JZo5Iw4geHp'], form, 'g0K25Yvn0IH')
    addDataElements(['LaBr26m8aNY', 'iSDnwU0GRAL'], form, 'F4PyCcIgvZ1')

    if (Number(changedValues.YRk2FTJDPx3) === 0) {
      store.hideSection('JFpLMcht3jv')
      store.hideSection('cYE1pL5JvWE')
      store.hideSection('VURM40an49J')
    } else if (Number(changedValues.YRk2FTJDPx3) > 0) {
      store.unHideSection('JFpLMcht3jv');
      store.unHideSection('cYE1pL5JvWE');
      store.unHideSection('VURM40an49J');

      if (form.getFieldValue('AKcvH7719Wp') !== 'No') {
        store.unHideSection('cYE1pL5JvWE')
      }
    }

    if (String(changedValues.AKcvH7719Wp) === 'No') {
      store.hideSection('TtGM27Gdc2H');
      store.hideSection('cYE1pL5JvWE');
      store.hideDataElement('F4PyCcIgvZ1')
      store.hideDataElement('DwH5Iwha3UU')
      store.hideDataElement('jZLnPmp18hY')
      store.hideDataElement('kJPWSamlUAK')
      store.hideDataElement('puXos8qdR9S')
      store.hideDataElement('j8heE20u1T9')
      store.hideDataElement('m0MhcXsb60u')
      store.hideDataElement('mybOLY5lriU')
      store.hideDataElement('CFn6FkmHuHH')
      store.hideDataElement('c6D0SVzxt7A')
      store.hideDataElement('LaBr26m8aNY')
      store.hideDataElement('F4PyCcIgvZ1')
    } else if (changedValues.AKcvH7719Wp === 'Yes') {
      store.unHideSection('TtGM27Gdc2H')
      store.unHideDataElement('F4PyCcIgvZ1')
      store.unHideDataElement('DwH5Iwha3UU')
      store.unHideDataElement('jZLnPmp18hY')
      store.unHideDataElement('kJPWSamlUAK')
      store.unHideDataElement('puXos8qdR9S')
      store.unHideDataElement('j8heE20u1T9')
      store.unHideDataElement('m0MhcXsb60u')
      store.unHideDataElement('mybOLY5lriU')
      store.unHideDataElement('CFn6FkmHuHH')
      store.unHideDataElement('c6D0SVzxt7A')
      store.unHideDataElement('LaBr26m8aNY')
      store.unHideDataElement('F4PyCcIgvZ1')
      if (Number(form.getFieldValue('YRk2FTJDPx3')) !== 0) {
        store.unHideSection('cYE1pL5JvWE')
      }
    }

    const data = Object.entries(allValues).filter(([k, v]) => {
      if (store.trueOnly.indexOf(k) !== -1 && v) {
        return true
      } else if (store.trueOnly.indexOf(k) === -1) {
        return true
      }
      return false
    }).map(([k, v]) => {
      if (form.getFieldValue(k) !== v && form.getFieldValue(k) !== undefined) {
        v = form.getFieldValue(k);
      }
      return [k, v]
    });


    if (changedValues.sBHTpu7aWMW === true) {
      Object.entries(store.inheritable).forEach(([de, value]) => {
        const val = store.getTemplateData[value];
        if (val) {
          form.setFieldsValue({ [de]: val });
        }
      });
      store.disableFields(Object.keys(store.inheritable), true);
    } else if (form.getFieldValue('sBHTpu7aWMW') === false) {
      store.disableFields(Object.keys(store.inheritable), false);
    }

    setValues(fromPairs(data));
    console.log(changedValues)


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
      eventDate: eventDate.format('YYYY-MM-DD'),
      event,
      ...store.enrollment
    }];

    store.changeClassName(id, 'bg-green-400');
    await store.addEvent(events, false);
    store.changeClassName(id, '');

  }

  const onFinish = async (values: any) => {
    let { enrollmentDate, ...others } = values;
    const attributes = Object.entries(others).map(([attribute, value]) => {
      return { attribute, value }
    });

    const trackedEntityInstances = [{
      attributes,
      trackedEntityType: store.selectedProgram.trackedEntityType.id,
      orgUnit: store.selectedOrgUnit,
      program: store.currentProgram,
      trackedEntityInstance: store.enrollment.trackedEntityInstance
    }];
    await store.addTrackedEntityInstance2(trackedEntityInstances);
    await store.queryTrackedEntityInstance(store.enrollment.trackedEntityInstance, false)
  }

  const deleteTrackedEntityInstance = async () => {
    await store.deleteTrackedEntityInstance();
    history.push('/');

  }

  if (!store.instance || store.loading) {
    return <Loading />
  }

  return <div className="events p-1">
    <div className="right">
      <div className="flex">
        <Button size="large" onClick={() => {
          store.setCurrentProgramStage('nNMTjdvTh7r')();
          history.push('/')
        }}>Back</Button>
        {/* <div className="w-1/2">
          <Select style={{ width: "60%" }} allowClear={true} onChange={store.setSelectedProgram} size="large" value={store.currentProgram}>
            {store.orgUnitPrograms.map((p: any) => <Option value={p.id} key={p.id}>{p.name}</Option>)}
          </Select>
        </div> */}
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
              className="p-0 m-0"
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
          </div> : store.currentProcessedData.length > 0 ? <EventForm initialValues={store.getTemplateData} onValuesChange={onValuesChange} onBlur={onBlur} /> : null}
        </div>
        <div>
          <Button size="large" type="primary" disabled={store.disableAddButton} onClick={showModal}>+</Button>
        </div>
      </div>
      <EventModalForm visible={visible} onCreate={addModalForm} onCancel={handleCancel} />
    </div>
    <div className="flex flex-col">
      <div className="text-right mb-3">

        <Popconfirm title="Sure to delete?" onConfirm={deleteTrackedEntityInstance}>
          <Button size="large" type="primary" className="bg-red-700 border-0 hover:bg-red-400">
            Delete
          </Button>
        </Popconfirm>
      </div>
      <Card title="Current Selections" className="mb-3 flex flex-col content-between">
        <div className="flex mb-2">
          <div className="w-1/3 pr-1">Organisation unit</div>
          <div className="w-2/3 pl-1">
            <Input disabled={true} value={store.currentSelectedOrganisation.name} />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="w-1/3 pr-1">Program</div>
          <div className="w-2/3 pl-1">
            <Input disabled={true} value={store.selectedProgram.name} />
          </div>
        </div>
      </Card>

      <Card title="Profile">
        <TrackedEntityInstanceForm initialValues={store.currentAttributeValues} onFinish={onFinish} remove={['enrollmentDate']} showCancel={false} />
      </Card>
    </div>
  </div>
});