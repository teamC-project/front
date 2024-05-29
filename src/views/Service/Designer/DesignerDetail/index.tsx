import React, { useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { DesignerBoardCommentListItem } from 'src/types';
import { GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_LIST_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getDesignerBoardRequest } from 'src/apis/designerBoard';

interface Props {
    contents: string;
}


//                    component                    //
const CommentPost = ({ contents}: Props) => {
    //              state               //

    //              render              //
    return (
        <div className="comment-post">
            <p>{contents}</p>
            <div className="comment-section">
                <div className="comment-list">
                </div>
                <div className="designer-comment-write-contents-box">
                    <textarea placeholder="댓글을 입력하세요" className='designer-comment-write-contents-textarea'></textarea>
                    <button>작성</button>
                </div>
            </div>
        </div>
    );
};

//                    component                    //
function ListItem ({
    designerBoardCommentNumber,
    designerBoardCommentWriterId,
    designerBoardCommentDatetime
}: DesignerBoardCommentListItem) {

    //              render              //
    return (
        <div className="designer-detail-comment-meta">
            <div className='designer-detail-comment-number'>{designerBoardCommentNumber}</div>
            <div className="designer-detail-comment-author">{designerBoardCommentWriterId}</div>
            <div className="designer-detail-comment-date">{designerBoardCommentDatetime}</div>
        </div>
    );
}

//                    component                    //
export default function DesignerDetail() {

    //              state               //
    const { designerBoardNumber } = useParams();
    const [cookies] = useCookies();
    const [viewList, setViewList] = useState<DesignerBoardCommentListItem[]>([]);

    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [writeDate, setWriteDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [contents, setContents] = useState<string>('');
    const [comment, setComment] = useState<string | null>(null);
    const [commentRows, setCommentRows] = useState<number>(1);

    //                  function                    //
    const navigate = useNavigate();

    const getDesignerBoardResponse = (result: GetDesignerBoardResponseDto | ResponseDto | null) => {
        const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '잘못된 접수 번호입니다.' :
        result.code === 'AF' ? '인증에 실패 했습니다.' :
        result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigate(MAIN_PATH);
                return;
            }
            navigate(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }

        const { title, writerId, writeDatetime, viewCount, contents, comment } = result as GetDesignerBoardResponseDto;
        setTitle(title);
        setWriterId(writerId);
        setWriteDate(writeDatetime);
        setViewCount(viewCount);
        setContents(contents);
        setComment(comment);
    };

    const postDesignerBoardCommentResponse = (result: ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!designerBoardNumber || !cookies.accessToken) return;
        getDesignerBoardRequest(designerBoardNumber, cookies.accessToken).then(getDesignerBoardResponse);
    };

    const handleGoToList = () => {
    navigate(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    };

    const handleEdit = () => {
    navigate('/service/designer_board/update/1');
    };

//              render              //
    return (
    <div className="designer-detail">
        <div className="designer-detail-title">제목</div>
        <div className="designer-detail-container">
        <div className="designer-detail-information">
            <div className="designer-detail-information1">작성자</div>
            <div className="designer-detail-information2">작성일</div>
            <div className="designer-detail-information3">조회</div>
            <div className="designer-detail-information4">삭제</div>
            <div className="designer-detail-information5" onClick={handleEdit}>수정</div>
        </div>
        </div>
        <div className="designer-detail-view">
        내용 상세
        </div>
        <div className='designer-comment-wrap'>
            <div className='comment-inner'>
                <div className='comment-head'>
                    <h5>댓글</h5>
                    <span className='comment-count'>2</span>
                </div>
                <div className='comment-write-box'>
                <CommentPost contents='' />
                </div>
            </div>
        </div>
        <div className="designer-detail-go-to-designerList" onClick={handleGoToList}>
        목록으로
        </div>
    </div>
    );
}
