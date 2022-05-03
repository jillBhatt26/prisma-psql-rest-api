// imports
import { NextFunction, Request, Response } from 'express';

// prisma client imports
import { Post, PrismaClient } from '@prisma/client';

// interfaces imports
import { IAuthRequest } from '../../interfaces';

// services imports
import { ICreatePostData, postsService } from '../../services';

// Models imports
const client = new PrismaClient();

// controllers definition
const fetchPostsMany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts: Post[] = await client.post.findMany();

        return res.status(200).json({
            posts
        });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const fetchPostsSingle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const post: Post | null = await client.post.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        return res.status(200).json({
            post
        });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const fetchPostsByAuthor = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts: Post[] = await client.post.findMany({
            where: {
                authorId: Number(req.params.id)
            }
        });

        return res.status(200).json({ posts });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const createPost = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const post: Post = await client.post.create({
            data: {
                ...req.body,
                authorId: Number(req.user!.id)
            }
        });

        return res.status(201).json({ post });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const updatePost = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const toUpdatePost: Post | null = await client.post.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!toUpdatePost) {
            return next({ status: 404, message: 'Post to update, not found' });
        }

        const post: Post = await client.post.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body,
                authorId: Number(req.user!.id)
            }
        });

        return res.status(200).json({ post });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post: Post | null = await client.post.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!post) {
            return next({ status: 404, message: 'Post to delete, not found' });
        }

        await client.post.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        return res.status(200).json({ success: true });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

class PostControllers {
    public async fetchPostsByAuthor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const posts: Post[] = await postsService.getPostsByAuthor(
                Number(req.params.id)
            );

            return res.status(200).json({ posts });
        } catch (error: any) {
            return next({ status: error.code || 500, message: error.message });
        }
    }

    public async fetchPostSingle(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const post: Post | null = await postsService.getPostSingle(
                Number(req.params.id)
            );

            return res.status(200).json({
                post
            });
        } catch (error: any) {
            return next({ status: error.code || 500, message: error.message });
        }
    }

    public async createPost(
        req: IAuthRequest,
        res: Response,
        next: NextFunction
    ) {
        const { title, content } = req.body;

        const createPostData: ICreatePostData = {
            title,
            content,
            authorId: Number(req.user!.id)
        };

        try {
            const post: Post = await postsService.createPost(createPostData);

            return res.status(201).json({ post });
        } catch (error: any) {
            return next({ status: error.code || 500, message: error.message });
        }
    }

    public async updatePost(
        req: IAuthRequest,
        res: Response,
        next: NextFunction
    ) {
        const { title, content } = req.body;

        const updatePostData: ICreatePostData = {
            title,
            content,
            authorId: Number(req.user!.id)
        };

        try {
            const post: Post = await postsService.updatePost(
                Number(req.params.id),
                updatePostData
            );

            return res.status(200).json({ post });
        } catch (error: any) {
            return next({ status: error.code || 500, message: error.message });
        }
    }

    public async deletePost(
        req: IAuthRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const success: boolean = await postsService.deletePost(
                Number(req.params.id)
            );

            return res.status(200).json({ success });
        } catch (error: any) {
            return next({ status: error.code || 500, message: error.message });
        }
    }
}

const postControllers = new PostControllers();

export { postControllers as PostControllers };

// controllers exports
// export {
//     fetchPostsMany,
//     fetchPostsSingle,
//     fetchPostsByAuthor,
//     createPost,
//     updatePost,
//     deletePost
// };
