import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../app/Services/authApi";
import { setErrors } from "../../Utils/ErrorSlice";
import { setCredentials } from "../../Utils/AuthSlice";
import { useDispatch } from "react-redux";
import FullText from "../../Components/FullText";
import { useNavigate } from "react-router-dom"; 

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const [data, setData] = useState({
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

  const handleLogin = async (e) => {
    try {
      // Attempt login
      const res = await login(data).unwrap();
      dispatch(setCredentials(res)); // Store credentials in Redux

      // Redirect to Dashboard on success
      navigate("/dashboard");  // Navigate to the dashboard page after successful login
    } catch (error) {
      if (error.status === 401 || error.status === 422) {
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
    <>
      <div className="m-5 md:mx-auto lg:w-1/2 min-h-full flex-col justify-center px-6 py-6 lg:px-8 bg-white rounded-xl">
        <div className="sm:mx-auto">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto ">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 text-left"
              >
                User name
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
                    required: "Please enter username",
                  }}
                  errors={errors}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="flex items-center justify-between block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
