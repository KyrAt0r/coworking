import { message } from 'antd';

export const successMessage = () => {
    message.open({
        type: 'success',
        content: 'Стол успешно забронирован!',
        duration: 2,
    });
};

export const errorMessage = () => {
    message.open({
        type: 'error',
        content: 'Упс... Кажется что-то пошло не так...',
        duration: 2,
    });
};
