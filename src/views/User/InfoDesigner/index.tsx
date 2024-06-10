import React, { ChangeEvent, useEffect, useState } from 'react';
import "./style.css";
import InputBox from 'src/components/Inputbox';
import { useNavigate, useParams } from 'react-router';
import SelectBox from 'src/components/Selectbox';
import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH, UPDATE_CUSTOMER_INFO_ABSOLUTE_PATH, UPDATE_DESIGNER_INFO_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { getSignInUserRequest, updateDesignerInfoRequest } from 'src/apis/user';
import { DesignerInfoResponseDto } from 'src/apis/auth/dto/response';
import axios from 'axios';

export default function InfoDesigner() {

  const [userId, setUserId] = useState<string | null>(null);
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [ageMessage, setAgeMessage] = useState<string>('');
  const [genderMessage, setGenderMessage] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [companyNameMessage, setCompanyNameMessage] = useState<string>('');
  const [imageMessage, setImageMessage] = useState<string>('');
  const { loginUserRole, loginUserId } = useUserStore();
  const [cookies] = useCookies();

  const [isAgeCheck, setIsAgeCheck] = useState<boolean>(false);
  const [isGenderCheck, setIsGenderCheck] = useState<boolean>(false);
  const [isImageCheck, setIsImageCheck] = useState<boolean>(false);
  const [isCompanyNameCheck, setIsCompanyNameCheck] = useState<boolean>(false);
  const [isCompanyNameError, setIsCompanyNameError] = useState<boolean>(false);
  const [isImageError, setIsImageError] = useState<boolean>(false);

  //                    function                    //
  const navigator = useNavigate();

  const getInfoResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {

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

    console.log(result);

    const { userId, userGender, userAge, userCompanyName, userImage } = result as DesignerInfoResponseDto;
    if (userId !== loginUserId) {
      alert('권한이 없습니다.');
      navigator(UPDATE_DESIGNER_INFO_ABSOLUTE_PATH);
      return;
    }
    setGender(userGender);
    setAge(userAge);
    setCompanyName(userCompanyName);
    // setImage(image);
  };

  //                    event handler                    //

  const onInfoDesignerUpdateClickHandler = async () => {

    if (!image) return;
    const data = new FormData();
    data.append('file', image);

    const userImage = await axios.post('http://localhost:4200/api/v1/designer_board/upload', data, {headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${cookies.accessToken}` }})
      .then(response => response.data).catch(error => '');

    try {
      const designerInfoUpdate = {
        userCompanyName: companyName,
        userGender: gender,
        userAge: age,
        userImage: userImage
      };
      updateDesignerInfoRequest(cookies.accessToken, designerInfoUpdate).then();

      // alert('개인정보가 업데이트되었습니다.');
      // navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
    } catch (error) {
      // console.error('Error updating user info:', error);
      // alert('개인정보 업데이트에 실패했습니다.');
      // navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
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
    // const genderMessage = isGenderCheck ? '' : (value ? '성별을 선택해주세요.' : '');
    setGenderMessage(genderMessage);
  };

  const onCompanyNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCompanyName(value);
    setIsCompanyNameCheck(false);
    setCompanyNameMessage('');
  };

  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files.length) return;

    const file = files[0];
    setImage(file);

  };

  const formData = new FormData();
  formData.append('companyName', companyName);
  formData.append('gender', gender);
  formData.append('age', age);
  if (image) {
    formData.append('image', image);
  }

  //                    effect                    //
  useEffect(() => {
    if (!cookies.accessToken || !loginUserRole) return;

    if (loginUserRole !== 'ROLE_DESIGNER') {
      navigator(UPDATE_DESIGNER_INFO_ABSOLUTE_PATH);
      return;
    }

    getSignInUserRequest(cookies.accessToken)
      .then(getInfoResponse);
  }, [loginUserRole, cookies.accessToken]);

  //                    render                    //
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
                <div className='designer-id-info'>{loginUserId}</div>
              </div>
            </div>
          </div>

          <div className='info-designer-box-text'>
            <div className='info-designer-text'>성별</div>
            <div className='info-designer-next-box'>
              <div className='info-designer-radio-box'>
              <input type='radio' name='gender' value='MALE' onChange={onGenderChangeHandler} checked={gender === 'MALE'} />
                {/* <InputBox label={'MALE'} type={'radio'} value={'MALE'} name={'gender'} message={genderMessage} onChangeHandler={onGenderChangeHandler} /> */}
              </div>
              <div className='info-designer-radio-box'>
              <input type='radio' name='gender' value='FEMALE' onChange={onGenderChangeHandler} checked={gender === 'FEMALE'} />
                {/* <InputBox label={'FEMALE'} type={'radio'} value={'FEMALE'} name={'gender'} message={genderMessage} onChangeHandler={onGenderChangeHandler} /> */}
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
            <div className='info-designer-update-next-box'>
            {/* <InputBox type={'file'} value='' placeholder={''} onChangeHandler={onImageChangeHandler} message={imageMessage} error={isImageError} /> */}
            <input type='file' onChange={onImageChangeHandler} />
            </div>
          </div>
          <div className='submit-box' onClick={onInfoDesignerUpdateClickHandler}>
            <div className='complete-text primary-button btn btn-primary'>완료</div>
          </div>
        </div>

        <div className='white-space2'></div>
      </div>
      <div className='white-space4'></div>
    </div>
  );
}
