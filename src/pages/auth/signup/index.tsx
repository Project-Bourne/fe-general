import React, { useState } from "react";
import Link from "next/link";

import { AuthLayout } from "@/layout/index";
import { Input, Button, Dropdown, DropdownWithFlag } from "@/components/ui";
import { UserRoles } from "@/utils/constants";

const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  role: "Desk Officer",
  country: {
    name: "Nigeria",
  },
  password: "",
};

function SignUp() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleSetCountry = (data: any) => {
    setFormData({ ...formData, country: data });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData.first_name === "") {
      setErrors({ ...errors, first_name: "First name must not be empty!" });
      return;
    }
    if (formData.last_name === "") {
      setErrors({ ...errors, last_name: "Last name must not be empty!" });
      return;
    }
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
    <AuthLayout
      headerText={"Create Account"}
      subText={
        "Please enter your work email and create a password to get started"
      }
      isTextCenter={false}
    >
      <form className="mt-[1.5rem] pb-7" onSubmit={handleSubmit}>
        {/* first name  */}
        <div className="mb-3 grid gap-1">
          <label>First Name</label>
          <Input
            placeholder="first name"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          {errors.first_name && (
            <small className="text-sirp-primary">{errors.first_name}</small>
          )}
        </div>
        {/* last name  */}
        <div className="mb-3 grid gap-1">
          <label>Last Name</label>
          <Input
            placeholder="last name"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          {errors.last_name && (
            <small className="text-sirp-primary">{errors.last_name}</small>
          )}
        </div>

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
            <small className="text-sirp-primary">{errors.email}</small>
          )}
        </div>

        {/* user role  */}
        <div className="mb-3 grid gap-1">
          <label>User role</label>
          <Dropdown
            data={UserRoles}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        {/* country  */}
        <div className="mb-3 grid gap-1">
          <label>Country</label>
          <DropdownWithFlag selectItem={handleSetCountry} />
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
            <small className="text-sirp-primary">{errors.password}</small>
          )}
        </div>

        {/* forgot password  */}
        <div className="w-full mb-[30px]">
          <div className="flex gap-1">
            <input type="checkbox" id="rememberMe" />
            <label className="font-light text-[13px]" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </div>

        {/* submit button  */}
        <Button
          value="Create account"
          type="submit"
          classNameStyle="text-white p-3"
          background="bg-sirp-primary"
          size="xl"
        />
        {/* don't have account  */}
        <p className="text-center font-light mt-3">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className=" text-sirp-primary cursor-pointer"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignUp;
