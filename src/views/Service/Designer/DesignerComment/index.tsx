import  { 
    ChangeEvent, 
    useEffect, 
    useState 
} from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';

import { useCreateChatRoom } from 'src/hooks/useCreateChatRoom';

import { useUserStore } from 'src/stores';

import { DesignerBoardCommentListItem } from 'src/types';

import ResponseDto from 'src/apis/response.dto';
import { GetDesignerBoardCommentListResponseDto } from 'src/apis/designerBoard/dto/response';
import { PostDesignerBoardCommentRequestDto, PutDesignerBoardCommentRequestDto } from 'src/apis/designerBoard/dto/request';

import { 
    deleteDesignerBoardCommentRequest,
    getDesignerBoardCommentsByBoardNumberRequest,
    postDesignerBoardCommentRequest, 
    putDesignerBoardCommentRequest 
} from 'src/apis/designerBoard';

import './style.css';

//                          component                           //
export default function DesignerBoardComment() {

//                          state                           //
    const { loginUserRole, loginUserId } = useUserStore();

    const { designerIdClickHandler } = useCreateChatRoom();

    const { designerBoardNumber } = useParams();

    const [cookies] = useCookies();

    const [comment, setComment] = useState<string>('');
    const [commentRows, setCommentRows] = useState<number>(1);
    const [replyCommentParentNumber] = useState<number | null>(null);
    const [designerBoardCommentList, setDesignerBoardCommentList] = useState<DesignerBoardCommentListItem[]>([]);

//                          function                            //
    const postDesignerBoardCommentResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!designerBoardNumber || !cookies.accessToken) return;
        setComment('');

        getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then((result) => {
            if (result && 'designerBoardCommentList' in result) {
                setDesignerBoardCommentList(result.designerBoardCommentList);
            }
        });
    };

    const getDesignerBoardCommentsByBoardNumberResponse = (result: ResponseDto | GetDesignerBoardCommentListResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

    const { designerBoardCommentList } = result as GetDesignerBoardCommentListResponseDto;
    setDesignerBoardCommentList(designerBoardCommentList);
    };

//                          event handler                           //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER' && loginUserRole !== 'ROLE_ADMIN') return;
        const comment = event.target.value;
        setComment(comment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);
    };

    const onPostButtonClickHandler = () => {
        if (!comment.trim()) return;
        if (!designerBoardNumber || (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER' && loginUserRole !== 'ROLE_ADMIN') || !cookies.accessToken) return;

        const requestBody: PostDesignerBoardCommentRequestDto = {
            designerBoardCommentContents: comment,
            designerBoardParentCommentNumber: replyCommentParentNumber ?? undefined
    };

        postDesignerBoardCommentRequest(Number(designerBoardNumber), requestBody, cookies.accessToken)
            .then(postDesignerBoardCommentResponse);
    };

//                          component                           //
    function CommentItem(props: DesignerBoardCommentListItem) {

//                          state                           //
    const { 
        designerBoardCommentNumber, designerBoardCommentWriterId, 
        designerBoardCommentContents, designerBoardCommentWriteDatetime 
    } = props;

    const [replyOpen, setReplyOpen] = useState<boolean>(false);
    const [updateOpen, setUpdateOpen] = useState<boolean>(false);
    const [replyCommentContent, setReplyCommentContent] = useState<string>('');
    const [updateCommentContent, setUpdateCommentContent] = useState<string>('');

//                          function                            //
    const deleteDesignerBoardCommentResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '삭제되었습니다.';

        alert(message);
        if (result?.code === 'SU' && designerBoardNumber) {
            getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then(getDesignerBoardCommentsByBoardNumberResponse);
        }
    };

    const putDesignerBoardCommentResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '모든 값을 입력해 주세요.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!designerBoardNumber) return;
        setUpdateCommentContent('');
        setUpdateOpen(false);
        getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then(getDesignerBoardCommentsByBoardNumberResponse);
    };

//                          event handler                           //
    const onCommentUpdateOpenHandler = () => {
        setUpdateOpen(!updateOpen);
        setUpdateCommentContent(designerBoardCommentContents);
    };

    const onCommentReplyOpenHandler = () => {
        setReplyOpen(!replyOpen);
        setReplyCommentContent('');
    };

    const onUpdateCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setUpdateCommentContent(value);
    };

    const onDeleteButtonClickHandler = () => {
        if (!designerBoardCommentNumber || !cookies.accessToken) return;
        if (designerBoardCommentWriterId !== loginUserId && loginUserRole !== 'ROLE_ADMIN') {
            alert('작성자 또는 관리자만 삭제할 수 있습니다.');
            return;
        }

        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;
        deleteDesignerBoardCommentRequest(designerBoardCommentNumber, cookies.accessToken).then(deleteDesignerBoardCommentResponse)
    };

    const onUpdateButtonClickHandler = () => {
        if (!updateCommentContent.trim() || !cookies.accessToken) return;
        const requestBody: PutDesignerBoardCommentRequestDto = {
            designerBoardCommentContents: updateCommentContent,
            designerBoardCommentNumber: designerBoardCommentNumber
        };

        putDesignerBoardCommentRequest(designerBoardCommentNumber, requestBody, cookies.accessToken).then(putDesignerBoardCommentResponse);
    };
    
    const onReplyCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setReplyCommentContent(value);
    };

    const onReplyPostButtonClickHandler = () => {
        if (!replyCommentContent.trim()) return;
        if (!designerBoardNumber || (loginUserRole !== 'ROLE_CUSTOMER' && loginUserRole !== 'ROLE_DESIGNER') || !cookies.accessToken) return;
	
        const requestBody: PostDesignerBoardCommentRequestDto = {
            designerBoardCommentContents: replyCommentContent,
            designerBoardParentCommentNumber: designerBoardCommentNumber
        };
	
        postDesignerBoardCommentRequest(Number(designerBoardNumber), requestBody, cookies.accessToken)
            .then(postDesignerBoardCommentResponse);
    };

