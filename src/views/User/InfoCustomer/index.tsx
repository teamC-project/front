import React, { ChangeEvent, useState } from 'react'
import "./style.css";
import SelectBox from 'src/components/Selectbox';
import InputBox from 'src/components/Inputbox';
import { useNavigate } from 'react-router';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

//                     interface                       //
interface Props {
  onLinkClickHandler: () => void;
}

//                     component                       //
export default function InfoCustomer() {


  //                     state                     //
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [genderMessage, setGenderMessage] = useState<string>('');
  const [isGenderCheck, setIsGenderCheck] = useState<boolean>(false);

  //                     function                       //
  const navigator = useNavigate();


  //                     event handler                     //
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
              <div className='customer-id-info'>asd</div>
            </div>
          </div>
        </div>
        <div className='info-customer-box-text'>
          <div className='info-customer-text'>성별</div>
          <div className='info-customer-next-box'>
            <div className='info-customer-radio-box'>
              <InputBox label={'MALE'} type={'radio'} value={gender} name={'gender'} message={genderMessage} onChangeHandler={onGenderChangeHandler} />
            </div>
            <div className='info-customer-radio-box'>
              <InputBox label={'FEMALE'} type={'radio'} value={gender} name={'gender'} message={genderMessage} onChangeHandler={onGenderChangeHandler} />
            </div>
          </div>
        </div>
        <div className='info-customer-box-text'>
          <div className='info-customer-text'>연령대</div>
          <SelectBox value={age} onChange={onAgeChangeHandler} />
        </div>
        <div className='submit-box'>
          <div className='complete-text primary-button'>완료</div>
        </div>
      </div>
      
      <div className='white-space2'></div>
      </div>
      <div className='white-space4'></div>
    </div>
  )
}