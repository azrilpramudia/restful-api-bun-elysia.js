import prisma from "../../prisma/client";

// Get All Posts
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

// Create Post
export async function createPost(options: { title: string; content: string }) {
    try {
        const { title, content } = options;
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
            }
        });

        return {
            success: true,
            message: "Post Created Successfully!",
            data: post,
        }
    } catch (e: unknown) {
        console.error(`Error Creating Post: ${e}`);
    }
}

// Get Post By ID
export async function getPostById(id: string) {
    try {
        const postId = parseInt(id);
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return {
                success: false,
                message: "Detail Data Post Not Found!",
                data: null,
            }
        }

        return {
            success: true,
            message: `Detail Data Post By ID : ${id}`,
            data: post,
        }
    } catch (e: unknown) {
        console.error(`Error finding post: ${e}`);
    }
}

// Updating a post
export async function updatePost(id: string, options: { title?: string; content?: string }) {
    try {
        const postId = parseInt(id);
        const { title, content } = options;
        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}),
            },
        });

        return {
            success: true,
            message: "Post Updated Successfully!",
            data: post,
        }
    } catch (e: unknown) {
        console.error(`Error Updating Post: ${e}`);
    }
}

// Deleting a post
export async function deletePost(id: string) {
    try {
        const postId = parseInt(id);
        await prisma.post.delete({
            where: { id: postId },
        });

        return {
            success: true,
            message: "Post Deleted Successfully!",
        }
    } catch (e: unknown) {
        console.error(`Error Deleting Post: ${e}`);
    }
}