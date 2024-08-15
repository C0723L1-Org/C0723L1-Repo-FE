import React, {useEffect, useState} from 'react';
import "../../../css/employee/styles.css";
import {useDebounced} from "../utils/Utils";
const HeaderEmployee = ({onSearch}) => {
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
                    Danh sách nhân viên
                </h5>
                <div className="tw-custom-header-add-search">
                    <button
                        className="tw-custom-header-add-button"
                        type="submit"
                    >
                        Thêm mới
                    </button>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="tw-custom-header-search" onChange={event => setSearchInput(event.target.value)}
                    />
                </div>
            </div>
    );
}
export default HeaderEmployee;

