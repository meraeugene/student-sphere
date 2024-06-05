import { tailspin } from "ldrs";

const Loader = () => {
  tailspin.register();

  return (
    <div className={` flex h-full w-full items-center justify-center mt-20 `}>
      <l-tailspin size="40" stroke="3.5" speed="1" color="#164e8e"></l-tailspin>
    </div>
  );
};

export default Loader;
