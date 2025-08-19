import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { IData, IFormData } from "../../types";
import { useUser } from "../../api/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib";
import { udpatingValues } from "../../lib/features/userControl";

const schema = yup.object({
  // id: yup.string().default(""),
  fullName: yup.string().required("Ismingizni kiriting"),
  username: yup.string().required("Username kiriting"),
  email: yup
    .string()
    .email("Emailingizni togri formatda kiriting")
    .required("Emailingizni kiriting"),
  phoneNumber: yup.string().required("Telefon raqamingizni kiriting"),
  password: yup.string().required("Passwordingizni kiriting"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Kiritgan parolingiz bir-biriga mos emas")
    .required("Parolingizni tasdiqlang"),
  gender: yup
    .string()
    .oneOf(["male", "female", "prefer not to say"], "Jinsingizni tanlang")
    .required("Jinsingizni tanlang"),
});

const User = () => {
  const { createUser, updateUser } = useUser();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        confirmPassword: user.password,
        gender: user.gender,
      });
    }
  }, [user, reset]);

  const onSubmit = (formData: IFormData) => {
    const data: Omit<IData, "id">= {
      // id: formData.id,
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      gender: formData.gender,
    };
    if (user) {
      updateUser.mutate(
        { id: user.id || "", data },
        {
          onSuccess: () => {
            navigate("/");
            dispatch(udpatingValues(null));
            reset({
              id: "",
              fullName: "",
              username: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
              gender: "" as any,
            });
          },
        }
      );
    } else {
      createUser.mutate(data, {
        onSuccess: () => {
          navigate("/");
          reset({
            id: "",
            fullName: "",
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            gender: "" as any,
          });
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-blue-400 to-purple-400 p-6  dark:from-gray-900 dark:to-gray-800 
                transition-colors duration-300">
      <div className="bg-white shadow-lg rounded-md p-8 w-[800px]">
        <h2 className="text-2xl font-bold mb-2">Registration</h2>
        <div className="h-[3px] w-[30px] bg-purple-500 mb-6"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="iname" className="block text-sm font-medium mb-1">
                Full Name
                <input
                  id="iname"
                  type="text"
                  className={`w-full border ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm h-11 px-4 focus:border-blue-400 outline-none`}
                  placeholder="Enter your name"
                  {...register("fullName")}
                />
              </label>
              {errors?.fullName && (
                <p className="text-red-500">{errors?.fullName?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="iusername"
                className="block text-sm font-medium mb-1"
              >
                Username
                <input
                  id="iusername"
                  type="text"
                  className={`w-full border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm h-11 px-4 focus:border-blue-400 outline-none`}
                  placeholder="Enter your username"
                  {...register("username")}
                />
              </label>
              {errors?.username && (
                <p className="text-red-500">{errors?.username?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="iemail"
                className="block text-sm font-medium mb-1"
              >
                Email
                <input
                  id="iemail"
                  type="email"
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm h-11 px-4 focus:border-blue-400 outline-none`}
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </label>
              {errors?.email && (
                <p className="text-red-500">{errors?.email?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="iphone_number"
                className="block text-sm font-medium mb-1"
              >
                Phone Number
                <input
                  id="iphone_number"
                  type="text"
                  className={`w-full border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm h-11 px-4 focus:border-blue-400 outline-none`}
                  placeholder="Enter your number"
                  {...register("phoneNumber")}
                />
              </label>
              {errors?.phoneNumber && (
                <p className="text-red-500">{errors?.phoneNumber?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="ipassword"
                className="block text-sm font-medium mb-1"
              >
                Password
                <input
                  id="ipassword"
                  type="password"
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm h-11 px-4 focus:border-blue-400 outline-none`}
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </label>
              {errors?.password && (
                <p className="text-red-500">{errors?.password?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="iconfirm_password"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
                <input
                  id="iconfirm_password"
                  type="password"
                  className={`w-full border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm h-11 px-4 focus:border-blue-400 outline-none`}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                />
              </label>
              {errors?.confirmPassword && (
                <p className="text-red-500">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <span className="block text-sm font-medium mb-3">Gender</span>
            <div className="flex gap-12">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="male"
                  id="male"
                  className="accent-blue-500"
                  {...register("gender")}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="female"
                  id="female"
                  className="accent-blue-500"
                  {...register("gender")}
                />
                Female
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="prefer not to say"
                  id="prefer not to say"
                  className="accent-blue-500"
                  {...register("gender")}
                />
                Prefer not to say
              </label>
            </div>
            {errors?.gender && (
              <p className="text-red-500">{errors?.gender?.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-8 w-full h-11 font-semibold text-white rounded-md bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 cursor-pointer "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(User);
