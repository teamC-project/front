import React from 'react'

import './style.css'
import '../../../../App.css'
import ToolBar from '../../../../components/ToolBar'


// 											component										 //
export default function TrendWrite() {

//										 render										 //
	return (
		<div id='trend_board_write_wrapper'>
			<div className='trend_board_write_top_bar'>
				<input className='trend_board_write_title' placeholder='제목을 입력해주세요' />
				<div className='search_button'>썸네일 이미지 선택</div>
			</div>
			<div className='trend_board_textarea_container'>
			<ToolBar />
			</div>
			<div className='trend_board_write_footer'>
				<div className='trend_board_button_container'>
				<div className='search_button'>올리기</div>
				<div className='search_button'>취소</div>
				</div>
			</div>
		</div>
	)
}


