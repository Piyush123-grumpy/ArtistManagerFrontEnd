// import { RecordModalCrud } from "../../components/forms/modal.crud.component";
// import { AddIcon } from "./components/add_and_edit_icon";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ButtonComponent from "../../components/forms/button.component";
import { useEffect, useState } from "react";
import InputComponent from "../../components/forms/input.components";
import SelectComponent from "../../components/forms/select.component";
import OptionItem from "../../types/option-item.type";
import DateTimePicker from "../../components/forms/datepicker.component";
import UserRepo from "../../repositories/user.repo";
import { useAppSelector } from "../../store/hooks";
const Page = () => {

    const { id } = useAppSelector((state) => {
        return state.auth;
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
        setError,
        setValue,
        control,
    } = useForm<FieldValues>();

    const [loading, setLoading] = useState<boolean>(false)

    const onsubmit: SubmitHandler<FieldValues> = async (submitData) => {
        try {
            setLoading(true)
            const { data } = await _userRepo.updateUserById(submitData, id)
            Object.keys(data.result).map((key) => {
                setValue(key, data['result'][key])
            })
            _userRepo.notifySuccess(data.message)
        } catch(err:any) {
            console.log(err.response.data);
            if (Array.isArray(err.response.data.detail)) {
                err.response.data.detail.forEach((element) => {
                    setError(element.loc[1], {
                        type: "custom",
                        message: element.msg
                    })
                })

            } else {
                const [key, value] = Object.entries(err.response.data.detail)[0];
                setError(key, {
                    type: "custom",
                    message: typeof (value) == 'string' ? value : 'Error'
                })

            }
        } finally {
            setLoading(false)
        }
    }

    const _userRepo = new UserRepo()

    const getUserById = async (id) => {
        try {
            const { data } = await _userRepo.getUserById(id)
            Object.keys(data).map((key) => {
                setValue(key, data[key])
            })
        } catch (err: any) {

        }
    }

    const genderOptions: OptionItem[] = ([{
        label: 'Male',
        value: 'm'
    },
    {
        label: 'Female',
        value: 'f'
    },
    {
        label: 'Others',
        value: 'o'
    }
    ])

    useEffect(() => {
        getUserById(id)

    }, [])


    return (
        <div className=" bg-black w-[850px] my-8 mx-4">
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-2">
                <p className="text-xl text-center">Create User</p>
                <div className="mx-3 mb-6 flex flex-wrap">
                    <div className="w-full md:w-4/12 px-3">
                        <label className="text-white">First Name</label>
                        <InputComponent
                            id={'first_name'}
                            errors={errors}
                            register={register}
                            classes="h-[40px] !bg-black !text-white"
                            validation={{
                                required: 'First Name is required',
                            }}
                            placeholder="First Name"
                        />
                    </div>
                    <div className="w-full md:w-4/12 px-3">
                        <label className="text-white">Last Name</label>

                        <InputComponent
                            id={'last_name'}
                            errors={errors}
                            register={register}
                            classes="h-[40px] !bg-black !text-white"
                            validation={{
                                required: 'Last Name is required',
                            }}
                            placeholder="Last Name"
                        />

                    </div>
                    <div className="w-full md:w-4/12 px-3">
                        <label className="text-white">Email</label>
                        <InputComponent
                            id={'email'}
                            errors={errors}
                            register={register}
                            classes="h-[40px] !bg-black !text-white"
                            validation={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            }}
                            placeholder="Email"
                        />
                    </div>
                    <div className="w-full md:w-4/12 px-3">
                        <label className="text-white">Phone number</label>
                        <InputComponent
                            id={'phone'}
                            type="number"
                            errors={errors}
                            register={register}
                            classes=" h-[40px] !bg-black !text-white"
                            validation={{
                                required: 'Phone number is required'
                            }}
                            placeholder="Phone"
                        />
                    </div>
                    <div className="w-full md:w-4/12 px-3">
                        <label className="text-white">Address</label>
                        <InputComponent
                            id={'address'}
                            type="text"
                            errors={errors}
                            register={register}
                            classes=" h-[40px] !bg-black !text-white"
                            validation={{
                                required: 'Address is required'
                            }}
                            placeholder="Address"
                        />
                    </div>
                    <div className="w-full md:w-4/12 px-3">
                        <SelectComponent
                            labelclass="block mb-2 text-sm font-medium text-white mr-2"
                            outerboxclass={`custom-select inline-block relative custom-top text-gray-700w w-full md:w-auto`}
                            classes="w-full bg-black text-white"
                            options={genderOptions}
                            label={'Select Gender'}
                            id={"gender"}
                            defaultlabel={"Select Gender"}
                            register={register}
                            validation={
                                {
                                    required: { value: true, message: "Select a gender" },
                                }
                            }
                            errors={errors}
                        />
                    </div>
                    <div className="w-full md:w-4/12 px-3">
                        <label className="text-white">Date</label>

                        <DateTimePicker errors={errors} control={control} name="date_time" label="Select Date & Time" />

                    </div>

                </div>

                {/* {errors?.credential && (
        <small className="text-red-700 block">{errors.credential}</small>
      )} */}
                <div className="!my-8 flex">
                    <div className="mx-6">

                        <ButtonComponent
                            classes={'bg-white !text-black font-bold'}
                            loading={loading}
                            label="Update User"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Page;