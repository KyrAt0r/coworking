import React from 'react';
import { Button, Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Colors } from '../../../shared/ui/colors.ts';
import { LegendModal } from '../../../features/legendModal/ui/legendModal.tsx';

const showModal = () => {
    Modal.info({
        title: 'Легенда',
        content: <LegendModal />,
        onOk() {},
    });
};

export const LegendButton = () => (
    <Button onClick={showModal} icon={<InfoCircleOutlined style={{ color: Colors.Green }} />}>
        Легенда
    </Button>
);
