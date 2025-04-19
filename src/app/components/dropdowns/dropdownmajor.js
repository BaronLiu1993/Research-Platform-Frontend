import chroma from 'chroma-js';
import Select, { StylesConfig } from 'react-select';

const uoftStemMajors = [
    // Engineering
    { value: 'Computer Engineering', label: 'Computer Engineering', color: '#0074D9' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering', color: '#FF851B' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering', color: '#2ECC40' },
    { value: 'Civil Engineering', label: 'Civil Engineering', color: '#FF4136' },
    { value: 'Industrial Engineering', label: 'Industrial Engineering', color: '#B10DC9' },
    { value: 'Chemical Engineering', label: 'Chemical Engineering', color: '#85144b' },
    { value: 'Engineering Science', label: 'Engineering Science', color: '#3D9970' },
    { value: 'Materials Engineering', label: 'Materials Engineering', color: '#FFDC00' },
    { value: 'Mineral Engineering', label: 'Mineral Engineering', color: '#39CCCC' },
    { value: 'Biomedical Engineering', label: 'Biomedical Engineering', color: '#01FF70' },
  
    // Computer/Math/Physical Sciences
    { value: 'Computer Science', label: 'Computer Science', color: '#7FDBFF' },
    { value: 'Mathematics', label: 'Mathematics', color: '#F012BE' },
    { value: 'Statistics', label: 'Statistics', color: '#9B59B6' },
    { value: 'Data Science', label: 'Data Science', color: '#1ABC9C' },
    { value: 'Physics', label: 'Physics', color: '#DC143C' },
    { value: 'Astronomy', label: 'Astronomy', color: '#6B5B95' },
    { value: 'Earth Sciences', label: 'Earth Sciences', color: '#8B4513' },
    { value: 'Environmental Science', label: 'Environmental Science', color: '#228B22' },
  
    // Cognitive & Interdisciplinary
    { value: 'Cognitive Science', label: 'Cognitive Science', color: '#20B2AA' },
  
    // Life Sciences — Core & Specialists
    { value: 'Biology', label: 'Biology', color: '#2E8B57' },
    { value: 'Human Biology', label: 'Human Biology', color: '#FF6F61' },
    { value: 'Biochemistry', label: 'Biochemistry', color: '#00CED1' },
    { value: 'Cell & Molecular Biology', label: 'Cell & Molecular Biology', color: '#8E44AD' },
    { value: 'Genetics & Biotechnology', label: 'Genetics & Biotechnology', color: '#FFB6C1' },
    { value: 'Molecular Genetics', label: 'Molecular Genetics', color: '#A569BD' },
    { value: 'Neuroscience', label: 'Neuroscience', color: '#DA70D6' },
    { value: 'Immunology', label: 'Immunology', color: '#34495E' },
    { value: 'Pharmacology', label: 'Pharmacology', color: '#FF7F50' },
    { value: 'Physiology', label: 'Physiology', color: '#5DADE2' },
    { value: 'Toxicology', label: 'Toxicology', color: '#AF7AC5' },
    { value: 'Pathobiology', label: 'Pathobiology', color: '#B03A2E' },
    { value: 'Microbiology', label: 'Microbiology', color: '#F39C12' },
    { value: 'Developmental Biology', label: 'Developmental Biology', color: '#1F618D' },
    { value: 'Ecology & Evolutionary Biology', label: 'Ecology & Evolutionary Biology', color: '#16A085' },
    { value: 'Conservation Biology', label: 'Conservation Biology', color: '#2ECC71' }
  ];
  

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
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
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
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

export default () => (
  <Select
    defaultValue={uoftStemMajors[2]}
    options={uoftStemMajors}
    isSearchable = {true}
    styles={colourStyles}
  />
);