import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FormField.css';

const FormField = ({ 
  icon, 
  label, 
  type, 
  id, 
  name, 
  value, 
  onChange, 
  disabled, 
  placeholder 
}) => {
  console.log('🔄 FormField renderizado', {name});
  return (
    <div className="form-group">
      <label htmlFor={id}>
        <FontAwesomeIcon icon={icon} /> {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField; 