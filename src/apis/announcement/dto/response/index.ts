import ResponseDto from "src/apis/response.dto";
import { AnnouncementBoardListItem } from "src/types";

export interface GetAnnouncementBoardListResponseDto extends ResponseDto {
    announcementBoardList: AnnouncementBoardListItem[];
}

export interface GetSearchAnnouncementBoardListResponseDto extends ResponseDto {
    announcementBoardList: AnnouncementBoardListItem[];
}

export interface GetAnnouncementBoardResponseDto extends ResponseDto {
    announcementBoardNumber: number;
    title: string;
    writerId: string;
    writeDatetime: string;
    viewCount: number;
    contents: string;
    comment: string | null; 
}
