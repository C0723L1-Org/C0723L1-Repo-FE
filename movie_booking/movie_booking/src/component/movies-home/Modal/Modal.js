import React from "react";

const Modal = ({ showModal, setShowModal }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg  max-w-md w-full relative">
                {/*w-11/12 max-w-xs*/}
                <button
                    className="absolute top-2 right-2 text-black"
                    onClick={() => setShowModal(false)}
                >
                    &times;
                </button>
                <img
                    src="https://www.themoviedb.org/t/p/w1280/lfY2CfmxyN9OvxmFuap6aejViJn.jpg"
                    alt="Deadpool và Wolverine"
                    className="rounded-lg"
                />
                <div className="text-center mt-4">
                    <p>Chính thức khởi chiếu</p>
                    <h2 className="text-2xl font-bold">27.07.2024</h2>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <input type="checkbox" id="hide-today" />
                    <label htmlFor="hide-today" className="ml-2">Không hiển thị hôm nay</label>
                </div>
            </div>
        </div>
    );
};

export default Modal;
