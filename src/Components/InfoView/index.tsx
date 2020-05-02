import React, { useState } from 'react';
import { Table, Popconfirm, Form, Button, Modal, Divider  } from 'antd';

import { Item, EditableCell, IColumnData, IModalButtonProps, FormFieldProps } from '../../Interfaces';
import { getFormDetails } from './Utilities';

import './index.scss';

let increment: number = 0;

interface InfoViewProps {
  columns: IColumnData[];
  modalTitle: string;
  modalButtonProps: IModalButtonProps;
  formFieldProps: FormFieldProps[];
}

function InfoView(props: InfoViewProps) {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);
  const [editingKey, setEditingKey] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false)
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const operation = {
    title: 'Operation',
    dataIndex: 'operation',
    render: (_: any, record: Item) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <a href='javascript:;' onClick={() => save(record.key)} style={{ marginRight: 8 }}>
            Save
          </a>
          <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <React.Fragment>
        <a  onClick={() => edit(record)}>
          Edit {' '}
        </a>
        <span className='pipe'>|</span>
        <a  onClick={() => deleteRecord(record)}>
      {' '}Delete
        </a>
        </React.Fragment>
      );
    },
  };

  const dynamicColumns = JSON.parse(JSON.stringify(props.columns));
  dynamicColumns.push(operation);

  const mergedColumns = dynamicColumns && dynamicColumns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Item) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  function deleteRecord(record: Item) {
    setData(data && data.filter((item: any) => {
      return record.key !== item.key
    }))
  }

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as any;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const onFinish = (values: any) => {
    const tempData = JSON.parse(JSON.stringify(data))
    tempData.push({
      key: increment,
      ...values
    })
    increment++;
    setButtonLoading(true)
    setTimeout(() => {
      setButtonLoading(false);
      setShowModal(false);
      setData(tempData);
    }, 3000);
  };

  return (
    <div className='infoContainer'>
      <div className='infoContainer__button'>
        <Button type={props.modalButtonProps.type} onClick={() => {setShowModal(true)}}>
          {props.modalButtonProps.title}</Button>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <Modal
          title={props.modalTitle}
          visible={showModal}
          okText='Save'
          onCancel={() => {setShowModal(false)}}
        >
        <Form
          onFinish={onFinish}
        >
          {getFormDetails(props.formFieldProps)}
          <Divider />
          <div className='formFooter'>
            <Form.Item className='formFooter__button--cancel'>
              <Button key='back' onClick={() => {setShowModal(false)}}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item className='formFooter__button--save'>
              <Button type='primary' htmlType='submit' loading={buttonLoading}>
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default InfoView;