//                          render                          //
    return (
    <div className='designer-board-comment'>
        <div key={designerBoardCommentNumber} className='designer-board-comment-container'>
            <div className='designer-board-comment-header'>
                <div className='designer-board-comment-author' onClick={() => designerIdClickHandler(designerBoardCommentWriterId)}>작성자: {designerBoardCommentWriterId}</div>
                {(designerBoardCommentWriterId === loginUserId || loginUserRole === 'ROLE_ADMIN') && (
                <div className='designer-board-comment-actions'>
                    {designerBoardCommentWriterId === loginUserId && <button onClick={onCommentUpdateOpenHandler}>수정</button>}
                    <button onClick={onDeleteButtonClickHandler}>삭제</button>
                </div>
                )}
            </div>
            {updateOpen ? (
            <div className='designer-board-comment-update'>
                <textarea
                    className='designer-board-comment-update-contents-textarea'
                    value={updateCommentContent}
                    onChange={onUpdateCommentChangeHandler}
                />
                <button onClick={onUpdateButtonClickHandler}>수정 완료</button>
            </div>
            ) :
            <div className='designer-board-comment-contents'>
            {designerBoardCommentContents}
            </div>
            }
            <div className='designer-board-comment-footer'>
                <div className='designer-board-comment-date'>{designerBoardCommentWriteDatetime}</div>
                <button className='designer-board-comment-reply-button' onClick={onCommentReplyOpenHandler}>대댓글</button>
            </div>
        </div>
        {replyOpen && 
        <div className="designer-board-comment-reply-write">
            <textarea
                className="designer-board-comment-reply-textarea"
                value={replyCommentContent}
                onChange={onReplyCommentChangeHandler}
                placeholder="대댓글을 입력하세요"
            />
            <button onClick={onReplyPostButtonClickHandler}>작성</button>
        </div>
        }
        <div className="designer-board-comment-reply-container">
            {designerBoardCommentList.filter(item => item.designerBoardParentCommentNumber === designerBoardCommentNumber)
            .reverse().map(item => <CommentItem {...item} />)}
        </div>
    </div>
    );
}

//                          effect                          //
useEffect(() => {
    if (!cookies.accessToken || designerBoardNumber === undefined) return;
    getDesignerBoardCommentsByBoardNumberRequest(designerBoardNumber, cookies.accessToken).then(getDesignerBoardCommentsByBoardNumberResponse);
}, [designerBoardNumber, cookies.accessToken]);

//                          render                          //
return (
    <div id='designer-board-comment-wrapper'>
        <div className='designer-board-comment-inner'>
            <div className='designer-board-comment-head'>
                <h5>댓글</h5>
                <span className='designer-board-comment-count'>{designerBoardCommentList.length}</span>
            </div>
            <div className='designer-board-comment-write-box'>
                <div className="designer-board-comment-post">
                    <div className="designer-board-comment-write-contents-box">
                        <textarea
                            className='designer-board-comment-write-contents-textarea'
                            style={{ height: `${28 * commentRows}px` }}
                            value={comment}
                            onChange={onCommentChangeHandler}
                            placeholder="댓글을 입력하세요"
                        />
                        <button className='designer-board-comment-primary-button' onClick={onPostButtonClickHandler}>작성</button>
                    </div>
                </div>
            </div>
            <div className="designer-board-comment-section">
                <div className="designer-board-comment-list">
                {designerBoardCommentList.filter(item => !item.designerBoardParentCommentNumber).map(firstComment =>
                <CommentItem {...firstComment} />
                )}
                </div>
            </div>
        </div>
    </div>
    );
}