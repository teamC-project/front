import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import "./style.css";
import { useNavigate, useParams } from 'react-router';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PutDesignerBoardRequestDto } from 'src/apis/designerBoard/dto/request';
import { getDesignerBoardRequest, putDesignerBoardRequest } from 'src/apis/designerBoard';

//                  component                   //
export default function DesignerUpdate() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selection, setSelection] = useState<Range | null>(null);
    const { loginUserId, loginUserRole } = useUserStore();
    const { designerBoardNumber } = useParams();
    const [cookies] = useCookies();
    const [writerId, setWriterId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');

    //              function               //
    const navigator = useNavigate();

    const getDesignerBoardResponse = (result: GetDesignerBoardResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
                result.code === 'AF' ? '인증에 실패 했습니다.' :
                result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
        if  (!result || result.code !== 'SU') {
            alert(message);
            navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
    
        const { designerBoardWriterId, designerBoardTitle, designerBoardContents } = result as GetDesignerBoardResponseDto;
        setTitle(designerBoardTitle);
        setContents(designerBoardContents);
        setWriterId(designerBoardWriterId);
    };

    const putDesignerBoardResponse = (result: ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '모든 값을 입력해 주세요.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!designerBoardNumber) return;
        navigator(DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH(designerBoardNumber));

    };

    const restoreSelection = () => {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        if (selection) {
            sel?.addRange(selection);
        }

    };

    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            setSelection(sel.getRangeAt(0));
        }

    };

   //              event handler               //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title);
    };

    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const contents = event.target.value;
        if (contents.length > 1000) return;
        setContents(contents);

        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };

    const onUpdateButtonClickHandler = () => {
        if (!cookies.accessToken || !designerBoardNumber) return;
        if (!title.trim() || !contents.trim()) return;

        const requestBody: PutDesignerBoardRequestDto = { designerBoardTitle: title, designerBoardContents: contents };
        putDesignerBoardRequest(designerBoardNumber, requestBody, cookies.accessToken).then(putDesignerBoardResponse);
    };

    const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target?.result as string;
            
            restoreSelection();
            if (selection) {
                selection.deleteContents();
                selection.insertNode(img);
            }
            saveSelection();
            };
            reader.readAsDataURL(file);
        }
    };

    //             effect               //
    let effectFlag = false;
    useEffect(() => {
        if (!designerBoardNumber || !cookies.accessToken || !loginUserRole) return;
        if (effectFlag) return;
        effectFlag = true;
        getDesignerBoardRequest(designerBoardNumber, cookies.accessToken).then(result => {
            if (loginUserRole !== 'ROLE_DESIGNER') {
                alert('권한이 없습니다.');
                navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
                return;
            }
            getDesignerBoardResponse(result);
        });
    }, [designerBoardNumber, cookies.accessToken, loginUserRole]);

    //                    render                    //
    return (
        <div id='designer-write-wrapper'>
            <div className='designer-write-top'>
                <div className='designer-write-title-box'>
                    <div className='designer-write-title'>제목</div>
                    <input className='designer-write-title-input' placeholder='제목을 입력해주세요.' value={title} onChange={onTitleChangeHandler}></input>
                </div>
            </div>
            <div className='designer-write-contents-box'>
                <textarea ref={contentsRef} className='designer-write-contents-textarea' placeholder='내용을 입력해주세요. / 1000자' maxLength={1000} value={contents} onChange={onContentsChangeHandler}></textarea>
            </div>
            <div className='upload-file'>첨부 파일
            <button onClick={handleImageUpload}>파일 선택</button>
        <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
        />
            </div>
            <div className='primary-button' onClick={onUpdateButtonClickHandler}>수정</div>
        </div>
    );
}
