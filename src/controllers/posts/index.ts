// imports
import { NextFunction, Request, Response } from 'express';

// prisma client imports
import { Post, PrismaClient } from '@prisma/client';

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

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post: Post = await client.post.create({
            data: req.body
        });

        return res.status(201).json({ post });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
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
            data: req.body
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

// controllers exports
export { fetchPostsMany, fetchPostsSingle, createPost, updatePost, deletePost };
