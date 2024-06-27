import ResponseDto from "src/apis/response.dto";

export interface VisitorCountDto extends ResponseDto {
    totalVisitors: number;
    visitorsToday: number;
}

export interface getTotalVisitorsResponseDto extends ResponseDto {
    totalVisitors: number;
    visitorsToday: number;
}

export interface getVisitorsTodayResponseDto extends ResponseDto {
    totalVisitors: number;
    visitorsToday: number;
}

