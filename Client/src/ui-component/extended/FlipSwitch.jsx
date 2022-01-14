
function FlipSwitchComponent({ isActive, dataIndex }) {

    const onChangeSwitch = () => {  
        const checkbox = document.getElementById(window.btoa(dataIndex));
        checkbox.checked = !checkbox.checked;
    }
    
    return (
        <div className="onoffswitch" 
            onClick={onChangeSwitch}>
            <input 
                id={window.btoa(dataIndex)}
                type="checkbox" 
                name="onoffswitch" 
                className="onoffswitch-checkbox" 
                tabIndex="0" 
                defaultChecked={isActive}/>
            <label className="onoffswitch-label" htmlFor="myonoffswitch">
                <span className="onoffswitch-inner"></span>
                <span className="onoffswitch-switch"></span>
            </label>
        </div>
    )
}
export default FlipSwitchComponent