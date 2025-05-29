import { Link } from "react-router-dom";
import PrimaryButton from "../Shared/PrimaryButton";
import SecondaryButton from "../Shared/SecondaryButton";

const ForgotPassword = () => {
  return (
    <section className="forgot-password h-screen w-full">
      <div className="container px-4 elementCenter relative">
        <div className="w-[350px]">
          <h1 className="text-dark text-[24px] md:text-[32px] font-bold mb-2">
            Forgot Password?
          </h1>
          <p className="text-base md:text-[18px] font-medium text-[#676767] leading-6">
            We are sorry to hear that happen.  Don’t be sad we could help you
            get back to productivity in no time.
          </p>
          <form action="" className="mt-10">
            <div className="email mb-10">
              <label
                htmlFor="email"
                className="block mb-1 text-dark font-medium text-[18px]"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your email"
                className="inputField"
              />
            </div>
            <div className=" flex flex-col gap-5 ">
              <PrimaryButton text={"Next"} type={"submit"} />
              <div className="md:hidden">
                <Link to="/create-account">
                  <SecondaryButton text={"Create Account"} type={"button"} />
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="absolute top-10 right-15 hidden md:block">
          <Link to="/create-account">
            <SecondaryButton text={"Create Account"} type={"button"} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
