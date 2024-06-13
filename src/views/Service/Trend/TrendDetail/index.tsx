import React, { useState } from 'react'
import './style.css'
import '../../../../App.css'
import TrendBoardComment from '../TrendBoardComment'
import { useUserStore } from 'src/stores'
import { useNavigate, useParams } from 'react-router'
import { useCookies } from 'react-cookie'
import { TrendBoardCommentListItem } from 'src/types'
import ResponseDto from 'src/apis/response.dto'
import { MAIN_PATH, TREND_BOARD_LIST_ABSOLUTE_PATH, TREND_BOARD_UPDATE_ABSOLUTE_PATH } from 'src/constant'
import { deleteTrendBoardRequest, getTrendBoardRequest } from 'src/apis/TrendBoard'
import { GetTrendBoardResponseDto } from 'src/apis/TrendBoard/dto/response'

//															component															//
export default function TrendDetail() {
	//										state										//
	const {loginUserId, loginUserRole} = useUserStore();
	const {trendBoardNumber} = useParams();
	const [cookies] = useCookies();
	const [viewList, setViewList] = useState<TrendBoardCommentListItem[]>([]);

	const [title, setTitle]  = useState<string>('');
	const [writerId, setWriterId] =  useState<string>('');
	const [writeDatetime, setWriteDatetime] = useState<string>('');
	const [likeCount, setLikeCount] = useState<string>('');
	const [contents, setContents] = useState<string>('');
	const [comment, setComment] = useState<string | null>(null);

	//										function										//
	const navigator = useNavigate();
	const increaseLikeCountResponse = (result : ResponseDto | null) => {
		const message = 
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'VF' ? '잘못된 게시물 입니다.' :
		result.code === 'AF' ? '인증에 실패했습니다.':
		result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
		result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !=='SU') {
			alert(message);
			if(result?.code ==='AF') {
				navigator(MAIN_PATH);
				return
			}
			navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
			return;
		}

		if(!cookies.accessToken || !trendBoardNumber) return;
		getTrendBoardRequest(trendBoardNumber, cookies.accessToken)
		.then(getTrendBoardResponse);
	}

	const getTrendBoardResponse = (result : GetTrendBoardResponseDto | ResponseDto | null) => {
		const message = 
		!result  ?' 서버에 문제가 있습니다.' :
		result.code === 'VF' ? '잘못된 게시물 입니다.':
		result.code === 'AF' ? '인증에 실패 했습니다.' :
		result.code === 'NB' ? '존재하지 않는 게시물 입니다.' :
		result.code = 'DBE' ? '서버에 문제가 있습니다' : '';

		if(!result || result.code !== 'SU') {
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
			trendBoardWriterId,
			trendBoardContents,
			trendBoardWriteDatetime,
			trendBoardLikeCount,
			trendBoardComment,
		} = result as GetTrendBoardResponseDto;

		setTitle(trendBoardTitle);
		setWriterId(trendBoardWriterId);
		setWriteDatetime(trendBoardWriteDatetime);
		setLikeCount(trendBoardLikeCount);
		setContents(trendBoardContents);
		setComment(trendBoardComment);
	}

	const postTrendBoardCommentResponse = (result : ResponseDto | null) => {
		const message =
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'AF' ? '권한이 없습니다.' :
		result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' :
		result.code ==='NB' ? '존재하지 않는 게시물 입니다.' :
		result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

		if(!result || result.code !=='SU') {
			alert(message);
			return;
		}

		if(!trendBoardNumber || !cookies.accessToken) return;
		getTrendBoardRequest(trendBoardNumber, cookies.accessToken) 
		.then(getTrendBoardResponse);
	}

	const deleteTrendBoardResponse = (result : ResponseDto | null) => {
		const message = 
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'AF' ? '권한이 없습니다.' :
		result.code === 'VF' ? '올바르지 않은 게시물 번호 입니다.' :
		result.code === 'NB' ? '존재하지 않는 게시물 입니다.' : 
		result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if(!result || result.code !== 'SU') {
			alert(message);
			return;
		}

		navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
	}

	//											event handler											//
	const handleGoToList = () => {
		navigator(TREND_BOARD_LIST_ABSOLUTE_PATH);
	}

	const onUpdateClickHandler = () => {
		if(!trendBoardNumber || loginUserId !== writerId) return;
		navigator(TREND_BOARD_UPDATE_ABSOLUTE_PATH(trendBoardNumber));
	}

	const onDeleteButtonClickHandler = () => {
		if(!trendBoardNumber || loginUserId !== writerId || !cookies.accessToken)
			return;
		const isConfirm = window.confirm('정말로 삭제 하시겠습니까?');
		if(!isConfirm) return;

		deleteTrendBoardRequest(trendBoardNumber, cookies.accessToken)
		.then(deleteTrendBoardResponse);
	}
	return (
		<div className="trend-detail">
		<div className="trend-detail-title">{title}</div>
		<div className="trend-detail-container">
				<div className="trend-detail-information">
						<div className="trend-detail-information1">작성자: {writerId}</div>
						<div className="trend-detail-information2">작성일: {writeDatetime}</div>
						<div className="trend-detail-information3">조회수: {likeCount}</div>
						{loginUserId === writerId && (
						<>
								<div className="trend-detail-information4" onClick={onDeleteButtonClickHandler}>삭제</div>
								<div className="trend-detail-information5" onClick={onUpdateClickHandler}>
								수정
								</div>
						</>
						)}
				</div>
		</div>
		<div className="trend-detail-view">
				{/* 내용 표시 */}
				{contents}
		</div>
		<TrendBoardComment />
		<div className="trend-detail-go-to-trendList" onClick={handleGoToList}>
				목록으로
		</div>
</div>
	)
}
