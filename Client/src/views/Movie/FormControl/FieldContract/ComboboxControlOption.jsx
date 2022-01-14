const styles = {
    display: 'flex'
}

function ComboboxControlOption({ image, width, label, sx }){
    return(
        <div style={styles}>
            <img style={{ marginRight: '10px', ...sx}} src={image} width={width} alt=""></img>
            <div>{label}</div>
        </div> 
    )
}

export default ComboboxControlOption;