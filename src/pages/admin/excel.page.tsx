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
        } catch (error) {
            setMessage("An error occurred while uploading the file.");
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="App mt-8  bg-black p-6">
            <div className='my-2'>
                <h1 className='text-white my-4'>Upload Artists Excel File</h1>
                <input className='text-white' type="file" onChange={handleFileChange} accept=".xlsx" />
                <button className='text-black bg-white px-4 py-2' onClick={handleUpload}>Upload</button>
                {message && <p className='text-white my-2'>{message}</p>}

            </div>
            <hr />
            <div className='flex justify-center items-center'>
                <div className='mt-2'>
                    <p className='text-white'>Download a sample file ?</p>


                    <button className='bg-white mt-4 px-4 py-2 mx-auto rounded-md'>
                        <a href="/Book1.xlsx" download>Download</a>
                    </button>

                </div>

            </div>
        </div>
    );
}

export default App;
