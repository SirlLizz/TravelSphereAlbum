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
                size: { height: "100%", width: "100%" },
                fisheye: isLittlePlanet ? 2 : 0,
                maxFov: isLittlePlanet ? 150 : 100
            });
        
            return () => {
            shperePlayerInstance.destroy();
            };
        }

      }, [file, isLittlePlanet]); 

    return (
        <div className="flex-container flex-column">
            <div className="mx-auto my-3 d-flex align-items-center">
                {!isURL &&(<UploadFile fileHandler = {setFile}/>)}
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Little Planet"
                        onChange={()=>{setIsLittlePlanet(!isLittlePlanet)}}
                    />
                </Form>
            </div>
            <div className="flex-stretch ">
                {file && (<div ref={sphereElementRef} style={{ height: "100%", width: "100%"}}/>)}
            </div>
        </div>
    );
}
export default ViewerWindow;