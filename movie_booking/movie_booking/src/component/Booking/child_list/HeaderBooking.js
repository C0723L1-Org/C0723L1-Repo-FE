import React, {useEffect, useState} from 'react';
import "../../../css/booking/styles.css";
import {useDebounced} from "../utils/Utils";
const HeaderBooking = ({onSearch}) => {
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearchInput = useDebounced(searchInput, 1000);  // Điều chỉnh thời gian debounce nếu cần

    // Gọi onSearch với giá trị đã debounce
    useEffect(() => {
        onSearch(debouncedSearchInput);
    }, [debouncedSearchInput]);
    return (
        <div
            className="tw-custom-header-list">
            <h5 className="tw-custom-header-title">
                Danh sách vé đặt
            </h5>
            <div className="tw-custom-header-add-search">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="tw-custom-header-search" onChange={event => setSearchInput(event.target.value)}
                />
            </div>
        </div>
    );
}
export default HeaderBooking;