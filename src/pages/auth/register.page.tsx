import ButtonComponent from '../../../src/components/forms/button.component';
import InputComponent from '../../../src/components/forms/input.components';
import  { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import SelectComponent from '../../../src/components/forms/select.component';
import { Link, useNavigate } from 'react-router-dom';
import OptionItem from '@/types/option-item.type';
import DateTimePicker from '../../../src//components/forms/datepicker.component';
import AuthRepo from "../../repositories/auth.repo"

const LoginLink = ({ loading }) => (
    <div className="mx-4 text-sm hover:text-gray-500">
        {loading ? (
            <p className='hover:cursor-not-allowed'>Login to Artist Manager</p>
        ) : (
            <Link to="/auth/login">Login to Artist Manager</Link>
        )}
    </div>
);

const Page = () => {

    const nav = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        control,
        setError,
    } = useForm<FieldValues>();

    const _authRepo = new AuthRepo()

    const onRegister: SubmitHandler<FieldValues> = async (registerData) => {

        try {
            setLoading(true)
            const { data } = await _authRepo.register(registerData)
            _authRepo.notifySuccess(data.message)
            reset()
            nav('/auth/login')

        } catch (err: any) {
            console.log(err.response.data);
            if (Array.isArray(err.response.data.detail)){
                err.response.data.detail.forEach((element)=>{                         
                    setError(element.loc[1], {
                        type: "custom",
                        message: element.msg
                    })
                })

            }else{
                const [key, value] = Object.entries(err.response.data.detail)[0];
                setError(key, {
                    type: "custom",
                    message: typeof(value)=='string'?value:'red'
                })

            }
        }
        finally{
            setLoading(false)
        }

    }

    const genderOptions:OptionItem[] =([{
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

    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div className="text-white flexs">
            <div className="bg-black w-[500px] mx-0 my-6">
                <div className="p-16">
                    <div className="mb-6 mx-auto">
                        <p className="text-2xl font-bold">Register to Artist Manager</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onRegister)}>
                            <label >First Name</label>
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
                            <label >Last Name</label>
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
                            <label>Email</label>
                            <InputComponent
                                id={'email'}
                                errors={errors}
                                register={register}
                                classes="h-[40px] !bg-black !text-white"
                                validation={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                }}
                                placeholder="Email"
                            />
                            <label>Password</label>
                            <InputComponent
                                id={'password'}
                                type="password"
                                errors={errors}
                                register={register}
                                classes=" h-[40px] !bg-black !text-white"
                                validation={{
                                    required: 'Password is required'
                                }}
                                placeholder="Password"
                            />
                            <label>Confirm Password</label>
                            <InputComponent
                                id={'confirm_password'}
                                type="password"
                                errors={errors}
                                register={register}
                                classes=" h-[40px] !bg-black !text-white"
                                validation={{
                                    required: 'Password is required',
                                    validate: {
                                        confirmation: (v) => {
                                            return (
                                                v == getValues()['password'] ||
                                                "Passwords should match!"
                                            )
                                        }
                                    }
                                }}
                                placeholder="Confirm Password"
                            />
                            <label>Phone number</label>
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
                            <label>Address</label>
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
                            {/* <label>Gender</label> */}
                            <SelectComponent
                                labelclass="block mb-2 text-sm font-medium text-white mr-2"
                                outerboxclass={`custom-select inline-block relative custom-top text-gray-700w w-full md:w-auto`}
                                classes="w-full bg-black text-white"
                                options={genderOptions}
                                label={'Select Gender'}
                                id={"gender_select"}
                                defaultlabel={"Select Gender"}
                                register={register}
                                validation={
                                    {
                                        required: { value: true, message: "Select a gender" },
                                    }
                                }
                                errors={errors}
                            />
                            <label>Date Of birth</label>
                            <DateTimePicker errors={errors} control={control} name="date_time" label="Select Date & Time" />
                            <ButtonComponent
                                loading={loading}
                                label='Register'
                                type='submit'
                                classes="!bg-white !text-black !mx-auto !my-7 !px-16 !h-[40px] hover:scale-110"
                                buttontext="font-semibold text-md"
                            />

                        </form>
                    </div>
                    <hr className="color-white my-5" />
                    <div className="flex">
                        <p className="text-sm">Already have an account ?</p>
                        <LoginLink loading={loading}/>
                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Page;