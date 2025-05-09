'use client'
import { uoftStemYears } from '@/app/data/uoftStemYears'

import chroma from 'chroma-js'
import Select from 'react-select'

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
})

const colourStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: '#F9FAFB',
    borderRadius: '0.5rem', 
    borderColor: state.isFocused ? '#3B82F6' : '#E5E7EB', 
    boxShadow: state.isFocused ? '0 0 0 2px #BFDBFE' : 'none', 
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 500, 
    '&:hover': {
      borderColor: '#3B82F6',
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
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
  },
  menu: (styles) => ({
    ...styles,
    borderRadius: '0.5rem',
    marginTop: '0.25rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
    backgroundColor: 'white',
    overflow: 'hidden',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 500, 
  }),
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({
    ...styles,
    ...dot('#ccc'),
    color: '#9CA3AF', 
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.color),
    fontWeight: 500, 
  }),
}

export default function DropdownYear({ value, onChange }) {
  return (
    <div className="w-[20rem] max-w-lg rounded-md"> 
      <Select
        value={uoftStemYears.find((option) => option.value === value)}
        options={uoftStemYears}
        isSearchable={true}
        styles={colourStyles}
        onChange={(selectedOption) => onChange(selectedOption?.value)}
        placeholder="Select your Year"
      />
    </div>
  )
}
