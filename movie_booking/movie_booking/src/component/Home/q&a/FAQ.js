import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import {Main} from "../../../layout/main/Main";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <Main content={
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-center text-3xl font-bold mb-6">Hỗ Trợ</h1>

            {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-300 rounded mb-4">
                    <button
                        className="w-full flex justify-between items-center bg-white text-orange-500 p-4 text-lg font-bold cursor-pointer transition duration-300"
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
        }/>
    );
};

const faqs = [
    {
        question: 'Tôi bị quên mật khẩu?',
        answer:
            'Nếu bạn quên mật khẩu hãy bấm vào mục quên mặt khẩu trong phần đăng nhập và nhập email của bạn. Chúng tôi sẽ gửi mặt khẩu mới về tải khoản gmail của bạn.',
    },
    {
        question: 'Làm sao để sử dụng quà tặng tháng sinh nhật?',
        answer:
            'Quà tặng tháng sinh nhật (combo 2, vé xem phim 2D dành cho hạng thành viên G-Star, X-Star) được cập nhật và tài khoản thành viên trong tháng sinh nhật). ' +
            'Thành viên phải có ít nhất 1 giao dịch (vé/bắp nước) có phát sinh chi tiêu > 0 trong vòng 12 tháng trở lại.' +
            'Bạn có thể xuất trình mã barcode trong App thành viên để đổi vé 2D tại rạp hoặc sử dụng online bằng cách đăng nhập thông tin trên App/Website của Galaxy để sử dụng trong quá đặt vé online (Chọn mục Khuyến Mãi -> Chọn mục Ticket Voucher) Đối với phần quà tặng combo 2 (gồm 1 bắp 2 nước) bạn vui lòng xuất trình mã barcode trong App thành viên để nhận quà trực tiếp tại Quầy bắp nước bạn nhé. ' +
            'Quà tặng tháng sinh nhật có hạn sử dụng trong tháng sinh nhật.',
    },
    {
        question: 'Làm sao để đặt vé online?',
        answer:
            'Để đặt vé xem phim online tại Galaxy Cinema, bạn có thể làm theo các bước sau:\n' +
            '\n' +
            '1. **Truy cập website hoặc ứng dụng Galaxy Cinema**: Bạn có thể đặt vé trực tiếp trên trang web hoặc qua ứng dụng di động của Galaxy Cinema.\n' +
            '\n' +
            '2. **Chọn phim và suất chiếu**: Sau khi đăng nhập, bạn chọn phim, rạp, và suất chiếu mà bạn muốn xem.\n' +
            '\n' +
            '3. **Chọn ghế ngồi**: Sau khi chọn suất chiếu, bạn sẽ được đưa đến giao diện chọn ghế. Bạn chỉ cần chọn ghế ngồi yêu thích trong rạp.\n' +
            '\n' +
            '4. **Thanh toán**: Sau khi chọn ghế, bạn tiến hành thanh toán bằng các phương thức thanh toán có sẵn như thẻ ngân hàng, ví điện tử, hoặc các phương thức khác.\n' +
            '\n' +
            '5. **Nhận mã QR hoặc vé giấy**: Sau khi thanh toán thành công, bạn sẽ nhận được mã QR qua email hoặc trong ứng dụng. Bạn chỉ cần quét mã này tại rạp để vào xem phim mà không cần phải lấy vé giấy.\n' +
            '\n' +
            'Hệ thống đặt vé online của Galaxy Cinema rất tiện lợi, giúp bạn tiết kiệm thời gian và tránh những phiền phức khi phải xếp hàng mua vé tại rạp.\n' +
            '\n' +
            'Nếu bạn muốn biết thêm chi tiết hoặc gặp vấn đề trong quá trình đặt vé, bạn có thể truy cập vào trang hỗ trợ của Cinema.'
    },
    {
        question: 'Tôi có thể hủy hoặc thay đổi thông tin của vé đã mua online được không?' ,
        answer:
            'Theo chính sách của Galaxy Cinema, khi bạn đã mua vé online, bạn sẽ không thể hủy hoặc thay đổi thông tin vé như rạp, suất chiếu, hoặc thời gian. Một khi giao dịch đã được thực hiện thành công, hệ thống sẽ không cho phép bạn đổi trả hay thay đổi bất kỳ thông tin nào liên quan đến vé đã mua.',
    },
    {
        question: 'Làm sao để khiếu nại hoặc góp ý với CINEMA?',
        answer:
            'Để khiếu nại hoặc góp ý với  Cinema, bạn có thể liên hệ với bộ phận chăm sóc khách hàng qua các kênh sau:\n' +
            '\n' +
            '1. Gửi email đến địa chỉ `info@cinemacine.vn` để nêu rõ vấn đề hoặc góp ý của bạn.\n' +
            '2. Gọi đến số hotline của Galaxy Cinema để nhận hỗ trợ trực tiếp.\n' +
            '3. Bạn cũng có thể đến trực tiếp các rạp chiếu phim của CINEMA để khiếu nại hoặc góp ý.\n'
    },
];

export default FAQ;
