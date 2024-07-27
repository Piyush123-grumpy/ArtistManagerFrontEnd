import MusicRepo from "../../repositories/music.repo";
import { RecordModalCrud } from "../../../src/components/forms/modal.crud.component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../../src/components/forms/pagination";

const AddIcon = (setOpenModal) => (
    <svg onClick={() => setOpenModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>

)
const EditIcon = (setOpenModal) => (
    <svg onClick={() => setOpenModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-blue-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);
type Music = {
    id:number,
    artist_id: number;
    title: string;
    genre: string;
    album_name: string;
};

const Page = (props) => {


    const {artistId}=useParams()

    const [musicData, setMusic] = useState<Music[]>([])

    const [showPagination, setShowPagination] = useState<boolean>(true);

    const [page, setPage] = useState<number>(1);

    const [lastPage, setLastPage] = useState<number>(0);

    const [count, setCount] = useState<number>(0);


    const [refetch,setRefetch]=useState<number>(0)

    const _musicRepo = new MusicRepo()

    const deleteById=async(id)=>{
        try{
            let deletedData=musicData.filter((data)=>data.id!=id)
            setMusic(deletedData)
            const { data } = await _musicRepo.deleteMusicById(id)
            _musicRepo.notifySuccess(data.message)
            setRefetch((prev)=>prev +1)
            
        }catch(err:any){
            _musicRepo.notifySuccess(err.response.detail.data)
        }
    }


    const getMusic = async (artistId,page) => {
        try {
            const { data } = await _musicRepo.getMusic(artistId,page)
            setMusic(data.data)
            setCount(data.count)
            setLastPage(data.count)
            setShowPagination(true)
        } catch (err: any) {
        }
    }

    useEffect(() => {
        getMusic(artistId,page)
    }, [refetch])

    return (
        <div className="my-3xl my-2 text-white">
            <div className="mt-12">
            <p className="font-bold text-4xl px-2 mb-6">Music List</p>
                <div className="flex">
                    
                    <p className="font-bold px-4">Add Music</p>
                    <RecordModalCrud artistId={artistId} setRefetch={setRefetch} label={'Add'} type={'Music'} icon={AddIcon} />

                </div>
            </div>
            <div className="my-5">
                <div className="relative overflow-x-auto">
                    <table className="w-[800px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs bg-black text-white uppercase  dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Album name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Genre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {musicData.map((data) => {
                                return <>
                                    <tr className="bg-[#121212] text-white dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium dark:text-white">
                                            {data.title.charAt(0).toUpperCase() + data.title .slice(1)}
                                        </th>
                                        <td className="px-6 py-4">
                                            {data.album_name.charAt(0).toUpperCase() + data.album_name .slice(1)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.genre.charAt(0).toUpperCase() + data.genre .slice(1)}
                                        </td>
                                        <td className="px-6 py-4 flex">
                                            <div>
                                                <RecordModalCrud artistId={artistId} setRefetch={setRefetch} label={'Edit'} type={'Music'} icon={EditIcon} id={data.id} />
                                            </div>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>{deleteById(data.id)}} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer color-red hover:text-red-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            })}

                        </tbody>
                    </table>
                    {showPagination ? (
                        <Pagination
                            lastPage={lastPage}
                            page={page}
                            setPage={setPage}
                            count={count}
                            getPaginatedData={getMusic}
                        />
                    ) : null}
                </div>

            </div>
        </div>
    );
}

export default Page;