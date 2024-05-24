import React from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';
import SelectBox from 'src/components/Selectbox';

export function ChooseSingUp() {
  return (
    <div id='sign-up-wrapper'>

      <div className='top-bar'>
        <div className='logo-image'></div>
        <div className='top-right-bar'>
          <div className='top-right-bar-login'>로그인</div>
          <div className='top-right-bar-line'>|</div>
          <div className='top-right-bar-sign-up'>회원가입</div>
        </div>

      </div>
        <div className='welcome-image-box'>
          <div className='welcome-image'></div>
        </div>

      <div className='welcome-text'>헤어어드바에 오신 것을 환영합니다 !</div>

      <div className='choose-type-text'>회원가입 방식을 선택해주세요.</div>

      <div className='type-image'>
        <div className='type-image-customer'></div>
        <div className='type-image-designer'></div>
      </div>

      <div className='type-text'>
        <div className='type-text-customer'>고객</div>
        <div className='type-text-designer'>디자이너</div>
      </div>

      <div className='sign-up-sns'>
          <div className='sign-up-naver'></div>
          <div className='sign-up-kakao'></div>
      </div>

    </div>
  )
}

export function CustomerSignUp() {
  return (
    <div id='customer-sign-up-wrapper'>
      <div className='customer-sign-up-image-box'></div>

      <div className='right-full-sign-up'>
      <div className='sign-up-top-bar'>
        <div className='sign-up-top-bar-login'>로그인</div>
        <div className='sign-up-top-bar-line'>|</div>
        <div className='sign-up-top-bar-sign-up'>회원가입</div>
      </div>

        <div className='customer-sign-up-title'>고객 가입 페이지 입니다.</div>

        <div className='id-input-box'>
          <div className='sign-up-text'>아이디</div>
          <div><InputBox /></div>
        </div>

        <div className='password-input-box'>
          <div className='sign-up-text'>비밀번호</div>
          <div><InputBox /></div>
        </div>

        <div className='password-check-input-box'>
          <div className='sign-up-text'>비밀번호 확인</div>
          <div className='sign-up-box'><InputBox /></div>
        </div>

        <div className='email-input-box'>
          <div className='sign-up-text'>이메일</div>
          <div className='sign-up-box'><InputBox /></div>
          <div className='primary-button'>보내기</div>
        </div>

        <div className='auth-number-input-box'>
          <div className='sign-up-text'>이메일인증</div>
          <div className='sign-up-box'><InputBox /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='gender-select-box'>
          <div className='sign-up-text'>성별</div>
          <div className='sign-up-box'><SelectBox value={''} onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          } } /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='age-select-box'>
          <div className='sign-up-text'>연령대</div>
          <div className='sign-up-box'><SelectBox value={''} onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          } } /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='submit-box'>
          <div className='submit-box primary-button'>가입하기</div>
          <div className='submit-box primary-button'>가입취소</div>
        </div>
      </div>

    </div>
  )
}

export function DesignerSignUp() {
  return (
    <div id='customer-sign-up-wrapper'>
      <div className='customer-sign-up-image-box'></div>

      <div className='right-full-sign-up'>
      <div className='sign-up-top-bar'>
        <div className='sign-up-top-bar-login'>로그인</div>
        <div className='sign-up-top-bar-line'>|</div>
        <div className='sign-up-top-bar-sign-up'>회원가입</div>
      </div>

        <div className='customer-sign-up-title'>디자이너 가입 페이지 입니다.</div>

        <div className='id-input-box'>
          <div className='sign-up-text'>아이디</div>
          <div><InputBox /></div>
        </div>

        <div className='password-input-box'>
          <div className='sign-up-text'>비밀번호</div>
          <div><InputBox /></div>
        </div>

        <div className='password-check-input-box'>
          <div className='sign-up-text'>비밀번호 확인</div>
          <div className='sign-up-box'><InputBox /></div>
        </div>

        <div className='email-input-box'>
          <div className='sign-up-text'>이메일</div>
          <div className='sign-up-box'><InputBox /></div>
          <div className='primary-button'>보내기</div>
        </div>

        <div className='auth-number-input-box'>
          <div className='sign-up-text'>이메일인증</div>
          <div className='sign-up-box'><InputBox /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='gender-select-box'>
          <div className='sign-up-text'>성별</div>
          <div className='sign-up-box'><SelectBox value={''} onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          } } /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='age-select-box'>
          <div className='sign-up-text'>연령대</div>
          <div className='sign-up-box'><SelectBox value={''} onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          } } /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='company-name-input-box'>
          <div className='sign-up-text'>업체명</div>
          <div className='sign-up-box'><InputBox /></div>
        </div>

        <div className='image-input-box'>
          <div className='sign-up-text'>면허증사진</div>
          <div className='sign-up-box'><InputBox /></div>
        </div>

        <div className='submit-box'>
          <div className='submit-box primary-button'>가입하기</div>
          <div className='submit-box primary-button'>가입취소</div>
        </div>
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
    </div>
  )
}
