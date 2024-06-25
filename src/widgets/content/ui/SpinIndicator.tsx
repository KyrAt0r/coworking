import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import getPhrase from '../../../shared/lib/getPhrase.ts';
import { Colors } from '../../../shared/ui/colors.ts';

interface SpinIndicatorProps {
    spinning: boolean;
    spinSize: "small" | "default" | "large";
    isBothDatesSelected: boolean;
    children: React.ReactNode;
}

export const SpinIndicator = ({ spinning, spinSize, isBothDatesSelected, children }: SpinIndicatorProps) => (
    <Spin
        spinning={spinning}
        size={spinSize}
        tip={getPhrase(isBothDatesSelected)}
        indicator={<LoadingOutlined style={{ fontSize: 24, color: Colors.ParmaColor }} spin />}
        style={{ color: Colors.ParmaColor }}
    >
        {children}
    </Spin>
);
