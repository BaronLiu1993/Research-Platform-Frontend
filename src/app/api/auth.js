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
        console.log("Please Fill In Everything")
        throw new Error("Form Data is Missing")
    }
}

export async function handleLogin (formData) {
    if (formData) {
      try {
        const response = await axios.post('http://localhost:8080/auth/login', formData)
        return response
      } catch (error) {
        console.log(error)
      } 
    } else {
        console.log("Please fill in all the forms")
    } 
}