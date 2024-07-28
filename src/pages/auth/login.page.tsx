import { useState } from "react";
import InputComponent from "../../../src/components/forms/input.components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ButtonComponent from "../../../src/components/forms/button.component";
import { Link } from "react-router-dom";
import AuthRepo from "../../repositories/auth.repo"
import { signIn } from "../../store/slicers/auth.slicer";
import { useAppDispatch } from "../../store/hooks";
const Page = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
        // setError,
    } = useForm<FieldValues>();

    const dispatch=useAppDispatch()

    const _authRepo=new AuthRepo()

    const onLogin: SubmitHandler<FieldValues> = async(loginData) => {
        try{
            setLoading(true)
            const {data}=await _authRepo.login(loginData)
            dispatch(signIn({
                token:data.access_token,
                id:data.user.id,
                first_name:data.user.first_name,
                last_name:data.user.last_name,
                email:data.user.email,
                refresh_token:data.refresh_token
            }))
        }catch(err:any){
            console.log(err);
            _authRepo.notifyError(err.response.data.detail)
        }finally{
            setLoading(false)
        }

    }

    const [loading, setLoading] = useState<boolean>(false)
    return (
        <div className="text-white flex">
            <div className="bg-black w-[500px] mx-0">
                <div className="p-16">
                    <div className="mb-6 mx-auto">
                        <p className="text-2xl font-bold">Login to Artist Manager</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onLogin)}>
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
                                        message: "invalid email address"
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
                            <ButtonComponent
                                loading={loading}
                                label='Login'
                                type='submit'
                                classes="!bg-white !text-black !mx-auto !my-7 !px-16 !h-[40px] hover:scale-110"
                                buttontext="font-semibold text-md"
                            />
                        </form>
                    </div>
                    <hr className="color-white my-5" />
                    <div className="flex">
                        <p className="text-sm">Dont have an account ?</p>
                        <Link to='/auth/register'>
                            <p className="mx-4 text-sm hover:text-gray-500">Sign up for Artist Manager</p>
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Page;