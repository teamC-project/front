import React, { ChangeEvent, useEffect, useRef, useState }  from 'react';
import { useCookies } from 'react-cookie';

import { useNavigate } from 'react-router';

import ToastEditor from 'src/components/ToastEditor';
import { Editor } from '@toast-ui/react-editor';

import { useUserStore } from 'src/stores';
import ResponseDto from 'src/apis/response.dto';

import { PostTrendBoardRequestDto } from 'src/apis/TrendBoard/dto/request';
import { postTrendBoardRequest } from 'src/apis/TrendBoard';

import { TREND_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

import './style.css';

//                    component                    //
export default function TrendWrite() {
  //                    state                    //
	const editorRef = useRef<Editor|null>(null);
	const {loginUserRole} = useUserStore();
	const [cookies] = useCookies();
	const [trendBoardTitle, setTrendBoardTitle] = useState<string>('');
	const [trendBoardContents, setTrendBoardContents] = useState<string>(''); 
	const [trendBoardUrlList ,setTrendBoardUrlList] = useState<{base64: string; url: string}[]>([]);
	const [trendBoardThumbnailImage, setTrendBoardThumbnailImage] = useState<string>('');

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

		const onTrendBoardContentsChangeHandler = (trendBoardContents: string ) => {
			setTrendBoardContents(trendBoardContents);
		}

		const onImageChangeHandler = (imageList: {base64: string; url: string}[]) => {
			setTrendBoardUrlList(imageList);
		}

    const onTrendPostClickHandler =  () => {
		if (!trendBoardTitle.trim() || !trendBoardContents.trim() || !trendBoardThumbnailImage) {
				alert('제목과 내용 모두 입력해주세요')
				return;
			}
		if (!cookies.accessToken) return;

		const requestBody: PostTrendBoardRequestDto = {
				trendBoardTitle,
				trendBoardContents,
				trendBoardThumbnailImage
			}
			postTrendBoardRequest(requestBody, cookies.accessToken)
			.then(postTrendBoardResponse)
			.catch((error) => {
					console.error('게시물 작성 중 오류가 발생했습니다:', error.response.data);
					alert(`게시물 작성 중 오류가 발생했습니다: ${error.response.data.message || error.message}`);
			});
	};

	const onThumbnailSelectHandler = (url: string) => {
		setTrendBoardThumbnailImage(url);
	}

	  //                    effect                    //
		useEffect(() => {
			if (!loginUserRole) return;
			if (loginUserRole !=="ROLE_ADMIN" ) {
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
				<div style={{}}>
					{trendBoardUrlList.map((item) => <div 
					style={{ 
						width: '100px',
						height: '100px',
						backgroundImage: `url(${item.url})`, 
						backgroundSize: '100% 100%' , 
						border: trendBoardThumbnailImage === item.url ? '2px solid blue' : 'none', 
						cursor: 'pointer',
						margin: '5px'
						}} onClick={() => onThumbnailSelectHandler(item.url)} ></div>)}
				</div>
		</div>
		<div className='trend-board-textarea-container'>
			<ToastEditor 
			ref={editorRef} 
			body={trendBoardContents} 
			setBody={onTrendBoardContentsChangeHandler} 
			imageList={trendBoardUrlList} 
			setImageList={onImageChangeHandler} 
			/>
		</div>
		<div className='trend-board-write-footer' >
        <div className='trend-board-button-container'>
			<div className='primary-button' onClick={onTrendPostClickHandler}>올리기</div>
			<div className='primary-button'>취소</div>
        </div>
		</div>
    </div>
	);
}