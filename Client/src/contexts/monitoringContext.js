import React, { useState } from 'react';

const ModalContext = React.createContext();
function ModalContextProvider({ children }) {
    
    const [openModal, setModal] = useState({
        create: false,
        update: false
    });
    const [propData, setPropData] = useState({});

    const handleModalCreate = () => {
        return setModal({
            ...openModal,
            create: !openModal.create
        })
    }

    const handleModalUpdate = () => {
        return setModal({
            ...openModal,
            update: !openModal.update
        })
    }

    return (
        <ModalContext.Provider value={{
            openModal: openModal,
            setModal: setModal,
            handleCreate: handleModalCreate,
            handleUpdate: handleModalUpdate,
            propData: propData,
            setPropData: setPropData
        }}>
            {children}
        </ModalContext.Provider>
    )
}
export { 
    ModalContextProvider, 
    ModalContext 
};