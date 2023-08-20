import {ReactComponent as FixedTables} from '../../assets/legend/fixed-table.svg';
import {ReactComponent as Tables} from '../../assets/legend/table.svg';
import {ReactComponent as TablesTwoDisplay} from '../../assets/legend/table-two-display.svg';
import {ReactComponent as TablePc} from '../../assets/legend/table-defolt.svg';
import {ReactComponent as TableOneDisplay} from '../../assets/legend/table-one-display.svg';
import {Table} from "antd";

export function LegendModal() {

    const dataSource = [
        {
            key: '1',
            description: 'Фиксированное рабочее место (Закреплён за другим сотрудником)',
            pick: <FixedTables/>
        },
        {
            key: '2',
            description: 'Рабочее место доступное для бронирования',
            pick: <Tables/>
        },
        {
            key: '3',
            description: 'Рабочее место только с монитором',
            pick: <TableOneDisplay/>
        },
        {
            key: '4',
            description: 'Рабочее место с техникой',
            pick: <TablePc/>
        },
        {
            key: '5',
            description: 'Рабочее место с техникой и двумя мониторами',
            pick: <TablesTwoDisplay/>
        },
    ];

    const columns = [
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Пример',
            dataIndex: 'pick',
            key: 'pick',
        },
    ];

    return (
        <>
            <div>
                <Table dataSource={dataSource} columns={columns} size="small" pagination={false}/>
            </div>
        </>
    );
}