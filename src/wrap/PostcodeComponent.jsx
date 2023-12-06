import React from 'react';
import PostCode from 'react-daum-postcode';
import './scss/PostcodeComponent.scss';
import { useDispatch } from 'react-redux';
import { address } from '../reducer/address';
import { isAddress } from '../reducer/isAddress';

export default function PostcodeComponent () {
 
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        주소1:'',
        주소2:'',
        isAddrAPIShow: true,
        isMoreview: false
    });

    // 나머지 주소 입력
    const onChangeAddress=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }





    const onCompletePostCode=(data)=>{
        let 주소1 = '';
        let 엑스트라주소 ='';
        let extraAddr = '';
      

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            엑스트라주소 = extraAddr;

        } else {
            엑스트라주소 = '';
        }


        if(data.userSelectedType==='R'){
            주소1 = `(${data.zonecode}) ${data.roadAddress} ${엑스트라주소}`;
        }
        else{
            주소1 = `(${data.zonecode}) ${data.jibunAddress}`;
        }


        setState({
            ...state,
            주소1: 주소1
        });
        
    }

    // 재검색 : 비동기식 방식
    const onClickReSearch=(e)=>{
        e.preventDefault();
        dispatch(isAddress(false));
            setTimeout(()=>{
                dispatch(isAddress(true));
            },100);      
    }

    // 닫기  클릭 이벤트
    const onClickClose=(e)=>{
        e.preventDefault();
        
        dispatch(isAddress(false));
    }


    // 주소1, 주소2, 최상위 랩퍼컴포넌트의 
    // 1. 리덕스 상태 관리 변수에 저장하기 dispatch()
    // 2. 주소검색창 닫기 구현

    // 3. 저장소(세션저장소)에 저장하기 sessionStorage()
    const onClickSave=(e)=>{
        e.preventDefault();

        const addr = {
            주소1: state.주소1,
            주소2: state.주소2
        }
        sessionStorage.setItem('KURLY_ADDRESS_KEY', JSON.stringify(addr));
      
        dispatch(address(addr));
        dispatch(isAddress(false));
        
    }

    
    const postCodeStyle={
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: "#fff"
    }
    return (
        <div id='postCode'>
            <div className="container">
                <div className="window-title">
                    <h1>
                        <img src="./images/intro/favicon-192x192.png" alt="" />
                        <em>컬리 - 마켓컬리/뷰티컬리-Chrome</em>
                    </h1>
                    <button onClick={onClickClose} title='닫기'>
                        <i className="material-icons">close</i>
                    </button>
                </div>
                <div className="content">
                    {
                        state.isAddrAPIShow && (
                            <PostCode 
                                style={postCodeStyle} 
                                onComplete={onCompletePostCode}
                            />
                        )

                    }
                    <div className="address-box">
                        <div className="title">
                            <h1><strong>샛별배송</strong><span> 지역입니다.</span></h1>
                            <h2>매일 새벽, 문 앞까지 신선함을 전해드려요.</h2>
                        </div>
                        <ul className='list-box'>                            
                            <li>
                                <div className="gap row1">
                                    <input 
                                        type="text" 
                                        name='address1' 
                                        id='address1'  
                                        value={state.주소1}
                                        disabled={true}
                                    />
                                    <button  onClick={onClickReSearch}>
                                        <img src="./images/sub/sub5/ico_search.svg" alt="" />
                                        <span>재검색</span>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className="gap row2">
                                    <input 
                                        type="text" 
                                        name='address2' 
                                        id='address2'  
                                        onChange={onChangeAddress}
                                        value={state.주소2}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="gap row3">
                                   <p>
                                        ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.<br/>
                                        로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                                   </p>
                                </div>
                            </li>
                            <li>
                                <div className="gap row4">
                                    <button onClick={onClickSave}>저장</button>
                                </div>
                            </li>
                            <li>
                                <div className="gap row5">
                                    <img src="./images/sub/sub5/icon_info.svg" alt="" />
                                    <span>샛별배송 지역 중 배송불가 장소 안내</span>
                                </div>
                            </li>
                            <li>
                                <div className="gap row6">                                    
                                    <span>관공서 / 학교 / 병원 / 시장 / 공단지역 / 산간지역 / 백화점 등</span>
                                    <button>
                                        <em>자세히 보기</em>
                                        <img src="./images/sub/sub5/icon_arrow_down_11x10.svg" alt="" />
                                    </button>
                                    {
                                        state.isMoreview && (
                                            <div className="more-view">
                                                <ul class="css-lu7l5g ep04gzj0">
                                                    <li>가락동농수산물도매시장</li>
                                                    <li>가락동농수산물시장</li>
                                                    <li>가천대학교</li>
                                                    <li>고려대학교안암캠퍼스</li>
                                                    <li>고매동 일부(일부지역만 배송가능)</li>
                                                    <li>국립중앙박물관</li>
                                                    <li>국민대학교</li>
                                                    <li>덕성여자대학교</li>
                                                    <li>덕양구 신원동 일부(일부지역만 배송가능)</li>
                                                    <li>도내동 일부(원흥지구만 배송가능)</li>
                                                    <li>동덕여자대학교</li>
                                                    <li>반월특수지구</li>
                                                    <li>서경대학교</li>
                                                    <li>서울사이버대학교</li>
                                                    <li>서울시립대학교</li>
                                                    <li>서울여자대학교</li>
                                                    <li>성균관대학교</li>
                                                    <li>성신여자대학교</li>
                                                    <li>세종대학교</li>
                                                    <li>연세대학교</li>
                                                    <li>이화여자대학교</li>
                                                    <li>한국외국어대학교</li>
                                                    <li>홍익대학교</li>
                                                </ul>                                    
                                            </div>
                                        )
                                    }
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
