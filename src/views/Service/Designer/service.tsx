import React from 'react';
import './service.css'; 



const Designer = () => {
    return (
        <div>
            <div className="tb_area">
            <h2 className="blind">게시물 리스트</h2>
            <table className="board list center">
                <caption>전체 게시물 제목, 등록일, 조회 리스트</caption>
                <colgroup>
                <col style={{ width: '100px' }} />
                <col style={{ width: '900px' }} />
                <col style={{ width: '120px' }} />
                <col style={{ width: '140px' }} />
                </colgroup>
                <thead>
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">등록일</th>
                    <th scope="col">조회</th>
                </tr>
                </thead>
            </table>
            </div>
        </div>
    );
};

export default Designer;
