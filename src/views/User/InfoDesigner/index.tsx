import React, { ChangeEvent, useState } from 'react'
import "./style.css";
import InputBox from 'src/components/Inputbox';
import { useNavigate } from 'react-router';
import SelectBox from 'src/components/Selectbox';
//                     component                       //
export default function InfoDesigner() {

  //                     state                       //
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [genderMessage, setGenderMessage] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [imageMessage, setImageMessage] = useState<string>('');
  const [companyNameMessage, setCompanyNameMessage] = useState<string>('');

  const [isGenderCheck, setIsGenderCheck] = useState<boolean>(false);
  const [isImageCheck, setIsImageCheck] = useState<boolean>(false);
  const [isCompanyNameCheck, setIsCompanyNameCheck] = useState<boolean>(false);
  const [isCompanyNameError, setIsCompanyNameError] = useState<boolean>(false);
  const [isImageError, setIsImageError] = useState<boolean>(false);

  //                     function                       //
  const navigator = useNavigate();

  //                     event handler                       //
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

  const onCompanyNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCompanyName(value);
    setIsCompanyNameCheck(false);
    setCompanyNameMessage('');
  };

  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setImage(value);
    setIsImageCheck(false);
    setImageMessage('');
  };

  //                     render                       //
  return (
    <div id='info-designer-wrapper'>
      <div className='white-space'></div>
      <div className='white-space1'>
        <div className='white-space2'></div>

        <div className='info-designer-container'>
          <div className='designer-id-contents'>
            <div className='designer-id'>아이디</div>
            <div className='designer-id-container'>
              <div className='id-input-box'>
                <div className='designer-id-info'>asd</div>
              </div>
            </div>
          </div>
          <div className='info-designer-box-text'>
            <div className='info-designer-text'>성별</div>
            <div className='info-designer-next-box'>
              <div className='info-designer-radio-box'>
                <InputBox label={'MALE'} type={'radio'} value={gender} name={'gender'} message={genderMessage} onChangeHandler={onGenderChangeHandler} />
              </div>
              <div className='info-designer-radio-box'>
                <InputBox label={'FEMALE'} type={'radio'} value={gender} name={'gender'} message={genderMessage} onChangeHandler={onGenderChangeHandler} />
              </div>
            </div>
          </div>
          <div className='info-designer-box-text'>
            <div className='info-designer-text'>연령대</div>
            <SelectBox value={age} onChange={onAgeChangeHandler} />
          </div>
          <div className='info-designer-update-box-text'>
            <div className='info-designer-update-text'>업체명</div>
            <div className='info-designer-update-next-box'><InputBox type={'text'} value={companyName} placeholder={'업체명을 입력해주세요.'} onChangeHandler={onCompanyNameChangeHandler} message={companyNameMessage} error={isCompanyNameError} /></div>
          </div>

          <div className='info-designer-update-box-text'>
            <div className='info-designer-update-text'>면허증사진</div>
            <div className='info-designer-update-next-box'><InputBox type={'file'} value={image} placeholder={''} onChangeHandler={onImageChangeHandler} message={imageMessage} error={isImageError} /></div>
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