import React, { useRef } from 'react';
import "./style.css";

export default function DesignerUpdate() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    //              event handler               //
    const onUploadFileClickHandler = () => {

    };

    const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    //                    render                    //
    return (
        <div id='designer-write-wrapper'>
            <div className='designer-write-top'>
                <div className='designer-write-title-box'>
                    <div className='designer-write-title'>제목</div>
                    <input className='designer-write-title-input' placeholder='제목을 입력해주세요.'></input>
                </div>
            </div>
            <div className='designer-write-contents-box'>
                <textarea className='designer-write-contents-textarea' placeholder='내용을 입력해주세요.'></textarea>
            </div>
            <div className='upload-file'>첨부 파일
            <button onClick={handleImageUpload}>파일 선택</button>
        <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
        />
            </div>
            <div className='primary-button'>수정</div>
        </div>
    );
}
