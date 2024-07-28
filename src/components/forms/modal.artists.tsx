import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import InputComponent from "./input.components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SelectComponent from "./select.component";
import OptionItem from "@/types/option-item.type";
import ButtonComponent from "./button.component";
import DateTimePicker from "./datepicker.component";
import ArtistRepo from "../../repositories/artist.repo";
import { years } from "../utils/years";


export function ArtistModalCrud(props) {

    const { icon, label, type, id, setRefetch} = props

    const [openModal, setOpenModal] = useState(false);

    const [loading, setLoading] = useState<boolean>(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setValue,
        // setError,
    } = useForm<FieldValues>();

    const _artistRepo = new ArtistRepo()

    const onSubmit: SubmitHandler<FieldValues> = async (submitData) => {
        if (id) {
            try {
                setLoading(true)
                const { data } = await _artistRepo.updateArtistById(submitData, id)
                _artistRepo.notifySuccess(data.message)

            } catch (err: any) {
                _artistRepo.notifyError('Error updating artist')
            } finally {
                setLoading(false)
            }

        } else {
            try {
                setLoading(true)
                const { data } = await _artistRepo.createArtist(submitData)
                reset()
                _artistRepo.notifySuccess('Artist Created')
            } catch (err: any) {

            } finally {
                setLoading(false)
            }
        }
        setRefetch((prevData) => prevData + 1)
    }

    const genderOptions:OptionItem[]= [{
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
    ]

    function onCloseModal() {
        setOpenModal(false);
    }

    const getArtistById = async (id) => {
        try {
            const { data } = await _artistRepo.getArtistById(id)
            Object.keys(data).map((key) => {
                setValue(key, data[key])
            })
        } catch(err:any) {
            _artistRepo.notifyError('Error fetchign artist')
        }
    }

    useEffect(() => {
        if (id  ) {
            if (openModal == true) {
                getArtistById(id)
            }
        }

    }, [openModal])

    return (
        <>
            {icon(setOpenModal)}
            <Modal show={openModal} size="lg" className="bg-[#121212] " onClose={onCloseModal} popup>
                <Modal.Header className="bg-[#121212]" />
                <Modal.Body className="bg-[#121212] !overflow-visible">
                    <div className="">
                        <h3 className="text-xl font-medium text-white dark:text-white">{label} {type}</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-2">
                                <label className="text-white text-sm">Name</label>
                                <InputComponent
                                    id={'name'}
                                    errors={errors}
                                    register={register}
                                    classes="h-[40px] !bg-black !text-white"
                                    validation={{
                                        required: 'Name is required',
                                    }}
                                    placeholder="Artist Name"
                                />
                            </div>
                            <div className="my-2">
                                <label className="text-white text-sm">Address</label>
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
                            <div className="my-2">
                                <label className="text-white text-sm">Number of albums released</label>
                                <InputComponent
                                    type="number"
                                    id={'no_of_albums_released'}
                                    errors={errors}
                                    register={register}
                                    classes="h-[40px] !bg-black !text-white"
                                    validation={{
                                        required: 'Number of albums is required',
                                    }}
                                    placeholder="Number of albums"
                                />
                            </div>
                            <SelectComponent
                                labelclass="block mb-2 text-sm font-medium text-white mr-2"
                                outerboxclass={`custom-select inline-block relative custom-top text-gray-700w w-full md:w-auto`}
                                classes="w-full bg-black text-white"
                                options={years}
                                label={'First Release Year'}
                                id={"first_release_year"}
                                defaultlabel={"First Release Year"}
                                register={register}
                                validation={
                                    {
                                        required: { value: true, message: "Select a Year" },
                                    }
                                }
                                errors={errors}
                            />
                            <SelectComponent
                                labelclass="block mb-2 text-sm font-medium text-white mr-2"
                                outerboxclass={`custom-select inline-block relative custom-top text-gray-700w w-full md:w-auto`}
                                classes="w-full bg-black text-white"
                                options={genderOptions}
                                label={'Select Gender'}
                                id={"gender"}
                                defaultlabel={"Select gender"}
                                register={register}
                                validation={
                                    {
                                        required: { value: true, message: "Select a Gender" },
                                    }
                                }
                                errors={errors}
                            />
                            <label className="text-white text-sm">Date Of birth</label>
                            <DateTimePicker errors={errors} control={control} name="dob" label="Select Date & Time" />
                            <ButtonComponent
                                loading={loading}
                                label='Save'
                                type='submit'
                                classes="!bg-white !text-black !mx-auto !my-7 !px-16 !h-[40px] hover:scale-110"
                                buttontext="font-semibold text-md"
                            />
                        </form>

                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}