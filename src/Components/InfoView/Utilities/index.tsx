import React from 'react';
import { Input, Form } from 'antd';
import { FormFieldProps } from '../../../Interfaces';

export function getFormDetails(formFieldProps: any) {
    return formFieldProps && formFieldProps.map((formField: FormFieldProps) => {
      return (
        <Form.Item
          label={formField.label}
          name={formField.name}
          rules={formField.rules}
        >
         <Input />
       </Form.Item>
      )
    })
  }
