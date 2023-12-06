import React from 'react';
import './scss/sub.scss';
import Title from './SubComponent/Title';
import Submenu from './SubComponent/Submenu';
import ProductList from './SubComponent/ProductList';
import axios from 'axios';
import {useLocation} from 'react-router-dom';


export default function Sub2Component() {

    const location = useLocation();

    const [state, setState] = React.useState({
        타이틀: {
            이미지:'',
            텍스트:''
        },
        서브메뉴: {
            카테고리: [],
            브랜드: {
                가나다순: [],
                상품많은순: []
            },
            가격: [],
            혜택: [],
            유형: [],
            특정상품제외: []
        },
        상품: [],
        필터: [],
        필터삭제: [],
        이미지경로: ''
    });

    // 필터 저장 메서드
    // 서브메뉴에서 체크이벤트로 필터값 가져와서
    // 상태관리 변수 필터에 저장하는 메서드
    const filterSetterMethod=(필터)=>{
        setState({
            ...state,
            필터: 필터
        })
    }

    // 필터 삭제 메서드 => 수정내용 적용
    const filterDeleteMethod=(삭제데이터)=>{
        let 필터 = state.필터;
        let result = 필터.filter((item)=>item!==삭제데이터);
        setState({
            ...state,
            필터: result,
            필터삭제: [...state.필터삭제, 삭제데이터]
        })
        if(result.length<=0){
            sessionStorage.removeItem('KURLY_SUB2_FILTER_ITEM');
        }
    }

    // 필터 변경시 리액트 유즈이펙트 구현
    React.useEffect(()=>{
        // 세션스토레이지에 저장
        if(state.필터삭제.length > 0){ // 배열에 길이(length)를 세어야하는데
            sessionStorage.setItem('KURLY_SUB2_FILTER_DELETE_ITEM', JSON.stringify(state.필터삭제));    
        }        
    },[state.필터삭제]);

    // 필터 변경시 리액트 유즈이펙트 구현
    React.useEffect(()=>{
        // 세션스토레이지에 저장
        if(state.필터.length > 0){ // 배열에 길이(length)를 세어야하는데
            sessionStorage.setItem('KURLY_SUB2_FILTER_ITEM', JSON.stringify(state.필터));    
        }        
    },[state.필터]);




    // REST API 구현 
    // 외부데이터 가져오기
    React.useEffect(()=>{
        let fileName = location.pathname.split('/')[1];  // /sub2

        axios({
            url:`./data/sub/${fileName}.json`,
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                // 세션스토레이지 저장소 데이터 가져오기 
                
                let result = [];
                if(sessionStorage.getItem('KURLY_SUB2_FILTER_ITEM')!==null){
                   result = JSON.parse(sessionStorage.getItem('KURLY_SUB2_FILTER_ITEM'));
                }
                
                setState({
                    ...state,
                    타이틀: {
                        이미지: res.data.타이틀.이미지,
                        텍스트: res.data.타이틀.텍스트
                    },
                    서브메뉴: {
                        카테고리: res.data.서브메뉴.카테고리,
                        브랜드: {
                            가나다순: res.data.서브메뉴.브랜드.가나다순,
                            상품많은순: res.data.서브메뉴.브랜드.상품많은순
                        },
                        가격: res.data.서브메뉴.가격,
                        혜택: res.data.서브메뉴.혜택,
                        유형: res.data.서브메뉴.유형,
                        특정상품제외: res.data.서브메뉴.특정상품제외
                    },
                    상품: res.data.상품,
                    필터: result,
                    이미지경로: fileName
                });
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]);

    return (
        <main id='sub1' className='sub'>
            <section id="section1">
                <div className="container">


                    <Title 타이틀={state.타이틀} />


                    <div className="content">

                        <div className="left">
                            <div className="gap">
                                
                                <div className="header">
                                    <h3>필터</h3>
                                    <span>
                                        <img src="./images/sub/sub1/icon_reflash.svg" alt="" />
                                        <em>초기화</em>
                                    </span>
                                </div>


                                <Submenu  필터={state.필터}  filterSetterMethod={filterSetterMethod} 서브메뉴={state.서브메뉴} />



                            </div>
                        </div>

                        <div className="right">
                            <div className="header">
                                <h3>총 {254}건</h3>
                                <span>
                                    <a href="!#"><em>추천순</em><img src="./images/sub/sub1/icon_question.svg" alt="" /></a>
                                    <a href="!#" className='on'>신상품순</a>
                                    <a href="!#">판매량순</a>
                                    <a href="!#">혜택순</a>
                                    <a href="!#">낮은가격순</a>
                                    <a href="!#">높은가격순</a>
                                </span>
                            </div>

                            <ProductList filterDeleteMethod={filterDeleteMethod} 필터={state.필터} 상품={state.상품} 이미지경로={state.이미지경로} />

                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};
