import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import './style.css'
import '../../../../App.css'
import { QnaBoardListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, QNA_BOARD_DETAIL_ABSOLUTE_PATH, QNA_BOARD_WRITE_ABSOLUTE_PATH } from 'src/constant';
import { GetQnaBoardListResponseDto, GetSearchQnaBoardResponseDto } from 'src/apis/QnaBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getQnaBoardListRequest, getSearchQnaBoardListRequest } from 'src/apis/QnaBoard';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
// 												component 												//
function ListItem({
	qnaBoardNumber,
	qnaBoardStatus,
	qnaBoardTitle,
	qnaBoardWriterId,
	qnaBoardWriteDatetime,
	qnaBoardViewCount,
}: QnaBoardListItem) {

	//  								function  								//
		const navigator = useNavigate();

	//								event handler 								//
	const onListClickHandler = () => 
		navigator(QNA_BOARD_DETAIL_ABSOLUTE_PATH(qnaBoardNumber))

  //                    render                    //
  return (
    <div className="qna-list-table-tr" onClick={onListClickHandler}>
      <div className="qna-list-table-reception-number">{qnaBoardNumber}</div>
      <div className="qna-list-table-status">
        {qnaBoardStatus ? (
          <div className="disable-bedge">완료</div>
        ) : (
          <div className="primary-bedge">접수</div>
        )}
      </div>
      <div className="qna-list-table-title" style={{ textAlign: "left" }}>
        {qnaBoardTitle}
      </div>
      <div className="qna-list-table-writer-id">{qnaBoardWriterId}</div>
      <div className="qna-list-table-write-date">{qnaBoardWriteDatetime}</div>
      <div className="qna-list-table-viewcount">{qnaBoardViewCount}</div>
    </div>
  );
}


