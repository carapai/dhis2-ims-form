import { Button, Card, Input, Menu, Popconfirm, Select, Table, Tooltip } from "antd";
import { FormInstance } from "antd/lib/form";
import { fromPairs, invert, keys } from "lodash";
import { observer } from "mobx-react";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../Context";
import { generateUid } from "../utils";
import { EventForm } from "./EventForm";
import { EventModalForm } from "./EventModalForm";
import Loading from "./Loading";
import { TrackedEntityInstanceForm } from "./TrackedEntityInstanceForm";

const { Option } = Select

const addDataElements = (dataElements: string[], form: any, affectedDataElement: string) => {
  let sum = 0;

  dataElements.forEach((de: string) => {
    sum = sum + (Number(form.getFieldValue(de)) || 0)
  });
  form.setFieldsValue({ [affectedDataElement]: Math.ceil(sum) });
}

const convert = (rate: number, dataElement: string, affectedDataElement: string, form: any) => {
  const value = Number(form.getFieldValue(dataElement)) || 0;
  form.setFieldsValue({ [affectedDataElement]: Math.ceil(Number(value / rate)) });
}

export const TrackedEntityInstance: FC<any> = observer(() => {
  const store = useStore();
  const [visible, setVisible] = useState<boolean>(false);
  const { instance, program } = useParams();
  const [values, setValues] = useState<any>();
  const history = useHistory();
  const affectedKeys = keys(store.affected);

  useEffect(() => {
    store.loadCurrentInstance(program, instance);
  }, [program, instance, store]);
  const showModal = () => {
    setVisible(true)
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const addModalForm = async (val: any) => {
    const { eventDate } = val;
    const event = generateUid();
    const events = [{
      event,
      eventDate,
      dataValues: [],
      notes: [],
      ...store.enrollment
    }];
    await store.addEvent(events, false);
    await store.queryTrackedEntityInstance(store.enrollment.trackedEntityInstance, false);
    store.setCurrentEvent(event);
    store.disableFields([], false, true)
    store.setExpandedRows([event]);
    setVisible(false);
  }

  const onExpand = (expanded: any, record: any) => {
    store.setCurrentEvent(record.event);
    const { event: templateEvent } = store.getTemplateData;
    if (expanded) {
      store.setTeamType(record[`${record.event}-pnCFLcxbfUD`])
      store.setExpandedRows([record.event]);
      if (Number(record[`${store.currentEvent}-YRk2FTJDPx3`]) === 0 || !record[`${store.currentEvent}-YRk2FTJDPx3`]) {
        store.hideSection('JFpLMcht3jv')
        store.hideSection('cYE1pL5JvWE')
        store.hideSection('VURM40an49J')
      } else if (Number(record[`${store.currentEvent}-YRk2FTJDPx3`]) > 0) {
        store.unHideSection('JFpLMcht3jv');
        store.unHideSection('cYE1pL5JvWE');
        store.unHideSection('VURM40an49J');
        if (record[`${store.currentEvent}-AKcvH7719Wp`] !== 'No') {
          store.unHideSection('cYE1pL5JvWE')
        } else {
          store.hideSection('cYE1pL5JvWE')
        }
      }

      store.form.setFieldsValue({ [`${store.currentEvent}-eiHYxW2Ybjv`]: record[`${store.currentEvent}-YRk2FTJDPx3`] })
      store.form.setFieldsValue({ [`${store.currentEvent}-CiOsAwrfUaP`]: record[`${store.currentEvent}-hXrMH1XTngh`] })


      if (String(record[`${store.currentEvent}-AKcvH7719Wp`]) !== 'Yes') {
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
      } else if (record[`${store.currentEvent}-AKcvH7719Wp`] === 'Yes') {
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
        if (Number(record[`${store.currentEvent}-YRk2FTJDPx3`]) !== 0) {
          store.unHideSection('cYE1pL5JvWE')
        } else {
          store.hideSection('cYE1pL5JvWE')
        }
      }
      if (String(record[`${store.currentEvent}-sBHTpu7aWMW`]) === 'true') {
        const invertedChecked = invert(store.affected);
        Object.entries(store.inheritable).forEach(([de, value]) => {
          const val = store.getTemplateData[`${templateEvent}-${value}`];
          const original = record[`${store.currentEvent}-${de}`]
          const hasChecked = invertedChecked[de];
          if (hasChecked !== undefined && String(record[`${store.currentEvent}-${hasChecked}`]) === 'true') {
            store.disableFields([de], false);
            store.form.setFieldsValue({ [`${store.currentEvent}-${de}`]: original });
          } else {
            store.disableFields([de], true);
            if (val) {
              store.form.setFieldsValue({ [`${store.currentEvent}-${de}`]: val });
            }
          }
        });
      } else {
        store.disableFields([], false, true);
      }
    } else {
      store.setExpandedRows([]);
    }
  }

  const insertRow = async (id: string, vals: any) => {
    const values = fromPairs(vals);
    if (values) {
      const { event, ...rest } = values
      const realValues = fromPairs(Object.entries(rest).map(([key, value]) => {
        return [String(key).split('-')[1], value]
      }));
      const { eventDate, status, ...others }: any = realValues;
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
        ...store.enrollment
      }
      const events = [ev];
      store.changeClassName(id, 'bg-green-400');
      await store.addEvent(events, false);
      store.changeClassName(id, '');
    }
  }

  const insertValues = async (id: string) => {
    if (values) {
      const { event, ...rest } = values
      const realValues = fromPairs(Object.entries(rest).map(([key, value]) => {
        return [String(key).split('-')[1], value]
      }));
      const { eventDate, status, ...others }: any = realValues;
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
        ...store.enrollment
      }
      const events = [ev];
      store.changeClassName(id, 'bg-green-400');
      await store.addEvent(events, false);
      store.changeClassName(id, '');

      if (store.currentProgramStage === 'nNMTjdvTh7r') {
        const events = store.processedTeamGrantData.map((d: any) => {
          const { event, eventDate, status, ...others }: any = d;
          const dataValues = Object.entries(others).map(([dataElement, value]) => {
            let currentValue: any = value;
            if (store.dateFields.indexOf(dataElement) !== -1) {
              currentValue = currentValue.format('YYYY-MM-DD')
            }
            return { dataElement, value: currentValue };
          });

          return {
            dataValues,
            event,
            status,
            eventDate: eventDate.format('YYYY-MM-DD'),
            ...store.enrollment
          }
        });
        await store.addEvent(events, false);
      }
    }
  }

  const onValuesChange = (form: FormInstance) => async (changedValues: any, allValues: any) => {
    const [key, value] = Object.entries(changedValues)[0];
    if (store.currentProgramStage === 'nNMTjdvTh7r') {

      if ((key === `${store.currentEvent}-aRfwyyBIHjp` || form.getFieldValue(`${store.currentEvent}-aRfwyyBIHjp`)) && form.getFieldValue(`${store.currentEvent}-T8LURcyruHH`)) {
        const newValue = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-aRfwyyBIHjp`)) / form.getFieldValue(`${store.currentEvent}-T8LURcyruHH`))
        form.setFieldsValue({ [`${store.currentEvent}-gY8m7JwBy9p`]: newValue })
      }

      if ((key === `${store.currentEvent}-T8LURcyruHH` || form.getFieldValue(`${store.currentEvent}-T8LURcyruHH`)) && form.getFieldValue(`${store.currentEvent}-aRfwyyBIHjp`)) {
        const newValue = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-aRfwyyBIHjp`)) / Number(form.getFieldValue(`${store.currentEvent}-T8LURcyruHH`)));
        form.setFieldsValue({ [`${store.currentEvent}-gY8m7JwBy9p`]: newValue });
      }

      if ((key === `${store.currentEvent}-Pn0OtdJRu86` || form.getFieldValue(`${store.currentEvent}-Pn0OtdJRu86`)) && form.getFieldValue(`${store.currentEvent}-gY8m7JwBy9p`)) {
        const val = Number(form.getFieldValue(`${store.currentEvent}-Pn0OtdJRu86`)) * Number(form.getFieldValue(`${store.currentEvent}-Pn0OtdJRu86`))
        form.setFieldsValue({ [`${store.currentEvent}-sFBv4FIYydi`]: val });
      }

      if ((key === `${store.currentEvent}-gY8m7JwBy9p` || form.getFieldValue(`${store.currentEvent}-gY8m7JwBy9p`)) && form.getFieldValue(`${store.currentEvent}-Pn0OtdJRu86`)) {
        const val = Number(form.getFieldValue(`${store.currentEvent}-gY8m7JwBy9p`)) * Number(form.getFieldValue(`${store.currentEvent}-Pn0OtdJRu86`))
        form.setFieldsValue({ [`${store.currentEvent}-sFBv4FIYydi`]: val })
      }

      if ((key === `${store.currentEvent}-FElEeHFA2h5` || form.getFieldValue(`${store.currentEvent}-FElEeHFA2h5`)) && form.getFieldValue(`${store.currentEvent}-sFBv4FIYydi`)) {
        form.setFieldsValue({ [`${store.currentEvent}-RU20DkMfdnO`]: Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-sFBv4FIYydi`) / Number(form.getFieldValue(`${store.currentEvent}-FElEeHFA2h5`)))) })
      }

      if ((key === `${store.currentEvent}-hJDbRV78VWp` || form.getFieldValue(`${store.currentEvent}-hJDbRV78VWp`)) && form.getFieldValue(`${store.currentEvent}-uGhQNyatC3M`)) {
        const newValue = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-hJDbRV78VWp`)) / form.getFieldValue(`${store.currentEvent}-uGhQNyatC3M`)).toFixed(0)
        form.setFieldsValue({ [`${store.currentEvent}-GeiyLk2U1qI`]: newValue })
      }

      if ((key === `${store.currentEvent}-uGhQNyatC3M` || form.getFieldValue(`${store.currentEvent}-uGhQNyatC3M`)) && form.getFieldValue(`${store.currentEvent}-hJDbRV78VWp`)) {
        const newValue = Math.ceil(form.getFieldValue(`${store.currentEvent}-hJDbRV78VWp`) / form.getFieldValue(`${store.currentEvent}-uGhQNyatC3M`)).toFixed(0)
        form.setFieldsValue({ [`${store.currentEvent}-GeiyLk2U1qI`]: newValue })
      }

      if ((key === `${store.currentEvent}-PGCvDSP3Y9S` || form.getFieldValue(`${store.currentEvent}-PGCvDSP3Y9S`)) && form.getFieldValue(`${store.currentEvent}-GeiyLk2U1qI`)) {
        const newValue = Number(form.getFieldValue(`${store.currentEvent}-PGCvDSP3Y9S`)) + Number(form.getFieldValue(`${store.currentEvent}-GeiyLk2U1qI`))
        form.setFieldsValue({ [`${store.currentEvent}-H6lgwocDrTy`]: newValue })
      }

      if ((key === `${store.currentEvent}-lum3A7SVxKV` || form.getFieldValue(`${store.currentEvent}-lum3A7SVxKV`)) && form.getFieldValue(`${store.currentEvent}-GeiyLk2U1qI`)) {
        const newValue = Math.ceil(form.getFieldValue(`${store.currentEvent}-GeiyLk2U1qI`) / form.getFieldValue(`${store.currentEvent}-lum3A7SVxKV`))
        form.setFieldsValue({ [`${store.currentEvent}-TX3vq0b6f8R`]: newValue })
      }
    } else {
      const { event: templateEvent } = store.getTemplateData;
      if ((key === `${store.currentEvent}-sBHTpu7aWMW` && String(value) === 'true')) {
        const invertedChecked = invert(store.affected);
        Object.entries(store.inheritable).forEach(([de, value]) => {
          const hasChecked = invertedChecked[de];
          let val = store.getTemplateData[`${templateEvent}-${value}`];
          if (de === 'pin6sarb8cc') {
            const templateContacts = Number(store.getTemplateData[`${templateEvent}-PGCvDSP3Y9S`])
            const templateMPS = Number(store.getTemplateData[`${templateEvent}-gY8m7JwBy9p`])
            const teamGrantMPS = Number(form.getFieldValue(`${store.currentEvent}-W83hRUEbXjo`));
            val = Math.ceil((templateContacts / templateMPS) * teamGrantMPS);
          }
          if (val && ((hasChecked !== undefined && String(form.getFieldValue(`${store.currentEvent}-${hasChecked}`)) !== 'true') || hasChecked === undefined)) {
            form.setFieldsValue({ [`${store.currentEvent}-${de}`]: val });
          }
        });

        store.disableFields(Object.keys(store.affected), false);
        store.disableFields(Object.keys(store.inheritable), true);

        Object.entries(store.affected).forEach(([k, v]) => {
          if (String(allValues[`${store.currentEvent}-${k}`]) === 'true') {
            store.disableFields([String(v)], false);
          }
        })
      } else if (key === `${store.currentEvent}-sBHTpu7aWMW` && String(value) !== 'true') {
        store.disableFields(Object.keys(store.affected), true);
        store.disableFields(Object.keys(store.inheritable), false);
      }
      const rate = Number(store.getTemplateData[`${templateEvent}-vz7oWyEKTv2`] || 1);
      if (String(form.getFieldValue(`${store.currentEvent}-DLmm6TZXbxO`)) !== 'true' && (key === `${store.currentEvent}-tyCCqrl6t1v`) && form.getFieldValue(`${store.currentEvent}-gsPwEWxXI6e`)) {
        const newValue = Math.ceil(form.getFieldValue(`${store.currentEvent}-tyCCqrl6t1v`) / form.getFieldValue(`${store.currentEvent}-gsPwEWxXI6e`));
        form.setFieldsValue({ [`${store.currentEvent}-W83hRUEbXjo`]: newValue });
      }

      if (String(form.getFieldValue(`${store.currentEvent}-DLmm6TZXbxO`)) !== 'true' && (key === `${store.currentEvent}-gsPwEWxXI6e` || form.getFieldValue(`${store.currentEvent}-gsPwEWxXI6e`)) && form.getFieldValue(`${store.currentEvent}-tyCCqrl6t1v`)) {
        const newValue = Math.ceil(form.getFieldValue(`${store.currentEvent}-tyCCqrl6t1v`) / form.getFieldValue(`${store.currentEvent}-gsPwEWxXI6e`));
        form.setFieldsValue({ [`${store.currentEvent}-W83hRUEbXjo`]: newValue });
      }

      if ((key === `${store.currentEvent}-XIqu530X3BA` || form.getFieldValue(`${store.currentEvent}-XIqu530X3BA`)) && form.getFieldValue(`${store.currentEvent}-W83hRUEbXjo`)) {
        const val = Number(form.getFieldValue(`${store.currentEvent}-W83hRUEbXjo`)) * Number(form.getFieldValue(`${store.currentEvent}-XIqu530X3BA`))
        form.setFieldsValue({ [`${store.currentEvent}-PGoc4AXIskG`]: val });
      }

      if ((key === `${store.currentEvent}-W83hRUEbXjo` || form.getFieldValue(`${store.currentEvent}-W83hRUEbXjo`)) && form.getFieldValue(`${store.currentEvent}-XIqu530X3BA`)) {
        const val = Number(form.getFieldValue(`${store.currentEvent}-W83hRUEbXjo`)) * Number(form.getFieldValue(`${store.currentEvent}-XIqu530X3BA`))
        form.setFieldsValue({ [`${store.currentEvent}-PGoc4AXIskG`]: val });
        const templateContacts = Number(store.getTemplateData[`${templateEvent}-PGCvDSP3Y9S`])
        const templateMPS = Number(store.getTemplateData[`${templateEvent}-gY8m7JwBy9p`])
        const teamGrantMPS = Number(form.getFieldValue(`${store.currentEvent}-W83hRUEbXjo`));
        const occContacts = Math.ceil((templateContacts / templateMPS) * teamGrantMPS);
        form.setFieldsValue({ [`${store.currentEvent}-pin6sarb8cc`]: occContacts })
      }

      if (String(form.getFieldValue(`${store.currentEvent}-zrVBd7rIed2`)) !== 'true' && (key === `${store.currentEvent}-uvWrgEqv06F` || form.getFieldValue(`${store.currentEvent}-uvWrgEqv06F`)) && form.getFieldValue(`${store.currentEvent}-PGoc4AXIskG`)) {
        const val = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-PGoc4AXIskG`)) / Number(form.getFieldValue(`${store.currentEvent}-uvWrgEqv06F`)));
        form.setFieldsValue({ [`${store.currentEvent}-WEV1hAZk1zl`]: val });
      }

      if (String(form.getFieldValue(`${store.currentEvent}-zrVBd7rIed2`)) !== 'true' && (key === `${store.currentEvent}-PGoc4AXIskG` || form.getFieldValue(`${store.currentEvent}-PGoc4AXIskG`)) && form.getFieldValue(`${store.currentEvent}-uvWrgEqv06F`)) {
        const val = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-PGoc4AXIskG`)) / Number(form.getFieldValue(`${store.currentEvent}-uvWrgEqv06F`)));
        form.setFieldsValue({ [`${store.currentEvent}-WEV1hAZk1zl`]: val });
      }

      if (String(form.getFieldValue(`${store.currentEvent}-RGc7vhjB0Mt`)) !== 'true' && (key === `${store.currentEvent}-Z9LUqA3qR3i` || form.getFieldValue(`${store.currentEvent}-Z9LUqA3qR3i`)) && form.getFieldValue(`${store.currentEvent}-Jhix7kMMW5f`)) {
        const val = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-Z9LUqA3qR3i`)) / Number(form.getFieldValue(`${store.currentEvent}-Jhix7kMMW5f`)));
        form.setFieldsValue({ [`${store.currentEvent}-zCSkGEoyFkV`]: val });
      }
      if (String(form.getFieldValue(`${store.currentEvent}-RGc7vhjB0Mt`)) !== 'true' && (key === `${store.currentEvent}-Jhix7kMMW5f` || form.getFieldValue(`${store.currentEvent}-Jhix7kMMW5f`)) && form.getFieldValue(`${store.currentEvent}-Z9LUqA3qR3i`)) {
        const val = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-Z9LUqA3qR3i`)) / Number(form.getFieldValue(`${store.currentEvent}-Jhix7kMMW5f`)));
        form.setFieldsValue({ [`${store.currentEvent}-zCSkGEoyFkV`]: val });
      }
      if ((key === `${store.currentEvent}-pin6sarb8cc` || form.getFieldValue(`${store.currentEvent}-pin6sarb8cc`)) && form.getFieldValue(`${store.currentEvent}-zCSkGEoyFkV`)) {
        const val = Number(form.getFieldValue(`${store.currentEvent}-zCSkGEoyFkV`)) + Number(form.getFieldValue(`${store.currentEvent}-pin6sarb8cc`));
        form.setFieldsValue({ [`${store.currentEvent}-cEQikKW778D`]: val });
      }
      if ((key === `${store.currentEvent}-zCSkGEoyFkV` || form.getFieldValue(`${store.currentEvent}-zCSkGEoyFkV`)) && form.getFieldValue(`${store.currentEvent}-pin6sarb8cc`)) {
        const val = Number(form.getFieldValue(`${store.currentEvent}-zCSkGEoyFkV`)) + Number(form.getFieldValue(`${store.currentEvent}-pin6sarb8cc`));
        form.setFieldsValue({ [`${store.currentEvent}-cEQikKW778D`]: val });
      }
      if (String(form.getFieldValue(`${store.currentEvent}-psv1I7yysVD`)) !== 'true' && (key === `${store.currentEvent}-sqckP81B8Go` || form.getFieldValue(`${store.currentEvent}-sqckP81B8Go`)) && form.getFieldValue(`${store.currentEvent}-cEQikKW778D`)) {
        const val = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-cEQikKW778D`)) / Number(form.getFieldValue(`${store.currentEvent}-sqckP81B8Go`)));
        form.setFieldsValue({ [`${store.currentEvent}-fLD4wuUVi1i`]: val });
      }
      if (String(form.getFieldValue(`${store.currentEvent}-psv1I7yysVD`)) !== 'true' && (key === `${store.currentEvent}-cEQikKW778D` || form.getFieldValue(`${store.currentEvent}-cEQikKW778D`)) && form.getFieldValue(`${store.currentEvent}-sqckP81B8Go`)) {
        const val = Math.ceil(Number(form.getFieldValue(`${store.currentEvent}-cEQikKW778D`)) / Number(form.getFieldValue(`${store.currentEvent}-sqckP81B8Go`)));
        form.setFieldsValue({ [`${store.currentEvent}-fLD4wuUVi1i`]: val });
      }

      if (key === `${store.currentEvent}-YRk2FTJDPx3`) {
        form.setFieldsValue({ [`${store.currentEvent}-eiHYxW2Ybjv`]: value })
      }
      if (key === `${store.currentEvent}-hXrMH1XTngh`) {
        form.setFieldsValue({ [`${store.currentEvent}-CiOsAwrfUaP`]: value })
      }
      if (key === `${store.currentEvent}-pnCFLcxbfUD`) {
        store.setTeamType(value);
        form.setFieldsValue({ [`${store.currentEvent}-gIyHDZCbUFN`]: '' })
      }

      const foundAffected = affectedKeys.find((k: string) => `${store.currentEvent}-${k}` === key)
      if (foundAffected) {
        const toAffect = store.affected[foundAffected]
        if (String(value) === 'true') {
          store.disableFields([toAffect], false);
        } else {
          store.disableFields([toAffect], true);
        }
      }

      addDataElements([`${store.currentEvent}-BoM0YNDBUdy`, `${store.currentEvent}-VxTZaIwIfS8`, `${store.currentEvent}-gtPZBBL7rhj`, `${store.currentEvent}-UazX97Kqd3p`], form, `${store.currentEvent}-dr6OgCteAUm`);
      addDataElements([`${store.currentEvent}-IZdmRdDWZpX`, `${store.currentEvent}-klxMWtWKP3v`, `${store.currentEvent}-Qs4QGZ9HoDC`, `${store.currentEvent}-tSZLIplM0Xg`], form, `${store.currentEvent}-DT02jGe9med`);
      addDataElements([`${store.currentEvent}-dr6OgCteAUm`, `${store.currentEvent}-DT02jGe9med`], form, `${store.currentEvent}-OmOmbzDM4iZ`);

      convert(rate, `${store.currentEvent}-BoM0YNDBUdy`, `${store.currentEvent}-DwH5Iwha3UU`, form);
      convert(rate, `${store.currentEvent}-VxTZaIwIfS8`, `${store.currentEvent}-jZLnPmp18hY`, form);
      convert(rate, `${store.currentEvent}-gtPZBBL7rhj`, `${store.currentEvent}-kJPWSamlUAK`, form);
      convert(rate, `${store.currentEvent}-UazX97Kqd3p`, `${store.currentEvent}-puXos8qdR9S`, form);
      convert(rate, `${store.currentEvent}-dr6OgCteAUm`, `${store.currentEvent}-j8heE20u1T9`, form);

      convert(rate, `${store.currentEvent}-IZdmRdDWZpX`, `${store.currentEvent}-m0MhcXsb60u`, form);
      convert(rate, `${store.currentEvent}-klxMWtWKP3v`, `${store.currentEvent}-mybOLY5lriU`, form);
      convert(rate, `${store.currentEvent}-Qs4QGZ9HoDC`, `${store.currentEvent}-CFn6FkmHuHH`, form);
      convert(rate, `${store.currentEvent}-tSZLIplM0Xg`, `${store.currentEvent}-c6D0SVzxt7A`, form);
      convert(rate, `${store.currentEvent}-DT02jGe9med`, `${store.currentEvent}-LaBr26m8aNY`, form);

      const i = Number(form.getFieldValue(`${store.currentEvent}-g3segTGp2yD`)) || 0;
      const c = Number(form.getFieldValue(`${store.currentEvent}-W83hRUEbXjo`)) || 0;
      const j = Number(form.getFieldValue(`${store.currentEvent}-oyXv9gX46VO`)) || 0;
      const g = Number(form.getFieldValue(`${store.currentEvent}-WEV1hAZk1zl`)) || 0;
      const h = Number(form.getFieldValue(`${store.currentEvent}-oMZGOrVDzlQ`)) || 0;
      const k = Number(form.getFieldValue(`${store.currentEvent}-pbr4BhkiWtL`)) || 0;
      const v = Number(form.getFieldValue(`${store.currentEvent}-Wxa3cC9tjUK`)) || 0;
      const t = Number(form.getFieldValue(`${store.currentEvent}-fLD4wuUVi1i`)) || 0;
      const u = Number(form.getFieldValue(`${store.currentEvent}-YUH3uoLn1me`)) || 0;
      const e = Number(form.getFieldValue(`${store.currentEvent}-PGoc4AXIskG`)) || 0;
      const l = Number(form.getFieldValue(`${store.currentEvent}-uA3G2zQ14rk`)) || 0;
      const r = Number(form.getFieldValue(`${store.currentEvent}-cEQikKW778D`)) || 0;
      const w = Number(form.getFieldValue(`${store.currentEvent}-qKTeyWi7MVz`)) || 0;
      const m = Number(form.getFieldValue(`${store.currentEvent}-nDgN4uKcSPo`)) || 0;
      const ab = Number(form.getFieldValue(`${store.currentEvent}-eiHYxW2Ybjv`)) || 0;
      const x = Number(form.getFieldValue(`${store.currentEvent}-JbckYmJRNSl`)) || 0;
      const y = Number(form.getFieldValue(`${store.currentEvent}-F04W7zc8KgV`)) || 0;
      const z = Number(form.getFieldValue(`${store.currentEvent}-PNleJ4ejsuW`)) || 0;
      const aa = Number(form.getFieldValue(`${store.currentEvent}-rE38dvsAtEw`)) || 0;
      const ac = Number(form.getFieldValue(`${store.currentEvent}-CiOsAwrfUaP`)) || 0;

      const transportGrant = (i * 3 * Math.ceil(c / 40)) + (j * 3 * 4) + (g * h * k) + (v * t * u);
      // console.log(`i:${i}, c:${c}, j:${j}, g:${g}, h:${h}, k:${k}, v:${v}, t:${t}, u:${u}`)
      const mpEventSnacks = e * l;
      const tgjEventMeals = r * w;
      const admin = m * c;

      form.setFieldsValue({ [`${store.currentEvent}-WyNHgVjv97i`]: Math.ceil(transportGrant) })
      form.setFieldsValue({ [`${store.currentEvent}-PTeqHUCZVFd`]: Math.ceil(mpEventSnacks) })
      form.setFieldsValue({ [`${store.currentEvent}-qP3onIBOoJa`]: Math.ceil(tgjEventMeals) })
      form.setFieldsValue({ [`${store.currentEvent}-fFe4xMmrPZZ`]: Math.ceil(admin) })

      form.setFieldsValue({ [`${store.currentEvent}-KLzfFndIPqo`]: x * ab * 2 })
      form.setFieldsValue({ [`${store.currentEvent}-lOzK4T2eTga`]: y * ab * 2 })
      form.setFieldsValue({ [`${store.currentEvent}-M9pi5hjxhWr`]: z * ab * 2 })
      form.setFieldsValue({ [`${store.currentEvent}-awxAGJwj83W`]: aa * ac })

      addDataElements([`${store.currentEvent}-WyNHgVjv97i`, `${store.currentEvent}-PTeqHUCZVFd`, `${store.currentEvent}-qP3onIBOoJa`, `${store.currentEvent}-fFe4xMmrPZZ`], form, `${store.currentEvent}-JZo5Iw4geHp`)
      addDataElements([`${store.currentEvent}-KLzfFndIPqo`, `${store.currentEvent}-lOzK4T2eTga`, `${store.currentEvent}-M9pi5hjxhWr`, `${store.currentEvent}-awxAGJwj83W`], form, `${store.currentEvent}-iSDnwU0GRAL`)

      addDataElements([`${store.currentEvent}-iSDnwU0GRAL`, `${store.currentEvent}-JZo5Iw4geHp`], form, `${store.currentEvent}-g0K25Yvn0IH`)
      addDataElements([`${store.currentEvent}-LaBr26m8aNY`, `${store.currentEvent}-j8heE20u1T9`], form, `${store.currentEvent}-F4PyCcIgvZ1`)

      if (key === `${store.currentEvent}-YRk2FTJDPx3` && Number(value) === 0) {
        store.hideSection('JFpLMcht3jv')
        store.hideSection('cYE1pL5JvWE')
        store.hideSection('VURM40an49J')
      } else if (key === `${store.currentEvent}-YRk2FTJDPx3` && Number(value) > 0) {
        store.unHideSection('JFpLMcht3jv');
        store.unHideSection('cYE1pL5JvWE');
        store.unHideSection('VURM40an49J');
        if (form.getFieldValue(`${store.currentEvent}-AKcvH7719Wp`) !== 'No') {
          store.unHideSection('cYE1pL5JvWE')
        }
      }

      if (key === `${store.currentEvent}-AKcvH7719Wp` && String(value) === 'No') {
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
      } else if (key === `${store.currentEvent}-AKcvH7719Wp` && String(value) === 'Yes') {
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
        if (Number(form.getFieldValue(`${store.currentEvent}-YRk2FTJDPx3`)) !== 0) {
          store.unHideSection('cYE1pL5JvWE');
        }
      }
    }

    if (keys(store.affected).map(k => `${store.currentEvent}-${k}`).indexOf(key) !== -1) {
      form.setFieldsValue({ [key]: String(value) === 'true' ? value : '' })
    }

    const data = Object.entries(allValues).map(([k, v]) => {
      if (form.getFieldValue(k) !== v && form.getFieldValue(k) !== undefined) {
        v = form.getFieldValue(k);
      }
      return [k, v]
    });

    setValues(fromPairs(data));
    const canInsert = [...keys(store.affected).map(k => `${store.currentEvent}-${k}`), `wlEpNQNoR9F`, `K1YcxEoSq1B`, `${store.currentEvent}-gIyHDZCbUFN`, `${store.currentEvent}-pnCFLcxbfUD`, `${store.currentEvent}-AKcvH7719Wp`, `${store.currentEvent}-sBHTpu7aWMW`]
    if (canInsert.indexOf(key) !== -1) {
      await insertRow(key, data)
    }

  }

  const onBlur = (id: string) => async (e: any) => {
    await insertValues(id);
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
    await store.addTrackedEntityInstance(trackedEntityInstances, false);
    window.location.reload(false);
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
        <div className="w-1/2 ml-4">
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
        <div className="fixed-height">
          {store.isRepeatable ? <div>
            <Table
              bordered={true}
              className="p-0 m-0"
              rowClassName={() => "cursor-pointer"}
              columns={store.programStageColumns}
              dataSource={store.allData}
              rowKey="event"
              expandable={{
                expandRowByClick: true,
                expandedRowRender: (record: any) => {
                  return <EventForm event={record.event} initialValues={record} status={record.status} onValuesChange={onValuesChange} onBlur={onBlur} />
                },
                expandedRowKeys: store.expandedRows,
                onExpand: onExpand,
                rowExpandable: (record: any) => {
                  return record.event !== 'total'
                }
              }}
            />
          </div> : store.currentProcessedData.length > 0 ? <EventForm event={store.getTemplateData.event} status={store.getTemplateData.status} initialValues={store.getTemplateData} onValuesChange={onValuesChange} onBlur={onBlur} /> : null}
        </div>
        <div>
          <Tooltip placement="topLeft" title="Add New Event">
            <Button size="large" type="primary" disabled={store.disableAddButton} onClick={showModal}><span className="text-xl">+</span></Button>
          </Tooltip>
        </div>
      </div>
      <EventModalForm visible={visible} onCreate={addModalForm} onCancel={handleCancel} />
    </div>
    <div className="flex flex-col">
      <div className="text-right mb-3">
        <Tooltip placement="topLeft" title="Delete Tracked Entity with enrollments and events">
          <Popconfirm title="Sure to delete?" onConfirm={deleteTrackedEntityInstance}>
            <Button size="large" type="primary" className="bg-red-700 border-0 hover:bg-red-400">
              Delete
          </Button>
          </Popconfirm>
        </Tooltip>
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