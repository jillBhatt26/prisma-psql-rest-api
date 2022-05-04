export interface ICreatePostData {
    title: string;
    content: string;
    authorId: number;
}

export interface IUpdatePostData {
    title?: string;
    content?: string;
}