//												component												//
export default function QnaBoardList() {

	const {loginUserRole} = useUserStore();

	// 										state										// 
	const [cookies, setCookies] = useCookies();

	const [qnaBoardList, setQnaBoardList] = useState<QnaBoardListItem[]>([]);
	const [qnaBoardViewList, setQnaBoardViewList] = useState<QnaBoardListItem[]>([]);
	const [qnaBoardTotalLength , setQnaBoardTotalLength] = useState<number>(0);
	const [qnaBoardTotalPage, setQnaBoardTotalPage]= useState<number>(1);
	const [qnaBoardCurrentPage ,setQnaBoardCurrentPage] = useState<number>(1);
	const [qnaBoardPageList, setQnaBoardPageList] = useState<number[]>([1]);
	const [qnaBoardCurrentSection , setQnaBoardCurrentSection] = useState<number>(1); 
	const [qnaBoardTotalSection, setQnaBoardTotalSection] = useState<number>(1);
	const [qnaBoardIsToggleOn, setQnaBoardToggleOn] = useState<boolean>(false);

	const [qnaBoardSearchWord, setQnaBoardSearchWord] = useState<string>("");

  //                    function                    //
  const navigator = useNavigate();

  const changeQnaBoardPage = (boardList: QnaBoardListItem[], qnaBoardTotalLength: number) => {
    const startIndex = (qnaBoardCurrentPage - 1) * COUNT_PER_PAGE;
    let endIndex = qnaBoardCurrentPage* COUNT_PER_PAGE;
    if (endIndex > qnaBoardTotalLength - 1) endIndex = qnaBoardTotalLength;
    const viewList = boardList.slice(startIndex, endIndex);
    setQnaBoardViewList(viewList);
  };

  const changeQnaBoardSection = (qnaBoardTotalPage: number) => {
    if (!qnaBoardCurrentPage) return;
    const startPage =
		qnaBoardCurrentSection * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1);
    let endPage = qnaBoardCurrentSection * COUNT_PER_SECTION;
    if (endPage > qnaBoardTotalPage) endPage = qnaBoardTotalPage;
    const pageList: number[] = [];
    for (let page = startPage; page <= endPage; page++) pageList.push(page);
    setQnaBoardPageList(pageList);
  };

  const changeQnaBoardList = (boardList: QnaBoardListItem[]) => {
    if (qnaBoardIsToggleOn) boardList = boardList.filter((board) => !board.qnaBoardStatus);

    setQnaBoardList(boardList);

    const totalLength = boardList.length;
    setQnaBoardTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setQnaBoardTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setQnaBoardTotalSection(totalSection);

    changeQnaBoardPage(boardList, totalLength);

    changeQnaBoardSection(totalPage);
  };

  const getQnaBoardListResponse = (
    result: GetQnaBoardListResponseDto | ResponseDto | null
  ) => {
    const message = !result
      ? "서버에 문제가 있습니다."
      : result.code === "AF"
      ? "인증에 실패했습니다."
      : result.code === "DBE"
      ? "서버에 문제가 있습니다."
      : "";

    if (!result || result.code !== "SU") {
      alert(message);
      if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
      return;
    }

    const { qnaBoardList } = result as GetQnaBoardListResponseDto;
    changeQnaBoardList(qnaBoardList);

    setQnaBoardCurrentPage(1);
    setQnaBoardCurrentSection(1);
  };

  const getSearchQnaBoardListResponse = (
    result: GetSearchQnaBoardResponseDto | ResponseDto | null
  ) => {
    const message = !result
      ? "서버에 문제가 있습니다."
      : result.code === "VF"
      ? "검색어를 입력하세요."
      : result.code === "AF"
      ? "인증에 실패했습니다."
      : result.code === "DBE"
      ? "서버에 문제가 있습니다."
      : "";

    if (!result || result.code !== "SU") {
      alert(message);
      if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
      return;
    }

    const { qnaBoardList } = result as GetSearchQnaBoardResponseDto;
    changeQnaBoardList(qnaBoardList);

    setQnaBoardCurrentPage(!qnaBoardList.length ? 0 : 1);
    setQnaBoardCurrentSection(!qnaBoardList.length ? 0 : 1);
  };


  //                    event handler                    //
  const onQnaWriteButtonClickHandler = () => {
    if (loginUserRole !== "ROLE_USER") return;
    navigator(QNA_BOARD_WRITE_ABSOLUTE_PATH);
  };

  const onQnaToggleClickHandler = () => {
    if (loginUserRole !== "ROLE_ADMIN") return;
    setQnaBoardToggleOn(!qnaBoardIsToggleOn);
  };

  const onQnaPageClickHandler = (qnaBoardpage: number) => {
    setQnaBoardCurrentPage(qnaBoardpage);
  };

  const onQnaPreSectionClickHandler = () => {
    if (qnaBoardCurrentSection <= 1) return;
    setQnaBoardCurrentSection(qnaBoardCurrentSection - 1);
    setQnaBoardCurrentPage((qnaBoardCurrentSection - 1) * COUNT_PER_SECTION);
  };

  const onQnaNextSectionClickHandler = () => {
    if (qnaBoardCurrentSection === qnaBoardTotalSection) return;
    setQnaBoardCurrentSection(qnaBoardCurrentSection + 1);
    setQnaBoardCurrentPage(qnaBoardCurrentSection * COUNT_PER_SECTION + 1);
  };

  const onQnaSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const qnaBoardSearchWord = event.target.value;
    setQnaBoardSearchWord(qnaBoardSearchWord);
  };

  const onQnaSearchWordKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return;
    onQnaSearchButtonClickHandler();
  };

  const onQnaSearchButtonClickHandler = () => {
    if (!qnaBoardSearchWord) return;
    if (!cookies.accessToken) return;

    getSearchQnaBoardListRequest(qnaBoardSearchWord, cookies.accessToken).then(
      // getSearchQnaBoardListResponse
    );
  };

  //                    effect                    //
  useEffect(() => {
    if (!cookies.accessToken) return;
    getQnaBoardListRequest(cookies.accessToken).then(getQnaBoardListResponse);
    setQnaBoardCurrentPage(1);
    setQnaBoardCurrentSection(1);
  }, [qnaBoardIsToggleOn]);

  useEffect(() => {
    if (!qnaBoardList.length) return;
    changeQnaBoardPage(qnaBoardList, qnaBoardTotalLength);
  }, [qnaBoardCurrentPage]);

  useEffect(() => {
    if (!qnaBoardList.length) return;
    changeQnaBoardSection(qnaBoardTotalPage);
  }, [qnaBoardCurrentSection]);

	  //                    render                    //
		const toggleClass = qnaBoardIsToggleOn ? "toggle-active" : "toggle";
		const searchButtonClass = qnaBoardSearchWord ? "primary-button" : "disable-button";

  return (
    <div id="qna-list-wrapper">
      <div className="qna-list-top">
        <div className="qna-list-size-text">
          전체 <span className="emphasis">{qnaBoardTotalLength}건</span> | 페이지{" "}
          <span className="emphasis">
            {qnaBoardCurrentPage}/{qnaBoardTotalPage}
          </span>
        </div>
        <div className="qna-list-top-right">
          {loginUserRole === "ROLE_USER" ? (
            <div className="primary-button" onClick={onQnaWriteButtonClickHandler}>
              글쓰기
            </div>
          ) : (
            <>
              <div className={toggleClass} onClick={onQnaToggleClickHandler}></div>
              <div className="qna-list-top-admin-text">미완료 보기</div>
            </>
          )}
        </div>
      </div>
      <div className="qna-list-table">
        <div className="qna-list-table-th">
          <div className="qna-list-table-reception-number">접수번호</div>
          <div className="qna-list-table-status">상태</div>
          <div className="qna-list-table-title">제목</div>
          <div className="qna-list-table-writer-id">작성자</div>
          <div className="qna-list-table-write-date">작성일</div>
          <div className="qna-list-table-viewcount">조회수</div>
        </div>
        {qnaBoardViewList.map((item) => (
          <ListItem {...item} />
        ))}
      </div>
      <div className="qna-list-bottom">
        <div style={{ width: "299px" }}></div>
        <div className="qna-list-pagenation">
          <div
            className="qna-list-page-left"
            onClick={onQnaPreSectionClickHandler}
          ></div>
          <div className="qna-list-page-box">
            {qnaBoardPageList.map((page) =>
              page === qnaBoardCurrentPage ? (
                <div className="qna-list-page-active">{page}</div>
              ) : (
                <div
                  className="qna-list-page"
                  onClick={() => onQnaPageClickHandler(page)}
                >
                  {page}
                </div>
              )
            )}
          </div>
          <div
            className="qna-list-page-right"
            onClick={onQnaNextSectionClickHandler}
          ></div>
        </div>
        <div className="qna-list-search-box">
          <div className="qna-list-search-input-box">
            <input
              className="qna-list-search-input"
              placeholder="검색어를 입력하세요."
              value={qnaBoardSearchWord}
              onChange={onQnaSearchWordChangeHandler}
            />
          </div>
          <div
            className={searchButtonClass}
            onClick={onQnaSearchButtonClickHandler}
            onKeyDown={onQnaSearchWordKeyDownHandler}
          >
            검색
          </div>
        </div>
      </div>
    </div>
  );
}
