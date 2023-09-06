import React, { useState } from 'react';

export function ModalManager() {
    const [modalStates, setModalStates] = useState({
        isAwardModalOpen: false,
        isCareerModalOpen: false,
        isCreativeModalOpen: false,
        isEducationalModalOpen: false,
        isReadingModalOpen: false,
        isOpinionModalOpen: false,
    });

    const openModal = (modalName) => {
        setModalStates((prevState) => ({
            ...prevState,
            [modalName]: true,
        }));
    };

    const closeModal = (modalName) => {
        setModalStates((prevState) => ({
            ...prevState,
            [modalName]: false,
        }));
    };

    return {
        modalStates,
        openModal,
        closeModal,
    };
}
