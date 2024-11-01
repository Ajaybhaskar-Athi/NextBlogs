import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await connectToDB();
        const res = await Blog.find({});        
        return NextResponse.json({
            success: true,
            data: res,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in getting data",
            error: error.message,
        });
    }
};
