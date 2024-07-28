import { useState } from 'react';
import ArtistRepo from "../../repositories/artist.repo";

function App() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const _artistRepo = new ArtistRepo()

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        let headers = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        try {
            const response = await _artistRepo.importArtist(formData, headers);
            setMessage(response.data.detail);
        } catch (error:any) {
            console.log(error.response.data.detail);
            
            setMessage(error.response.data.detail);
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="App mt-8  bg-black p-6 max-w-[800px]">
            <div className='my-2'>
                <h1 className='text-white my-6 text-xl font-bold'>Upload Artists Excel File <i className="mx-4 fa-solid fa-file-excel"></i></h1>
                <input className='text-white' type="file" onChange={handleFileChange} accept=".xlsx" />
                <button className='text-black bg-white px-4 py-2 rounded-md' onClick={handleUpload}>Upload</button>
                {message && <p className='text-white my-2'>{message}</p>}

            </div>
            <hr />
            {/* <div className='flex justify-center items-center'>
                <p className='text-white pt-4'>Download a sample file ?</p>
                <a className='px-4 py-2' href="/Book1.xlsx" download><button className='bg-white mt-4 px-4 py-2 mx-8 rounded-md'>Download</button></a>
            </div> */}
        </div>
    );
}

export default App;
