import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";

const ProfileManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full ml-[320px] overflow-auto ">
      <div className="px-8 py-10 pb-16 ">
        <div className="flex items-center gap-3 mb-10">
          <img src="/images/changeprofile.svg" alt="change profile" />
          <h1 className="text-2xl poppins-medium uppercase ">
            Profile Management
          </h1>
        </div>

        {/* PERSONAL INFORMATION CONTAINER */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-1/2  "
        >
          <h1 className="text-2xl poppins-medium uppercase ">
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

          <div className="flex flex-col gap-4 ">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-[#0C1E33] text-white h-[55px] rounded-md mt-2 inter flex items-center justify-center gap-3"
            >
              {isSubmitting === "loading" ? (
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
