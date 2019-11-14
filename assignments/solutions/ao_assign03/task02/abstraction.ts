interface News {
    title: string;
    content: string;
    publishedAt: number;
}

interface PoliticalNews extends News {
    author: string;
    country?: string;
}

interface EntertainmentNews extends News {
    url?: string;
}