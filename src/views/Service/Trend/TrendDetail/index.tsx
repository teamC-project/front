import React from 'react'
import './style.css'
import '../../../../App.css'
import TrendBoardComment from '../TrendBoardComment'

export default function TrendDetail() {
	return (
		<div id='trend-board-detail-wrapper'>
			<div className='trend-board-detail-top-bar'>
				<div className='trend-board-detail-top-bar-left-container'>
					<div className='trend-board-detail-title'>게시물 제목</div>
					<div className='trend-board-detail-datetime'>작성일자</div>
					<div className='trend-board-detail-writer-id'>작성자 아이디</div>
				</div>
				<div className='trend-board-detail-top-bar-right-container'>
					<div className='search-button'>수정</div>
					<div className='search-button'>삭제</div>
				</div>
			</div>
			<div className='trend-board-detail-contents-container'>
				<div className='trend-board-detail-contents'>게시물</div>
			</div>
			<div className='trend-board-detail-middle-container'>
				<div className='trend-board-detail-middle-item'>댓글(댓글 수)</div>
				<div className='trend-board-detail-middle-item'>쪼아요</div>
			</div>

			<div className='trend-board-detail-comment-container'>
				<TrendBoardComment />
			</div>
		</div>
	)
}
