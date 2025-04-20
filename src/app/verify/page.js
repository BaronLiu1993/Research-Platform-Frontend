'use client'

import { useState } from 'react'
import {InputOtp} from "@heroui/input-otp";
import Navbar from '../components/navbar';

export default function Verify () {
    const [value, setValue] = useState("");
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start gap-2">
                <InputOtp className = "bg-red-600" length={4} value={value} onValueChange={setValue} />
                <div className="text-small text-default-500">
                    
                </div>
            </div>
        </>
    )
}