import React from 'react'

import { useNavigate } from 'react-router';

import { 
    MAILCONTECT_PATH, 
    ADVERTISEMENT_PATH, 
    SITE_DESCRIPTION_PATH, 
    TEARMS_AND_CONDTIONS_PATH, 
    YOUTH_PROTECTION_POLICY_PATH, 
    PERSONAL_INFO_PROCESSING_POLICY_PATH, 
} from 'src/constant';

import "./style.css";

//                          component                           //
export default function Footer() {

//                          function                            //
    const navigator = useNavigate();

//                          event handler                           //
    const advertiseClickHandler = () => {
        navigator(ADVERTISEMENT_PATH)
    }

    const mailContectClickHandler = () => {
        navigator(MAILCONTECT_PATH)
    }
    
    const personalInfoProcessingPolicyClickHander = () =>{
        navigator(PERSONAL_INFO_PROCESSING_POLICY_PATH)
    }

    const siteDescriptionClickHandler = () => {
        navigator(SITE_DESCRIPTION_PATH)
    }

    const termsAndConditionsClickHandler = () => {
        navigator(TEARMS_AND_CONDTIONS_PATH)
    }

    const youthProtectionPolicyClickHandler = () => {
        navigator(YOUTH_PROTECTION_POLICY_PATH)
    }

//                          render                           //
    return (
        <div className='footer-size-check'>
            <div className='footer-top-bar'>
                <div className='cursor-pointer' onClick={siteDescriptionClickHandler}>사이트소개</div>
                <div className=''>|</div>
                <div className='cursor-pointer' onClick={termsAndConditionsClickHandler}>이용약관</div>
                <div className=''>|</div>
                <div className='cursor-pointer' onClick={personalInfoProcessingPolicyClickHander}>개인정보처리방침</div>
                <div className=''>|</div>
                <div className='cursor-pointer' onClick={youthProtectionPolicyClickHandler}>청소년보호정책</div>
                <div className=''>|</div>
                <div className='cursor-pointer' onClick={advertiseClickHandler}>광고/제휴</div>
                <div className=''>|</div>
                <div className='cursor-pointer' onClick={mailContectClickHandler}>메일문의</div>
            </div>
            <div className='footer-under-bar'>
                <div className='footer-head-light'>헤어어드바이저 2024~ <span className=''>&copy;</span> All Rights Reserved.</div>
            </div>
        </div>
    )
}
