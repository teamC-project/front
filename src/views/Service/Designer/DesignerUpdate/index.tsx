import { 
    ChangeEvent, 
    useRef, 
    useState, 
    useEffect 
} from 'react';
import { useCookies } from 'react-cookie';
import  { Editor } from '@toast-ui/react-editor';
import { useNavigate, useParams } from 'react-router-dom';

import ToastEditor from 'src/components/ToastEditor';

import ResponseDto from 'src/apis/response.dto';
import { DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH, } from 'src/constant';

import { getDesignerBoardRequest, putDesignerBoardRequest } from 'src/apis/designerBoard';
import { GetDesignerBoardResponseDto } from 'src/apis/designerBoard/dto/response';
import { PutDesignerBoardRequestDto } from 'src/apis/designerBoard/dto/request';

import "./style.css";

//                          component                           //
export default function DesignerUpdate() {

//                          state                           //
    const { designerBoardNumber } = useParams();

    const [cookies] = useCookies();

    const editorRef= useRef<Editor | null> (null);

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [urlList, setUrlList] = useState<{base64: string; url : string}[]>([]);

//                          function                            //
    const navigator = useNavigate();

//                          event handler                           //
    const getDesignerBoardResponse = (result: GetDesignerBoardResponseDto | ResponseDto | null) => {
        if (result && result.code === 'SU') {
            const { designerBoardTitle, designerBoardContents} = result as GetDesignerBoardResponseDto;

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

        putDesignerBoardRequest(designerBoardNumber, requestBody, cookies.accessToken)
            .then(putDesignerBoardResponse);
    };

    const putDesignerBoardResponse = (result: ResponseDto | null) => {
        if (result && result.code === 'SU') {
            navigator(DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH(designerBoardNumber!));
        }
    };

//                          effect                          //
    useEffect(() => {
        if (!cookies.accessToken || !designerBoardNumber) return;
        getDesignerBoardRequest(designerBoardNumber, cookies.accessToken)
            .then(getDesignerBoardResponse);
    }, [cookies.accessToken, designerBoardNumber]);

//                          render                          //
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
                    ref={editorRef} 
                    body={contents} 
                    setBody={onContentsChangeHandler} 
                    imageList={urlList} 
                    setImageList={onImageChangeHandler} 
                />
            </div>
            <div className='designer-update-button'>
                <button className='designer-write-click-button' onClick={onUpdateButtonClickHandler}>수정</button>
            </div>
        </div>
    );
}