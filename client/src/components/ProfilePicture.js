import personImage2 from '../images/person2.png';
import { useAuth0 } from '@auth0/auth0-react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useEffect, useState } from 'react';
import './styles/ProfilePicture.css';
import CommunicationHandler from './CommunicationHandler';
import axios from 'axios';

// import sharp from 'sharp';
// const sharp = require('sharp');

export default function ProfilePicture(props) {
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [profilePictureUncropped, setProfilePictureUncropped] = useState(null);
    const [profilePictureUploaded, setProfilePictureUploaded] = React.useState(false);
    const [cropper, setCropper] = useState(null);
    const [auth, setAuth] = useState(props.auth);

    useEffect(() => {
        // pull profilepicture from database
        // if null: setProfilePictureFile(personImage2);
        // else: setProfilePictureFile(string)
        // console.log(auth.picture)
        // getBase64FromUrl(auth.picture);
        // getBase64FromUrl('https://lh3.googleusercontent.com/i7cTyGnCwLIJhT1t2YpLW-zHt8ZKalgQiqfrYnZQl975-ygD_0mOXaYZMzekfKW_ydHRutDbNzeqpWoLkFR4Yx2Z2bgNj2XskKJrfw8')
        // getBase64FromUrl("https://lh3.googleusercontent.com/a/AAcHTteIr-862BsHONs6SRqM3TOCoLmoIDhR_N0heT5J=s1000")
        // setProfilePictureFile(auth.picture)
        setProfilePictureFile(auth.picture)
        // let data = {email_address: auth.email, profile_picture: auth.picture};
        // CommunicationHandler.writeProfileData(data);
    }, []);

    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = () => {
            const base64data = reader.result;
            console.log(base64data) 
            setProfilePictureFile(base64data);
          }
        });
      }


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
    // Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
    const resizedataURL = (datas, wantedWidth, wantedHeight) => {
        // We create an image to receive the Data URI
        let img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = function () {
            // We create a canvas and get its context.
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width = wantedWidth;
            canvas.height = wantedHeight;

            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

            let dataURI = canvas.toDataURL();
            return dataURI;
        };
    }

    const finishCrop = async () => {
        if (typeof cropper !== "undefined") {
            // let data = { image: cropper.getCroppedCanvas().toDataURL() }
            // Use it like that : resizedataURL('yourDataURIHere', 50, 50);
            setProfilePictureFile(cropper.getCroppedCanvas().toDataURL());
            // setProfilePictureFile(resizedataURL(cropper.getCroppedCanvas().toDataURL() , 150, 150));
            setProfilePictureUncropped(null);
        }
        document.getElementById('pfp-upload-modal').checked = false;
        setProfilePictureUploaded(false)

        //push profilePictureFile to database

    }

    return (
        <div className='mt-8'>
            <label htmlFor='pfp-upload-modal'>
                <div className="avatar" >
                    <div className="w-64 rounded-full">
                        <div id="wrapperpfp">
                            <img id="pfp" src={profilePictureFile} referrerpolicy="no-referrer"/>
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