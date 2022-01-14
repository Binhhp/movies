import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const CloseModalStyle = styled('button')({
    position: 'absolute',
    top: `-12px`,
    right: `-12px`,
    backgroundColor: `#f2f2f2`,
    color: '#111',
    borderRadius: `50%`,
    width: `33px`,
    height: `33px`,
    justifyContent: 'center',
    textAlign: 'center',
    border: `none`,
    cursor: 'pointer',
    boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`,
    padding: '0px',
    "& svg": {
        width: `17px`,
        height: `17px`,
        paddingTop: `2px`
    }
});

function ButtonCloseModal({ handleClose }) {
    return (
        <CloseModalStyle onClick={handleClose}>
            <CloseIcon />
        </CloseModalStyle>
    )
}
export default ButtonCloseModal;