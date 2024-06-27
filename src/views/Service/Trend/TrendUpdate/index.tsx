import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';

import  { Editor } from '@toast-ui/react-editor';
import ToastEditor from 'src/components/ToastEditor';

import { useUserStore } from 'src/stores';
import { GetTrendBoardResponseDto } from 'src/apis/TrendBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { PutTrendBoardRequestDto } from 'src/apis/TrendBoard/dto/request';

import { TREND_BOARD_DETAIL_ABSOLUTE_PATH, TREND_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { getTrendBoardRequest, putTrendBoardRequest } from 'src/apis/TrendBoard';

import './style.css';
import'../../../../App.css'

//							component							//
export default function TrendUpdate() {
//							state							//
	const editorRef= useRef<Editor | null> (null);
	const {loginUserRole} = useUserStore();
	const [cookies] = useCookies();
	const [trendBoardTitle, setTrendBoardTitle] = useState<string>('');
	const {trendBoardNumber} = useParams();
	const [trendBoardContents, setTrendBoardContents]  = useState<string>('');
	const [trendBoardUrlList, setTrendBoardUrlList] = useState<{base64: string; url : string}[]>([]);
	const [trendBoardThumbnailImage, setTrendBoardThumbnailImage] = useState<string>('');
	
//								function							//
	const navigator = useNavigate();

	const getTrendBoardResponse = (result : GetTrendBoardResponseDto | ResponseDto | null) => {
		const message = 
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'VF' ? '올바르지 않은 게시물 번호 입니다.' :
		result.code === 'AF' ? '인증에 실패했습니다.' :
		result.code === 'NB' ? '존재하지 않는 접수 번호 입니다.' :
		result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

	if(!result || result.code !== 'SU') {
		alert(message);
		navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
		return;
	}

	const { trendBoardTitle,trendBoardContents } = result as GetTrendBoardResponseDto;
	setTrendBoardTitle(trendBoardTitle);
	setTrendBoardContents(trendBoardContents);
}

const putTrendBoardResponse = (result : ResponseDto | null) => {
	const message = 
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'AF' ? '권한이 없습니다.' :
		result.code === 'VF' ? '모든 값을 입력해주세요.' :
		result.code === 'NB' ? '존재하지 않는 게시물 번호 입니다.':
		result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

	if (!result || result.code !== 'SU') {
		alert(message);
		return;
	}

	if(!trendBoardNumber) return;
	navigator(TREND_BOARD_DETAIL_ABSOLUTE_PATH(trendBoardNumber));
}

//							event handler							//
	const onTrendBoardTitleChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
		const title = event.target.value;
		setTrendBoardTitle(title);
	}

	const onTrendBoardContentsChangeHandler = (trendBoardContents: string ) => {
		setTrendBoardContents(trendBoardContents);
	}

	const onImageChangeHandler = (imageList: {base64: string; url: string}[]) => {
		setTrendBoardUrlList(imageList);
	}

	const onUpdateButtonClickHandler = () => {
		const emptyCheck = trendBoardContents.replaceAll('<p>', '').replaceAll('<br>', '').replaceAll('</p>', '');
			if(!trendBoardTitle.trim() || !trendBoardContents.trim() ||!emptyCheck.trim()) {
				alert("제목과 내용 모두 입력해주세요.")
				return;
			}
		if (!cookies.accessToken || !trendBoardNumber) return;

		const requestBody: PutTrendBoardRequestDto = {
			trendBoardTitle: trendBoardTitle.trim(),
			trendBoardContents: trendBoardContents.trim(),
			trendBoardThumbnailImage: trendBoardThumbnailImage
		};

		putTrendBoardRequest(trendBoardNumber, requestBody, cookies.accessToken)
		.then(putTrendBoardResponse)
		.catch((error) => {
			console.error('게시물 작성 중 오류가 발생했습니다:', error.response.data);
			alert(`게시물 작성 중 오류가 발생했습니다: ${error.response.data.message || error.message}`);
		});
	};


	const onThumbnailSelectHandler = (url: string) => {
		setTrendBoardThumbnailImage(url);
	}

//							event handler							//
	let effectFlag = false;
	useEffect(() => {
			if (!trendBoardNumber || !cookies.accessToken || !loginUserRole || effectFlag) return;
			effectFlag = true;
			getTrendBoardRequest(trendBoardNumber, cookies.accessToken).then(result => {
					if (loginUserRole !== 'ROLE_ADMIN') {
							alert('권한이 없습니다.');
							navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
							return;
					}
					getTrendBoardResponse(result);
			});
	}, [trendBoardNumber, cookies.accessToken, loginUserRole]);

//							render							//
	return (
		<div id = 'trend-board-write-wrapper'>
			<div className='trend-board-writer-top-bar'>
				<input
				type="trend-board-write-title"
				placeholder='제목을 입력해주세요.'
				value={trendBoardTitle}
				onChange={onTrendBoardTitleChangeHandler}
				/>
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
			<div className='primary-button' onClick={onUpdateButtonClickHandler}>수정</div>
		</div>
	)
}
