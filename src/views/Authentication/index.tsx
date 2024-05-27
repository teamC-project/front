import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';
import SelectBox from 'src/components/Selectbox';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { SignInResponseDto } from 'src/apis/auth/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH, AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH, AUTH_SIGN_IN_ABSOLUTE_PATH, AUTH_SIGN_UP_ABSOLUTE_PATH, ID_FOUND_ABSOLUTE_PATH, MAIN_PATH, PASSWORD_FOUND_ABSOLUTE_PATH } from 'src/constant';
import { SignInRequestDto } from 'src/apis/auth/dto/request';
import { signInRequest, signUpRequest } from 'src/apis/auth';

export function Main() {

  //                  function                 //
  const navigator = useNavigate();
  //                event handler               //
  const onClickSignInHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
  
  const onClickSignUpHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);
    return (
      <div id='main-page-wrapper'>
  
      <div className='main-page-top-bar'>
        <div className='main-page-logo-image'></div>
        
        <div className='main-page-top-right-bar'>
          <div className='main-page-top-right-bar-login' onClick={onClickSignInHandler}>로그인</div>
          <div className='main-page-top-right-bar-line'>|</div>
          <div className='main-page-top-right-bar-sign-up' onClick={onClickSignUpHandler}>회원가입</div>
        </div>
      </div>
  
      <div className='auth-under-bar'>
        <div className='auth-left-null'></div>
        <div  className='auth-center-value'>
          <div className='main-page-image-box'>
            <div className='main-page-title-image'></div>
            <div className='main-page-image'></div>
          </div>
        </div>
        <div className='auth-right-null'></div>
      </div>
  
    </div>
  
    )
  }


//           component           //
export function Sns () {
  //           state          //
    const {accessToken, expires} = useParams();
    const [cookies, setCookie] = useCookies();
  //           function          //
    const navigator = useNavigate();
  //           effect          //
    useEffect (() => {
      if (!accessToken || !expires) return;
      const expiration = new Date(Date.now() + (Number(expires) * 1000));
      setCookie('accessToken', accessToken, { path: '/', expires: expiration});
      
      navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    }, []);
  //          render           //
    return <></>;
  }
  

type AuthPage = 'sign_in' | 'sign_up';

//           interface           //
interface SnsContainerProps{
  title: string;
}

// component //
function SnsContainer({title}: SnsContainerProps) {
  
  // event handler // 
  const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
    window.location.href = 'http://localhost:4000/api/v1/auth/oauth2/' + type;
  };
//           render           //
  return (
    <div className="authentication-sns-container">
      <div className="sns-container-title label">{title}</div>
      <div className="sns-button-container">
        <div className="sns-button kakao-button" onClick={() =>onSnsButtonClickHandler('kakao')}></div>
        <div className="sns-button naver-button" onClick={() =>onSnsButtonClickHandler('naver')}></div>
      </div>
    </div>
  );
};


//                 component                 //
export function ChooseSingUp() {

//                    state                  //

//                  function                 //
const navigator = useNavigate();
//                event handler               //
const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
  window.location.href = 'http://localhost:4200/api/v1/auth/oauth2/' + type;
};

const onClickCustomerSignUpHandler = () => navigator(AUTH_CUSTOMER_SIGN_UP_ABSOLUTE_PATH);

const onClickDesignerSignUpHandler = () => navigator(AUTH_DESIGNER_SIGN_UP_ABSOLUTE_PATH);

const onClickSignInHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
  
const onClickMainHandler = () => navigator(MAIN_PATH);
//                   render                  //
  return (
    <div id='auth-wrapper'>

      <div className='auth-top-bar'>
        <div className='auth-logo-image' onClick={onClickMainHandler}></div>
        
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-login' onClick={onClickSignInHandler}>로그인</div>
        </div>
      </div>

        <div className='auth-welcome-image-box'>
          <div className='auth-welcome-image'></div>
        </div>


      <div className='auth-choose-type-text'>회원가입 방식을 선택해주세요.</div>

      <div className='auth-type-image'>
        <div className='auth-type-image-customer' onClick={onClickCustomerSignUpHandler}></div>
        <div className='auth-type-image-designer' onClick={onClickDesignerSignUpHandler}></div>
      </div>

      <div className='auth-type-text'>
        <div className='auth-type-text-customer' onClick={onClickCustomerSignUpHandler}>고객</div>
        <div className='auth-type-text-designer' onClick={onClickDesignerSignUpHandler}>디자이너</div>
      </div>

      <div className='auth-sign-up-sns'>
          <div className='auth-sign-up-naver' onClick={() =>onSnsButtonClickHandler('naver')}></div>
          <div className='auth-sign-up-kakao' onClick={() =>onSnsButtonClickHandler('kakao')}></div>
      </div>

    </div>
  )
}

