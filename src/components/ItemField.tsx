import { Checkbox, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { observer } from "mobx-react";
import React, { FC } from "react";
const { Option } = Select


interface ItemFieldProps {
  item: any
}

export const ItemField: FC<ItemFieldProps> = observer(({ item }) => {
  switch (item.valueType) {
    case 'NUMBER':
    case 'INTEGER_ZERO_OR_POSITIVE':
    case 'INTEGER':
      return <Form.Item key={item.id} labelAlign="left" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <InputNumber disabled={item.disabled} />
      </Form.Item>
    case 'TRUE_ONLY':
    case 'BOOLEAN':
      return <Form.Item key={item.id} valuePropName="checked" labelAlign="left" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <Checkbox />
      </Form.Item>
    case 'DATE':
      return <Form.Item key={item.id} labelAlign={item.id === 'eventDate' ? 'right' : 'left'} name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <DatePicker />
      </Form.Item>
    default:
      if (item.optionSet) {
        return <Form.Item key={item.id} labelAlign="left" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
          <Select>
            {item.optionSet.options.map((o: any) => <Option value={o.code} key={o.code}>{o.name}</Option>)}
          </Select>
        </Form.Item>
      }
      return <Form.Item key={item.id} labelAlign="left" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <Input disabled={item.disabled} />
      </Form.Item>
  }
})