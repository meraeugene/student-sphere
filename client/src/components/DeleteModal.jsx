import React from "react";

const DeleteCard = ({ onCancel, onDelete }) => {
  return (
    <div className="overlay fixed inset-0 z-10 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300">
      <div className="fixed-container z-20 bg-white opacity-100 transition-all duration-300 w-[25%] border rounded-md p-6">
        <div>
          <h1 className="poppins-semibold mb-2 text-lg">
            Are you absolutely sure?
          </h1>
          <p className="text-sm poppins-regular text-gray-600 ">
            This action cannot be undone. This will permanently delete the data
            from the database.
          </p>
        </div>

        <div className="flex justify-between w-full mt-5">
          <div className="invinsible"></div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-[#164e8e] text-white h-[37px] rounded-md px-4 inter flex items-center justify-center gap-3 hover:bg-[#133e6e] transition-colors duration-300"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-red-400 hover:bg-red-500 text-white h-[37px] rounded-md px-4 inter flex items-center justify-center gap-3 transition-colors duration-300"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
