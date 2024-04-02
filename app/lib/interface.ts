export interface blogCard {
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: any;
    tagName: string;
    tags: Array<any>;
}

export interface fullBlog {
    currentSlug: string;
    title: string;
    content: any;
    titleImage: any;
    publishDate: string;
    tags: Array<any>;
}