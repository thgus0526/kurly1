import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Sub7NoticeComponentChildList ({공지사항, 공지카운트, n}) {

    const selector = useSelector((state)=>state);
    console.log( selector );

    const navigate= useNavigate();

    const [state, setState] = React.useState({
        공지카운트: 0
    });
    

    const onClickInsert=(e)=>{
        e.preventDefault();
        navigate('/sub7Insert');
    }

    const onClickList=(e, item)=>{
        navigate('/sub7View', {state: item});
    }


    return (
        <div className="right">
            <div className="right-header">
                <h2>공지사항</h2>
                <h3>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</h3>
            </div>                            
            <div className="right-list">

                <div className="list-header">
                    <ul className='column-box'>
                        <li className='col1'><span>번호</span></li>
                        <li className='col2'><span>제목</span></li>
                        <li className='col3'><span>작성자</span></li>
                        <li className='col4'><span>작성일</span></li>
                    </ul>                                   
                </div>

                <ul className='list-data'>

                    {
                        공지사항.length > 0 && (
                            공지사항.map((item, idx)=>{
                                return(
                                    <li key={item.번호} onClick={(e)=>onClickList(e, item)}>
                                        <ul className='column-box'>
                                            <li className='col1'><span>{item.타입==='공지'?item.타입:n-idx}</span></li>
                                            <li className='col2'><span>{item.제목}</span></li>
                                            <li className='col3'><span>{item.작성자}</span></li>
                                            <li className='col4'><span>{`${new Date(item.작성일).getFullYear()}.${new Date(item.작성일).getMonth()+1}.${new Date(item.작성일).getDate()}`}</span></li>
                                        </ul>  
                                    </li>
                                )
                            })
                            
                        )
                    }   
                                                        
                </ul>
            </div>
        {
            selector.signIn.로그인정보!==null && ( // 로그인 한 경우
                selector.signIn.로그인정보.회원등급==='관리자' && (
                <div className="button-box">
                    <button onClick={onClickInsert}>글쓰기</button>
                </div>
                )
            )
        }

        </div>
    );
};