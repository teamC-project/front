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
    <div id='sign-up-wrapper'>

      <div className='top-bar'>
        <div className='logo-image'></div>
        
        <div className='top-right-bar'>
          <div className='top-right-bar-login'>로그인</div>
          <div className='top-right-bar-line'>|</div>
          <div className='top-right-bar-sign-up'>회원가입</div>
        </div>
      </div>

      <div className='under-bar'>
        <div className='left-null'></div>

        <div  className='center-value'>
        <div className='sign-up-box'>
          <div className='sign-up-title'>고객 회원가입</div>

          <div className='sign-up-box-text'>
            <div className='sign-up-text'>아이디</div>
            <div className='sign-up-next-box'><InputBox  label={''} type={'text'} value={''} placeholder={'아이디를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='sign-up-box-text'>
            <div className='sign-up-text'>비밀번호</div>
            <div className='sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='sign-up-box-text'>
            <div className='sign-up-text'>비밀번호 확인</div>
            <div className='sign-up-next-box'><InputBox label={''} type={'password'} value={''} placeholder={'비밀번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
          </div>

          <div className='sign-up-box-text'>
            <div className='sign-up-text'>이메일</div>
            <div className='sign-up-next-box' ><InputBox label={''} type={'text'} value={''} placeholder={'이메일을 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
            <div className='primary-button'>보내기</div>
          </div>

          <div className='sign-up-box-text'>
            <div className='sign-up-text'>이메일인증</div>
            <div className='sign-up-next-box'><InputBox label={''} type={'text'} value={''} placeholder={'인증번호를 입력해주세요.'} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } /></div>
            <div className='primary-button'>확인</div>
          </div>

          <div className='sign-up-box-text'>
            <div className='sign-up-text'>성별</div>
            <div className='sign-up-next-box'>
              <div className='sign-up-radio-box'><input type="radio" />MALE</div>
              <div className='sign-up-radio-box'><input type="radio" />FEMALE</div>
            </div>
            <div className='primary-button'>확인</div>
          </div>

          <div className='sign-up-box-text'>
            <div className='sign-up-text'>연령대</div>
            <div className='sign-up-next-box'><SelectBox value={''} onChange={function (value: string): void {
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

        <div className='right-null'></div>
      </div>

    </div>
  )
}

export function DesignerSignUp() {
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

        <div className='sign-up-title'>디자이너 가입 페이지 입니다.</div>

        <div className='sign-up-text-box'>
          <div className='sign-up-text'>아이디</div>
          <div><InputBox label={''} type={'text'} value={''} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
        </div>

        <div className='sign-in-box'>
          <div className='sign-up-text'>비밀번호</div>
          <div><InputBox label={''} type={'text'} value={''} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
        </div>

        <div className='sign-in-box'>
          <div className='sign-up-text'>비밀번호 확인</div>
          <div className='sign-up-box'><InputBox label={''} type={'text'} value={''} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
        </div>

        <div className='sign-in-box'>
          <div className='sign-up-text'>이메일</div>
          <div className='sign-up-box'><InputBox label={''} type={'text'} value={''} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
          <div className='primary-button'>보내기</div>
        </div>

        <div className='sign-in-box'>
          <div className='sign-up-text'>이메일인증</div>
          <div className='sign-up-box'><InputBox label={''} type={'text'} value={''} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='sign-in-box'>
          <div className='sign-up-text'>성별</div>
          <div className='sign-up-box'><SelectBox value={''} onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          } } /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='sign-in-box'>
          <div className='sign-up-text'>연령대</div>
          <div className='sign-up-box'><SelectBox value={''} onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          } } /></div>
          <div className='primary-button'>확인</div>
        </div>

        <div className='sign-up-text-box'>
          <div className='sign-up-text'>업체명</div>
          <div className='sign-up-box'><InputBox label={''} type={'text'} value={''} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
        </div>

        <div className='sign-in-box'>
          <div className='sign-up-text'>면허증사진</div>
          <div className='sign-up-box'><InputBox label={''} type={'text'} value={''} placeholder={''} onChangeHandler={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } /></div>
        </div>

        <div className='submit-box'>
          <div className='submit-box primary-button'>가입하기</div>
          <div className='submit-box primary-button'>가입취소</div>
        </div>


    </div>
  )
}


export default function Authentication() {
  return (
    <div>
      {/* <ChooseSingUp /> */}
      <CustomerSignUp />
      {/* <DesignerSignUp /> */}
    </div>
  )
}
