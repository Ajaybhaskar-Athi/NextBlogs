import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Blog from "@/models/blog";
const EditBlog=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
});

//for concept Revising Here im accesing the details through searchParams Means in client they will send  id through queries rather than body


export async function PUT(req) {
    

    try{
        await connectToDB();
        const {searchParams}=new URL(req.url);
        const blogID=searchParams.get('id');
        const {title,description}=await req.json();
       
        //ID is not null 
        if(!blogID){
            return NextResponse.json({
                success:false,
                message:"Blog ID is Required",
            })
        }

       //validataion
        const {error}=EditBlog.validate({
            title,description
        })

        if(error){
            return   NextResponse.json({
                success:false,
                message:error.details[0].message,
            });
        }

           //updating based on ID
           const updateBlog=await Blog.findByIdAndUpdate(
            {
                _id:blogID
            },{ title,description},{new:true}
           )

           if(updateBlog){
            return NextResponse.json({
                success:true,
                message:"Blog is Updated  Succesfully",
            })
           }else{
            return NextResponse.json({
                success:false,
                message:"Blog is not Updated .Something Went Wrong",
            })
           }



    }catch(error){
        console.error(error);
        return NextResponse.json({
            status: 500,
            success:false,
            message:"Something Went Wrong in Updating the Blog",

        })
    }
}