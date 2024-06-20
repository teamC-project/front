import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import "./style.css";
import  { Editor } from '@toast-ui/react-editor';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH, DESIGNER_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import ToastEditor from 'src/components/ToastEditor';
import { getDesignerBoardRequest, putDesignerBoardRequest } from 'src/apis/designerBoard';
import { GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import { PutDesignerBoardRequestDto } from 'src/apis/designerBoard/dto/request';

export default function DesignerUpdate() {

    //              state               //
    const editorRef= useRef<Editor | null> (null);
    const {loginUserRole} = useUserStore();
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigator = useNavigate();
    const { designerBoardNumber } = useParams();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [cookies] = useCookies();
    const [urlList, setUrlList] = useState<{base64: string; url : string}[]>([]);

    useEffect(() => {
        if (!cookies.accessToken || !designerBoardNumber) return;
        getDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
            .then(getDesignerBoardResponse);
    }, [cookies.accessToken, designerBoardNumber]);

<<<<<<< HEAD
   //              event handler               //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title);
    };
=======
    //              event handler               //
    const getDesignerBoardResponse = (result: GetDesignerBoardResponseDto | ResponseDto | null) => {
        if (result && result.code === 'SU') {
            const { designerBoardTitle, designerBoardContents} = result as GetDesignerBoardResponseDto;
>>>>>>> 2f14c96a79b4bc419e4ed93ef8e2d73b4f37e794

            setTitle(designerBoardTitle);
            setContents(designerBoardContents);
        }
    };
    
    const onTitleChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const title = event.target.value;
      setTitle(title);
    }

    const onContentsChangeHandler = (designerBoardContents: string ) => {
      setContents(designerBoardContents);
    }

    const onImageChangeHandler = (imageList: {base64: string; url: string}[]) => {
      setUrlList(imageList);
    }


    const onUpdateButtonClickHandler = () => {
      if (!cookies.accessToken || !designerBoardNumber) return;
        
      const requestBody: PutDesignerBoardRequestDto = {
        designerBoardTitle: title.trim(), // 제목에서 공백 제거
        designerBoardContents: contents.trim(), // 내용에서 공백 제거
      };

      const isBlank = requestBody.designerBoardContents.replaceAll('<p><br></p>', '');

      // 제목과 내용이 모두 비어있는 경우 처리
      if (!requestBody.designerBoardTitle && !requestBody.designerBoardContents && !isBlank) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }
      // 제목만 비어있는 경우 처리
      else if (!requestBody.designerBoardTitle) {
          alert("제목을 입력해주세요.");
          return;
      }
      // 내용만 비어있는 경우 처리
      else if (!requestBody.designerBoardContents || !isBlank) {
          alert("내용을 입력해주세요.");
          return;
      }
  
      putDesignerBoardRequest(designerBoardNumber, requestBody, cookies.accessToken)
          .then(putDesignerBoardResponse);
            
    };
    
    const putDesignerBoardResponse = (result: ResponseDto | null) => {
        // ... (응답 처리 로직) ...
        if (result && result.code === 'SU') {
            navigator(DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH(designerBoardNumber!));
        }
    };
    


    
    
    //                    render                    //
    return (
        <div id='designer-update-wrapper'>
          <div className='designer-update-top'>
              <div className='designer-update-title-box'>
                  <div className='designer-update-title'>제목</div>
                  <input
                      className='designer-update-title-input'
                      placeholder='제목을 입력해주세요.'
                      value={title}
                      onChange={onTitleChangeHandler}
                  />
              </div>
          </div>
          <div className='designer-update-contents-box'>
          <ToastEditor 
			    ref={editorRef} body={contents} setBody={onContentsChangeHandler} imageList={urlList} setImageList={onImageChangeHandler} />
          </div>
          <div className='designer-update-button'>
            <button className='designer-write-click-button' onClick={onUpdateButtonClickHandler}>
              수정
            </button>
          </div>
        </div>
    );
}