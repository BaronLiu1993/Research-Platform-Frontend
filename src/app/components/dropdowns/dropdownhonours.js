'use client'

import { useState } from 'react'
import { Badge } from '@/shadcomponents/ui/badge'
import { X } from 'lucide-react'

export default function HonoursInput({ value = [], onChange }) {
  const [input, setInput] = useState('')
  const [selectedSkills, setSelectedSkills] = useState(() =>
    value.reduce((acc, skill) => {
      acc[skill] = false
      return acc
    }, {})
  )

  function addSkill() {
    const trimmed = input.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
      setSelectedSkills((prev) => ({ ...prev, [trimmed]: false }))
    }
    setInput('')
  }

  function toggleSkill(skill) {
    setSelectedSkills((prev) => ({
      ...prev,
      [skill]: !prev[skill],
    }))
  }

  function deleteSkill(skill) {
    const updated = value.filter((s) => s !== skill)
    onChange(updated)
    setSelectedSkills((prev) => {
      const updatedSelection = { ...prev }
      delete updatedSelection[skill]
      return updatedSelection
    })
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="w-[20rem] max-w-md rounded-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="w-full bg-[#F9FAFB] rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm font-medium px-3 py-2 outline-none font-sans"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((skill) => {
          const isSelected = selectedSkills[skill]
          return (
            <div
              key={skill}
              className={`relative flex items-center`}
            >
              <Badge
                variant={isSelected ? 'default' : 'outline'}
                onClick={() => toggleSkill(skill)}
                className={`cursor-pointer pr-6 ${
                  isSelected ? 'bg-black text-white border-black' : ''
                }`}
              >
                {skill}
              </Badge>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteSkill(skill)
                }}
                className="absolute top-[-6px] right-[-6px] p-0.5 bg-white rounded-full shadow-sm hover:bg-red-100"
              >
                <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
