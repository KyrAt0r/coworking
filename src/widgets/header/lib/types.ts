import {DatePicker} from 'antd';
import React from 'react';

export type Types = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];
