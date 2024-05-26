import { TriangleAlert } from "lucide-react";
const NoPremission = () => {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <h1 className="uppercase tracking-widest text-gray-500 flex">
                <TriangleAlert /> No Premission
            </h1>
        </div>
    );
};
export default NoPremission;
