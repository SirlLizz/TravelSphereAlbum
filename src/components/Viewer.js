import React from 'react';
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import UploadFile from './UploadFile';

class ViewerWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined
        }
    }

    fileHandler = (newFile) => {
        this.setState({
          file: newFile
        })
      }

    render() {
        return (
            <div class="photo-sphere-container">
                <UploadFile fileHandler = {this.fileHandler}/>
                <div class="photo-sphere-stretch ">
                    {this.state.file && (<ReactPhotoSphereViewer
                        src={URL.createObjectURL(this.state.file)}
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