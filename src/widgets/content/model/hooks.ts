import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import {$appointProcessPending, $isBothDatesSelected, loadWorkplacesFx} from "./store.ts";
import {$selectedEndDateTime, $selectedStartDateTime} from "../../header/model/store.ts";


export const useWorkplaceLoader = () => {
    const [
        isBothDatesSelected,
        selectedStartDateTime,
        selectedEndDateTime,
        createAppointmentPending
    ] = useUnit([
        $isBothDatesSelected,
        $selectedStartDateTime,
        $selectedEndDateTime,
        $appointProcessPending
    ])

    useEffect(() => {
        if (isBothDatesSelected && selectedStartDateTime && selectedEndDateTime) {
            loadWorkplacesFx({
                startDateTime: selectedStartDateTime,
                endDateTime: selectedEndDateTime,
            });
        }
    }, [isBothDatesSelected, selectedStartDateTime, selectedEndDateTime]);

    return isBothDatesSelected && !createAppointmentPending;
};
