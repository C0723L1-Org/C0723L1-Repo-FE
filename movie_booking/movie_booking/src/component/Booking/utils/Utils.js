// Chỉ viết hoa chữ cái đầu tiên
import {useEffect, useState} from "react";

export const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Hiển thị ngày dd/MM/yyyy
export const formatDate = (dateString) => {
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};

// Hiển thị giờ và phút HH:mm từ chuỗi HH:mm:ss
export const formatTime = (timeString) => {
    return timeString.slice(0, 5);
};
// Định dạng tiền Việt Nam Đồng (loại bỏ ký hiệu ₫ và khoảng trắng)
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount).replace(/[^0-9.]/g, '');
};

export function useDebounced(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            console.log('*****');
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
