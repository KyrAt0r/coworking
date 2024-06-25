import React from 'react';
import { Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {Colors} from "../../../shared/ui/colors.ts";

const openInstruction = () => {
    window.open('https://conf.parma.ru/pages/viewpage.action?pageId=209729339', '_blank');
};

export const InstructionButton = () => (
    <Button onClick={openInstruction} icon={<InfoCircleOutlined style={{ color: Colors.Blue }} />}>
        Инструкция
    </Button>
);
