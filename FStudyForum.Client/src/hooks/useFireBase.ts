import { store } from "@/helpers/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useFireBase = async (urlImage: File) => {
    try {
        let fileUrl = "";
        const data  = await urlImage.arrayBuffer();
        const metadata = {
            contentType: "image/png",
        };
        const storageRef = ref(
            store,
            `/trong/${urlImage.name}`
        );
        await uploadBytes(storageRef, data, metadata);
        fileUrl = await getDownloadURL(storageRef);
        return fileUrl;
    } catch (error) {
        return String(error);
    }
};
export default useFireBase;
