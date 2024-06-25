import React from 'react';
import { Modal } from 'antd';
import type {WorkSpace} from "../../../shared/lib/interfaces/work-space.ts";


interface BookingModalProps {
    isVisible: boolean;
    currentWorkPlace: WorkSpace | null;
    onOk: () => void;
    onCancel: () => void;
}

export const BookingModal = ({ isVisible, currentWorkPlace, onOk, onCancel }: BookingModalProps) => (
    <Modal
        title="Подтверждение бронирования стола"
        open={isVisible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Забронировать"
    >
        <p>Вы бронируете стол № {currentWorkPlace && currentWorkPlace.number}</p>
    </Modal>
);
