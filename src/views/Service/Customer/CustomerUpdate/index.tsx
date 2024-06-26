import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import "./style.css";
import  { Editor } from '@toast-ui/react-editor';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import ToastEditor from 'src/components/ToastEditor';
import { getCustomerBoardRequest, putCustomerBoardRequest } from 'src/apis/customerBoard';
import { GetCustomerBoardResponseDto } from 'src/apis/customerBoard/dto/response';
import { PutCustomerBoardRequestDto } from 'src/apis/customerBoard/dto/request';

export default function CustomerUpdate() {

//              state               //
    const editorRef= useRef<Editor | null> (null);
    const [isSecret, setIsSecret] = useState<boolean>(false);
    const navigator = useNavigate();
    const { customerBoardNumber } = useParams();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [cookies] = useCookies();
    const [urlList, setUrlList] = useState<{base64: string; url : string}[]>([]);

//              event handler               //
    const getCustomerBoardResponse = (result: GetCustomerBoardResponseDto | ResponseDto | null) => {
        if (result && result.code === 'SU') {
            const { customerBoardTitle, customerBoardContents, isSecret } = result as GetCustomerBoardResponseDto;
            setTitle(customerBoardTitle);
            setContents(customerBoardContents);
            setIsSecret(isSecret);
        }
    };
    
    const onTitleChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setTitle(title);
    }

    const onContentsChangeHandler = (customerBoardContents: string ) => {
    setContents(customerBoardContents);
    }

    const onImageChangeHandler = (imageList: {base64: string; url: string}[]) => {
    setUrlList(imageList);
    }

    const handleSecretChange = () => {
        setIsSecret((prevSecret) => !prevSecret);
    };

    const onUpdateButtonClickHandler = () => {
    if (!cookies.accessToken || !customerBoardNumber) return;
    const requestBody: PutCustomerBoardRequestDto = {
        customerBoardTitle: title.trim(), 
        customerBoardContents: contents.trim(), 
        secret: isSecret
		};
    const isBlank = requestBody.customerBoardContents.replaceAll('<p><br></p>', '');

    if (!requestBody.customerBoardTitle && !requestBody.customerBoardContents && !isBlank) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
		}
		else if (!requestBody.customerBoardTitle) {
			alert("제목을 입력해주세요.");
			return;
		}
		else if (!requestBody.customerBoardContents || !isBlank) {
			alert("내용을 입력해주세요.");
			return;
		}
	
		putCustomerBoardRequest(customerBoardNumber, requestBody, cookies.accessToken)
			.then(putCustomerBoardResponse);
            
    };
    
    const putCustomerBoardResponse = (result: ResponseDto | null) => {
        // ... (응답 처리 로직) ...
        if (result && result.code === 'SU') {
            navigator(CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH(customerBoardNumber!));
        }
    };
    

// 					effect 					//
    useEffect(() => {
        if (!cookies.accessToken || !customerBoardNumber) return;
        getCustomerBoardRequest(customerBoardNumber, cookies.accessToken)
            .then(getCustomerBoardResponse);
    }, [cookies.accessToken, customerBoardNumber]);

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
						onChange={onTitleChangeHandler}
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
			<ToastEditor 
					ref={editorRef} body={contents} setBody={onContentsChangeHandler} imageList={urlList} setImageList={onImageChangeHandler} />
			</div>
			<div className='customer-update-button'>
				<button className='customer-write-click-button' onClick={onUpdateButtonClickHandler}>
				수정
				</button>
			</div>
<<<<<<< HEAD
=======
=======
          <div className='customer-update-top'>
              <div className='customer-update-title-box'>
                  <div className='customer-update-title'>제목</div>
                  <input
                      className='customer-update-title-input'
                      placeholder='제목을 입력해주세요.'
                      value={title}
                      onChange={onTitleChangeHandler}
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
          <ToastEditor 
			    ref={editorRef} body={contents} setBody={onContentsChangeHandler} imageList={urlList} setImageList={onImageChangeHandler} />
          </div>
            <button className='primary-button' onClick={onUpdateButtonClickHandler}>
              수정
            </button>
>>>>>>> b47faff2b8da2ae31b9ddd52c38843039dd19d03
>>>>>>> 21c815e1cf3ca05329fc7282f8adf435db3c2d47
        </div>
    );
}