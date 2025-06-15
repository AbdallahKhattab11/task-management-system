<>
  {/* Desktop */}
  <section className="login h-screen w-full py-5 hidden lg:block">
    <div className="container px-5 flex">
      {/* left side */}
      <div className="left-side w-1/2 elementCenter relative">
        <div className=" flex flex-col items-center justify-center gap-10 ">
          <div className="heading self-start">
            <h2 className="text-dark text-[32px] font-bold ">Welcome Back.</h2>
          </div>
          <form onSubmit={handleLogin} action="" className=" ">
            <div className="error">
              {firebaseError && (
                <Alert
                  type="error"
                  message={firebaseError}
                  isDisplayed={isDisplayed}
                />
              )}
            </div>
            <div className="email mb-6 ">
              <label
                htmlFor="email"
                className="block mb-1 text-dark font-medium text-[18px]"
              >
                Email Aress
              </label>
              <input
                ref={emailRef}
                type="email"
                className={`w-[350px] h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2  ${
                  emailError || firebaseError
                    ? "outline-error"
                    : " outline-blue"
                } `}
                name="email"
                id="email"
                placeholder="Enter Email"
              />
              <p
                className={`mt-1  text-sm font-medium ${
                  emailError ? "text-error" : "text-dolghin opacity-0"
                }`}
              >
                {emailError ? emailError : "example.abdallah@gmail.com"}
              </p>
            </div>
            <div className="password mb-6">
              <label
                htmlFor="password"
                className="block mb-1 text-dark font-medium text-[18px]"
              >
                Enter Your Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                className={`w-[350px] h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 ${
                  passwordError || firebaseError
                    ? "outline-error"
                    : "outline-blue"
                }`}
                name="password"
                id="password"
                placeholder="Enter Your Password"
              />
              <p
                className={`mt-1 text-sm font-medium ${
                  passwordError ? "text-error" : "text-dolghin opacity-0"
                }`}
              >
                {passwordError
                  ? passwordError
                  : "Upto 8 characters with an Uppercase, symbol and number"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="check-1"
                name="check-1"
                className="peer hidden"
              />
              <label
                htmlFor="check-1"
                className="size-[22px] rounded-md border-2 border-blue flex items-center justify-center cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors duration-200"
              >
                <FaCheck className="text-white text-md opacity-100 transition-opacity duration-200" />
              </label>
              <label
                htmlFor="check-1"
                className="text-[18px] text-black font-medium tracking-wide cursor-pointer"
              >
                Keep me Signed in
              </label>
            </div>
            <div className="submit mt-10 flex gap-5">
              <PrimaryButton
                text={"Log in"}
                type={"submit"}
                isLoading={isLoading}
              />
            </div>
            <div className="forgot-password mt-10">
              <Link
                to="/forgot-password"
                className="text-[18px] text-blue font-medium tracking-wide"
              >
                Forgot Password ?
              </Link>
            </div>
          </form>
        </div>
        {isLoading && (
          <div className="loading absolute w-full h-full bg-gray-800/30 flex items-center justify-center z-50 rounded-[32px]">
            <Loading display={isLoading} />
          </div>
        )}
      </div>

      {/* right side */}
      <div
        className="right-side w-1/2 rounded-4xl grid grid-rows-3 p-10 xl:p-15 relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "left",
          backgroundSize: "cover",
        }}
      >
        <div className="row-span-2 flex items-center justify-end text-right">
          <h1 className="text-[48px] xl:text-[56px] text-white font-semibold transition-all duration-300">
            Take your <br /> productivity to the <br /> next level.
          </h1>
        </div>
        <div className="getMobileApp-copyright flex flex-col items-end justify-center gap-10">
          <fieldset className="border border-white rounded-xl px-5 pb-5 pt-2 flex gap-5 w-max">
            <legend className="text-white text-[20px] font-medium px-2 ">
              Get the Mobile App
            </legend>
            <button className="apple">Download on Apple</button>
            <button className="android">Download on Android</button>
          </fieldset>
          <div className="copyright text-white text-xl font-medium tracking-wide">
            Copyright 2025 | All Right Reserved
          </div>
        </div>
        <div className="create-account absolute top-10 right-15">
          <Link to="/create-account">
            <SecondaryButton text={"Create Account"} type={"button"} />
          </Link>
        </div>
      </div>
    </div>
  </section>

                  <SecondaryButton
                    type={"button"}
                    text={"Create Account"}
                    customStyles={"CustomLogin"}
                  />


