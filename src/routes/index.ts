import Elysia, { t } from "elysia";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/PostController";

const Routes = new Elysia({ prefix: "/posts" })

// Get all Posts
.get('/', () => getPosts())

// Create a Post
.post('/', ({ body }) => createPost(body as { title: string; content: string }), {
    body: t.Object({
        title: t.String({
            minLength: 3,
            maxLength: 100,
        }),
        content: t.String({
            minLength: 10,
            maxLength: 1000,
        }),
    })
})

// Get Post By ID
.get('/:id', ({ params: { id }}) => getPostById(id))

// Update Post By ID
.patch('/:id', ({ params: { id }, body }) => updatePost(id, body as { title?: string; content?: string }), {
    body: t.Object({
        title: t.String({
            minLength: 3,
            maxLength: 100,
        }),
        content: t.String({
            minLength: 10,
            maxLength: 1000,
        }),
    }),
})

// Delete Post
.delete('/:id', ({ params: { id }}) => deletePost(id))


export default Routes;