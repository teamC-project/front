import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

import InputBox from 'src/components/Inputbox';
import UserSelectBox from 'src/components/UserSelectBox';

import { DesignerInfoResponseDto, GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { getSignInUserRequest, updateDesignerInfoRequest } from 'src/apis/user';

import { ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

import { useUserStore } from 'src/stores';

import ResponseDto from 'src/apis/response.dto';

import "./style.css";

//                          component                          //
export default function InfoDesigner() {

//                          state                          //
    const { loginUserRole, loginUserId } = useUserStore();
    
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    
    const [image, setImage] = useState<File | null>(null);
    
    const [cookies] = useCookies();
    
    const [ageMessage, setAgeMessage] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [genderMessage, setGenderMessage] = useState<string>('');
    const [imageMessage, setImageMessage] = useState<string>('');
    const [companyNameMessage, setCompanyNameMessage] = useState<string>('');
    
    const [isAgeCheck, setIsAgeCheck] = useState<boolean>(false);
    const [isGenderCheck, setIsGenderCheck] = useState<boolean>(false);
    const [isCompanyNameCheck, setIsCompanyNameCheck] = useState<boolean>(false);

//                          function                          //
    const navigator = useNavigate();

    const getInfoDesignerResponse = (result: DesignerInfoResponseDto | ResponseDto | null) => {
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
        
        const { userId, userGender, userAge, userCompanyName } = result as DesignerInfoResponseDto;
        if (userId !== loginUserId) {
            alert('권한이 없습니다.');
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
            return;
        }
        setGender(userGender);
        setAge(userAge);
        setCompanyName(userCompanyName);
    };

//                          event handler                          //
    const onInfoDesignerUpdateClickHandler = async () => {
        if (!image) return;

        const reader = new FileReader();
        reader.onload = async function () {
            const imageDataUrl = reader.result;

        const designerInfoUpdate = {
            userCompanyName: companyName,
            userGender: gender,
            userAge: age,
            userImage: imageDataUrl
        };

        const updateResult = await updateDesignerInfoRequest(cookies.accessToken, designerInfoUpdate);
            if (updateResult) {
                alert('개인정보가 업데이트되었습니다.');
                navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
                return;
            }
            alert('개인정보 업데이트에 실패했습니다.');
            navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
        };
        reader.readAsDataURL(image);
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

    const onCompanyNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
        setCompanyName(value);
        setIsCompanyNameCheck(false);
        setCompanyNameMessage('');
        setImageMessage('');
    };

    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || !files.length) return;

        const file = files[0];
            setImage(file);
    };

//                          effect                          //
    useEffect(() => {
    if (!cookies.accessToken || !loginUserRole) return;

    if (loginUserRole !== 'ROLE_DESIGNER') {
        alert('잘못된 접근입니다.')
        navigator(ANNOUNCEMENT_BOARD_LIST_ABSOLUTE_PATH);
        return;
    }
    getSignInUserRequest(cookies.accessToken)
    .then(getInfoDesignerResponse);
    }, [loginUserRole, cookies.accessToken]);

//                          render                          //
    return (
        <div id='info-wrapper'>
            <div className='info-sub-title'>개인정보 수정</div>
            <div className='info-under-value'>
                <div className='user-left-null'></div>
                <div className='info-center-value'>
                    <div className='info-container'>
                        <div className='info-box-text'>
                            <div className='info-text'>아이디</div>
                            <div className='id-info-text-container'>
                                <div className='id-white-value'></div>
                                <div className='id-info-text'>{loginUserId}
                                    <div className='id-white-value'></div>
                                </div>
                            </div>
                        </div>
                        <div className='info-box-text'>
                            <div className='info-text'>성별</div>
                            <div className='info-next-box'>
                                <div className='info-radio-box'>
                                    <InputBox label={'MALE'} type={'radio'} value={'MALE'} name={'gender'} onChangeHandler={onGenderChangeHandler} checked={gender === 'MALE'} /></div>
                                <div className='info-radio-box'>
                                    <InputBox label={'FEMALE'} type={'radio'} value={'FEMALE'} name={'gender'} onChangeHandler={onGenderChangeHandler} checked={gender === 'FEMALE'} /></div>
                            </div>
                        </div>
                        <div className='info-box-text'>
                            <div className='info-text'>연령대
                                <UserSelectBox value={age} onChange={onAgeChangeHandler} />
                            </div>
                        </div>
                        <div className='info-box-text'>
                            <div className='info-text'>업체명</div>
                            <div className='info-update-next-box'><InputBox type={'text'} value={companyName} placeholder={'업체명을 입력해주세요.'} onChangeHandler={onCompanyNameChangeHandler} message={companyNameMessage} /></div>
                        </div>
                        <div className='info-box-text'>
                            <div className='info-text'>면허증사진</div>
                            <div className='info-update-next-box'>
                                <input type='file' onChange={onImageChangeHandler} />
                            </div>
                        </div>
                    </div>
                    <div className='submit-box'>
                        <div className='user-primary-button' onClick={onInfoDesignerUpdateClickHandler}>완료</div>
                    </div>
                    <div className='user-right-null'></div>
                </div>
            </div>
        </div>
    );
}