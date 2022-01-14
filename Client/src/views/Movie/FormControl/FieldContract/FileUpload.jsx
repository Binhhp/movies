
function FileUpload({ name }) {
    return (
        <input 
            id={name}
            accept="image/*" 
            className="file-upload"
            multiple 
            type="file" 
            name={name}
        /> 
    )
}

export default FileUpload;