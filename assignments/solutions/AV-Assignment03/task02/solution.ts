interface News {
    title: String;
    content: String;
    publishedAt: number;
}

interface PoliticalNews extends News {
    author: String;
    country?: String;
}

interface EntertainmentNews {
    country: String;
    url?: String;
}