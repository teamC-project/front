import React, { useState } from 'react'
import './style.css';
import'../../../../App.css'
import { useNavigate, useParams } from 'react-router';
import {  QNA_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';

//												component													//
export default function QnaDetail() {

	//										state										//
	const {loginUserId, loginUserRole} = useUserStore();
	const {qnaBoardNumber} = useParams();
	const [cookies] = useCookies();

	const [title, setTItle] = useState<string>('');
	const [writerId, setWriterId] = useState<string>('');
	const [writeDate, setWriteDate] = useState<string>('');
	const [viewCount, setViewCount] = useState<number>(0);
	const [contents, setContents] = useState<string>('');
	const [status, setStatus] = useState<string | null>(null);
	const [comment, setComment] = useState<string | null>(null);
	const [commentRows, setCommentRows] = useState<number>(1);

	  //                    function                    //
		const navigator = useNavigate();

		const increaseViewCountResponse = (result : ResponseDto | null) => {
			
		}
	return (
    <div id="qna-board-detail-wrapper">
      <div className="qna-board-detail-title">제목</div>
      <div className="qna-board-detail-container">
        <div className="qna-board-detail-information">
          <div className="qna-board-detai-information1">작성자</div>
          <div className="qna-board-detail-information2">작성일</div>
          <div className="qna-board-detail-information3">조회</div>
          <div className="qna-board-detail-information4">삭제</div>
          <div className="qna-board-detail-information5">수정</div>
        </div>
      </div>
      <div className="qna-board-detail-view">
        내용 상세
      </div>
			<div id = 'qna-board-comment-wrapper'>
				<div className="qna-board-comment-write-box">
          <div className="qna-board-comment-textarea-box">
            <textarea
              className="qna-board-comment-textarea"
              placeholder="답글을 작성해주세요."
            />
          </div>
					<div className='qna-board-comment-button-box'>
          <div className="qna-board-comment-button" >
					답글 달기
          </div>
				<div className="qna-board-comment-button" >
          목록보기
        </div>
				</div>
				</div>
		</div>
      <div className="qna-board-detail-go-to-qna-boardList"  >
        목록으로
      </div>
    </div>
  );
}
