import React from 'react'
import './style.css';
import '../../../../App.css';

export default function TrendBoardComment() {
	return (
		<div id = 'trend-board-comment-wrapper'>
			        <div className="trend-board-comment-write-box">
          <div className="trend-board-comment-textarea-box">
            <textarea
              className="trend-board-comment-textarea"
              placeholder="답글을 작성해주세요."
            />
          </div>
					<div className='trend-board-comment-button-box'>
          <div className="trend-board-comment-button" >
					답글 달기
          </div>
				<div className="trend-board-comment-button" >
          목록보기
        </div>
				</div>
				</div>
		</div>
	)
}
