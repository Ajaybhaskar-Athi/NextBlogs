
import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export  async function DELETE(req) {
  try {
    await connectToDB();
    const { id } = await req.json();
    
    const response = await Blog.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: `Blog deleted successfully with id: ${id}`,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error in deleting the blog",
      error: error.message,
    }, { status: 500 });
  }
}

