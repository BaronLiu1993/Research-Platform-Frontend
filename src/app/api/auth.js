'use client'
import { useState } from 'react'
import axios from 'axios'

export async function handleRegister (formData) {
    if (formData) {
        try {
            const response = await axios.post('http://localhost:8080/auth/register', {formData});
            return response
        } catch (error) {
            console.error("Error during login", error)
        }
    } else {
        console.error("Please Fill In Everything")
    }
}

export async function handleLogin (formData) {
    if (formData) {
      try {
        const response = await axios.post('http://localhost:8080/auth/login', formData)
        return response
      } catch (error) {
        console.error(error)
      } 
    } else {
        console.error("Please fill in the whole form forms")
    } 
}