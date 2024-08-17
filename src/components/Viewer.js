import React, {useState, useEffect} from 'react';
import { Viewer } from "@photo-sphere-viewer/core";
import UploadFile from './UploadFile';
import Form from 'react-bootstrap/Form';
import "@photo-sphere-viewer/core/index.css";

const ViewerWindow = ({ url = undefined }) => {
    const [isLittlePlanet, setIsLittlePlanet] = useState(false); 
    const [isURL] = useState(typeof url == 'string'); 
    const [file, setFile] = useState(url); 
    const sphereElementRef = React.createRef();

    useEffect(() => {
        if(file){
            const shperePlayerInstance = new Viewer({
                container: sphereElementRef.current,
                panorama: isURL ? file : URL.createObjectURL(file),
                fisheye: isLittlePlanet ? 2 : 0,
                maxFov: isLittlePlanet ? 150 : 100,
                navbar: [
                    'zoom',
                    {
                        id: 'little-planet-button',
                        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432"><path stroke="#fff" fill="none" stroke-width="20" d="M209,15a195,195 0 1,0 2,0zm1,0v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382" /></svg>`,
                        title: 'Hello world',
                        className: 'custom-button',
                        onClick: () => {
                            setIsLittlePlanet(!isLittlePlanet);
                        },
                    },
                    'download',
                    'fullscreen',
                ],
            });
        
            return () => {
            shperePlayerInstance.destroy();
            };
        }

      }, [file, isLittlePlanet]); 

    return (
        <div className="flex-container flex-column">
            {!isURL &&(
                <div className="mx-auto my-3 d-flex align-items-center">
                    <UploadFile fileHandler = {setFile}/>
                </div>
            )}
            <div className="flex-stretch ">
                {file && (<div ref={sphereElementRef} style={{ height: "100%", width: "100%"}}/>)}
            </div>
        </div>
    );
}
export default ViewerWindow;