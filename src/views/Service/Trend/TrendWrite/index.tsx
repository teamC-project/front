import React, { ChangeEvent, useEffect, useRef, useState }  from 'react';
import './style.css';
import ToastEditor from 'src/components/ToastEditor';
import { Editor } from '@toast-ui/react-editor';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { PostTrendBoardRequestDto } from 'src/apis/TrendBoard/dto/request';
import { postTrendBoardRequest } from 'src/apis/TrendBoard';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { TREND_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

//                    component                    //
export default function TrendWrite() {
  //                    state                    //
	const editorRef = useRef<Editor|null>(null);
	const {loginUserRole} = useUserStore();
	const [cookies] = useCookies();
	const  [trendBoardTitle, setTrendBoardTitle] = useState<string>('');
	const [trendBoardContents, setTrendBoardContents] = useState<string>(''); 

	
  //                    function                    //
	const navigator = useNavigate();

	const postTrendBoardResponse = (result : ResponseDto | null) => {
		const message = ! result
		? "서버에 문제가 있습니다."
		: result.code === "VF" 
		? "제목과 내용을 모두 입력해주세요."
		: result.code === "AF" 
		? "권한이 없습니다."
		: result.code === "DBE" 
		? "서버에 문제가 있습니다."
		: "";

		if (!result || result.code !== "SU") {
			alert(message);
			return;
		}

		navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
	}

	
	  //                    event handler                    //
		const onTrendBoardTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
			const trendBoardTitle = event.target.value;
			setTrendBoardTitle(trendBoardTitle);
		}

		const onTrendBoardContentsChangeHandler = (trendBoardContents: string) => {
			setTrendBoardContents(trendBoardContents);
		}
	
	const onTrendPostClickHandler = () => {
		if(!trendBoardTitle.trim() ||  !trendBoardContents.trim()) return;
		if(!cookies.accessToken) return;

		const requestBody : PostTrendBoardRequestDto ={
			trendBoardTitle,
			trendBoardContents,
		}
		postTrendBoardRequest(requestBody, cookies.accessToken.then(postTrendBoardResponse))
	}

	  //                    effect                    //
		useEffect(() => {
			if (loginUserRole === "ROLE_CUSTOMER" && "ROLE_DESIGNER") {
				navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
				return;
			}
		}, [loginUserRole])


  return (
    <div id='trend-board-write-wrapper'>
      <div className='trend-board-write-top-bar'>
        <input 
				className='trend-board-write-title'
				placeholder='제목을 입력해주세요' 
				value={trendBoardTitle}
				onChange={onTrendBoardTitleChangeHandler}
				/>
        <div className='search-button'>썸네일 이미지 선택</div>
      </div>
      <div className='trend-board-textarea-container'>
			<ToastEditor ref={editorRef} body={trendBoardContents} setBody={onTrendBoardContentsChangeHandler} />
      </div>
      <div className='trend-board-write-footer'>
        <div className='trend-board-button-container'>
          <div className='search-button' onClick={onTrendPostClickHandler}>올리기</div>
          <div className='search-button'>취소</div>
        </div>
      </div>
    </div>
  );
}