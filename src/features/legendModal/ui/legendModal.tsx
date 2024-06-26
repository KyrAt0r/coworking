import {Table} from 'antd';
import React from 'react';
import {columns, dataSource} from "./legendData.tsx";

export function LegendModal() {
    return (
      <div>
          <Table dataSource={dataSource} columns={columns} size="small" pagination={false} />
      </div>
  );
}
