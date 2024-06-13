import React from 'react'
import "./style.css";
import { useUserStore } from 'src/stores';
import { useNavigate } from 'react-router';
import { GetSignInUserResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';

//                     component                       //
export default function InfoDeleteUser() {

  //                    state                   //
  const {loginUserId, loginUserRole} = useUserStore();

  

  //                  function                  //
  // const navigator = useNavigate();

  // const InfoDeleteRersponse = (result: GetSignInUserResponseDto | ResponseDto | null) => {
  //   const message =
  //   !result? '서버에 문제가 있습니다.' :
  //   result.code === 'VF' ? '올바르지 않은 권한입니다.' :
  //   result.code === 'AF' ? '인증에 실패했습니다.' :
  //   result.code === 'NB' ? '존재하지 않는 권한입니다.' : 
  //   result.code === 'DBE' ? '서버에 문제가 있습니다.' : '' ;

  //   if(!result || result.code !== 'SU') {
  //     alert(message);
  //     navigator
  //   }
  // }

  //                event handler               //


  //                   render                   //
  return (
    <div id='info-delete-wrapper'>
      <div className='white-space1'>
        <div className='delete-container'>
          <div className='delete-title-contents'>
            <div className='delete-title'>탈퇴 안내</div>
            <div className='delete-account'>회원탈퇴를 신청하기 전에 안내사항을 꼭 확인해주세요.</div>
          </div>

          <div className='delete-account-contents'>
            <div className='delete-account'><em>사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가</em> 불가하오니 신중하게 선택하시기 바랍니다.</div>
            <div className='delete-account'>탈퇴한 아이디는 본인과 타인 모두 재사용 불가하오니 신중하게 선택하시기 바랍니다.</div>
          </div>

          <div className='delete-account-detatils-contents'>
            <div className='delete-account-detail'>탈퇴 후 회원정보는 모두 삭제됩니다.회원정보는 모두 삭제되며 삭제된 데이터는 복구되지 않습니다.</div>
            <div className='delete-account-detail1'>삭제되는 내용을 확인하시고 필요한 데이터는 미리 백업을 해주세요.</div>
          </div>

          <div className='delete-account-main-container'>
            <div className='delete-account-main-contents'>
            <div className='delete-account-main-detail'>- 회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</div>
            <div className='delete-account-main-detail'>- 회원탈퇴 후 헤어 어드바이스 서비스에 입력하신 댓글은 지워지지 않으며, 회원정보 삭제로 인해 작성자 본인을 확인할 수 없어 편집 및 삭제처리가 원칙적으로 불가능합니다.</div>
            <div className='delete-account-main-detail'>- 게시글 및 후기, 댓글 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제처리 한 후에 회원 탈퇴를 신청하시기 바랍니다.</div>
            <div className='delete-account-main-detail'>- 탈퇴 후에는 동일한 아이디로 재가입 할 수 없으며 아이디와 데이터는 복구할 수 없습니다.</div>
            <div className='delete-account-main-detail'>- 개인정보 처리 방침에 따라 불량 이용 및 제한에 관한 기록은 탈퇴 후에도 1년 동안 보관됩니다.</div>
            </div>
          </div>

          <div className='delete-agree'>
          <input type={'checkbox'} name={'agreement'} value={'agree'} />
          <div className='detail-agree'>안내 사항을 모두 확인하였으며, 이에 동의합니다.</div>
          </div>

          <div className='delete-complete-contents'>
            <div className='delete-complete'>회원탈퇴</div>
          </div>

        </div>
      </div>
    </div>
  )
}
