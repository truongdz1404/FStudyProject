import { Profile } from "@/types/profile";
import {
    Button,
    Card,
    Typography,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { FormikProps } from "formik";
import React from "react";
interface HeaderComponentProps {
    fileInputRef: React.RefObject<HTMLInputElement>;
    formik: FormikProps<Profile>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Form: React.FC<HeaderComponentProps> = ({
    formik,
    fileInputRef,
    handleFileChange,
}) => {
    return (
        <>
            <div className="col-span-4 sm:col-span-9">
                <div className="bg-white shadow rounded-lg p-6">
                    <Card color="transparent" shadow={false}>
                        <form
                            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    name="avatarUrl"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="-mb-3"
                                >
                                    First Name
                                </Typography>
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                    crossOrigin={undefined}
                                />
                                {formik.touched.firstName &&
                                formik.errors.firstName ? (
                                    <div className="text-red-500">
                                        {formik.errors.firstName}
                                    </div>
                                ) : null}
                            </div>

                            <div className="mb-1 flex flex-col gap-6">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="-mb-3"
                                >
                                    Last Name
                                </Typography>
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                    crossOrigin={undefined}
                                />
                                {formik.touched.lastName &&
                                formik.errors.lastName ? (
                                    <div className="text-red-500">
                                        {formik.errors.lastName}
                                    </div>
                                ) : null}
                            </div>

                            <div className="mb-1 flex flex-col gap-6">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="-mb-3"
                                >
                                    Gender
                                </Typography>
                                <div className="flex w-[100%] flex-col gap-6">
                                    <Select
                                        size="lg"
                                        label="Select Gender"
                                        name="gender"
                                        value={formik.values.gender + "" || ""}
                                        onChange={(value) => {
                                            formik.setFieldValue(
                                                "gender",
                                                value as string
                                            );
                                        }}
                                        onBlur={formik.handleBlur}
                                    >
                                        <Option value="0">Male</Option>
                                        <Option value="1">FeMale</Option>
                                        <Option value="2">Other</Option>
                                    </Select>
                                </div>
                                {formik.touched.gender &&
                                formik.errors.gender ? (
                                    <div className="text-red-500">
                                        {formik.errors.gender}
                                    </div>
                                ) : null}
                            </div>

                            <div className="mb-1 flex flex-col gap-6">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="-mb-3"
                                >
                                    Birth Date
                                </Typography>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        id="date-picker"
                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" "
                                        type="datetime-local"
                                        name="birthDate"
                                        value={formik.values.birthDate + ""}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Select a Date
                                    </label>
                                </div>
                                {formik.touched.birthDate &&
                                formik.errors.birthDate ? (
                                    <div className="text-red-500">
                                        {formik.errors.birthDate}
                                    </div>
                                ) : null}
                            </div>

                            <Button type="submit" className="mt-6" fullWidth>
                                Save
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
};
export default Form;
