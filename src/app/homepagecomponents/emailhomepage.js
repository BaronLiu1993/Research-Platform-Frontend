import File from '../../../public/file.png'
import Image from "next/image";

export default function emailhomecomponent () {
    return (
        <>
                 <div className = "flex justify-center items-center">
                                 <div>
                                         <div className = "h-[5rem] w-[10rem] flex flex-col justify-center items-center border-2 border-gray-300 cursor-pointer border-dashed rounded-md">
                                             <h1 className = "font-sans text-sm">Upload Transcript</h1>
                                             <div className = "flex flex-col justify-center items-center">
                                                 <Image src={File} alt="Placeholder" width={20} height={20}/>
                                                 <h1 className = "font-sans font-sm text-sm">Browse Files to Upload</h1>
                                                 <p className = "font-extralight text-xs">Supports PDF, JPG, PNG</p>
                                             </div>
                                         </div>
                                 </div>
                                 <div className = "font-sans m-10">
                                     <h1 className = "font-sans font-sm text-sm">Email: Jiexuan.liu@mail.utoronto.ca</h1>
                                     <div className = "text-xs">
                                         <div>
                                             <h1 className = "bg-green-200">Subject Line: </h1> 
                                             <span>UofT Email Research Email in Machine Learning</span>
                                         </div>
                                         <div className = "mt-5">
                                             <h1>Body: </h1>
                                             <p>Dear Professor [Last Name], I hope you're doing well. My name is [Your Name], a student in [Your Program] at UofT. I’m very interested in your research on [Specific Topic] and would love to learn more. I am currently working on [Brief Project Description] and believe your insights in [Research Area] would be valuable. Would you be available for a brief meeting or call to discuss your work and potential collaboration? Looking forward to your response. </p>
                                             <p>Best Regards,</p>
                                             <p>Jie Xuan Liu</p>
                                             <p>University of Toronto, Industrial Engineering</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                </>
    )
} 