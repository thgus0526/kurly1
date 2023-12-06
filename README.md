# kurly1

## 깃허브 배포

1. 리파지토리 생성 
    - kurly
2. Settings
    - Pages 클릭 > GitHub Pages > Build and deployment(Branch) > None 선택 > master 선택 > 배포주소.io > save

3. pakage.json
   - "homepage": "https://myusername.github.io/my-app"

   - "homepage": "https://thgus0526.github.io/kurly1"



4. 깃설정
   - git init
5. 깃 환경(config)설정(name , email)
   - git config user.name 'thgus0526'
   - git config user.email 'sssaa123@naver.com'
6. 리모트 오리진 추가
   - git remote add origin https://github.com/thgus0526/kurly.git

7. 스테이징(add)
    - git add .
8. commit
    - git commit -m 'kurly 프로젝트 배포'
9. push
    - git push origin master
10. Deployment

    ### GitHub Pages
``````
    Step 1: Add homepage to package.json
    - "homepage": "https://thgus0526.github.io/kurly"

    Step 2: Install gh-pages and add deploy to scripts in package.json
    - npm install gh-pages
    - package.json에 속성 추가하기

    * 브랜치 배포
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build",
```````````````````````````````

    * 마스터배포
    -package.json scripts 에 속성 추가

        "predeploy": "npm run build",
        "deploy": "gh-pages -b master -d build"
    - 저장한다
``````````````````````````````````        

    Step 3: Deploy the site by running npm run deploy
    - build 한다
    - npm run deploy
    '
    '
    '
    -Published (배포완료)


`````````````


11. 깃허브
    -새로고침
    -- Pages 클릭 > GitHub Pages > Build and deployment(Branch) > None 선택 > master 선택 > 배포주소.io > save

12. 버그 
    * 새로고침 
     - 404에러
     - HashRouter로 수정

    * https=> cols 에러 웹서버에 접근 제한
     - 닷홈에 http ssl 인증서를 발급받아야함
        a. 유료 도메인을 구입한다.
        b. 유료 웹호스팅으로 변경
        c. ssl 인증서 무료 발급 받기
        * 그리고 2~3일 대기
        * 닷홈 도메인 정보 >  ssl 연결 도메인 > 닷홈 ssl 인증서 사용중 확인









# 리덕스 
## 리듀서 코딩
```javascript
    import { createSlice } from "@reduxjs/toolkit";

    const initState = {
        주소: ''
    }
    const addressReducer = createSlice({
        name:'address',
        initialState: initState,
        reducers: {
            address: (state, action)=>{
                state.주소 = action.payload;
            }
        }
    });
    export default addressReducer.reducer;
    export const {address} = addressReducer.actions;
```
