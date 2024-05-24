import React, { useEffect, useRef } from 'react'
import ToastEditor from 'src/components/ToastEditor'
import './style.css'


// 											component										 //
export default function TrendBoard({  }) {





//										 render										 //
	return (
		<div id='trend_board_write_wrapper'>
			<div className='trend_board_write_tooltip'>
				
				<div className='trend_board_write_submit_button'></div>
				<div className='trend_board_write_cancel_button'></div>
			</div>
			<div className='trend_board_write_top_bar'>
				<input className='trend_board_write_title' placeholder='제목을 입력해주세요' />
				<div className='trend_board_thumbnail_image_select_button'></div>
			</div>
			<div className='trend_board_textarea_container'>
			<ToastEditor body={''} setBody={function (body: string): void { } } imageHandler={function (blob: File, callback: FunctionConstructor): void {
				} } />
			</div>
		</div>
	)
}


