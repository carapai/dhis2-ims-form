import { Checkbox, DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { FC, useState } from "react";
import { useStore } from "../Context";
import { observer } from "mobx-react";
const { Option } = Select

interface ItemFieldProps {
  item: any
  onBlur: (field: string) => (e: any) => void;
  otherClasses?: string,

}

export const ItemField: FC<ItemFieldProps> = observer(({ item, onBlur, otherClasses = '' }) => {
  const store = useStore()
  const [searched, setSearched] = useState(item.optionSet ? item.optionSet.options : []);
  const disabled = item.disabled || store.disabledElements.indexOf(item.id) !== -1

  const search = (val: any) => {
    const filtered = item.optionSet.options.filter((o: any) => {
      return String(o.name).toLowerCase().includes(String(val).toLowerCase())
    });
    setSearched(filtered)
  }

  switch (item.valueType) {
    case 'NUMBER':
    case 'INTEGER_ZERO_OR_POSITIVE':
    case 'INTEGER':
      return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} labelAlign="right" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <InputNumber min={0} disabled={disabled} onBlur={onBlur(item.id)} className={item.className} />
      </Form.Item>
    case 'TRUE_ONLY':
    case 'BOOLEAN':
      return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} valuePropName="checked" labelAlign="right" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <Checkbox disabled={disabled} className={item.className} />
      </Form.Item>
    case 'DATE':
      return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} labelAlign="right" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <DatePicker onBlur={onBlur(item.id)} className={item.className} />
      </Form.Item>
    default:
      if (item.optionSet) {
        return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} labelAlign="right" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
          <Select
            disabled={disabled}
            className={item.className}
            showSearch={true}
            allowClear={true}
            onSearch={search}
            filterOption={false}
            onBlur={onBlur(item.id)}
          >
            {searched.map((o: any) => <Option value={o.code} key={o.code}>{o.name}</Option>)}
          </Select>
        </Form.Item>
      }
      return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} labelAlign="right" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <Input disabled={disabled} onBlur={onBlur(item.id)} className={item.className} />
      </Form.Item>
  }
})