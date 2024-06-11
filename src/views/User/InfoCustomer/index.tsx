import React, { ChangeEvent, useEffect, useState } from 'react'
import "./style.css";
import SelectBox from 'src/components/Selectbox';
import InputBox from 'src/components/Inputbox';
import { useNavigate } from 'react-router';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, UPDATE_CUSTOMER_INFO_ABSOLUTE_PATH, UPDATE_DESIGNER_INFO_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { GetSignInUserResponseDto } from 'src/apis/user/dto/response';
import { CustomerInfoResponseDto, DesignerInfoResponseDto, SignInResponseDto } from 'src/apis/auth/dto/response';
import { getSignInUserRequest } from 'src/apis/user';

//                     interface                       //
interface Props {
  onLinkClickHandler: () => void;
}

//                     component                       //
export default function InfoCustomer() {


  //                     state                     //
  const { loginUserId, loginUserRole } = useUserStore();
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [genderMessage, setGenderMessage] = useState<string>('');
  const [isGenderCheck, setIsGenderCheck] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [userimage, setImage] = useState<string>('');

  const [cookies] = useCookies();

  //                     function                       //
  const navigator = useNavigate();

  const getInfoUpdate = (result: GetSignInUserResponseDto | ResponseDto | null) => {
  const message = 
  !result ? '서버에 문제가 있습니다.' :
  result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
  result.code === 'AF' ? '인증에 실패했습니다.' :
  result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
  result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

  if (!result || result.code !== 'SU') {
  alert(message);
  navigator(UPDATE_DESIGNER_INFO_ABSOLUTE_PATH);
  return;
  }

const { userId, userGender, userAge} = result as CustomerInfoResponseDto;
if (userId !== loginUserId) {
alert('권한이 없습니다.');
navigator(UPDATE_DESIGNER_INFO_ABSOLUTE_PATH);
return;
}

setGender(gender);
setAge(age);
};

  //                     event handler                     //
  const onInfoCUstomerUpdateClickHandler = () => {
    navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH)
  }
  
  const onAgeChangeHandler = (age: string) => {
    setAge(age);
  };

  const onGenderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGender(value);
    setIsGenderCheck(false);
    const genderMessage =
      isGenderCheck ? '' :
        value ? '성별을 선택해주세요.' : '';
    setGenderMessage(genderMessage);
  };


  //                     effect                     //
  useEffect(() => {
    if (!cookies.accessToken || !loginUserRole) return;

    if (loginUserRole !== 'ROLE_CUSTOMER') {
      navigator(UPDATE_DESIGNER_INFO_ABSOLUTE_PATH);
      return;
    }

    getSignInUserRequest(cookies.accessToken)
      .then(getInfoUpdate);
  }, [loginUserRole, cookies.accessToken]);

  // useEffect(() => {
  //   if (!cookies.accessToken || !loginUserRole) return;
  //   if (loginUserRole !== 'ROLE_CUSTOMER') {
  //     if (!cookies.accessToken) return;
  //     if (!loginUserRole) return;
  //     navigator(UPDATE_CUSTOMER_INFO_ABSOLUTE_PATH);
  //     return;
  //   }
  // }, [loginUserRole]);

  //                     render                     //
  return (
    <div id='info-customer-wrapper'>
      <div className='white-space'></div>
      <div className='white-space1'>
      <div className='white-space2'></div>
      
      <div className='info-customer-container'>
        <div className='customer-id-contents'>
          <div className='customer-id'>아이디</div>
          <div className='customer-id-container'>
            <div className='id-input-box'>
              <div className='customer-id-info'>{loginUserId}</div>
            </div>
          </div>
        </div>
        <div className='info-customer-box-text'>
          <div className='info-customer-text'>성별</div>
          <div className='info-customer-next-box'>
            <div className='info-customer-radio-box'>
              <input type='radio' name='gender' value='MALE' onChange={onGenderChangeHandler} checked={gender === 'MALE'} />
            </div>
            <div className='info-customer-radio-box'>
            <input type='radio' name='gender' value='FEMALE' onChange={onGenderChangeHandler} checked={gender === 'FEMALE'} />
            </div>
          </div>
        </div>
        <div className='info-customer-box-text'>
          <div className='info-customer-text'>연령대</div>
          <SelectBox value={age} onChange={onAgeChangeHandler} />
        </div>
        <div className='submit-box' onClick={onInfoCUstomerUpdateClickHandler}>
          <div className='complete-text primary-button'>완료</div>
        </div>
      </div>
      
      <div className='white-space2'></div>
      </div>
      <div className='white-space4'></div>
    </div>
  )
}