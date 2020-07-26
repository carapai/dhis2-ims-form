import { Button, Select, Tree } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { useHistory } from 'react-router-dom';
import { useStore } from "../Context";
import { generateUid } from "../utils";
import { TrackedEntityInstanceForm } from "./TrackedEntityInstanceForm";
import { TrackedEntityInstanceList } from "./TrackedEntityInstanceList";
import { Welcome } from "./Welcome";

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

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val: any) {
    console.log('search:', val);
  }

  return (
    <div className="instances">
      <div className="bg-gray-100 p-2">
        {/* <Search size="large" style={{ marginBottom: 8 }} placeholder="Search" onChange={store.onChange} /> */}
        <Select
          size="large"
          showSearch
          style={{ width: '100%', marginBottom: 8 }}
          placeholder="Select or search country"
          optionFilterProp="children"
          onChange={store.onChange}
          onFocus={onFocus}
          onSearch={onSearch}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {store.countries.map((c: any) => <Option key={c.key} value={c.key}>{c.title}</Option>)}

        </Select>
        <div style={{ overflow: 'auto', height: 700 }}>
          <Tree
            selectedKeys={store.selectedKeys}
            onSelect={store.setSelectedOrgUnit}
            onExpand={store.onExpand}
            expandedKeys={store.expandedKeys}
            autoExpandParent={store.autoExpandParent}
            treeData={store.userOrgUnits}
          />
        </div>
      </div>
      <div className="right p-2">
        <div className="flex">
          <div className="w-1/2">
            <Select style={{ width: "70%" }} allowClear={true} onChange={store.setSelectedProgram} size="large" value={store.currentProgram} placeholder="Select Program">
              {store.orgUnitPrograms.map((p: any) => <Option value={p.id} key={p.id}>{p.name}</Option>)}
            </Select>
          </div>
          <div className="ml-auto">
            <Button disabled={store.disableRegister} onClick={() => store.setCurrentPage('form')} size="large">Register</Button>
          </div>
        </div>
        {store.currentProgram ? store.currentPage === 'form' ? <TrackedEntityInstanceForm onFinish={onFinish} /> : <TrackedEntityInstanceList /> : <Welcome />}
      </div>
    </div>
  );
});