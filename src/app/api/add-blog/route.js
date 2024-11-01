

import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import Joi from "joi";
const AddNewBlog=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
});



export const POST=async(req,res)=>{

    try{
        await connectToDB();
        const {title,description}=await req.json();
      //validation by Joi , we can also mention in schemas or else we can use this JS library for validation
        const {error}=AddNewBlog.validate({
            title,description
        })

        if(error){
            return   NextResponse.json({
                success:false,
                message:error.details[0].message,
            });
        }


        const newBlog=new Blog({title,description});
        await newBlog.save();
        
            return NextResponse.json({
                success: true,
                message: "Blog Added Successfully",
                blog: {
                    title,
                    description,
                    id: newBlog._id, // Optionally return the created blog ID
                },
            });

          
    }catch(error){
        console.log(error);
        return   NextResponse.json({
            success:false,
            message:"Some thing Went Wrong In POST of Adding Blog"
        })
    }
}








// import connectToDB from "@/database";
// import Blog from "@/models/blog";


// export const POST=async(req,res)=>{
//     await connectToDB();
//     try{
//         const {title,description}=req.body;
//         const newBlog=new Blog({title,description});
//         console.log(newBlog);
//         await newBlog.save();
//         res.status(201).json({message:"Blog created successfully"});

//     }catch(error){
//         // throw new Error(error);
//         res.status(500).json({error:"Failed to add Blog Post"});
//     }
// }