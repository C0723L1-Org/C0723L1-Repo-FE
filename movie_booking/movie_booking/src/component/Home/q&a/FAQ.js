import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-center text-3xl font-bold mb-6">Hổ trợ</h1>

            {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-300 rounded mb-4">
                    <button
                        className="w-full flex justify-between items-center bg-white p-4 text-lg font-bold cursor-pointer transition duration-300"
                        onClick={() => toggleAccordion(index)}
                    >
                        {faq.question}
                        <FaChevronDown className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                        className={`p-4 bg-gray-100 overflow-hidden transition-all duration-300 ${
                            activeIndex === index ? 'block' : 'hidden'
                        }`}
                    >
                        <p className="text-gray-700">{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const faqs = [
    {
        question: 'Tôi bị quên mật khẩu?',
        answer:
            'Nếu bạn quên mật khẩu hãy bấm vào mục quên mặt khẩu trong phần đăng nhập và nhập email của bạn. Chúng tôi sẽ gửi mặt khẩu mới về tải khoản gmail của bạn.',
    },
    {
        question: 'Tôi bị quên mật khẩu?',
        answer:
            'Nếu bạn quên mật khẩu hãy bấm vào mục quên mặt khẩu trong phần đăng nhập và nhập email của bạn. Chúng tôi sẽ gửi mặt khẩu mới về tải khoản gmail của bạn.',
    },
    {
        question: 'Tôi bị quên mật khẩu?',
        answer:
            'Nếu bạn quên mật khẩu hãy bấm vào mục quên mặt khẩu trong phần đăng nhập và nhập email của bạn. Chúng tôi sẽ gửi mặt khẩu mới về tải khoản gmail của bạn.'
    },
    {
        question: 'Tôi bị quên mật khẩu?',
        answer:
            'Nếu bạn quên mật khẩu hãy bấm vào mục quên mặt khẩu trong phần đăng nhập và nhập email của bạn. Chúng tôi sẽ gửi mặt khẩu mới về tải khoản gmail của bạn.',
    },
    {
        question: 'Tôi bị quên mật khẩu?',
        answer:
            'Nếu bạn quên mật khẩu hãy bấm vào mục quên mặt khẩu trong phần đăng nhập và nhập email của bạn. Chúng tôi sẽ gửi mặt khẩu mới về tải khoản gmail của bạn.',
    },
];

export default FAQ;
