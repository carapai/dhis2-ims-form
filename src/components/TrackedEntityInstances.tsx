import { Button, Select, TreeSelect } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useStore } from "../Context";
import { TrackedEntityInstanceForm } from "./TrackedEntityInstanceForm";
import { TrackedEntityInstanceList } from "./TrackedEntityInstanceList";

// const { Search } = Input;
const { Option } = Select


export const TrackedEntityInstances = observer(() => {
  const store = useStore();
  const [units, setUnits] = useState<any>([]);

  const onLoadData = async (treeNode: any) => {
    await store.loadOrganisationUnitsChildren(treeNode.id);
    setUnits(store.organisationUnits);
  };

  useEffect(() => {
    store.loadUserOrgUnits().then(() => {
      setUnits(store.organisationUnits);
    });
  }, [store]);

  useEffect(() => {
    store.queryTrackedEntityInstances();
  }, [store]);

  return (
    <div className="instances">
      <div className="h-full bg-gray-100 p-2">
        <TreeSelect
          allowClear={true}
          treeDataSimpleMode
          size="large"
          style={{ width: '100%' }}
          value={store.selectedOrgUnit}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select country"
          onChange={store.setSelectedOrgUnit}
          loadData={onLoadData}
          treeData={units}
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
        {store.currentProgram ? store.currentPage === 'form' ? <TrackedEntityInstanceForm /> : <TrackedEntityInstanceList /> : null}
      </div>
    </div>
  );
});