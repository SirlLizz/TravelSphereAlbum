import React from 'react';
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import UploadFile from './UploadFile';

class ViewerWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: props.file ?? undefined,
            isURL: typeof props.file == 'string'
        }
    }

    fileHandler = (newFile) => {
        this.setState({
          file: newFile
        })
      }

    render() {
        const {file, isURL} = this.state;
        return (
            <div className="flex-container flex-column">
                {!isURL &&(<UploadFile fileHandler = {this.fileHandler}/>)}
                <div className="flex-stretch ">
                    {file && (<ReactPhotoSphereViewer
                        src={isURL ? file : URL.createObjectURL(file)}
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