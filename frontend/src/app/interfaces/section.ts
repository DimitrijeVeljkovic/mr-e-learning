export interface Section {
    sectionId: number;
    title: string;
    videoUrl: string;
    paragraphs: { paragraphId: number, data: string }[];
}
