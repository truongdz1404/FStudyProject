import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import UserService from "@/services/UserService";

const ConfirmEmail: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(20); // Initial countdown time is 20 seconds
  const [showResendButton, setShowResendButton] = useState(false); // Initially hide the resend email button

  // Extract email from query parameters
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setShowResendButton(true); // Show the resend email button when countdown reaches 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to resend the confirmation email
  const handleRequestNewOne = async () => {
    setLoading(true);
    try {
      await UserService.forgotPassword(email);
      navigate(`/reset-password/confirm-reset-email?email=${email}`, {
        replace: true,
        state: { email },
      });
    } catch (error) {
      console.error("Failed to resend password reset email.");
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-12 shadow-lg max-w-lg w-full transform scale-120">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="text-8xl text-blue-600 mb-6"
        />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Change Password Email Sent
        </h2>
        <p className="text-lg text-justify text-gray-700 dark:text-gray-300 mb-8">
          A change password email has been sent to your email address. Please
          check your inbox and follow the instructions to confirm your account.
        </p>
        {/* Display countdown and resend email button */}
        {countdown > 0 && (
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Didn't receive the email? You can resend it in {countdown} seconds.
          </p>
        )}
        {countdown === 0 && showResendButton && (
          <>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Didn't receive the email?
            </p>
            <button
              onClick={handleRequestNewOne}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Resend Email
            </button>
          </>
        )}
        <p className="mt-8 text-base text-gray-500 dark:text-gray-400">
          <span>Return to </span>
          <button
            onClick={() => navigate("/auth/signin")}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            SignIn
          </button>
        </p>
      </div>
    </section>
  );
};

export default ConfirmEmail;
