// imports
import { Post, Prisma, PrismaClient } from '@prisma/client';
import { ErrorHandler } from '../../../utils';

// interfaces
import { ICreatePostData, IUpdatePostData } from '../interfaces';

// utils

// services class definition
class PostsService {
    private client: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    > = new PrismaClient();

    public async getPostsByAuthor(authorID: number): Promise<Post[]> {
        try {
            const posts: Post[] = await this.client.post.findMany({
                where: {
                    authorId: authorID
                }
            });

            return posts;
        } catch (error: any) {
            const err: ErrorHandler = new ErrorHandler(
                'POSTS_CONTROLLERS.FETCH_POSTS_AUTHOR',
                error.message,
                error.clientMsg || 'An error occurred while fetching post',
                error.code
            );

            throw err;
        }
    }

    public async getPostSingle(postID: number): Promise<Post> {
        try {
            const post: Post | null = await this.client.post.findUnique({
                where: {
                    id: postID
                }
            });

            if (!post) {
                const err: ErrorHandler = new ErrorHandler(
                    'POSTS_CONTROLLERS.FETCH_POSTS_SINGLE',
                    'Post not found',
                    'Post not found',
                    404
                );

                throw err;
            }

            return post;
        } catch (error: any) {
            if (error instanceof ErrorHandler) {
                throw new ErrorHandler(
                    error.failurePoint,
                    error.message,
                    error.clientMsg,
                    error.status
                );
            }

            throw new ErrorHandler(
                'POSTS_CONTROLLERS.FETCH_POSTS_SINGLE',
                error.message,
                'An error occurred while fetching post',
                500
            );
        }
    }

    public async createPost(createPostData: ICreatePostData): Promise<Post> {
        try {
            const post: Post = await this.client.post.create({
                data: createPostData
            });

            return post;
        } catch (error: any) {
            if (error instanceof ErrorHandler) {
                throw new ErrorHandler(
                    error.failurePoint,
                    error.message,
                    error.clientMsg,
                    error.status
                );
            }

            throw new ErrorHandler(
                'POSTS_CONTROLLERS.CREATE_POST',
                error.message,
                'An error occurred while creating the post',
                500
            );
        }
    }

    public async updatePost(
        postID: number,
        updatePostData: IUpdatePostData
    ): Promise<Post> {
        try {
            await this.getPostSingle(postID);

            // TODO: update the post
            const updatedPost: Post = await this.client.post.update({
                where: {
                    id: postID
                },
                data: updatePostData
            });

            return updatedPost;
        } catch (error: any) {
            if (error instanceof ErrorHandler) {
                throw new ErrorHandler(
                    error.failurePoint,
                    error.message,
                    error.clientMsg,
                    error.status
                );
            }

            throw new ErrorHandler(
                'POSTS_CONTROLLERS.CREATE_POST',
                error.message,
                'An error occurred while creating the post',
                500
            );
        }
    }

    public async deletePost(postID: number): Promise<boolean> {
        try {
            await this.getPostSingle(postID);

            await this.client.post.delete({
                where: {
                    id: postID
                }
            });

            return true;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to create post');
        }
    }
}

const postsService = new PostsService();

// exports
export { postsService };
