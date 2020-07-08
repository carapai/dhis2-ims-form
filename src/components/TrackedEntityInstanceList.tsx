import { SettingOutlined } from "@ant-design/icons";
import { Card, Checkbox, Drawer, List, Table } from "antd";
import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../Context";
import Loading from "./Loading";

export const TrackedEntityInstanceList = observer(() => {
  const store = useStore();
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    store.queryTrackedEntityInstances();
  }, [store]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  if (store.loading) {
    return <Loading />
  }

  return <div>
    <Card
      title=""
      extra={
        <SettingOutlined style={{ fontSize: "24px" }} onClick={showDrawer} />
      }
      bodyStyle={{ overflow: "auto", padding: 0, margin: 0 }}
    >
      <Table
        rowClassName={() => "cursor-pointer"}
        onRow={(record, rowIndex) => {
          return {
            onClick: async (event) => {
              history.push(`/${record["instance"]}/${store.currentProgram}`);
            },
          };
        }}
        columns={store.columns}
        dataSource={store.data}
        rowKey="instance"
      />
    </Card>
    <Drawer
      title="Columns"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={512}
    >
      <List
        itemLayout="horizontal"
        dataSource={store.availableAttributes}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Checkbox
                  checked={item.selected}
                  onChange={store.includeColumns(item.id)}
                />
              }
              title={item.name}
            />
          </List.Item>
        )}
      />
    </Drawer>
  </div>
})