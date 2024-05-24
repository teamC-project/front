import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { HookCallback } from '@toast-ui/editor/types/editor';

interface ToastEditorProps {
  body: string;
	imageHandler: (blob: File, callback: typeof Function) => void;
  setBody: (body: string) => void;
}

const ToastEditor: React.FC<ToastEditorProps> = ({ body, setBody }) => {
  const editorRef = useRef<Editor | null>(null);

  const onChangeGetHTML = () => {
    if (editorRef.current) {
      // 에디터에 입력된 내용을 HTML 태그 형태로 취득
      const data = editorRef.current.getInstance().getHTML();
      // Body에 담기
      setBody(data);
    }
  };

	function imageHandler(blob: File | Blob, callback: HookCallback): void {
		throw new Error('Function not implemented.');
	}

  return (
    <Editor
      toolbarItems={[
        // 툴바 옵션 설정
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock']
      ]}
      height="500px" // 에디터 창 높이
			hooks={{ addImageBlobHook: imageHandler }}
      initialEditType="wysiwyg" // 기본 에디터 타입 (or wysiwyg)
			hideModeSwitch
      previewStyle="tab" // 미리보기 스타일 (or tab) (vertical은 양쪽이 나뉨)
      ref={editorRef} // ref 참조
      onChange={onChangeGetHTML} // onChange 이벤트

    />
  );
};

export default ToastEditor;