//                    component                   //
export function CustomerSignUp() {
//                     function                    //
    const navigator = useNavigate();
//                  event handler                  //
    const onClickSignInHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    
    const onClickSignUpHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);

    const onClickMainHandler = () => navigator(MAIN_PATH);
  return (
    <div id='auth-wrapper'>

      <div className='auth-top-bar'>
        <div className='auth-logo-image' onClick={onClickMainHandler}></div>
        
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-login' onClick={onClickSignInHandler}>로그인</div>
          <div className='auth-top-right-bar-line'>|</div>
          <div className='auth-top-right-bar-sign-up' onClick={onClickSignUpHandler}>회원가입</div>
        </div>
      </div>

      <div className='auth-under-bar'>
        <div className='auth-left-null'></div>

        <div  className='auth-center-value'>
        <div className='auth-sign-up-box'>
          <div className='auth-sign-up-title'>고객 회원가입</div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>아이디</div>
            <div className='auth-sign-up-next-box'><InputBox  label={''} type={'text'} value={''} placeholder={'아이디를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호</div>
            <div className='auth-sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호 확인</div>
            <div className='auth-sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>이메일</div>
            <div className='auth-sign-up-next-box' ><InputBox label={''} type={'text'} value={''} placeholder={'이메일을 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
            <div className='primary-button auth-sign-in-button-size'>보내기</div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>이메일인증</div>
            <div className='auth-sign-up-next-box'><InputBox label={''} type={'text'} value={''} placeholder={'인증번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
            <div className='primary-button auth-sign-in-button-size'>확인</div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>성별</div>
            <div className='auth-sign-up-next-box'>
              <div className='auth-sign-up-radio-box'><InputBox label={'MALE'} type={'radio'} value={'MALE'} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                } } /></div>
              <div className='auth-sign-up-radio-box'><InputBox label={'FEMALE'} type={'radio'} value={'FEMALE'} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                } } /></div>
            </div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>연령대</div>
            <div className='auth-sign-up-next-box'><SelectBox value={''} onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            } } /></div>
            <div className='primary-button auth-sign-in-button-size'>확인</div>
          </div>

          <div className='auth-submit-box'>
            <div className='auth-submit-box primary-button'>가입하기</div>
          </div>
        </div>
        </div>

        <div className='auth-right-null'></div>
      </div>

    </div>
  )
}

export function DesignerSignUp() {
    //                  function                 //
    const navigator = useNavigate();
    //                event handler               //
    const onClickSignInHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    
    const onClickSignUpHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);

    const onClickMainHandler = () => navigator(MAIN_PATH);
    //                    render                  //
  return (
    <div id='auth-wrapper'>

      <div className='auth-top-bar'>
        <div className='auth-logo-image' onClick={onClickMainHandler}></div>
        
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-login' onClick={onClickSignInHandler}>로그인</div>
          <div className='auth-top-right-bar-line'>|</div>
          <div className='auth-top-right-bar-sign-up' onClick={onClickSignUpHandler}>회원가입</div>
        </div>
      </div>

      <div className='auth-under-bar'>
        <div className='auth-left-null'></div>

        <div  className='auth-center-value'>
        <div className='auth-sign-up-box'>
          <div className='auth-sign-up-title'>디자이너 회원가입</div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>아이디</div>
            <div className='auth-sign-up-next-box'><InputBox  label={''} type={'text'} value={''} placeholder={'아이디를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호</div>
            <div className='auth-sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호 확인</div>
            <div className='auth-sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>이메일</div>
            <div className='auth-sign-up-next-box' ><InputBox label={''} type={'text'} value={''} placeholder={'이메일을 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
            <div className='primary-button auth-sign-in-button-size'>보내기</div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>이메일인증</div>
            <div className='auth-sign-up-next-box'><InputBox label={''} type={'text'} value={''} placeholder={'인증번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
            <div className='primary-button auth-sign-in-button-size'>확인</div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>성별</div>
            <div className='auth-sign-up-next-box'>
              <div className='auth-sign-up-radio-box'><InputBox label={'MALE'} type={'radio'} value={'MALE'} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                } } /></div>
              <div className='auth-sign-up-radio-box'><InputBox label={'FEMALE'} type={'radio'} value={'FEMALE'} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                } } /></div>
            </div>
          </div>

          <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>연령대</div>
            <div className='auth-sign-up-next-box'><SelectBox value={''} onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            } } /></div>
            <div className='primary-button auth-sign-in-button-size'>확인</div>
          </div>

        <div className='auth-sign-up-box-text'>
          <div className='auth-sign-up-text'>업체명</div>
          <div className='auth-sign-up-next-box'><InputBox label={''} type={'text'} value={''} placeholder={'업체명을 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
        </div>

        <div className='auth-sign-up-box-text'>
          <div className='auth-sign-up-text'>면허증사진</div>
          <div className='auth-sign-up-next-box'><InputBox label={''} type={'text'} value={''} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
        </div>

          <div className='auth-submit-box'>
              <div className='auth-submit-box primary-button'>가입하기</div>
          </div>
        </div>
        </div>

        <div className='auth-right-null'></div>
      </div>

    </div>
  )
}

