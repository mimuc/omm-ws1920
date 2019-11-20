interface News {
    // TODO:
    title: string;
    content: string;
    publishedAt: number;
}

interface PoliticalNews extends News {
    // TODO:
    author: string;
    country?: string;
}

interface EntertainmentNews extends News {
    // TODO:
    url?: string;
}
