export interface Vote {
    id: number;
    storyId: number;
    userId: number;
    voteValue: number;
    votedAt: Date;
}