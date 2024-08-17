import React, {useState, useEffect} from 'react';
import { Viewer } from "@photo-sphere-viewer/core";
import UploadFile from './UploadFile';
import "@photo-sphere-viewer/core/index.css";

const ViewerWindow = ({ url = undefined }) => {
    const [isLittlePlanet, setIsLittlePlanet] = useState(false); 
    const isURL = (typeof url == 'string'); 
    const [file, setFile] = useState(url); 
    const sphereElementRef = React.createRef();

    useEffect(() => {
        if(file){
            const shperePlayerInstance = new Viewer({
                container: sphereElementRef.current,
                panorama: isURL ? file : URL.createObjectURL(file),
                fisheye: isLittlePlanet ? 1.9 : 0,
                maxFov: isLittlePlanet ? 150 : 100,
                navbar: [
                    'zoom',
                    {
                        id: 'little-planet-button',
                        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432"><path stroke="#fff" fill="none" stroke-width="20" d="M209,15a195,195 0 1,0 2,0zm1,0v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382" /></svg>`,
                        title: 'Little Planet',
                        className: 'custom-button',
                        onClick: () => {
                            setIsLittlePlanet(!isLittlePlanet);
                        },
                    },
                    {
                        id: 'screenshot-button',
                        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill="#fff"><path d="M10 16c-4.455 0-6.685-5.386-3.535-8.535C9.615 4.315 15 6.545 15 11a5 5 0 0 1-5 5zM6.42 2.56l-.67.64c-.37.357-.865.808-1.38.81H2C.914 4 0 4.712 0 5.76v10.48C0 17.27 1 18 2 18h16c1 0 2-.716 2-1.76V5.76C20 4.723 19 4 18 4h-2.37c-.515-.002-1.01-.453-1.38-.81l-.67-.64A2 2 0 0 0 12.2 2H7.8a2 2 0 0 0-1.38.56z"/><circle cx="10" cy="11" r="3"/></g></svg>`,
                        title: 'Screenshot',
                        className: 'custom-button',
                        onClick(viewer) {
                            viewer.addEventListener('render', () => {
                                const link = document.createElement('a');
                                link.download = `${file.name}-screenshot.jpeg`;
                                link.href = viewer.renderer.renderer.domElement.toDataURL();
                                link.click();
                            }, { once: true });
                            viewer.needsUpdate();
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