import { useEffect, useState } from "react";

import { COUNT_PER_PAGE, COUNT_PER_SECTION } from "src/constant";

const usePagination = <T>(countPerPage : number , countPerSection : number) => {
    const [boardList, setBoardList] = useState<T[]>([]);
    const [viewList, setViewList] = useState<T[]>([]);
    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const changePage = (boardList: T[], totalLength: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * countPerPage;
        let endIndex = currentPage * countPerPage;
        if (endIndex > totalLength - 1) endIndex = totalLength;
        const viewList = boardList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if (!currentSection) return;
        const startPage = (currentSection * countPerSection) - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * countPerSection;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };

    const changeBoardList = (boardList: T[], isToggleOn?: boolean) => {
        if (isToggleOn) boardList = boardList.filter((board: any) => {
            if ('status' in board) return !board.status;
            return false;
        });

        setBoardList(boardList);

        const totalLength = boardList.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(boardList, totalLength);

        changeSection(totalPage);
    };

    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
        changePage(boardList, totalLength);
    };

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

        
    useEffect(() => {
        if (!boardList.length) return;
        changePage(boardList, totalLength);
    }, [currentPage]);

    useEffect(() => {
        if (!boardList.length) return;
        changeSection(totalPage);
    }, [currentSection]);

        

    return {
        viewList,
        pageList,
        currentPage,
        boardList,
        setBoardList,
        setCurrentPage,
        setCurrentSection,

        changeBoardList,
            
        changePage,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    }
}
export default usePagination