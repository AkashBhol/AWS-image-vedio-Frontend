import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
 
function DropzoneComponent(props) {
  const onDrop = useCallback(acceptedFiles => {
    props.getExcelFile(acceptedFiles)
  }, []);
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png', '.svg','.gif']
    }
  });
 
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
     
      <div>{props.children}</div>
    </div>
  )
}
 
export default DropzoneComponent;
 
 