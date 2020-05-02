import { FormFieldProps, IColumnData, IModalButtonProps } from '../../../Interfaces'

export const todoForm: FormFieldProps[]  = [
    {
      label : 'Action',
      placeHolder: 'Action..',
      name: 'action',
    },
    {
      label : 'Date',
      placeHolder: 'Enter Date..',
      name: 'dateadded',
      rules: [
        {
          required: true,
          message: 'Please input your Date',
        },
      ]
    },
  ]

export const todoColumn: IColumnData[] =  [
    {
        title: 'Action',
        dataIndex: 'action',
        width: '45%',
        editable: true,
      },
      {
        title: 'Date Added',
        dataIndex: 'dateadded',
        width: '30%',
        editable: true,
      },
  ]

export const todoButton: IModalButtonProps = {
    title: 'Add Todo',
    type: 'primary',
  }

export const userForms: FormFieldProps[] = [
    {
      label : 'User',
      placeHolder: 'Add User..',
      name: 'user',
    },
    {
      label : 'Email',
      placeHolder: 'Enter your Email..',
      name: 'email',
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]
    },
  ]

export const userButton: IModalButtonProps = {
    title: 'Create User',
    type: 'default',
}

export const userColumn: IColumnData[] =  [
    {
      title: 'User',
      dataIndex: 'user',
      width: '45%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '35%',
      editable: true,
    },
];
