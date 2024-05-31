import React from 'react'
import'./style.css'
import '../../../../App.css'
import { TrendBoardListItem } from 'src/types'
import { useNavigate } from 'react-router'
import { TREND_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant'
//														component														//
function ListItem ({
		trendBoardNumber,
		trendBoardTitle,
		trendBoardWriterId,
		trendBoardWriteDatetime,
		trendBoardLikeCount
} : TrendBoardListItem) {
	// 										function 										//
	const navigator =  useNavigate();

	// 										event handler										// 
}
export default function TrendList() {
	return (
		<div id='trend-board-wrapper'>
			<div className="trend-board-list-top-bar">
				<input className='search-input' placeholder='제목을 입력하세요.'/>
				<div className='search-button'>검색</div>
			</div>
			<div className="trend-board-list-container">
				<div className='trend-board-list'>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
				</div>
				<div className='trend-board-list'>
				<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
					<div className='trend-board-card'>
						<div className='trend-board-image'></div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>트렌드 게시판 게시물 제목</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
							<div className = 'trend-board-card-datetime'>2024.05.23</div>
							<div className='trend-board-comment-count'>25</div>
						</div>
					</div>
				</div>
			</div>
			<div className='trend-board-list-bottom-bar'>
				<div className='board-pagenation'></div>
			</div>
		</div>
	)
}
