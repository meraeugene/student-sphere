import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfilePicture } from "@/features/authentication/authSlice";

const ProfileManagement = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [profilePicture, setProfilePicture] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      address: "",
      phoneNumber: "",
      profilePicture: null,
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost/student-sphere/server/Users/get_user_profile.php?user_id=${userInfo.user_id}`
        );
        const profileData = response.data;

        reset({
          firstName: profileData.first_name,
          lastName: profileData.last_name,
          email: profileData.email,
          birthday: profileData.date_of_birth,
          address: profileData.address,
          phoneNumber: profileData.phone_number,
          profilePicture: profileData.profile_picture,
        });

        if (profileData.profile_picture) {
          setProfilePicture(profileData.profile_picture);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userInfo.user_id, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("birthday", data.birthday);
      formData.append("address", data.address);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("user_id", userInfo.user_id);
      if (data.profilePicture[0]) {
        formData.append("profilePicture", data.profilePicture[0]);
      }

      const response = await axios.post(
        "http://localhost/student-sphere/server/Users/update_user_profile.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message);

      // Update profile picture URL
      if (data.profilePicture[0]) {
        const updatedProfileData = await axios.get(
          `http://localhost/student-sphere/server/Users/get_user_profile.php?user_id=${userInfo.user_id}`
        );
        const newProfilePicture = updatedProfileData.data.profile_picture;
        setProfilePicture(newProfilePicture);
        dispatch(updateProfilePicture(newProfilePicture));
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="w-full ml-[320px] overflow-auto">
      <div className="px-8 py-10 pb-16">
        <div className="flex items-center gap-3 mb-10">
          <img src="/images/changeprofile.svg" alt="change profile" />
          <h1 className="text-2xl poppins-medium uppercase">
            Profile Management
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-1/2"
        >
          <div className="profile-photo mb-8">
            <h1 className="text-xl font-medium">Profile Photo</h1>

            <div className="mt-4 flex  flex-col gap-6">
              <img
                src={imagePreview || profilePicture}
                alt="profile picture"
                loading="lazy"
                className="mt-3 h-[100px] w-[100px] rounded-full  border object-cover"
              />
              <label
                htmlFor="file"
                className="bg-[#164e8e] text-white hover:bg-[#133e6e] transition-colors duration-300 h-[40px] rounded-md px-4 inter flex items-center justify-center gap-3   w-[150px] cursor-pointer"
              >
                Change Profile
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                className="hidden"
                {...register("profilePicture")}
                onChange={(e) => {
                  register("profilePicture").onChange(e);
                  handleImageChange(e);
                }}
              />
            </div>
          </div>

          <h1 className="text-2xl poppins-medium uppercase">
            Personal Details
          </h1>
          <InputField
            name="firstName"
            label="First Name"
            required
            register={register}
            errors={errors}
          />

          <InputField
            name="lastName"
            label="Last Name"
            required
            register={register}
            errors={errors}
          />

          <InputField
            name="email"
            label="Email"
            required
            register={register}
            errors={errors}
          />

          <InputField
            name="birthday"
            label="Date of Birth"
            type="date"
            required
            register={register}
            errors={errors}
          />

          <InputField
            name="address"
            label="Address"
            placeholder="Address"
            required
            register={register}
            errors={errors}
          />

          <InputField
            name="phoneNumber"
            label="Phone Number"
            placeholder="09998271821"
            required
            register={register}
            errors={errors}
            pattern={/^\d+$/}
          />

          <div className="flex flex-col gap-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-2 inter flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <l-dot-pulse size="38" speed="1.3" color="white"></l-dot-pulse>
              ) : (
                <div className="flex items-center gap-3">
                  <span>Update Profile</span>
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7H17M17 7L11 1M17 7L11 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;
