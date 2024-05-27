import React, { useRef, useState } from 'react';
import "./style.css";

export default function CustomerWrite() {
    const [isSecret, setIsSecret] = useState(false);
    const handleSecretChange = () => {
        setIsSecret(!isSecret);
    };
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
            <button onClick={handleImageUpload}>파일 선택</button>
        <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
        />
            </div>
            <div className='primary-button'>올리기</div>
        </div>
    );
}
