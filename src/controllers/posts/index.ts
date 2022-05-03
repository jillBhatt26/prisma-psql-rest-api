// imports
import { NextFunction, Request, Response } from 'express';

// prisma client imports
import { Post } from '@prisma/client';

// interfaces imports
import { IAuthRequest } from '../../interfaces';

// services imports
import { ICreatePostData, postsService } from '../../services';

// controllers class
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
