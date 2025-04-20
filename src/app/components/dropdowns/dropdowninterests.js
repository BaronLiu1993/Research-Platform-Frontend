'use client'

import React from 'react'
import Select from 'react-select'
import chroma from 'chroma-js'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

const interestOptions = [
  { value: 'Engineering', label: 'Engineering', color: '#0074D9' },
  { value: 'Biology', label: 'Biology', color: '#2ECC40' },
  { value: 'Physics', label: 'Physics', color: '#FF4136' },
  { value: 'Math', label: 'Math', color: '#B10DC9' },
  { value: 'Medicine', label: 'Medicine', color: '#B10DC9' },
]

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderColor: '#E5E7EB',
    borderRadius: '0.375rem',
    width: '100%',
    boxShadow: 'none',
    padding: '0.125rem 0.25rem',
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

export default function DropdownInterests({ value, onChange }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        isSearchable
        options={interestOptions}
        value={interestOptions.filter((option) => value.includes(option.value))}
        onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map((option) => option.value)
            onChange(selectedValues)
          }}
        styles={colourStyles}
      />
    </div>
  )
}
