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
    announcementBoardTitle: string;
    announcementBoardWriterId: string;
    announcementBoardWriteDatetime: string;
    announcementBoardContents: string;
    announcementBoardViewCount: number;
}
