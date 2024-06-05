import { Profile } from "@/types/profile";

interface HeaderComponentProps {
    fileInputRef: React.RefObject<HTMLInputElement>;
    profile: Profile;
    handleImageClick: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Image: React.FC<HeaderComponentProps> = ({
    fileInputRef,
    profile,
    handleImageClick,
    handleFileChange,
}) => {
    return (
        <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                    <div>
                        <img
                            className="w-24 h-24 rounded-full object-cover object-center cursor-pointer mx-auto"
                            src={profile == null ? "" : profile.avatarUrl + ""}
                            alt="profile image"
                            onClick={handleImageClick}
                            id="profileImage"
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            name="avatarUrl"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <a
                            href="#"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Contact
                        </a>
                        <a
                            href="#"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Image;
