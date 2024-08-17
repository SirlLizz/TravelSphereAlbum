import React, {useState} from 'react';
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import UploadFile from './UploadFile';
import Form from 'react-bootstrap/Form';

class ViewerWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: props.file ?? undefined,
            isURL: typeof props.file == 'string',
            isLittlePlanet: false
        }
    }

    fileHandler = (newFile) => {
        this.setState({
            file: newFile
        })
    }

    isLittlePlanetHandler = (newIsLittlePlanet) => {
        this.setState({
            isLittlePlanet: newIsLittlePlanet
        })
    }
        
    componentDidUpdate(){
        this.render();
    }

    render() {
        const {file, isURL, isLittlePlanet} = this.state;
        return (
            <div className="flex-container flex-column">
                <div className="mx-auto my-3 d-flex align-content-center">
                    {!isURL &&(<UploadFile fileHandler = {this.fileHandler}/>)}
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Little Planet"
                            onChange={()=>{this.isLittlePlanetHandler(!isLittlePlanet)}}
                        />
                    </Form>
                </div>
                <div className="flex-stretch ">
                    {file && (<ReactPhotoSphereViewer
                        src={isURL ? file : URL.createObjectURL(file)}
                        littlePlanet={isLittlePlanet}
                        height={"100%"}
                        width={"100%"}
                    ></ReactPhotoSphereViewer>
                    )}
                </div>
            </div>
        );
    }
}
export default ViewerWindow;