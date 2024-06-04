import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "@/services/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ConfirmEmail: FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [countdown, setCountdown] = useState(20); // Thời gian đếm ngược ban đầu là 20 giây
    const [showResendButton, setShowResendButton] = useState(true); // State để kiểm soát việc hiển thị nút resend email

    useEffect(() => {
        const confirmEmail = async () => {
            const token = searchParams.get("token");
            const email = searchParams.get("email");
            const action = searchParams.get("action");

            if (!token || !email || !action) {
                // toast.warning("Liên kết xác nhận không hợp lệ");
                return;
            }

            try {
                const message = await AuthService.confirmEmail(token, email);
                toast.success(String(message));
                if(action === 'reset-pass'){
                    navigate("/reset-password/change-pass");
                }
                if(action === 'register'){
                    navigate("/auth/signin");
                }
            } catch (error) {
                toast.warning("Xác nhận email thất bại");
            }
        };

        confirmEmail();
    }, [navigate, searchParams]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    setShowResendButton(true); // Hiển thị nút resend email khi countdown đạt 0
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Hàm để gửi lại email xác nhận
    const handleResendEmail = async () => {
        try {
            // Gọi hàm gửi lại email xác nhận ở đây
            // Ví dụ: AuthService.resendConfirmationEmail()
            // Sau khi gửi email thành công, có thể hiển thị thông báo hoặc điều hướng tới trang khác
          //  await AuthService.confirmEmail(); // Gọi hàm resendConfirmationEmail từ AuthService
            toast.success("Email confirmation sent successfully.");
            setCountdown(20); // Reset lại đếm ngược về 20 giây
            setShowResendButton(false); // Ẩn nút resend email sau khi gửi lại email thành công
        } catch (error) {
            toast.error("Failed to resend confirmation email.");
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-6xl text-primary-600 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirmation Email Sent</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    A confirmation email has been sent to your email address. Please check your inbox and follow the
                    instructions to confirm your account.
                </p>
                {/* Hiển thị số countdown và nút resend email */}
                {countdown > 0 && (
                    <>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Didn't receive the email? Click below to resend it.
                        </p>
                        <button
                            onClick={handleResendEmail}
                            disabled={!showResendButton} // Disable nút khi không được phép click
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            {showResendButton ? `Resend Email (${countdown})` : "Resend Email"}
                        </button>
                    </>
                )}
                {/* Nếu countdown đã hết và hiển thị nút resend email */}
                {countdown === 0 && showResendButton && (
                    <>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Resend email countdown has expired. Click below to resend it.
                        </p>
                        <button
                            onClick={handleResendEmail}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            Resend Email
                        </button>
                    </>
                )}
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Return to </span>
                    <button onClick={() => navigate("/auth/register")} className="text-primary-600 hover:underline focus:outline-none">
                        Sign up
                    </button>
                </p>
            </div>
        </section>
    );
};

export default ConfirmEmail;
