import React, { ChangeEvent, useEffect, useState } from 'react'
import'./style.css'
import '../../../../App.css'
import { TrendBoardListItem } from 'src/types'
import { useNavigate } from 'react-router'
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, TREND_BOARD_DETAIL_ABSOLUTE_PATH, TREND_BOARD_WRITE_ABSOLUTE_PATH,  } from 'src/constant'
import { useUserStore } from 'src/stores'
import { useCookies } from 'react-cookie'
import { GetSearchTrendBoardListResponseDto, GetTrendBoardListResponseDto } from 'src/apis/TrendBoard/dto/response'
import ResponseDto from 'src/apis/response.dto'
import { getSearchTrendBoardListRequest } from 'src/apis/TrendBoard'
//														component														//
function  CardItem ({
		trendBoardNumber,
		trendBoardTitle,
		trendBoardWriterId,
		trendBoardWriteDatetime,
		trendBoardLikeCount,
		trendBoardThumbNailImage
} : TrendBoardListItem) {
	// 										function 										//
	const navigator =  useNavigate();

	// 										event handler										// 

	const onClickHandler =  () => navigator(TREND_BOARD_DETAIL_ABSOLUTE_PATH(trendBoardNumber))

	//										render										/./
	return (
		<div className='trend-board-card'>
						<div className='trend-board-image'>{trendBoardThumbNailImage}</div>
						<div className='trend-board-title-box'>
						<div className='trend-board-title'>{trendBoardTitle}</div>
						</div>
						<div className='trend-board-card-bottom-bar'>
						<div className='trend-board-card-writerid'>{trendBoardWriterId}</div>
							<div className = 'trend-board-card-datetime'>{trendBoardWriteDatetime}</div>
							<div className='trend-board-comment-count'>{trendBoardLikeCount}</div>
						</div>
					</div>
	)
}

// 															component 															//
export default function TrendList() {

	// 												state  												//

	const {loginUserRole} = useUserStore();
	const [cookies] = useCookies();
	const [trendBoardList, setTrendBoardList] = useState<TrendBoardListItem[]>([])
	const [viewList, setViewList] = useState<TrendBoardListItem[]>([]);
	const [totalLength, setTotalLength ] = useState<number>(0);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageList, setPageList] = useState<number[]>([1]);
	const [totalSection, setTotalSection] = useState<number>(1);
	const [currentSection, setCurrentSection] = useState<number>(1);
	const [isToggleOn, setToggleOn] = useState<boolean>(false);
	const [searchWord, setSearchWord] = useState<string>('');

	// 										function										// 
	const navigator = useNavigate();

	const changePage = (trendBoardList: TrendBoardListItem[], totalLength : number) => {
		if (!currentPage) return ;
		const startIndex = (currentPage -1 ) * COUNT_PER_PAGE;
		let endIndex = currentPage * COUNT_PER_PAGE;
		if(endIndex < totalLength - 1) endIndex = totalLength;
		const viewList = trendBoardList.slice(startIndex, endIndex);
		setViewList(viewList);
	} 

	const changeSection = (totalPage : number) => {
		if (!currentSection) return;
		const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION -1);
		let endPage = currentSection * COUNT_PER_SECTION;
		if (endPage > totalPage) endPage = totalPage;
		const pageList : number[] = [];
		for (let page = startPage; page <= endPage; page++) pageList.push(page);
		setPageList(pageList);
	}

	const changeTrendBoardList = (trendBoardList : TrendBoardListItem[]) => {
		const totalLength = trendBoardList.length;
		setTotalLength(totalLength)

		const totalPage = (Math.floor(totalLength - 1) / COUNT_PER_PAGE) + 1;
		setTotalPage(totalSection);

		changePage(trendBoardList, totalLength);

		changeSection(totalPage);
	};

	const getTrendBoardResponse = (result : GetTrendBoardListResponseDto | ResponseDto | null) => {
		const message = 
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'AF' ? '인증에 실패했습니다.' :
		result.code ==='DBE' ? '서버에 문제가 있습니다.' : '';

		if(!result || result.code !== 'SU') {
			alert(message);
			if(result?.code ==='AF') navigator(MAIN_PATH);
			return;
		}

		const { trendBoardList } = result as GetTrendBoardListResponseDto;
		changeTrendBoardList(trendBoardList);

		setCurrentPage(!trendBoardList.length ? 0 : 1);
		setCurrentSection(!trendBoardList.length ? 0 : 1);
	}

	const getSearchTrendBoardListResponse =  (result : GetSearchTrendBoardListResponseDto | ResponseDto | null) => {
		const message  =
		!result ? '서버에 문제가 있습니다.' :
		result.code === 'VF' ? '검색어를 입력하세요.' :
		result.code === 'AF' ? '인증에 실패했습니다.' :
		result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !== 'SU' ) {
			alert(message);
			if (result?.code === 'AF') navigator(MAIN_PATH);
			return;
		}

		const {trendBoardList} = result as GetSearchTrendBoardListResponseDto;
		changeTrendBoardList(trendBoardList);

		setCurrentPage(!trendBoardList.length ? 0 : 1);
		setCurrentSection(!trendBoardList.length ? 0 : 1);
	}

	//										event handler										//
	const onWriteButtonClickHandler = () => {
		if (loginUserRole !== 'ROLE_ADMIN') return;
		navigator(TREND_BOARD_WRITE_ABSOLUTE_PATH);
	};

	const onPageClickHandler = (page : number) => {
		setCurrentPage(page);
	}

	const onPreSectionClickHandler = () => {
		if (currentSection <= 1) return;
		setCurrentSection(currentSection -1 );
		setCurrentPage((currentSection - 1)* COUNT_PER_SECTION);
	}

	const onNextSectionClickHandler = () => {
		if (currentSection === totalSection) return;
		setCurrentSection(currentSection + 1);
		setCurrentPage(currentSection * COUNT_PER_SECTION + 1); 
	}

	const onSearchWordChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
		const searchWord = event.target.value;
		setSearchWord(searchWord);
	}

	const onSearchButtonClickHandler = () => {
		if(!searchWord) return;
		if(!cookies.accessToken) return ;
		getSearchTrendBoardListRequest(searchWord, cookies.accessToken)
		.then(getSearchTrendBoardListResponse)
	}

	//										effect										// 

	useEffect(() => {
		if(!trendBoardList.length) return ;
		changePage(trendBoardList, totalLength);
	},[currentPage]);

useEffect(() => {
	if(!trendBoardList.length) return;
	changeSection(totalPage);

}, [currentSection]);

useEffect(() => {
	if (!cookies.accessToken) return;
	getSearchTrendBoardListRequest(searchWord, cookies.accessToken).then
	(getSearchTrendBoardListResponse)
})

	  //                    render                    //
		const searchButtonClass  = searchWord ? 'primary-button' : 'disable-button'
	return (
		<div id='trend-board-wrapper'>
			<div className="trend-board-list-top-bar">
				<input 
				className='trend-board-search-input' 
				placeholder='제목을 입력하세요.'
				value={searchWord} 
				onChange={onSearchWordChangeHandler}
				/>
				<div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
			</div>
			<div className="trend-board-list-container">
				<div className='trend-board-list'>
			{viewList.map(item => <CardItem {...item} />)}
				</div>

			</div>
			<div className='trend-board-list-bottom-bar'>
				<div className='board-pagenation'></div>
			</div>
		</div>
	)
}
