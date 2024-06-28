import { 
	ChangeEvent, 
	useEffect, 
	useState 
} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { usePagination } from '../../../../hooks'

import { useUserStore } from 'src/stores';

import { DesignerBoardListItem } from 'src/types';

import ResponseDto from 'src/apis/response.dto';
import { GetDesignerBoardListResponseDto, GetSearchDesignerBoardListResponseDto } from 'src/apis/designerBoard/dto/response';
import { getSearchDesignerBoardListRequest } from 'src/apis/designerBoard';

import { 
	COUNT_PER_PAGE, COUNT_PER_SECTION, 
	DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH, 
	DESIGNER_BOARD_WRITE_ABSOLUTE_PATH, 
	MAIN_PATH 
} from 'src/constant';

import './style.css';

//                          component                           //
function ListItem ({
	designerBoardNumber,
	designerBoardTitle,
	designerBoardWriterId,
	designerBoardWriteDatetime,
	designerBoardViewCount
}: DesignerBoardListItem) {

//                          function                            //
	const navigator = useNavigate();

//                          event handler                           //
	const onClickHandler = () => {
		navigator(DESIGNER_BOARD_DETAIL_ABSOLUTE_PATH(designerBoardNumber));
	};

//                          render                          //
	return (
	<div className='designerboard-list-table-tr' onClick={onClickHandler}>
		<div className='designerboard-list-table-board-number'>{designerBoardNumber}</div>
		<div className='designerboard-list-table-title'>{designerBoardTitle}</div>
		<div className='designerboard-list-table-writer-id'>{designerBoardWriterId}</div>
		<div className='designerboard-list-table-write-date'>{designerBoardWriteDatetime}</div>
		<div className='designerboard-list-table-viewcount'>{designerBoardViewCount}</div>
	</div>
	);
}

//                          component                           //
export default function DesignerList() {

//                          state                           //
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
	}  = usePagination<DesignerBoardListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION)

	const [searchWord, setSearchWord] = useState<string>('');
	const [isSearched, setIsSearched] = useState<boolean>(false);

//                          function                            //
	const navigator = useNavigate();

	const getDesignerBoardResponse = (result: GetDesignerBoardListResponseDto | ResponseDto | null) => {
	const message =
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'AF' ? '인증에 실패했습니다.' :
		result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !== 'SU') {
		alert(message);
		if (result?.code === 'AF') navigator(MAIN_PATH);
		return;
		}

		const { designerBoardList } = result as GetDesignerBoardListResponseDto;
		changeBoardList(designerBoardList);

		setCurrentPage(!designerBoardList.length ? 0 : 1);
		setCurrentSection(!designerBoardList.length ? 0 : 1);
	};

	const getSearchDesignerBoardListResponse = (result: GetSearchDesignerBoardListResponseDto | ResponseDto | null) => {
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

		const { designerBoardList } = result as GetSearchDesignerBoardListResponseDto;
		const updatedDesignerBoardList = designerBoardList.map(item => ({
			...item,
		}));
		setBoardList(updatedDesignerBoardList);
		changeBoardList(updatedDesignerBoardList);
		changePage(updatedDesignerBoardList, updatedDesignerBoardList.length);
		setCurrentPage(!updatedDesignerBoardList.length ? 0 : 1);
		setCurrentSection(!updatedDesignerBoardList.length ? 0 : 1);
	};

	const fetchDesignerBoardList = () => {
		getSearchDesignerBoardListRequest('', cookies.accessToken).then(getDesignerBoardResponse);
	};

//                          event handler                           //
	const onWriteButtonClickHandler = () => {
		navigator(DESIGNER_BOARD_WRITE_ABSOLUTE_PATH);
	};

	const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const searchWord = event.target.value;
		setSearchWord(searchWord);
		if (!searchWord) {
			setIsSearched(false);
			fetchDesignerBoardList();
		}
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
		getSearchDesignerBoardListRequest(searchWord, cookies.accessToken)
		.then(getSearchDesignerBoardListResponse);
	};

//                          effect                          //
	useEffect(() => {
		if (!cookies.accessToken) return;
		getSearchDesignerBoardListRequest('', cookies.accessToken)
		.then(getSearchDesignerBoardListResponse);
	}, [cookies.accessToken]);

	useEffect(() => {
		if (!isSearched || !cookies.accessToken) return;
		getSearchDesignerBoardListRequest(searchWord, cookies.accessToken)
		.then(getSearchDesignerBoardListResponse);
	}, [isSearched, searchWord, cookies.accessToken]);

//                          render                          //
return (
	<div className='designerboard-list-wrapper'>
		<div className='designerboard-list-search-box'>
			<div className='designerboard-list-search-keyword'>검색 키워드</div>
			<div className='designerboard-list-search-input-box'>
				<input
					className='designerboard-list-search-input'
					placeholder='검색어를 입력하세요.'
					value={searchWord}
					onChange={onSearchWordChangeHandler}
					onKeyDown={onSearchInputKeyDown}
				/>
			</div>
			<div className='designerboard-list-search-input-button' onClick={onSearchButtonClickHandler}>검색</div>
		</div>
		<div className='designerboard-list-table'>
			<div className='designerboard-table-th'>
				<div className='designerboard-list-table-board-number-top'>번호</div>
				<div className='designerboard-list-table-title-top'>제목</div>
				<div className='designerboard-list-table-writer-id-top'>작성자</div>
				<div className='designerboard-list-table-write-date-top'>작성일</div>
				<div className='designerboard-list-table-viewcount-top'>조회수</div>
			</div>
			{viewList.map(item => <ListItem {...item} />)}
		</div>
		<div className='designerboard-list-bottom'>
			<div className='designerboard-list-pagenation'>
				<div className='page-left' onClick={onPreSectionClickHandler}></div>
				<div className='designerboard-list-page-box'>
					{pageList.map(page => 
					page === currentPage ? 
					<div className='designerboard-list-page-active'>{page}</div> :
					<div className='designerboard-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
					)}
				</div>
				<div className='page-right' onClick={onNextSectionClickHandler}></div>
			</div>
			<div className='designerboard-list-write-button-container'>
			{loginUserRole === 'ROLE_DESIGNER' && (
				<div className='designerboard-list-write-button' onClick={onWriteButtonClickHandler}>글쓰기</div>
			)}
			</div>
		</div>
	</div>
	);
}