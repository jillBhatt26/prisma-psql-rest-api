// imports
import { Post, Prisma, PrismaClient } from '@prisma/client';

// interfaces
import { ICreatePostData } from '../interfaces';

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
            throw new Error(error.message || "Failed to fetch author's posts");
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
                throw new Error('Post not found');
            }

            return post;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async createPost(createPostData: ICreatePostData): Promise<Post> {
        try {
            const post: Post = await this.client.post.create({
                data: createPostData
            });

            return post;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to create post');
        }
    }

    public async updatePost(
        postID: number,
        updatePostData: Partial<Post>
    ): Promise<Post> {
        try {
            const post: Post | null = await this.client.post.update({
                where: {
                    id: postID
                },
                data: updatePostData
            });

            if (!post) {
                throw new Error('Post not found');
            }

            return post;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to create post');
        }
    }

    public async deletePost(postID: number): Promise<boolean> {
        try {
            const post: Post | null = await this.client.post.delete({
                where: {
                    id: postID
                }
            });

            if (!post) {
                throw new Error('Post not found');
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to create post');
        }
    }
}

const postsService = new PostsService();

// exports
export { postsService };
