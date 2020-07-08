import { Button, Select, TreeSelect } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { useHistory } from 'react-router-dom';
import { useStore } from "../Context";
import { generateUid } from "../utils";
import Loading from "./Loading";
import { TrackedEntityInstanceForm } from "./TrackedEntityInstanceForm";
import { TrackedEntityInstanceList } from "./TrackedEntityInstanceList";

const { Option } = Select


export const TrackedEntityInstances = observer(() => {
  const store = useStore();
  const history = useHistory();

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

    const trackedEntityInstance = generateUid()

    const trackedEntityInstances = [{
      trackedEntityInstance,
      attributes,
      trackedEntityType: store.selectedProgram.trackedEntityType.id,
      orgUnit: store.selectedOrgUnit,
      program: store.currentProgram,
      enrollments
    }];
    await store.addTrackedEntityInstance(trackedEntityInstances);
    history.push(`/${trackedEntityInstance}/${store.currentProgram}`)
  };

  if (store.loading) {
    return <Loading />
  }

  return (
    <div className="instances">
      <div className="bg-gray-100 p-2">
        <TreeSelect
          treeDefaultExpandAll={true}
          showSearch={true}
          treeNodeFilterProp="title"
          // onSearch={store.searchTree}
          allowClear={true}
          filterTreeNode={true}
          size="large"
          style={{ width: '100%' }}
          value={store.selectedOrgUnit}
          dropdownStyle={{ maxHeight: 700, overflow: 'auto' }}
          placeholder="Please select country"
          // treeDataSimpleMode={{ id: 'id' }}
          onChange={store.setSelectedOrgUnit}
          // loadData={onLoadData}
          treeData={store.userOrgUnits}
        />
      </div>
      <div className="right p-2">
        <div className="flex">
          <div className="w-1/2">
            <Select style={{ width: "100%" }} allowClear={true} onChange={store.setSelectedProgram} size="large" value={store.currentProgram}>
              {store.orgUnitPrograms.map((p: any) => <Option value={p.id} key={p.id}>{p.name}</Option>)}
            </Select>
          </div>
          <div className="ml-auto">
            <Button disabled={store.disableRegister} onClick={() => store.setCurrentPage('form')} size="large">Register</Button>
          </div>
        </div>
        {store.currentProgram ? store.currentPage === 'form' ? <TrackedEntityInstanceForm onFinish={onFinish} /> : <TrackedEntityInstanceList /> : null}
      </div>
    </div>
  );
});