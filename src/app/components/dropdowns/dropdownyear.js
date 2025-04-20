'use client'

import chroma from 'chroma-js'
import Select from 'react-select'

const uoftStemYears = [
  { value: 'First Year Undergrad', label: 'First', color: '#0074D9' },
  { value: 'Second Year Undergrad', label: 'Second', color: '#FF851B' },
  { value: 'Third Year Undergrad', label: 'Third', color: '#FF851B' },
  { value: 'Fourth Year Undergrad', label: 'Fourth', color: '#FF851B' },
  { value: 'Fifth Year Undergrad', label: 'Fifth', color: '#FF851B' },
  { value: 'PEY', label: 'PEY', color: '#FF851B' },
  { value: 'Masters', label: 'Masters', color: '#FF851B' },
  { value: 'PhD', label: 'PhD', color: '#FF851B' },
]

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
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
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
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
}

export default function DropdownYear({ value, onChange }) {
  return (
    <Select
      value={uoftStemYears.find((option) => option.value === value)}
      options={uoftStemYears}
      isSearchable={true}
      styles={colourStyles}
      onChange={(selectedOption) => onChange(selectedOption?.value)}
      placeholder="Select your Year"
    />
  )
}
