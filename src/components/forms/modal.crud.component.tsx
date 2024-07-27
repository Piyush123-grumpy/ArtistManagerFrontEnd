import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import InputComponent from "./input.components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SelectComponent from "./select.component";
import OptionItem from "@/types/option-item.type";
import ButtonComponent from "./button.component";
import MusicRepo from "../..//repositories/music.repo";

export function RecordModalCrud(props) {

  const { icon, label, type, id, setRefetch,artistId } = props

  const [openModal, setOpenModal] = useState(false);

  const _musicRepo = new MusicRepo()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (submitData) => {
    if (id) {
      try {
        setLoading(true)
        submitData['artist_id']=artistId
        const { data } = await _musicRepo.updateMusicById(submitData, id)
        setRefetch((prevData) => prevData + 1)
        _musicRepo.notifySuccess(data.message)

      } catch (err: any) {

      } finally {
        setLoading(false)
      }
    } else {
      try {
        setLoading(true)
        console.log('here');
        
        submitData['artist_id']=artistId
        console.log(submitData);
        
        const { data } = await _musicRepo.createMusic(submitData)
        reset()
        setRefetch((prevData) => prevData + 1)
        _musicRepo.notifySuccess('Music Created')
      } catch (err: any) {

      } finally {
        setLoading(false)
      }
    }

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

  const getMusicById = async (id) => {
    try {
      const { data } = await _musicRepo.getMusicById(id)
      Object.keys(data).map((key) => {
        setValue(key, data[key])
      })
    } catch (err: any) {

    }
  }

  function onCloseModal() {
    setOpenModal(false);

  }

  useEffect(() => {
    if (id) {
      if (openModal == true) {
        getMusicById(id)
      }
    }

  }, [openModal])

  return (
    <>
      {icon(setOpenModal)}
      <Modal show={openModal} size="sm" className="bg-[#121212]" onClose={onCloseModal} popup>
        <Modal.Header className="bg-[#121212]" />
        <Modal.Body className="bg-[#121212] !overflow-visible">
          <div className="">
            <h3 className="text-xl font-medium text-white dark:text-white">{label} {type}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-2">
                <label className="text-white text-sm">Title</label>
                <InputComponent
                  id={'title'}
                  errors={errors}
                  register={register}
                  classes="h-[40px] !bg-black !text-white"
                  validation={{
                    required: 'Title is required',
                  }}
                  placeholder="Title"
                />
              </div>
              <div className="my-2">
                <label className="text-white text-sm">Album Name</label>
                <InputComponent
                  id={'album_name'}
                  errors={errors}
                  register={register}
                  classes="h-[40px] !bg-black !text-white"
                  validation={{
                    required: 'Album Name is required',
                  }}
                  placeholder="Album Name"
                />
              </div>
              <SelectComponent
                labelclass="block mb-2 text-sm font-medium text-white mr-2"
                outerboxclass={`custom-select inline-block relative custom-top text-gray-700w w-full md:w-auto`}
                classes="w-full bg-black text-white"
                options={genre}
                label={'Select Genre'}
                id={"genre"}
                defaultlabel={"Select Genre"}
                register={register}
                validation={
                  {
                    required: { value: true, message: "Select a Genre" },
                  }
                }
                errors={errors}
              />
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