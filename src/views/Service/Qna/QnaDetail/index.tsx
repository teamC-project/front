import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import'../../../../App.css'
import { useNavigate, useParams } from 'react-router';
import {  AUTH_ABSOLUTE_PATH, QNA_BOARD_LIST_ABSOLUTE_PATH, QNA_BOARD_UPDATE_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { getQnaBoardRequest,  } from 'src/apis/QnaBoard';
import { GetQnaBoardResponseDto } from 'src/apis/QnaBoard/dto/response';

//												component													//
export default function QnaDetail() {

	//										state										//
const { loginUserId, loginUserRole } = useUserStore();
  const { receptionNumber } = useParams();

  const [cookies] = useCookies();
  const [title, setTitle] = useState<string>("");
  const [writerId, setWriterId] = useState<string>("");
  const [writeDatetime, setWriteDatetime] = useState<string>("");
  const [viewCount, setViewCount] = useState<number>(0);
  const [contents, setContents] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [comment, setComment] = useState<string | null>(null);
  const [commentRows, setCommentRows] = useState<number>(1);

  //                    function                    //
  const navigator = useNavigate();

  const increaseViewCountResponse = (result: ResponseDto | null) => {
    const message = !result
      ? "서버에 문제가 있습니다."
      : result.code === "VF"
      ? "잘못된 접수번호입니다."
      : result.code === "AF"
      ? "인증에 실패했습니다."
      : result.code === "NB"
      ? "존재하지 않는 접수번호입니다."
      : result.code === "DBE"
      ? "서버에 문제가 있습니다."
      : "";

    if (!result || result.code !== "SU") {
      alert(message);
      if (result?.code === "AF") {
        navigator(AUTH_ABSOLUTE_PATH);
        return;
      }
      navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }

    if (!cookies.accessToken || !receptionNumber) return;
    getQnaBoardRequest(receptionNumber, cookies.accessToken).then(
      getBoardResponse
    );
  };

  const getBoardResponse = (
    result: GetQnaBoardResponseDto | ResponseDto | null
  ) => {
    const message = !result
      ? "서버에 문제가 있습니다."
      : result.code === "VF"
      ? "잘못된 접수번호입니다."
      : result.code === "AF"
      ? "인증에 실패했습니다."
      : result.code === "NB"
      ? "존재하지 않는 접수번호입니다."
      : result.code === "DBE"
      ? "서버에 문제가 있습니다."
      : "";

    if (!result || result.code !== "SU") {
      alert(message);
      if (result?.code === "AF") {
        navigator(AUTH_ABSOLUTE_PATH);
        return;
      }
      navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }

    const {
      qnaBoardTitle,
      qnaBoardWriterId,
      qnaBoardWriteDatetime,
      qnaBoardViewCount,
      qnaBoardContents,
      qnaBoardStatus,
      qnaBoardComment,
    } = result as GetQnaBoardResponseDto;
    setTitle(title);
    setWriterId(writerId);
    setWriteDatetime(writeDatetime);
    setViewCount(viewCount);
    setContents(contents);
    setStatus(status);
    setComment(comment);
  };

  const postCommentResponse = (result: ResponseDto | null) => {
    const message = !result
      ? "서버에 문제가 있습니다."
      : result.code === "AF"
      ? "권한이 없습니다."
      : result.code === "VF"
      ? "입력 데이터가 올바르지 않습니다."
      : result.code === "NB"
      ? "존재하지 않는 게시물입니다."
      : result.code === "WC"
      ? "이미 답글이 작성된 게시물입니다."
      : result.code === "DBE"
      ? "서버에 문제가 있습니다."
      : "";

    if (!result || result.code !== "SU") {
      alert(message);
      return;
    }

    if (!receptionNumber || !cookies.accessToken) return;
    getQnaBoardRequest(receptionNumber, cookies.accessToken).then(
      getBoardResponse
    );
  };

  const deleteBoardResponse = (result: ResponseDto | null) => {
    const message = !result
      ? "서버에 문제가 있습니다."
      : result.code === "AF"
      ? "권한이 없습니다."
      : result.code === "VF"
      ? "올바르지 않은 접수 번호입니다."
      : result.code === "NB"
      ? "존재하지 않는 접수 번호입니다."
      : result.code === "DBE"
      ? "서버에 문제가 있습니다."
      : "";

    if (!result || result.code !== "SU") {
      alert(message);
      return;
    }

    navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
  };

  //                    event handler                    //
  const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (status || loginUserRole !== "ROLE_ADMIN") return;
    const comment = event.target.value;
    setComment(comment);

    const commentRows = comment.split("\n").length;
    setCommentRows(commentRows);
  };

  // const onCommentSubmitClickHandler = () => {
  //   if (!comment || !comment.trim()) return;
  //   if (
  //     !receptionNumber ||
  //     loginUserRole !== "ROLE_ADMIN" ||
  //     !cookies.accessToken
  //   )
	// 	return;

  //   const requestBody: PostQnaBoardCommentRequestDto = {qnaBoardComment};
  //   postQnaBoardCommentRequest(receptionNumber, requestBody, cookies.accessToken).then(
  //     postCommentResponse
  //   );
		
  // };

  const onListClickHandler = () => {
    navigator(QNA_BOARD_LIST_ABSOLUTE_PATH);
  };

  const onUpdateClickHandler = () => {
    if (!receptionNumber || loginUserId !== writerId || status) return;
    navigator(QNA_BOARD_UPDATE_ABSOLUTE_PATH(receptionNumber));
  };

  // const onDeleteClickHandler = () => {
  //   if (!receptionNumber || loginUserId !== writerId || !cookies.accessToken)
  //     return;
  //   const isConfirm = window.confirm("정말로 삭제하시겠습니까?");
  //   if (!isConfirm) return;

  //   deleteQnaBoardRequest(receptionNumber, cookies.accessToken).then(
  //     deleteBoardResponse
  //   );
  // };

  //                    effect                    //
  // useEffect(() => {
  //   if (!cookies.accessToken || !receptionNumber) return;
  //   increaseQnaBoardCountRequest(receptionNumber, cookies.accessToken).then(
  //     increaseViewCountResponse
  //   );
  // }, []);
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

function increaseQnaBoardCountRequest(receptionNumber: string, accessToken: any) {
  throw new Error('Function not implemented.');
}
