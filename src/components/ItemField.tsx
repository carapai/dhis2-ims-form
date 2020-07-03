import { Checkbox, DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { FC } from "react";
const { Option } = Select

interface ItemFieldProps {
  item: any
  onBlur: (field: string) => (e: any) => void;
  otherClasses?: string,

}

export const ItemField: FC<ItemFieldProps> = ({ item, onBlur, otherClasses = '' }) => {
  switch (item.valueType) {
    case 'NUMBER':
    case 'INTEGER_ZERO_OR_POSITIVE':
    case 'INTEGER':
      return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} labelAlign="left" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <InputNumber disabled={item.disabled} onBlur={onBlur(item.id)} className={item.className}/>
      </Form.Item>
    case 'TRUE_ONLY':
    case 'BOOLEAN':
      return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} valuePropName="checked" labelAlign="left" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <Checkbox className={item.className}/>
      </Form.Item>
    case 'DATE':
      return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} labelAlign={item.id === 'eventDate' ? 'right' : 'left'} name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <DatePicker onBlur={onBlur(item.id)} className={item.className} />
      </Form.Item>
    default:
      if (item.optionSet) {
        return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} labelAlign="left" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
          <Select disabled={item.disabled} className={item.className}>
            {item.optionSet.options.map((o: any) => <Option value={o.code} key={o.code}>{o.name}</Option>)}
          </Select>
        </Form.Item>
      }
      return <Form.Item key={item.id} className={`m-0 mt-2 mb-2 p-1 ${otherClasses}`} labelAlign="left" name={item.id} label={String(item.displayFormName).replace('Country Grant Template - ', '')}>
        <Input disabled={item.disabled} onBlur={onBlur(item.id)} className={item.className}/>
      </Form.Item>
  }
}