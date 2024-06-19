import { ChangeEvent, useEffect, useState } from 'react'
import "./style.css";
import SelectBox from 'src/components/Selectbox';
import InputBox from 'src/components/Inputbox';
import { useNavigate } from 'react-router';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { GetSignInUserResponseDto } from 'src/apis/user/dto/response';
import { CustomerInfoResponseDto } from 'src/apis/auth/dto/response';
import { getSignInUserRequest, updateCustomerInfoRequest } from 'src/apis/user';

//                     component                       //
export default function InfoCustomer() {

  //                     state                     //
  const { loginUserId, loginUserRole } = useUserStore();

  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [genderMessage, setGenderMessage] = useState<string>('');
  const [isGenderCheck, setIsGenderCheck] = useState<boolean>(false);
  const [ageMessage, setAgeMessage] = useState<string>('');

  const [cookies] = useCookies();
  const [isAgeCheck, setIsAgeCheck] = useState<boolean>(false);

  //                     function                       //
  const navigator = useNavigate();

  const getInfoUpdate = (result: GetSignInUserResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '올바르지 않은 권한입니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'NB' ? '존재하지 않는 권한입니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }

    const { userId, userGender, userAge } = result as CustomerInfoResponseDto;
    if (userId !== loginUserId) {
      alert('권한이 없습니다.');
      navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }
    setGender(userGender);
    setAge(userAge);
  };

  //                     event handler                     //
  const onInfoCustomerUpdateClickHandler = async () => {
    try {
      const customerInfoUpdate = { 
        userGender: gender,
        userAge: age,
      };

      updateCustomerInfoRequest(cookies.accessToken, customerInfoUpdate).then();
      alert('개인정보가 업데이트되었습니다.');
      navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);

    } catch (error) {
      console.error('Error updating user info:', error);
      alert('개인정보 업데이트에 실패했습니다.');
      navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    }
  };

  const onAgeChangeHandler = (value: string) => {
    setAge(value);
    setIsAgeCheck(false);
    const ageMessage = isAgeCheck ? '' : value ? '연령대를 선택해주세요.' : '';
    setAgeMessage(ageMessage);
  };

  const onGenderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGender(value);
    setIsGenderCheck(true);
    setGenderMessage(genderMessage);
  };

  //                     effect                     //
  useEffect(() => {
    if (!cookies.accessToken || !loginUserRole) return;

    if (loginUserRole !== 'ROLE_CUSTOMER') {
      navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }

    getSignInUserRequest(cookies.accessToken)
      .then(getInfoUpdate);
  }, [loginUserRole, cookies.accessToken]);

  //                     render                     //
  return (
    <div id='info-customer-wrapper'>

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
                <InputBox label={'MALE'} type={'radio'} value={'MALE'} name={'gender'} onChangeHandler={onGenderChangeHandler} checked={gender === 'MALE'} /></div>
              <div className='info-customer-radio-box'>
                <InputBox label={'FEMALE'} type={'radio'} value={'FEMALE'} name={'gender'} onChangeHandler={onGenderChangeHandler} checked={gender === 'FEMALE'} /></div>
            </div>
          </div>

          <div className='info-customer-box-text'>
            <div className='info-customer-text'>연령대</div>
            <SelectBox value={age} onChange={onAgeChangeHandler} />
          </div>

          <div className='submit-box' >
            <div className='complete-text user-primary-button' onClick={onInfoCustomerUpdateClickHandler}> 완료</div>
          </div>

        </div>
    </div>
  )
}