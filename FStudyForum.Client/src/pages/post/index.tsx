import PaymentService from "@/services/PaymentService";

const Post = () => {
  const getPaymentQR = async () => {
    const payment = await PaymentService.getPayMentQR();
    console.log(payment);
  };
  return (
    <div>
      <h1
        className="cursor-pointer text-orange-500 h-[200vh]"
        onClick={getPaymentQR}
      >
        Post
      </h1>
    </div>
  );
};
export default Post;
