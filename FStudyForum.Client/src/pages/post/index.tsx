import PaymentService from "@/services/PaymentService";

const Post = () => {
    const getPaymentQR = async () => {
        const payment = await PaymentService.getPayMentQR();
        console.log(payment);
    };
    return (
        <div>
            <h1
                className="cursor-pointer text-orange-500"
                onClick={getPaymentQR}
            >
                Posdfghbngt
            </h1>
        </div>
    );
};
export default Post;
