'use client'

import React from 'react'
import Select from 'react-select'
import chroma from 'chroma-js'
import makeAnimated from 'react-select/animated'
import { uoftInterests } from '@/app/data/uoftInterests'

const animatedComponents = makeAnimated()
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    borderRadius: '0.375rem',
    width: '100%',
    boxShadow: 'none',
    padding: '0.125rem 0.25rem',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 500, 
    ':hover': {
      borderColor: '#D1D5DB',
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color)
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    }
  },
  menu: (styles) => ({
    ...styles,
    borderRadius: '0.5rem', 
    marginTop: '0.25rem', 
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
    overflow: 'hidden',
    backgroundColor: 'white',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 500, 
  }),
  multiValue: (styles, { data }) => {
    const color = chroma(data.color)
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
}

export default function DropdownInterests({ value, onChange, name, id }) {
  // Fix: Safely handle the value prop
  const selectedOptions = value && Array.isArray(value) 
    ? uoftInterests.filter(option => value.includes(option.value))
    : [];

  // Handle changes and ensure we have a valid onChange function
  const handleChange = (selectedOptions) => {
    if (onChange && typeof onChange === 'function') {
      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
      onChange(selectedValues);
    }
  };

  return (
    <div className="w-full">
      <label className="font-sans text-xs font-semibold" htmlFor={id}>Research Interests</label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        isSearchable
        options={uoftInterests}
        value={selectedOptions}
        onChange={handleChange}
        styles={colourStyles}
        name={name}
        id={id}
        className="mt-1"
      />
    </div>
  )
}