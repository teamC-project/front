import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import "./style.css";
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PostDesignerBoardRequestDto } from 'src/apis/designerBoard/dto/request';
import { postDesignerBoardRequest } from 'src/apis/designerBoard';
import ToastEditor from 'src/components/ToastEditor';
import { Editor } from '@toast-ui/react-editor';

//              component               //
export default function DesignerWrite() {

    //              state               //
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selection, setSelection] = useState<Range | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const editorRef = useRef<Editor|null>(null);
    const [urlList, setUrlList] = useState<{ base64: string; url: string }[]>([]);

    //              function               //
    const navigator = useNavigate();

    const postDesignerBoardResponse =(result: ResponseDto | null) => {

        const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
    };

    //              event handler               //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title);
    };

    const onContentsChangeHandler = (contents: string ) => {
			setContents(contents);
		}

    
    const onImageChangeHandler = (imageList: {base64: string; url: string}[]) => {
			setUrlList(imageList);
		}

    const onPostButtonClickHandler = () => {
        if (!cookies.accessToken) return;
    
        const requestBody: PostDesignerBoardRequestDto = { 
            designerBoardTitle: title.trim(),
            designerBoardContents: contents.trim(), 
            
        };

        const isBlank = requestBody.designerBoardContents.replaceAll('<p><br></p>', '');


        if (!requestBody.designerBoardTitle && !requestBody.designerBoardContents && !isBlank) {
			alert("제목과 내용을 모두 입력해주세요.");
			return;
        }

		else if (!requestBody.designerBoardTitle) {
			alert("제목을 입력해주세요.");
			return;
		}

		else if (!requestBody.designerBoardContents || !isBlank) {
			alert("내용을 입력해주세요.");
			return;
		}

        postDesignerBoardRequest(requestBody, cookies.accessToken)
            .then(postDesignerBoardResponse);
    };

    //             effect               //
    useEffect(() => {
        if (!loginUserRole) return;
        if (loginUserRole !== 'ROLE_DESIGNER') {
            navigator(DESIGNER_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
    }, [loginUserRole]);

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
            <ToastEditor
				ref={editorRef}
				body={contents}
				setBody={onContentsChangeHandler}
				imageList={urlList}
				setImageList={onImageChangeHandler}
            />
			</div>
			<div className='designer-write-button'>
            <button className='designer-write-click-button' onClick={onPostButtonClickHandler}>
                올리기
            </button>
			</div>
        </div>
    );
}