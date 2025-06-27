import { useForm } from "react-hook-form";
import { useState } from "react";

const UseForm = (initialValues) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
    });
    
    const [formData, setFormData] = useState(initialValues);
    
    const onSubmit = (data) => {
        setFormData(data);
        reset();
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    return {
        formData,
        handleChange,
        handleSubmit: handleSubmit(onSubmit),
        register,
        errors,
    };
}

export default UseForm;