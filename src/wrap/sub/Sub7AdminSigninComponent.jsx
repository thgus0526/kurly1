import React from 'react';
import './scss/sub6.scss';
import './scss/sub7_myadmin.scss';
import { useNavigate, useLocation, Link }  from  'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../reducer/signIn';
import { address } from '../../reducer/address';

export default function Sub6SignInComponent() {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    // 상태관리
    const [state, setState] = React.useState({
        아이디: '',
        비밀번호:'',
        로그인정보: {}
    });

    // 아이디 입력상자
    const onChangeId=(e)=>{
        setState({
            ...state,
            아이디: e.target.value
        });
    }
    
    // 비밀번호 입력상자
    const onChangePw=(e)=>{
        setState({
            ...state,
            비밀번호: e.target.value
        });
    }

    // REST API : 로그인 구현
    const onSubmitSigin=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('adminId', state.아이디);
        formData.append('adminPw', state.비밀번호);

        axios({
            url: 'http://ab60704.dothome.co.kr/kurly/green_kurly_admin_sigin.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status===200){
                if(res.data!==''){

                    // 로그인 시작 3일간 로그인 유지하기
                    let toDay = new Date();
                    toDay.setDate(toDay.getDate() + 3);
                    // 상태관리 저장
                    const 로그인정보 = {
                        회원등급: '관리자',
                        아이디: res.data.아이디,
                        이름: res.data.이름,
                        주소: res.data.주소
                    }
                    
                    // 만료일까지 영구 보관
                    localStorage.setItem('KURLY_SIGNIN_INFORMATION', JSON.stringify(로그인정보));
                    
                    // 리덕스 상태관리 저장
                    dispatch(signIn(로그인정보));
                    navigate('/index');
                }
            }
        
        })
        .catch((err)=>{
            console.log( "AXIOS 실패!" );
            console.log( err );
        });


    }

    const onClickIdSearch=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminIdSearch');
    }
    const onClickPwSearch=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminPwSearch');
    }

    // 관리자 회원 가입 폼으로 이동
    const onClickSignup=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminSignup');
    }

    return (
        <main id='sub6' className='sub7-myadmin'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text">MyAdmin</h2>
                        <h3 className="title-text">로그인</h3>
                    </div>
                    
                    <div className="content sub6-content">
                       <form onSubmit={onSubmitSigin} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="text" 
                                            name='userId' 
                                            id='userId'
                                            onChange={onChangeId} 
                                            value={state.아이디}
                                            style={{backgroundColor:'#fcfcfc'}}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="password" 
                                            name='userPw' 
                                            id='userPw'
                                            onChange={onChangePw}
                                            value={state.비밀번호}
                                            style={{backgroundColor:'#fcfcfc'}}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <span>
                                            <a href="!#" onClick={onClickIdSearch}>아이디 찾기</a>
                                            <i>|</i>
                                            <a href="!#" onClick={onClickPwSearch}>비밀번호 찾기</a>
                                        </span>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="submit" 
                                            name='submitBtn' 
                                            id='submitBtn' 
                                            value={'로그인'}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="button" 
                                            name='signupBtn' 
                                            id='signupBtn' 
                                            value={'회원가입'} 
                                            onClick={onClickSignup} 
                                        />
                                    </div>
                                </li>
                            </ul>
                       </form>
                    </div>
                </div>
            </section>
        </main>
    );
};
