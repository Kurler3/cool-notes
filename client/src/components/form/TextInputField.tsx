import React from 'react'
import { Form } from 'react-bootstrap';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';


interface IProps {
    name: string;
    label: string;
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    error?: FieldError;
    [x: string]: any; // PASS ANY OTHER PROPS TO THE TEXT INPUT FIELD
};

const TextInputField: React.FC<IProps> = ({
    name,
    label,
    register,
    registerOptions,
    error,
    ...props // rest of the props
}) => {
  return (
    <Form.Group className='mb-3' controlId={name + "-input"}>
        <Form.Label>
            {label}
        </Form.Label>
        <Form.Control 
            {...props}
            {...register(name, registerOptions)}
            isInvalid={!!error}
        />
        <Form.Control.Feedback type="invalid">
            {error?.message}
        </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInputField