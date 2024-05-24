import React from 'react'
import './style.css'
import '../../../../App.css'
export default function QnaWrite() {
	return (
		<div id="qna_board_write_wrapper">
			<div className='qna_board_write_top'>
				<div className='qna_board_write_title_box'>
					<div className='qna_write_title'></div>
					<input 
					className='qna_write_title_input'
					placeholder='제목을 입력해주세요.'
					/>
				</div>
			</div>
			<div className='qna_board_write_contents_box'>
				<textarea 
				className='qna_board_write_contents_textarea' 
				placeholder='내용을 입력해주세요'
				/>
			</div>
			<div className='write_button'>
				<button className='click-button'>
					<span className='button_top'>올리기</span>
				</button>	 
			</div>
		</div>
	)
}
