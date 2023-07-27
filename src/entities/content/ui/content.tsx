import {Stage, Layer, Image, Rect} from 'react-konva';
import './content.scss';
import {useEffect, useMemo, useRef, useState} from 'react';
import useImage from 'use-image';
import room from '../../../assets/tables/sw.png';
import {useStore} from "effector-react";
import {$selectedEndDateTime, $selectedStartDateTime} from "../../../pages/model/store.ts";

interface HoveredSquares {
    [key: number]: boolean;
}

export function Content() {
    const aspectRatio = 16 / 11;
    const headerHeight = 80;
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [hoveredSquares, setHoveredSquares] = useState<HoveredSquares>({});

    const start = useStore($selectedStartDateTime)
    const end = useStore($selectedEndDateTime)

    const [imageURL] = useImage(room);

    useEffect(() => {
        const updateContentHeight = () => {
            const windowHeight = window.innerHeight;
            setContentHeight(windowHeight - headerHeight);
        };

        updateContentHeight(); // Initialize contentHeight on page load

        window.addEventListener('resize', updateContentHeight);

        return () => {
            window.removeEventListener('resize', updateContentHeight);
        };
    }, []);

    useEffect(() => {
        console.log(start, end)
    }, [start, end])

    const handleImageClick = (key: number, statusFree: boolean) => {
        if (statusFree) {
            console.log('Стол', key);
        }
        return
    };

    const handleMouseEnter = (id: number) => {
        setHoveredSquares((prev) => ({ ...prev, [id]: true }));
    };

    const handleMouseLeave = (id: number) => {
        setHoveredSquares((prev) => ({ ...prev, [id]: false }));
    };

    // Определение цвета в зависимости от состояния наведения курсора

    const getSquareColor = useMemo(
        () => (id: number, color: string, statusFree: boolean) => {
            if (statusFree) {
                return hoveredSquares[id] ? '#007f00' : color;
            }
            return color;
        },
        [hoveredSquares]
    );


    console.log(contentHeight)
    const stageHeight = 650;
    // const stageHeight = (contentHeight / 100) * 20;
    const imageWidth = stageHeight * aspectRatio;

    const statusFree = '#003300';
    const statusbooked = 'gray';

    const tablesList = [
        {x: 29, y: 312, table: 1, width: 120, height: 80, color: statusFree, statusFree: true},
        {x: 29, y: 181, table: 2, width: 120, height: 80, color: statusbooked, statusFree: false},
        {x: 210, y: 18, table: 3, width: 80, height: 110, color: statusFree, statusFree: true},
        {x: 479, y: 18, table: 4, width: 90, height: 110, color: statusFree, statusFree: true},
        {x: 619, y: 18, table: 5, width: 90, height: 110, color: statusFree, statusFree: true},
        {x: 770, y: 18, table: 6, width: 90, height: 110, color: statusFree, statusFree: true},
        {x: 730, y: 446, table: 7, width: 85, height: 110, color: statusFree, statusFree: true},
        {x: 558, y: 446, table: 8, width: 90, height: 110, color: statusFree, statusFree: true},
        {x: 408, y: 446, table: 9, width: 90, height: 110, color: statusFree, statusFree: true},
        {x: 285, y: 446, table: 10, width: 90, height: 110, color: statusbooked, statusFree: false},
        {x: 558, y: 290, table: 11, width: 90, height: 110, color: statusFree, statusFree: true},
        {x: 408, y: 240, table: 12, width: 90, height: 110, color: statusFree, statusFree: true},
        {x: 285, y: 355, table: 13, width: 110, height: 76, color: statusFree, statusFree: true},
    ]



    return (
        <div ref={contentRef} className="content">
            <Stage width={imageWidth} height={stageHeight}>
                <Layer>
                    <Image
                        image={imageURL}
                        width={imageWidth}
                        height={stageHeight}
                    />
                    {tablesList.map((table) => {
                        return (
                            <Rect
                                key={table.table}
                                width={table.width}
                                height={table.height}
                                fill={getSquareColor(table.table, table.color, table.statusFree)}
                                onClick={() => handleImageClick(table.table, table.statusFree)}
                                listening={true}
                                onMouseEnter={() => handleMouseEnter(table.table)}
                                onMouseLeave={() => handleMouseLeave(table.table)}
                                globalCompositeOperation="color"

                                x={table.x} // Позиция квадрата по оси X
                                y={table.y} // Позиция квадрата по оси Y
                            />
                        )
                    })}
                </Layer>
            </Stage>
        </div>
    );
}
