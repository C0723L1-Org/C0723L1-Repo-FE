import React, { useState } from "react";

const Comments = () => {
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (comment.trim()) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setComment("");
            }, 10000); // 10 giây
        }
    };

    return (
        <div className="mb-20 text-center text-black w-full h-full">
            <div className={`transition-opacity duration-500 ${submitted ? 'opacity-0' : 'opacity-100'}`}>
                <div className="space-y-6 max-w-xl mx-auto">
                    <h1 className="text-center text-xl sm:text-3xl font-semibold">
                        Hãy đóng góp ý kiến cho chúng tôi nếu có điều bạn chưa ưng ý!
                    </h1>
                    <input
                        className="w-full p-3 rounded-xl border-2 border-black"
                        type="text"
                        placeholder="Điền ý kiến của bạn vào đây....."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-center">
                        <button
                            className="w-[100px] h-full  text-center bg-blue-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
            <div className={`transition-opacity duration-500 ${submitted ? 'opacity-100' : 'opacity-0'}`}>
                {submitted && (
                    <div className="flex justify-center h-full">
                        <h1 className="text-xl sm:text-3xl font-semibold">
                            Chân thành cảm ơn ý kiến đóng góp của bạn.
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comments;
