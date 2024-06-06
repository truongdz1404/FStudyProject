import { FC } from "react";
import { MessageSquare, Share, ArrowUp, ArrowDown, Award } from "lucide-react";

const Home: FC = () => {
    return (
        <div className="h-[100vh] flex justify-center items-center mt-[-15%]">
            <div className="hover:bg-gray-100 rounded-lg p-6 max-w-lg w-full cursor-pointer">
                <div className="mt-4">
                    <p className="text-xl font-semibold mb-2">
                        Liệu mình có đang quá yếu đuối?
                    </p>
                    <p className="text-gray-700">
                        Mình là nữ, 22 tuổi. Hiện tại đang vừa học vừa làm. Mình
                        đi làm giờ hành chính và sau đó đi học tới 9h tối. Hiện
                        tại mình là trụ cột chính trong gia đình. Bố mẹ mình
                        đang ly thân, đợi ly hôn. Nhưng bố mình lại là người cực
                        kì toxic, thường xuyên tìm đến nhà để đánh đập và quấy
                        phá, mình sẽ là người đứng ra ngăn ông ấy lại. Những lần
                        như thế đều khiến mình cảm thấy thực sự mệt mỏi. Dạo gần
                        đây kết quả học tập của mình không được tốt lắm vì mình
                        không có nhiều thời gian tập trung cho việc học. Nhưng
                        mình thấy rất nhiều bạn trẻ...
                    </p>
                </div>
                <div className="flex space-x-5 p-4 rounded-md">
                    <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 ml-[-4%] cursor-pointer">
                        <ArrowUp className="w-4 h-4 text-gray-700 hover:text-red-500" />
                        <span className="text-gray-700">77</span>
                        <ArrowDown className="w-4 h-4 text-gray-700 hover:text-blue-500" />
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                        <MessageSquare className="w-4 h-4 text-gray-700 hover:text-red-500" />
                        <span className="text-gray-700">68</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                        <Award className="w-4 h-4 text-gray-700 hover:text-red-500" />
                        <span className="text-gray-700">Award</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                        <Share className="w-4 h-4 text-gray-700 hover:text-red-500" />
                        <span className="text-gray-700">Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
