import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { AuthLayout } from "@/layout/index";
import Link from "next/link";

const intialFormData = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(intialFormData);
  const [errors, setErrors] = useState(intialFormData);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData.email === "") {
      setErrors({ ...errors, email: "Email must not be empty!" });
      return;
    }
    if (formData.password === "") {
      setErrors({ ...errors, password: "Password must not be empty!" });
      return;
    }

  };

  return (
    <>
      <AuthLayout
        headerText={"Log In"}
        subText={"Please fill your detail to access your account"}
        isTextCenter={false}
      >
        <form className="mt-[3rem]" onSubmit={handleSubmit}>
          {/* email  */}
          <div className="mb-3 grid gap-1">
            <label>Email</label>
            <Input
              placeholder="debra.holt@example.com"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <small className="text-[#B22735]">{errors.email}</small>
            )}
          </div>

          {/* password  */}
          <div className="grid gap-1 mb-3">
            <label>Password</label>
            <Input
              placeholder="*********"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <small className="text-[#B22735]">{errors.password}</small>
            )}
          </div>

          {/* forgot password  */}
          <div className="w-full mb-[50px] flex flex-wrap justify-between">
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="rememberMe" />
              <label className="font-light text-[13px]" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <div>
              <p className="font-light text-sirp-primary cursor-pointer">
                Forgot Password?
              </p>
            </div>
          </div>
          {/* submit button  */}
          <Button
            value="Sign in"
            type="submit"
            classNameStyle="text-white p-3"
            background="bg-sirp-primary"
            size="xl"
          />
          {/* don't have account  */}
          <p className="text-center font-light mt-5">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className=" text-sirp-primary cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
}

export default Login;
