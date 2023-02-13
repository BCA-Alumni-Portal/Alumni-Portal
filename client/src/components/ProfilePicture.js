import personImage2 from '../images/person2.png';
import { useAuth0 } from '@auth0/auth0-react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useEffect, useState } from 'react';
import './styles/ProfilePicture.css';

export default function ProfilePicture() {
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [profilePictureUncropped, setProfilePictureUncropped] = useState(null);
    const [profilePictureUploaded, setProfilePictureUploaded] = React.useState(false);
    const [cropper, setCropper] = useState(null);
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();


    useEffect(() => {
        setProfilePictureFile(personImage2);
    }, []);

    const profilePictureUploader = React.useRef(null);

    const profilePictureUpload = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            setProfilePictureUploaded(true);
            reader.onload = (e) => {
                setProfilePictureUncropped(reader.result);
            }
            reader.readAsDataURL(file);
        }
    };

    const closeModal = () => {
        document.getElementById('pfp-upload-modal').checked = false;
        setProfilePictureUploaded(false)
    }

    const finishCrop = () => {
        if (typeof cropper !== "undefined") {
            setProfilePictureFile(cropper.getCroppedCanvas().toDataURL());
            setProfilePictureUncropped(null);
        }
        document.getElementById('pfp-upload-modal').checked = false;
        setProfilePictureUploaded(false)
    }

    return (
        <div>
            <label htmlFor='pfp-upload-modal'>
                <div className="avatar" >
                    <div className="w-64 rounded-full">
                        <div id="wrapperpfp">
                            <img id="pfp" src={profilePictureFile} />
                            <p id="changepfp">+</p>
                        </div>
                    </div>
                    <input type="file" accept="image/*" multiple="false" onChange={profilePictureUpload} ref={profilePictureUploader} style={{ display: "none" }} />
                </div>
            </label>

            <input type="checkbox" id="pfp-upload-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    {!profilePictureUploaded ? (
                        <div>
                            <div className="text-left mb-6">
                                <h3 className="text-xl font-bold text-stone-600">Change Profile Picture</h3>
                                <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-stone-600" onClick={() => closeModal()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div>
                                <button
                                    className="drop-shadow-lg text-lg font-bold text-stone-600 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border border-amber-100 hover:border-amber-400 rounded py-2 px-4 "
                                    onClick={() => profilePictureUploader.current.click()}
                                >
                                    Upload Image
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="text-left mb-6">
                                <h3 className="text-xl font-bold text-stone-600">Crop Profile Picture</h3>
                                <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-stone-600" onClick={() => closeModal()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <Cropper src={profilePictureUncropped}
                                aspectRatio={1}
                                minCropBoxHeight={60}
                                minCropBoxWidth={60}
                                onInitialized={(i) => {
                                    setCropper(i);
                                }}
                            />
                            <div className='mt-4'>
                                <button
                                    className="drop-shadow-lg text-lg font-bold text-stone-600 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border border-amber-100 hover:border-amber-400 rounded py-2 px-4 "
                                    onClick={() => finishCrop()}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}