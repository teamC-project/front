import React from 'react'
import './style.css'

export default function AnnouncementWrite() {
	return (
		<div id = 'announcement-board-write-wrapper'>
				<div className='announcement-board-write-top'>
                <div className='announcement-board-write-title-box'>
                    <div className='desannouncement-boardigner-write-title'>제목</div>
                    <input className='announcement-board-write-title-input' placeholder='제목을 입력해주세요.'></input>
                </div>
            </div>
            <div className='announcement-board-write-contents-box'>
                <textarea className='announcement-board-write-contents-textarea' placeholder='내용을 입력해주세요.'></textarea>
            </div>
            <div className='write-button'>
                <button className='click-button'>
                    <span className="button_top"> 올리기 </span>
                </button>
            </div>
		</div>
	)
}
