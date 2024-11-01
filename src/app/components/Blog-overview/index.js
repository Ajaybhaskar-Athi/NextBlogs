// "use client";

// import { useEffect, useState } from "react";
// import AddNewBlog from "../add-new-blog";
// import CardDesign from "./CardDesign";
// import { useRouter } from "next/router";


// const initialForm={
//     title:"",
//     description:"",
// };


// const BlogOverview=({blogList}) =>{
//   const [openBlogDailog, setOpenBlogDailog] = useState(false);
//   const [formData,setFormData]=useState(initialForm);
//     console.log(blogList);

//   return (
//     <div className="min-h-screen   bg-gradient-to-r from-purple-500 to-blue-600">
//       <AddNewBlog openBlogDailog={openBlogDailog} setOpenBlogDailog={setOpenBlogDailog} formData={formData} setFormData={setFormData} />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-4 md:px-8 lg:px-16">
//      <CardDesign blogList={blogList}  setFormData={setFormData} setOpenBlogDailog={setOpenBlogDailog}/>

//       </div>
//     </div>
//   );
// }

// export default  BlogOverview


"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { useRouter } from "next/navigation";
  import { Label } from "@radix-ui/react-label";

import {  useState } from "react";
import AddNewBlog from "../add-new-blog";


const initialForm={
    title:"",
    description:"",
};


const BlogOverview=({blogList}) =>{
  const [openBlogDailog, setOpenBlogDailog] = useState(false);
  const [formData,setFormData]=useState(initialForm);
  
  const [editBlogID,setEditBlogID]=useState(null);
  const router=useRouter();
  
    console.log(blogList);

    //Editing

  const handleEdit=(blog)=>{
    setEditBlogID(blog?._id);
    console.log(editBlogID);
    setFormData({
      title:blog?.title,
      description:blog?.description
    })
    setOpenBlogDailog(true);
    
    }
     //Deleting
  const handleDelete=async(id)=>{
    console.log(id);

    try{
      const res=await fetch ("api/delete-blog",{
        method:"DELETE",
        body:JSON.stringify({id}) 
      });
      const data=await res.json();
      if(data?.success){
        console.log("Blog Deleted Succesfully");
        router.refresh(); //for updating the UI
      }

    }catch(err){
      console.log(err);
    }
  }





  return (
    <div className="min-h-screen   bg-gradient-to-r from-purple-500 to-blue-600">
      <AddNewBlog openBlogDailog={openBlogDailog} setOpenBlogDailog={setOpenBlogDailog} formData={formData} setFormData={setFormData} editBlogID={editBlogID} setEditBlogID={setEditBlogID}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-4 md:px-8 lg:px-16">
      {blogList && blogList.length > 0 ? (
        blogList.map((item, index) => (
          <Card key={index} className="p-5 cursor-pointer">
            <CardContent>
              <CardTitle className="mb-5">{item?.title}</CardTitle>
              <CardDescription>{item?.description}</CardDescription>
             <div className="mt-5  flex gap-5">

             <Button onClick={()=>{handleEdit(item)}}>Edit</Button>

             <Button onClick={()=>{
              handleDelete(item?._id)
             }}>Delete</Button>
             </div>

            
            </CardContent>
          </Card>
        ))
      ) : <Label className="text-2xl font-extrabold">No blogs available! Please add one</Label>
}

      </div>
    </div>
  );
}

export default  BlogOverview


