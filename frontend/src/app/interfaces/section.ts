export interface Section {
    _id: string;
    sectionId: number;
    title: string;
    videoUrl: string;
    paragraphs: { paragraphId: number, data: string }[];
}
