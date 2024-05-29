import React from 'react'
import './style.css'
import '../../../../App.css'
export default function QnaWrite() {
	return (
		<div id="qna-board-write-wrapper">
			<div className='qna-board-write-top'>
				<div className='qna-board-write-title-box'>
					<div className='qna-write-title'></div>
					<input 
					className='qna-write-title-input'
					placeholder='제목을 입력해주세요.'
					/>
				</div>
			</div>
			<div className='qna-board-write-contents-box'>
				<textarea 
				className='qna-board-write-contents-textarea' 
				placeholder='내용을 입력해주세요'
				/>
			</div>
			<div className='write-button'>
				<button className='click-button'>
					<span className='button-top'>올리기</span>
				</button>	 
			</div>
		</div>
	)
}
