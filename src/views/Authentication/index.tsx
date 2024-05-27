import React from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';
import SelectBox from 'src/components/Selectbox';

export function ChooseSingUp() {
  return (
    <div id='auth-wrapper'>

      <div className='auth-top-bar'>
        <div className='auth-logo-image'></div>
        
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-login'>로그인</div>
          <div className='auth-top-right-bar-line'>|</div>
          <div className='auth-top-right-bar-sign-up'>회원가입</div>
        </div>
      </div>

        <div className='auth-welcome-image-box'>
          <div className='auth-welcome-image'></div>
        </div>


      <div className='auth-choose-type-text'>회원가입 방식을 선택해주세요.</div>

      <div className='auth-type-image'>
        <div className='auth-type-image-customer'></div>
        <div className='auth-type-image-designer'></div>
      </div>

      <div className='auth-type-text'>
        <div className='auth-type-text-customer'>고객</div>
        <div className='auth-type-text-designer'>디자이너</div>
      </div>

      <div className='auth-sign-up-sns'>
          <div className='auth-sign-up-naver'></div>
          <div className='auth-sign-up-kakao'></div>
      </div>

    </div>
  )
}

export function CustomerSignUp() {
  return (
    <div id='auth-wrapper'>

      <div className='auth-top-bar'>
        <div className='auth-logo-image'></div>
        
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-login'>로그인</div>
          <div className='auth-top-right-bar-line'>|</div>
          <div className='auth-top-right-bar-sign-up'>회원가입</div>
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
            <div className='auth-submit-box primary-button'>가입취소</div>
          </div>
        </div>
        </div>

        <div className='auth-right-null'></div>
      </div>

    </div>
  )
}

export function DesignerSignUp() {
  return (
    <div id='auth-wrapper'>

      <div className='auth-top-bar'>
        <div className='auth-logo-image'></div>
        
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-login'>로그인</div>
          <div className='auth-top-right-bar-line'>|</div>
          <div className='auth-top-right-bar-sign-up'>회원가입</div>
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
            <div className='auth-submit-box primary-button'>가입취소</div>
          </div>
        </div>
        </div>

        <div className='auth-right-null'></div>
      </div>

    </div>
  )
}

export function Login() {
  return (
    <div id='login-wrapper'>
      <div className='auth-top-bar'>
        <div className='auth-logo-image'></div>
        
        <div className='auth-top-right-bar'>
          <div className='auth-top-right-bar-sign-up'>회원가입</div>
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
          <div className='error-text'>로그인 정보가 일치하지 않습니다</div>

              <div className='auth-submit-box'>
            <div className='auth-submit-box primary-button'>로그인</div>
          </div>

              <div className='socal-login'>
                <div className='kakao-login'></div>
                <div className='naver-login'></div>
              </div>

              <div className="short-divider"></div>

              <div className='user-found'>
                <div className='id-found'>아이디 찾기</div>
                <div className='password-found'>비밀번호 찾기</div>
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
      <ChooseSingUp />
      <CustomerSignUp />
      <DesignerSignUp />
      <Login />
    </div>
  )
}
