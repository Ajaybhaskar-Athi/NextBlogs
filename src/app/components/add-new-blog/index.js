"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState ,useEffect} from "react";


const initialForm={
    title:"",
    description:"",
};
const  AddNewBlog=({openBlogDailog,setOpenBlogDailog,formData,setFormData,editBlogID,setEditBlogID}) =>{
    const router=useRouter();
    useEffect(()=>{
        router.refresh();
    },[]);

      const [loading,setLoading]=useState(false);

        const handleSubmit=async(e)=>{
            e.preventDefault();
            // console.log(formData);

            try{
                const res= 
                  editBlogID!==null 
                  ? await fetch(`/api/update-blog?id=${editBlogID}`,{
                    method:"PUT",
                    body:JSON.stringify(formData),
                  })
                :await fetch ("/api/add-blog",{
                    method:"POST",
                    body:JSON.stringify(formData),
                });
                const result=await res.json();
                if(result?.success){
                    console.log("Api: ",result);
                    setEditBlogID(null);
                router.refresh();
                }

            }catch(error){
              console.log(error);
            }finally{
                setLoading(false);
                setFormData(initialForm);
                setOpenBlogDailog(false);
            }
           
        }

    return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-600">
      <div>
        <Button onClick={()=>{
            setOpenBlogDailog(true)
            setFormData(initialForm)
        }} className="mt-3 ml-3">Add new Blog Section</Button>
      </div>
    
      <div>
         <Dialog open={openBlogDailog} onOpenChange={()=>{setOpenBlogDailog(false), setEditBlogID(null)}} >
          <DialogContent>
            <DialogHeader>
              <DialogTitle> {editBlogID? "Edit Blob" :"Add New Blob"} </DialogTitle>
              <DialogDescription>
              Make Changes to Your Profile Here. Click Save When You're Done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-6">
                <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right">Title</label>
                    <Input id="title" placeholder="Enter Blog Title" className="col-span-3" value={formData.title} onChange={(e)=>{setFormData({...formData,title:e.target.value})}}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Input id="description" placeholder="Enter Blog Description" value={formData.description} className="col-span-3" onChange={(e)=>{setFormData({...formData,description:e.target.value})}}/>
                </div>

            </div>
            <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>{loading ?"Saving Changes":"Save Changes"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}



export default  AddNewBlog