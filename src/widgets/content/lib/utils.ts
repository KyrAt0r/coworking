import React from "react";
import type {WorkSpace} from "../../../shared/lib/interfaces/work-space.ts";
import { Colors } from '../../../shared/ui/colors.ts';


export const changeRectColors = (svgRef: React.RefObject<SVGSVGElement>, workplaces: WorkSpace[] | null ) => {
    if (workplaces && svgRef.current) {
        const rects = svgRef.current.querySelectorAll('rect');
        rects.forEach((rect) => {
            const id = rect.getAttribute('id');
            if (id) {
                const table = workplaces.find((item) => item.number === parseInt(id));
                if (table) {
                    rect.style.fill = table.isBusy ? Colors.Gray : Colors.Green;
                }
            }
        });
    }
};
