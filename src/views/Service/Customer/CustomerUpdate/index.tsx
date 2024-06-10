import React, { useRef, useState, useEffect } from 'react';
import "./style.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { getCustomerBoardRequest, putCustomerBoardRequest } from 'src/apis/customerBoard';
import { GetCustomerBoardResponseDto } from 'src/apis/customerBoard/dto/response';
import { PutCustomerBoardRequestDto } from 'src/apis/customerBoard/dto/request';

export default function CustomerUpdate() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isSecret, setIsSecret] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    const { customerBoardNumber } = useParams();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [cookies] = useCookies();

    useEffect(() => {
        if (!cookies.accessToken || !customerBoardNumber) return;
        getCustomerBoardRequest(customerBoardNumber, cookies.accessToken)
            .then(getCustomerBoardResponse);
    }, [cookies.accessToken, customerBoardNumber]);

    //              event handler               //
    const getCustomerBoardResponse = (result: GetCustomerBoardResponseDto | ResponseDto | null) => {
        // ... (응답 처리 로직) ...
        if (result && result.code === 'SU') {
            const { customerBoardTitle, customerBoardContents } = result as GetCustomerBoardResponseDto;
            setTitle(customerBoardTitle);
            setContents(customerBoardContents);
        }
    };
    
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
        if (!cookies.accessToken || !customerBoardNumber) return;
    
        const requestBody: PutCustomerBoardRequestDto = {
            customerBoardTitle: title,
            customerBoardContents: contents,
            isSecret: isSecret
        };
    
        putCustomerBoardRequest(customerBoardNumber, requestBody, cookies.accessToken)
            .then((result: ResponseDto | null) => {
                if (result && result.code === 'SU') {
                    navigate(CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH(customerBoardNumber!));
            }
            });
            
    };
    
    const putCustomerBoardResponse = (result: ResponseDto | null) => {
        // ... (응답 처리 로직) ...
        if (result && result.code === 'SU') {
            navigate(CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH(customerBoardNumber!));
        }
    };

    const handleConfirmNo = () => {
        setShowConfirmation(false);
    };

    


    
    
    //                    render                    //
    return (
        <div id='customer-update-wrapper'>
            <div className='customer-update-top'>
                <div className='customer-update-title-box'>
                    <div className='customer-update-title'>제목</div>
                    <input
                        className='customer-update-title-input'
                        placeholder='제목을 입력해주세요.'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className='customer-update-secret'>
                        <label>
                            <input
                                type='checkbox'
                                checked={isSecret}
                                onChange={handleSecretChange}
                            />
                            <span className='customer-update-secret-text'>비밀글</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='customer-update-contents-box'>
            <textarea
                className='customer-update-contents-textarea'
                placeholder='내용을 입력해주세요.'
                value={contents}
                onChange={(e) => setContents(e.target.value)}
            />
            </div>
            <div className='customer-update-upload-file'>첨부 파일
                <div className='customer-update-upload-file-button' onClick={onUploadFileClickHandler}>파일 첨부하기</div>
            </div>
            <div className='customer-update-button'>
                <button className='customer-update-click-button' onClick={handleUpdate}>
                    <span className="customer-update-button_top"> 수정 </span>
                </button>
            </div>
            {showConfirmation && (
                <div className="customer-update-confirmation-modal">
                    <div className="customer-update-confirmation-modal-content">
                        <p>정말 수정하시겠습니까?</p>
                        <div className="customer-update-confirmation-modal-buttons">
                            <button onClick={handleConfirmYes}>Yes</button>
                            <button onClick={handleConfirmNo}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}