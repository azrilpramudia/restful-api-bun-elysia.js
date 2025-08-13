import prisma from "../../prisma/client";

export async function getPosts() {
    try{
        const posts = await prisma.post.findMany({ orderBy: {id: "desc" } });
        return {
            success: true,
            message: "List Data Posts!",
            data: posts,
        };
    } catch (e: unknown) {
        console.error(`Error Getting Posts: ${e}`);
    }
}