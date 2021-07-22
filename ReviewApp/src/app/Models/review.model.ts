export class Review {
    _id: string;
    movie: string;
    reviewer: string;
    content: string;
    sentiment: string;
    polarity: number;
    addedDate: Date;
    lastUpdate: Date;
    posterUrl: string;
}
