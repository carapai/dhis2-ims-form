import { SettingOutlined } from "@ant-design/icons";
import { Card, Checkbox, Drawer, List, Table } from "antd";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../Context";

export const TrackedEntityInstanceList = observer(() => {
  const store = useStore();
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return <div>
    <Card
      title=""
      extra={
        <SettingOutlined style={{ fontSize: "24px" }} onClick={showDrawer} />
      }
      bodyStyle={{ overflow: "auto", padding: 0, margin: 0 }}
    >
      {/* <Search
          size="large"
          placeholder="input search text"
          allowClear={true}
          onChange={store.onSearch}
          style={{ width: "100%", marginBottom: 20 }}
        /> */}
      <Table
        rowClassName={() => "cursor-pointer"}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              history.push(`/${record["instance"]}/${store.currentProgram}`);
            },
          };
        }}
        columns={store.columns}
        dataSource={store.data}
        rowKey="instance"
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