export interface PostQnaBoardRequestDto {
	qnaBoardTitle : string;
	qnaBoardContents : string;
}

export interface PostQnaBoardCommentRequestDto {
qnaBoardComment : string;
}

export interface PutQnaBoardRequestDto {
	qnaBoardTitle : string ;
	qnaBoardContents : string;
}

export interface PutQnaBoardCommentRequestDto {
    qnaBoardComment : string;
}