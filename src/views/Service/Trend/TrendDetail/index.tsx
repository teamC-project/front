import React from 'react'
import './style.css'
import '../../../../App.css'

export default function TrendDetail() {
	return (
		<div id='trend_board_detail_wrapper'>
			<div className='trend_board_detail_top_bar'>
				<div className='trend_board_detail_top_bar_left_container'>
					<div className='trend_board_detail_title'>게시물 제목</div>
					<div className='trend_board_detail_datetime'>작성일자</div>
					<div className='trend_board_detail_writer_id'>작성자 아이디</div>
				</div>
				<div className='trend_board_detail_top_bar_right_container'>
					<div className='search_button'>수정</div>
					<div className='search_button'>삭제</div>
				</div>
			</div>
			<div className='trend_board_detail_contents_container'>
				<div className='trend_board_detail_contents'>게시물</div>
			</div>
			<div className='trend_board_detail_middle_container'>
				<div className='trend_board_detail_middle_item'>댓글(댓글 수)</div>
				<div className='trend_board_detail_middle_item'>쪼아요</div>
			</div>

			<div className='trend_board_detail_comment_container'>
				<div className='trend_board_detail_comment'></div>
			</div>
		</div>
	)
}
