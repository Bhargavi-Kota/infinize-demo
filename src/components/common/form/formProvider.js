'use client';
import React, {createContext, useContext, useState} from 'react';

const FormContext = createContext();

export const FormProvider = ({children}) => {
    const [formData, setFormData] = useState({});

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <FormContext.Provider
            value={{
                formData,
                handleChange,
                setFormData
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);
