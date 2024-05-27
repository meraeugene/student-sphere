// Custom styles for react-select
export const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "60px",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#E2E8F0",
    padding: "0.3em",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#0C1E33",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#0C1E33",
    ":hover": {
      backgroundColor: "#0C1E33",
      color: "white",
    },
  }),
};
