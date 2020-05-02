import React from 'react';
import { Tabs } from 'antd';

import InfoView from '../InfoView';

import './index.scss';

import { todoColumn, todoForm, todoButton, userColumn, userForms, userButton } from './Constants';

const { TabPane } = Tabs;

function ModalView() {
    return (
      <div className='mainContainer'>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Todos' key='1'>
            <InfoView columns={todoColumn} formFieldProps={todoForm}
              modalTitle='Todo Action' modalButtonProps={todoButton}/>
          </TabPane>
          <TabPane tab='Users' key='2'>
            <InfoView columns={userColumn} formFieldProps={userForms}
              modalTitle='User Action' modalButtonProps={userButton}/>
          </TabPane>
        </Tabs>
      </div>
    )
}

export default ModalView;
