import React from 'react';
import './styles.css';

interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    views: number;
}

const App: React.FC = () => {
    const posts: Post[] = [
        { id: 1, title: '첫번째 게시글입니다.', author: '작성자1', date: '2023-05-22', views: 10 },
        { id: 2, title: '두번째 게시글입니다.', author: '작성자2', date: '2023-05-21', views: 25 },
        { id: 3, title: '세번째 게시글입니다.', author: '작성자3', date: '2023-05-20', views: 15 },
    ];

    return (
        <div className="container">
            <div className="sidebar">
                <ul>
                    <li>공지사항</li>
                    <li>트렌드 계시판</li>
                    <li className="active">소통 플랫폼</li>
                    <li>디자이너계시판</li>
                    <li>Q&amp;A계시판</li>
                </ul>
            </div>
            <div className="content">
                <h2>소통 플랫폼</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.date}</td>
                                <td>{post.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">&gt;</a>
                    <a href="#">&gt;&gt;</a>
                </div>
            </div>
        </div>
    );
}

export default App;