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
        </div>
      </div>
    </div>
  );
};
export default Image;
