import { store } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
interface Image {
    url: File | string;
}
const values: Image = { url: "" };
const useFireBase = async (urlImage: File) => {
    values.url = urlImage;
    try {
        let fileUrl = "";
        let data  = await values.url.arrayBuffer();
            // Nếu ảnh được chọn từ máy tính (offline)
        // Tải ArrayBuffer lên Firebase Storage
        const metadata = {
            contentType: "image/png",
        };
        const storageRef = ref(
            store,
            `/trong/${values.url || "default_image_name.png"}`
        );
        await uploadBytes(storageRef, data, metadata);
        // Lấy đường dẫn tải xuống của tệp từ Firebase Storage
        fileUrl = await getDownloadURL(storageRef);
        //console.log("File uploaded successfully. Download URL:", fileUrl);
        return fileUrl;
    } catch (error) {
        console.error("Error uploading file:", error);
        return "";
    }
};
export default useFireBase;
