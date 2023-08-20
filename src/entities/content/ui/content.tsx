import './content.scss';
import {useEffect, useRef} from 'react';
import {useStore} from "effector-react";
import {$selectedEndDateTime, $selectedStartDateTime} from "../../../pages/model/store.ts";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {ReactComponent as RoomPlan} from '../../../assets/tables/cw.svg';

type TableElement = SVGElement & { table_id: string };

export function Content() {
    const start = useStore($selectedStartDateTime)
    const end = useStore($selectedEndDateTime)
    const svgWidth = 926;  // Ширина вашего SVG
    const svgHeight = 642; // Высота вашего SVG
    const initialTranslateX = window.innerWidth / 2 - svgWidth / 2;   // Начальная позиция X
    const initialTranslateY = (window.innerHeight - 80) / 2 - svgHeight / 2; // Начальная позиция Y
    const svgRef = useRef<SVGSVGElement>(null);
    const selectedTableRef = useRef<TableElement | null>(null);

    const tablesList = [
        {table: 1, statusFree: true},
        {table: 2, statusFree: false},
        {table: 3, statusFree: true},
        {table: 4, statusFree: true},
        {table: 5, statusFree: true},
        {table: 6, statusFree: true},
        {table: 7, statusFree: true},
        {table: 8, statusFree: true},
        {table: 9, statusFree: true},
        {table: 10, statusFree: false},
        {table: 11, statusFree: true},
        {table: 12, statusFree: true},
        {table: 13, statusFree: true}
    ]

    useEffect(() => {
        console.log(start, end)
        changeRectColors();
    }, [start, end])
    

    useEffect(() => {
        const transformComponent = svgRef.current;
        if (transformComponent) {
            transformComponent.addEventListener('click', handleClick);

            return () => {
                transformComponent.removeEventListener('click', handleClick);
            };
        }
    }, []);

    const changeRectColors = () => {
        const svgElement = document.getElementById('tables');
        if (svgElement) {
            const rects = svgElement.querySelectorAll('rect');

            rects.forEach(rect => {
                const id = rect.getAttribute('id');
                if (id) {
                    const table = tablesList.find(item => item.table === parseInt(id));
                    if (table && !table.statusFree) {
                        rect.style.fill = 'gray';
                    }
                }

            });
        }
    };

    const handleClick = (event) => {
        const clickedElement = event.target.closest('[table_id]');
        const table_id = clickedElement?.getAttribute('table_id')
        if (table_id && clickedElement) {
            console.log(`Клик на элементе с ${table_id}`);

            if (selectedTableRef.current) {
                // Возвращаем предыдущему элементу исходный цвет
                selectedTableRef.current.querySelector('rect')?.setAttribute('fill', '#4bb34b');
            }

            clickedElement.querySelector('rect').setAttribute('fill', '#FF0000');
            selectedTableRef.current = clickedElement;
        }
    };

    return (
        <>
            <div style={{display: 'flex'}}>
                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={2}
                    initialPositionX={initialTranslateX}
                    initialPositionY={initialTranslateY}
                >
                    <TransformComponent
                        wrapperStyle={{
                            backgroundColor: "#fff",
                            width: "100%",
                            height: "calc(100vh - 80px)",
                        }}
                    >
                        <svg ref={svgRef} width={928} height={640}>
                            <RoomPlan/>
                        </svg>
                    </TransformComponent>
                </TransformWrapper>
            </div>

        </>
    );
}
