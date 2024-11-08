import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../app/Services/authApi"; 
import { setCredentials } from "../../Utils/AuthSlice";
import { useDispatch } from "react-redux";
import FullText from "../../Components/FullText";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading, isSuccess, isError }] = useSignupMutation();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSignup = async () => {
    try {
      const res = await signup(data).unwrap();
      dispatch(setCredentials(res)); 
      navigate("/dashboard");  
    } catch (error) {
      if (error.status === 422 || error.status === 400) {
        setError('password', { type: 'custom', message: error?.data?.message });
      }
      if (error.status === 404) {
        setError('email', { type: 'custom', message: error?.data?.message });
      }
    }
  };

  const onChange = (e) => {
    clearErrors(e.target.name);
    setValue(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="m-5 md:mx-auto lg:w-1/2 min-h-full flex-col justify-center px-6 py-6 lg:px-8 bg-white rounded-xl">
      <div className="sm:mx-auto">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto ">
        <form className="space-y-6" onSubmit={handleSubmit(handleSignup)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Full Name
            </label>
            <div className="mt-2">
              <FullText
                register={register}
                name="name"
                type="text"
                value={data?.name}
                onChange={onChange}
                withCheck={true}
                options={{
                  required: "Please enter your full name",
                }}
                errors={errors}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Email Address
            </label>
            <div className="mt-2">
              <FullText
                register={register}
                name="email"
                type="text"
                value={data?.email}
                onChange={onChange}
                withCheck={true}
                options={{
                  required: "Please enter email",
                }}
                errors={errors}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="flex items-center justify-between block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2 ">
              <FullText
                register={register}
                name="password"
                type="password"
                value={data?.password}
                onChange={onChange}
                withCheck={true}
                options={{
                  required: "Please enter password",
                }}
                errors={errors}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-green-600 hover:text-green-500"
          >
            Already have an account? Log in
          </button>
        </div>
      </div>
    </div>
  );
}
