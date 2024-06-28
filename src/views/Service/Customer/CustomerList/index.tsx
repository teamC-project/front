import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

import { CustomerBoardListItem } from 'src/types';
import { useUserStore } from 'src/stores';
import { getSearchCustomerBoardListRequest } from 'src/apis/customerBoard';
import { GetSearchCustomerBoardListResponseDto } from 'src/apis/customerBoard/dto/response';
import ResponseDto from 'src/apis/response.dto';

import { usePagination } from '../../../../hooks';
import {
    COUNT_PER_PAGE,
    COUNT_PER_SECTION,
    CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH,
    CUSTOMER_BOARD_WRITE_ABSOLUTE_PATH,
    MAIN_PATH
} from 'src/constant';

import './style.css';

//                          component                           //
function ListItem({
    customerBoardNumber,
    customerBoardTitle,
    customerBoardWriterId,
    customerBoardWriteDatetime,
    customerBoardViewCount,
    secret
}: CustomerBoardListItem) {

    const measureText = (text: string, fontSize: number, fontFamily: string): number => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
            return 0;
        }
        context.font = `${fontSize}px ${fontFamily}`;
        const metrics = context.measureText(text);
        return metrics.width;
    };

//                          function                            //
    const navigator = useNavigate();
    const { loginUserRole, loginUserId } = useUserStore();

//                          event handler                           //
    const isCustomer = loginUserRole === 'ROLE_CUSTOMER';
    const isNotAuthor = isCustomer && (loginUserId !== customerBoardWriterId);
    const isSecretPost = secret && isNotAuthor;

    const onClickHandler = () => {
        if (isSecretPost) {
            alert('비밀글입니다.');
            return;
        }
        navigator(CUSTOMER_BOARD_DETAIL_ABSOLUTE_PATH(customerBoardNumber));
    };

    const FONT_FAMILY = 'Arial, sans-serif';
    const FONT_SIZE = 16;
    const MAX_TITLE_WIDTH = 720;

    let truncatedTitle = customerBoardTitle;
    let titleWidth = measureText(truncatedTitle, FONT_SIZE, FONT_FAMILY);

    while (titleWidth > MAX_TITLE_WIDTH && truncatedTitle.length > 0) {
        truncatedTitle = truncatedTitle.slice(0, -1);
        titleWidth = measureText(truncatedTitle + '...', FONT_SIZE, FONT_FAMILY);
    }

    if (truncatedTitle.length < customerBoardTitle.length) {
        truncatedTitle += '...';
    }

    const title = isSecretPost ? '비밀글입니다' : truncatedTitle;

//                          render                          //
    return (
        <div className='customerboard-list-table-tr' onClick={onClickHandler}>
            <div className='customerboard-list-table-board-number'>{customerBoardNumber}</div>
            <div className='customerboard-list-table-title'>
                {title}
            </div>
            <div className='customerboard-list-table-writer-id'>{customerBoardWriterId}</div>
            <div className='customerboard-list-table-write-date'>{customerBoardWriteDatetime}</div>
            <div className='customerboard-list-table-viewcount'>{customerBoardViewCount}</div>
        </div>
    );
}

//                          component                           //
export default function CustomerList() {

//                          state                           //
const [isSearched, setIsSearched] = useState<boolean>(false);
const [searchWord, setSearchWord] = useState<string>('');
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const {
        setBoardList,
        viewList,
        pageList,
        currentPage,
        setCurrentPage,
        setCurrentSection,
        changeBoardList,
        changePage,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    } = usePagination<CustomerBoardListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION)

//                          function                            //
    const navigator = useNavigate();

    const getSearchCustomerBoardListResponse = (result: GetSearchCustomerBoardListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { customerBoardList } = result as GetSearchCustomerBoardListResponseDto;
        const updatedCustomerBoardList = customerBoardList.map(item => ({
            ...item,
            customerBoardViewCount: item.customerBoardViewCount || 0,
        }));
        setBoardList(updatedCustomerBoardList);
        changeBoardList(updatedCustomerBoardList);
        changePage(updatedCustomerBoardList, updatedCustomerBoardList.length);
        setCurrentPage(!updatedCustomerBoardList.length ? 0 : 1);
        setCurrentSection(!updatedCustomerBoardList.length ? 0 : 1);
        setIsSearched(false);
    };

//                          event handler                           //
    const onWriteButtonClickHandler = () => {
        navigator(CUSTOMER_BOARD_WRITE_ABSOLUTE_PATH);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        handleSearch();
    };

    const onSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (!searchWord) {
            alert('검색어를 입력하세요.');
            return;
        }

        if (!cookies.accessToken) return;

        setIsSearched(true);
        getSearchCustomerBoardListRequest(searchWord, cookies.accessToken)
            .then(getSearchCustomerBoardListResponse);
    };
    useEffect(() => {
        if (!isSearched || !cookies.accessToken) return;

        getSearchCustomerBoardListRequest(searchWord, cookies.accessToken)
            .then(getSearchCustomerBoardListResponse);
    }, [isSearched, searchWord, cookies.accessToken]);

//                          effect                          //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getSearchCustomerBoardListRequest('', cookies.accessToken)
            .then(getSearchCustomerBoardListResponse);
    }, [cookies.accessToken]);

//                          render                          //
    return (
        <div className='customerboard-list-wrapper'>
            <div className='customerboard-list-search-box'>
                <div className='customerboard-list-search-keyword'>검색 키워드</div>
                <div className='customerboard-list-search-input-box'>
                    <input
                        className='customerboard-list-search-input'
                        placeholder='검색어를 입력하세요.'
                        value={searchWord}
                        onChange={onSearchWordChangeHandler}
                        onKeyDown={onSearchInputKeyDown}
                    />
                </div>
                <div className='customerboard-list-search-input-button' onClick={onSearchButtonClickHandler}>
                    검색
                </div>
            </div>
            <div className='customerboard-list-table'>
                <div className='customerboard-table-th'>
                    <div className='customerboard-list-table-board-number-top'>번호</div>
                    <div className='customerboard-list-table-title-top'>제목</div>
                    <div className='customerboard-list-table-writer-id-top'>작성자</div>
                    <div className='customerboard-list-table-write-date-top'>작성일</div>
                    <div className='customerboard-list-table-viewcount-top'>조회수</div>
                </div>
                {viewList.map(item => <ListItem {...item} />)}
            </div>
            <div className='customerboard-list-bottom'>
                <div className='customerboard-list-pagenation'>
                    <div className='page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='customerboard-list-page-box'>
                        {pageList.map(page =>
                            page === currentPage ?
                                <div className='customerboard-list-page-active'>{page}</div> :
                                <div className='customerboard-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                        )}
                    </div>
                    <div className='page-right' onClick={onNextSectionClickHandler}></div>
                </div>
                <div className='customerboard-list-write-button-container'>
                    {loginUserRole === 'ROLE_CUSTOMER' && (
                        <div className='customerboard-list-write-button' onClick={onWriteButtonClickHandler}>
                            글쓰기
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}