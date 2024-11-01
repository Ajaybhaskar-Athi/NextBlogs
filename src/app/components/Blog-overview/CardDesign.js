import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const CardDesign = ({ blogList,setFormData,setOpenBlogDailog }) => {

  const [editBlobID,setEditBlobID]=useState(null);

  
  const router=useRouter();
  
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


//Editing

  const handleEdit=(blob)=>{
    setEditBlobID(blob?._id);
    console.log(editBlobID);
    setFormData({
      title:blob?.title,
      description:blob?.description
    })
    setOpenBlogDailog(true);
    
    }



  return (
    <>
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
    </>
  );
};

export default CardDesign;
