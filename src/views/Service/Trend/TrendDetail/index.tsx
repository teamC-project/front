import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useCookies } from 'react-cookie'


import { useUserStore } from 'src/stores'

import ResponseDto from 'src/apis/response.dto'

import { requestErrorHandler } from 'src/apis'

import { 
	AUTH_ABSOLUTE_PATH, 
	MAIN_PATH, TREND_BOARD_LIST_ABSOLUTE_PATH, 
	TREND_BOARD_UPDATE_ABSOLUTE_PATH } 
from 'src/constant'

import { 
	deleteTrendBoardLikeListRequest, 
	deleteTrendBoardRequest, 
	getTrendBoardLikeListRequest, 
	getTrendBoardRequest, 
	patchTrendBoardIncreaseViewCountRequest,
	putTrendBoardLikeRequest, } 
from 'src/apis/TrendBoard'

import { GetTrendBoardLikeListResponseDto, GetTrendBoardResponseDto } from 'src/apis/TrendBoard/dto/response'

import TrendBoardComment from '../TrendBoardComment'
import './style.css'
import '../../../../App.css'

//							component							//
export default function TrendDetail() {

//							state							//
	const { loginUserId } = useUserStore();
	const { trendBoardNumber } = useParams();
	const [cookies] = useCookies();
	const [trendBoardTitle, setTrendBoardTitle] = useState<string>('');
	const [trendBoardWriterId, setTrendBoardWriterId] = useState<string>('');
	const [trendBoardWriteDatetime, setTrendBoardWriteDatetime] = useState<string>('');
	const [trendBoardLikeCount, setTrendBoardLikeCount] = useState<number>(0);
	const [trendBoardViewCount, setTrendBoardViewCount] = useState<number>(0);
	const [trendBoardContents, setContents] = useState<string>('');
	const [isLike, setIsLike] = useState<boolean>(false);

//							function							//
	const navigator = useNavigate();

	const increaseTrendBoardViewCountResponse = (result: ResponseDto | null) => {
		const message =
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'VF' ? '잘못된 게시물입니다.' :
			result.code === 'AF' ? '인증에 실패했습니다.' :
			result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !== 'SU') {
			alert(message);
			if (result?.code === 'AF') {
				navigator(MAIN_PATH);
				return;
			}
			navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
			return;
		}

		if (!cookies.accessToken || !trendBoardNumber) return;
		getTrendBoardRequest(trendBoardNumber, cookies.accessToken)
			.then(getTrendBoardResponse);
	};

	const putTrendBoardLikeResponse = (result: ResponseDto | null) => {
		const message =
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'VF' ? '잘못된 게시물 입니다.' :
			result.code === 'AF' ? '인증에 실패했습니다. ' :
			result.code === 'NI' ? '존재하지 않는 아이디입니다.' :
			result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !== 'SU') {
			alert(message);
			if (result?.code === 'AF') {
				navigator(MAIN_PATH);
				return;
			}
			navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
			return;
		}
		setIsLike((prevIsLike) => !prevIsLike);
		setTrendBoardLikeCount((prevCount) => prevCount + (isLike ? -1 : 1));
	};

	const getTrendBoardLikeListResponse = (result: GetTrendBoardLikeListResponseDto | ResponseDto | null) => {
		const message =
			!result ? '서버에 문제가 있습니다' :
			result.code === 'VF' ? '잘못된 게시물 입니다.' :
			result.code === 'AF' ? '인증에 실패 했습니다.' :
			result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !== 'SU') {
			alert(message);
			if (result?.code === 'AF') {
				navigator(MAIN_PATH);
				return;
			}
			navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
			return;
		}

		const { likeList } = result as GetTrendBoardLikeListResponseDto;
		const isLiked = likeList.includes(loginUserId);
		setIsLike(isLiked);
	};

	const getTrendBoardResponse = (result: GetTrendBoardResponseDto | ResponseDto | null) => {
		const message =
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'VF' ? '잘못된 게시물 입니다.' :
			result.code === 'AF' ? '인증에 실패 했습니다.' :
			result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !== 'SU') {
			alert(message);
			if (result?.code === 'AF') {
				navigator(MAIN_PATH);
				return;
			}
			navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
			return;
		}

		const {
			trendBoardTitle,
			trendBoardContents,
			trendBoardWriterId,
			trendBoardWriteDateTime,
			trendBoardLikeCount,
			trendBoardViewCount
		} = result as GetTrendBoardResponseDto;

		setTrendBoardTitle(trendBoardTitle);
		setContents(trendBoardContents);
		setTrendBoardWriterId(trendBoardWriterId);
		setTrendBoardWriteDatetime(trendBoardWriteDateTime);
		setTrendBoardLikeCount(trendBoardLikeCount);
		setTrendBoardViewCount(trendBoardViewCount);
	};

	const deleteTrendBoardResponse = (result: ResponseDto | null) => {
		const message =
			!result ? '서버에 문제가 있습니다.' :
				result.code === 'AF' ? '권한이 없습니다.' :
					result.code === 'VF' ? '올바르지 않은 게시물 번호 입니다.' :
						result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
							result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !== 'SU') {
			alert(message);
			return;
		}

		navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
	};

	//										event handler										//
	const handleGoToList = () => {
		navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
	};

	const onUpdateClickHandler = () => {
		if (!trendBoardNumber || loginUserId !== trendBoardWriterId) return;
		navigator(TREND_BOARD_UPDATE_ABSOLUTE_PATH(trendBoardNumber));
	};

	const onDeleteButtonClickHandler = () => {
		if (!trendBoardNumber || loginUserId !== trendBoardWriterId || !cookies.accessToken)
			return;
		const isConfirm = window.confirm('정말로 삭제 하시겠습니까?');
		if (!isConfirm) return;
	
		deleteTrendBoardLikeListRequest(trendBoardNumber, cookies.accessToken)
			.then(() => {
				deleteTrendBoardRequest(trendBoardNumber, cookies.accessToken)
					.then(deleteTrendBoardResponse)
					.catch(requestErrorHandler);
			})
			.catch(requestErrorHandler);
	};

	const onLikeButtonClickHandler = () => {
    if (!cookies.accessToken) {
		alert('로그인시 이용 가능합니다.');
		navigator(AUTH_ABSOLUTE_PATH);
    }
    if (!trendBoardNumber) return;

    putTrendBoardLikeRequest(trendBoardNumber, cookies.accessToken)
		.then(putTrendBoardLikeResponse);
	};

	// 										effect										//
	useEffect(() => {
		if (!cookies.accessToken || !trendBoardNumber) return;
		patchTrendBoardIncreaseViewCountRequest(trendBoardNumber, cookies.accessToken)
			.then(increaseTrendBoardViewCountResponse);
		getTrendBoardRequest(trendBoardNumber, cookies.accessToken)
			.then(getTrendBoardResponse);
	}, [cookies.accessToken, trendBoardNumber]);

	useEffect(() => {
		if (!trendBoardNumber) {
			alert('잘못된 접근 입니다.')
			navigator(MAIN_PATH);
			return;
		}
		getTrendBoardLikeListRequest(trendBoardNumber, cookies.accessToken).then(getTrendBoardLikeListResponse);
	}, [trendBoardNumber, cookies.accessToken, loginUserId]);

	return (
		<div className="trend-detail">
			<div className="trend-detail-title">{trendBoardTitle}</div>
			<div className="trend-detail-container">
				<div className="trend-detail-information">
					<div className="trend-detail-information1">작성자: {trendBoardWriterId}</div>
					<div className="trend-detail-information2">작성일: {trendBoardWriteDatetime}</div>
					<div className="trend-detail-information3">좋아요: {trendBoardLikeCount}</div>
					<div className='trend-detail-information4'> 조회수: {trendBoardViewCount}</div>
					{loginUserId === trendBoardWriterId && (
						<>
							<div className="trend-detail-information5" onClick={onDeleteButtonClickHandler}>삭제
							</div>
							<div
								className="trend-detail-information6" onClick={onUpdateClickHandler}>
								수정
							</div>
						</>
					)}
				</div>
			</div>
			<div className="trend-detail-view">
				<div dangerouslySetInnerHTML={{ __html: trendBoardContents }} />
			</div>
			<div className='trend-detail-bottom-bar'>
				<div className='trend-detail-button-box'>
					<div className='icon-button' onClick={onLikeButtonClickHandler}>
						{isLike ? (<div className='like-fill-icon'></div>) : (<div className='like-light-icon'></div>)}
					</div>
				</div>
				<TrendBoardComment />
			</div> 
			<div className="trend-detail-go-to-trendList" onClick={handleGoToList}>
				목록으로
			</div>
		</div>
	)
}