//                    interface                    //
interface Props {
    onLinkClickHandler: () => void
}

//                    component                    //
export function SignIn (){
  //                    state                    //
  const [cookies, setCookie] = useCookies();
  
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [message, setMessage] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();

  const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

      const message =
          !result ? '서버에 문제가 있습니다.' :
          result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' : 
          result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
          result.code === 'TF' ? '서버에 문제가 있습니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
      setMessage(message);

      const isSuccess = result && result.code === 'SU';
      if (!isSuccess) return;

      const { accessToken, expires } = result as SignInResponseDto;
      const expiration = new Date(Date.now() + (expires * 1000));
      setCookie('accessToken', accessToken, { path: '/', expires: expiration });

      navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
  };


  //                    event handler                    //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    setMessage('');
  };

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setMessage('');
  };

  const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    onSignInButtonClickHandler();
};

const onSignInButtonClickHandler = () => {
  if (!id || !password) {
    setMessage('아이디와 비밀번호를 모두 입력하세요.')
    return;
  
  }

  const requestBody: SignInRequestDto = {
    userId: id,
    userPassword: password
  }
  signInRequest(requestBody).then(signInResponse);
};

  const onClickSignUpHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);
 
  const onClickIdFoundHandler = () => navigator(ID_FOUND_ABSOLUTE_PATH);

  const onClickPasswordFoundHandler = () => navigator(PASSWORD_FOUND_ABSOLUTE_PATH);

  const onClickMainHandler = () => navigator(MAIN_PATH);

  

  return (
    <div id='auth-wrapper'>
      <div className='auth-top-bar'>
        <div className='auth-logo-image' onClick={onClickMainHandler}></div>
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-sign-up' onClick={onClickSignUpHandler}>회원가입</div>
        </div>
      </div>

      <div className='sign-in-main-box'>
        <div className='image-box'></div>
        <div className='login-box'>
          <div className='login-container'>
            <div className='login-page h1'>로그인 페이지</div>
            <div className='sign-in-contents'>
            <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>아이디</div>
            <div className='auth-sign-up-next-box'><InputBox label='' type={'text'} value={id} placeholder={'아이디를 입력해주세요.'} onChangeHandler={onIdChangeHandler} /></div>
          </div>

                

                <div className='auth-sign-up-box-text'>
            <div className='auth-sign-up-text'>비밀번호</div>
            <div className='auth-sign-up-next-box'><InputBox label="" type='password' value={password} placeholder='비밀번호를 입력해주세요.' onChangeHandler={ onPasswordChangeHandler } onKeydownHandler={onPasswordKeydownHandler} message={message} error /></div>
          </div>
          <div className='error-text'>로그인 정보가 일치하지 않습니다</div>

              <div className='auth-submit-box'>
            <div className='auth-submit-box primary-button' onClick={onSignInButtonClickHandler}>로그인</div>
            {/* <SnsContainer title="SNS 로그인" /> */}
          </div>

              <div className='socal-login'>
                <div className='kakao-login'></div>
                <div className='naver-login'></div>
              </div>

              <div className="short-divider"></div>

              <div className='user-found'>
                <div className='auth-sign-up-text text-cusor-pointer' onClick={onClickIdFoundHandler}>아이디 찾기</div>
                <div className='auth-sign-up-text text-cusor-pointer' onClick={onClickPasswordFoundHandler}>비밀번호 찾기</div>
              </div>
            </div>
          </div>
        </div>
      <div className='under-right-bar'></div>
      </div>
    </div>
  )
}




export default function Authentication() {
  return (
    <div>
    </div>
  )
}
