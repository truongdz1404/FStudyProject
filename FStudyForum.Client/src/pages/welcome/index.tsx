import { Icons } from "@/components/Icons";
import { signIn } from "@/contexts/auth/reduce";
import { cn } from "@/helpers/utils";
import { useAuth } from "@/hooks/useAuth";
import MajorService from "@/services/MajorService";
import ProfileService from "@/services/ProfileService";
import UserService from "@/services/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import Success from "@/assets/images/motivation.gif";
import { Chip, Input, Radio, Step, Stepper } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CircleAlert } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PHONE_EXP } from "@/helpers/constants";

interface WelcomeFormInputs {
  firstName: string;
  lastName: string;
  phone?: string;
  gender: number;
  marjor?: string;
}

const validation = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .max(20, "First name must no more than 20 characters"),
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .max(20, "Last name must no more than 20 characters"),
  gender: Yup.number().required("Gender is required"),
  phone: Yup.string().optional().matches(PHONE_EXP, "Phone number is not valid")
});

const Welcome = () => {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<WelcomeFormInputs>({
    mode: "onTouched",
    resolver: yupResolver(validation)
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [preStep, setPreStep] = React.useState(-1);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const nextStep = () => {
    if (!isLastStep) {
      setPreStep(activeStep);
      setActiveStep(cur => cur + 1);
    }
  };
  const prevStep = () => {
    if (!isFirstStep) {
      setPreStep(activeStep);
      setActiveStep(cur => cur - 1);
    }
  };

  const [selectedMajor, setSelectedMajor] = React.useState(
    "Software Engineering"
  );
  const [majors, setMajors] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (user == null) return;
    (async () => {
      try {
        setLoading(true);
        const majors = await MajorService.getAll();
        setMajors(majors);
        await ProfileService.getByUsername(user.username);
        navigate("/");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, navigate]);

  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await trigger(["firstName", "lastName", "gender", "phone"]);
        break;
      default:
        isValid = true;
        break;
    }
    if (isValid) {
      nextStep();
    }
  };

  const handleCreateProfile = async (form: WelcomeFormInputs) => {
    try {
      setLoading(true);
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        major: selectedMajor,
        gender: form.gender,
        avatar: "/src/assets/images/user.png",
        phone: form.phone
      };
      await ProfileService.create(payload);
      const user = await UserService.getProfile();
      dispatch(signIn({ user }));
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = (step: number) => {
    return (
      <>
        <div className={cn(step != 0 && "hidden")}>
          <div className="mb-6">
            <p className="text-xl font-semibold">Basic Info</p>
            <p className="text-xs text-gray-600 text-left">
              Tell us a bit about yourself to get started on our forum
            </p>
          </div>

          <div className="flex xl:justify-between xl:flex-row flex-col gap-y-4 xl:gap-x-4">
            <div className="w-full xl:w-1/2">
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm m-1"
              >
                First name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="ex: Bac"
                className={cn(
                  "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
                  " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500 !min-w-[100px]",
                  Boolean(errors.firstName?.message) &&
                    "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
                )}
                containerProps={{ className: "min-w-full" }}
                labelProps={{ className: "hidden" }}
                crossOrigin={undefined}
                {...register("firstName")}
              />
              {errors.firstName && (
                <span
                  className={cn(
                    "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
                  )}
                >
                  <CircleAlert className="w-3 h-3" /> {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm m-1"
              >
                Last name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="ex: Ngo Xuan"
                className={cn(
                  "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
                  " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
                  Boolean(errors.lastName?.message) &&
                    "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
                )}
                containerProps={{ className: "min-w-full" }}
                labelProps={{ className: "hidden" }}
                crossOrigin={undefined}
                {...register("lastName")}
              />
              {errors.lastName && (
                <span
                  className={cn(
                    "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
                  )}
                >
                  <CircleAlert className="w-3 h-3" /> {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full mt-6">
            <label htmlFor="phone" className="block text-gray-700 text-sm m-1">
              Phone (optional)
            </label>
            <Input
              id="phone"
              type="text"
              placeholder="ex: 0123456789"
              className={cn(
                "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
                " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
                Boolean(errors.phone?.message) &&
                  "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
              )}
              labelProps={{ className: "hidden" }}
              crossOrigin={undefined}
              {...register("phone")}
            />
            {errors.phone && (
              <span
                className={cn(
                  "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
                )}
              >
                <CircleAlert className="w-3 h-3" /> {errors.phone.message}
              </span>
            )}
          </div>
          <div className="w-full mt-6 gap-x-2">
            <label className="block text-gray-700 text-sm m-1">Gender</label>
            <div className="flex gap-x-4">
              <Radio
                color="orange"
                label={<p className="text-sm">Male</p>}
                defaultChecked
                crossOrigin={undefined}
                className="w-4 h-4"
                value={0}
                {...register("gender")}
              />
              <Radio
                color="orange"
                label={<p className="text-sm">Female</p>}
                crossOrigin={undefined}
                className="w-4 h-4"
                value={1}
                {...register("gender")}
              />
              <Radio
                color="orange"
                label={<p className="text-sm">Other</p>}
                crossOrigin={undefined}
                className="w-4 h-4"
                value={2}
                {...register("gender")}
              />
            </div>
          </div>
        </div>

        <div className={cn(step != 1 && "hidden", "max-h-full")}>
          <div className="mb-6">
            <p className="text-xl font-semibold">Select your major</p>
            <p className="text-xs text-gray-600 text-left">
              Share your major with us to receive relevant topic suggestions
            </p>
            <div className="overflow-x-auto max-h-[20rem]">
              <div className="mt-6 w-full flex flex-wrap gap-2">
                {majors.map(name => (
                  <div
                    key={name}
                    onClick={() => setSelectedMajor(name)}
                    className="hover:cursor-pointer"
                  >
                    <Chip
                      color="blue-gray"
                      variant={selectedMajor != name ? "ghost" : "filled"}
                      value={name}
                      className={cn("rounded-full capitalize")}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={cn(step != 2 && "hidden")}>
          <div className="mt-6  flex flex-col items-center justify-center">
            <img className="w-20 h-20" src={Success} />
            <p className="text-lg font-semibold text-blue-gray-800">
              Get ready to explore a new world!
            </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <form
      className="flex flex-col justify-center items-center h-screen overflow-hidden"
      onSubmit={handleSubmit(handleCreateProfile)}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="w-full max-w-screen-sm xl:w-1/3 h-full xl:h-[88%] xl:border xl:rounded-md xl:shadow-md p-8 flex flex-col"
      >
        <div className="text-center mb-4">
          <Icons.logo className="w-10 h-10 mx-auto" />
          <span className="font-bold text-xl ">Welcome to FStudy</span>
        </div>
        <Stepper
          activeStep={activeStep}
          isLastStep={value => setIsLastStep(value)}
          isFirstStep={value => setIsFirstStep(value)}
          lineClassName="bg-orange-200"
          activeLineClassName="bg-deep-orange-400"
          className="mb-4"
        >
          <Step
            className="!bg-orange-300 !text-white w-8 h-8"
            activeClassName="!bg-deep-orange-400"
            completedClassName="!bg-deep-orange-400"
          >
            1
          </Step>
          <Step
            className="!bg-orange-300 !text-white w-8 h-8"
            activeClassName="!bg-deep-orange-400"
            completedClassName="!bg-deep-orange-400"
          >
            2
          </Step>
          <Step
            className="!bg-orange-300 !text-white w-8 h-8"
            activeClassName="!bg-deep-orange-400"
            completedClassName="!bg-deep-orange-400"
          >
            3
          </Step>
        </Stepper>

        <motion.div
          key={activeStep}
          initial={{ x: preStep < activeStep ? -2 : 2, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          {renderStep(activeStep)}
        </motion.div>

        <div className="flex justify-between mt-auto">
          <button
            type="button"
            onClick={() => {
              !loading && prevStep();
            }}
            className={cn(
              "flex gap-x-2 text-deep-orange-400 hover:cursor-pointer select-none font-bold",
              isFirstStep && "text-orange-100"
            )}
          >
            <ChevronLeft /> Back
          </button>
          <button
            type={isLastStep ? "submit" : "button"}
            onClick={() => {
              !loading && !isLastStep && handleNext();
            }}
            className={cn(
              "flex gap-x-2 text-deep-orange-400 hover:cursor-pointer select-none font-bold"
            )}
          >
            {!isLastStep ? "Next" : "Finish"}
            <ChevronRight />
          </button>
        </div>
      </motion.div>
    </form>
  );
};

export default Welcome;
