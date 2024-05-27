import React, { useRef, useState } from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';

export default function CustomerUpdate() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isSecret, setIsSecret] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    //              event handler               //
    const onUploadFileClickHandler = () => {
        // 파일 업로드 로직 추가
    };
    const handleSecretChange = () => {
        setIsSecret(!isSecret);
    };

    const handleUpdate = () => {
        setShowConfirmation(true);
    };


    const handleConfirmYes = () => {
        // 수정된 내용 적용 로직 추가
        navigate('/service/customer_board/1');
    };

    const handleConfirmNo = () => {
        setShowConfirmation(false);
    };

    
    
    //                    render                    //
    return (
        <div id='customer-write-wrapper'>
            <div className='customer-write-top'>
                <div className='customer-write-title-box'>
                    <div className='customer-write-title'>제목</div>
                    <input className='customer-write-title-input' placeholder='제목을 입력해주세요.'></input>
                    <div className='customer-write-secret'>
                        <label>
                            <input
                                type='checkbox'
                                checked={isSecret}
                                onChange={handleSecretChange}
                            />
                            <span>비밀글</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='customer-write-contents-box'>
                <textarea className='customer-write-contents-textarea' placeholder='내용을 입력해주세요.'></textarea>
            </div>
            <div className='upload-file'>첨부 파일
                <div className='upload-file-button' onClick={onUploadFileClickHandler}>파일 첨부하기</div>
            </div>
            <div className='write-button'>
                <button className='click-button' onClick={handleUpdate}>
                    <span className="button_top"> 수정 </span>
                </button>
            </div>
            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="confirmation-modal-content">
                        <p>정말 수정하시겠습니까?</p>
                        <div className="confirmation-modal-buttons">
                            <button onClick={handleConfirmYes}>Yes</button>
                            <button onClick={handleConfirmNo}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}