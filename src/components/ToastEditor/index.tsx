import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import './style.css'; 

interface ToastEditorProps {
  body: string;
  setBody: (body: string) => void;
}

const ToastEditor = forwardRef<Editor, ToastEditorProps>(({ body, setBody }, ref) => {

	const editorRef = useRef<Editor | null>(null);

  useImperativeHandle(ref, () => editorRef.current as Editor);

  const onChangeGetHTML = () => {
    if (!editorRef.current) return;
		// 에디터에 입력된 내용을 HTML 태그 형태로 취득
		const data = editorRef.current.getInstance().getHTML();
		// Body에 담기
			setBody(data);
  };


  return (
    <Editor
      toolbarItems={[
        // 툴바 옵션 설정
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
      ]}
      height="600px" // 에디터 창 높이
      initialEditType="wysiwyg" // 기본 에디터 타입 (또는 wysiwyg)
			initialValue=" "
      hideModeSwitch
      previewStyle="tab" // 미리보기 스타일 (또는 tab) (vertical은 양쪽이 나뉨)
      ref={editorRef} // ref 참조
      onChange={onChangeGetHTML} // onChange 이벤트
      plugins={[colorSyntax]} // color syntax 플러그인 추가
    />
  );
});
export default ToastEditor;


