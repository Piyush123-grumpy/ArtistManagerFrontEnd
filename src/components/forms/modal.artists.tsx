import {  Modal } from "flowbite-react";
import { useState } from "react";
import InputComponent from "./input.components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SelectComponent from "./select.component";
import OptionItem from "@/types/option-item.type";
import ButtonComponent from "./button.component";
import DateTimePicker from "./datepicker.component";


export function ArtistModalCrud(props) {

    const { icon, label, type } = props

    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        // reset,
        // setError,
    } = useForm<FieldValues>();

    const onLogin: SubmitHandler<FieldValues> = (data) => {
        console.log(data);

    }

    const [genre, setGenre] = useState<OptionItem[]>([{
        label: 'RNB',
        value: 'rnb'
    },
    {
        label: 'Country',
        value: 'country'
    },
    {
        label: 'Classic',
        value: 'classic'
    },
    {
        label: 'Rock',
        value: 'rock'
    },
    {
        label: 'Jazz',
        value: 'jazz'
    }
    ])

    const [loading, setLoading] = useState<boolean>(false)

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
    }

    return (
        <>
            {icon(setOpenModal)}
            <Modal show={openModal} size="lg" className="bg-[#121212] " onClose={onCloseModal} popup>
                <Modal.Header className="bg-[#121212]" />
                <Modal.Body className="bg-[#121212] !overflow-visible">
                    <div className="">
                        <h3 className="text-xl font-medium text-white dark:text-white">{label} {type}</h3>
                        <div className="my-2">
                            <label className="text-white text-sm">Name</label>
                            <InputComponent
                                id={'Title'}
                                errors={errors}
                                register={register}
                                classes="h-[40px] !bg-black !text-white"
                                validation={{
                                    required: 'Title is required',
                                }}
                                placeholder="Artist Name"
                            />
                        </div>
                        <div className="my-2">
                            <label className="text-white text-sm">Album Name</label>
                            <InputComponent
                                id={'AlbumName'}
                                errors={errors}
                                register={register}
                                classes="h-[40px] !bg-black !text-white"
                                validation={{
                                    required: 'Album Name is required',
                                }}
                                placeholder="Album Name"
                            />
                        </div>
                        <div className="my-2">
                            <label className="text-white text-sm">Address</label>
                            <InputComponent
                                id={'Address'}
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
                                id={'numberOfAlbums'}
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
                            options={genre}
                            label={'Select Gender'}
                            id={"Genre-select"}
                            defaultlabel={"Select Gender"}
                            register={register}
                            validation={
                                {
                                    required: { value: true, message: "Select a Gender" },
                                }
                            }
                            errors={errors}
                        />
                        <label className="text-white text-sm">Date Of birth</label>
                        <DateTimePicker errors={errors} control={control} name="dateTime" label="Select Date & Time" />
                        <ButtonComponent
                            loading={loading}
                            label='Save'
                            type='submit'
                            classes="!bg-white !text-black !mx-auto !my-7 !px-16 !h-[40px] hover:scale-110"
                            buttontext="font-semibold text-md"
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}