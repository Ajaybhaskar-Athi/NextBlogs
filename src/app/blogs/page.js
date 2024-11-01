import BlogOverview from "../components/Blog-overview"


const fetchListOfBlogs=async ()=>{
    
    try{
        const res=await fetch("http://localhost:3000/api/get-blogs",{
            method:"GET",
            cache:"no-store"
        })
        const result=await res.json();
        return result?.data;
    }catch(err){
        return err.message;
    }
}

export default async function Blogs(){

    const blogList=await fetchListOfBlogs();
    // console.log(blogList);
    return(
<BlogOverview blogList={blogList} />
    )
}