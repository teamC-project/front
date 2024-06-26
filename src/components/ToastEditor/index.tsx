import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import './style.css'; 
import { base64ToFile } from 'src/utils';
import axios from 'axios';
import { postTrendBoardImageUploadRequest } from 'src/apis/TrendBoard';

interface ToastEditorProps {
	body: string;
	imageList: {base64: string; url: string}[];
	setBody: (body: string) => void;
	setImageList: (imageList :{base64: string; url: string}[]) =>void;
}

const ToastEditor = forwardRef<Editor, ToastEditorProps>(({ body, imageList, setBody, setImageList}, ref) => {

	const editorRef = useRef<Editor | null>(null);
	const bodyRef = useRef<string>('');
	const imageCountRef = useRef<number>(0);


	useImperativeHandle(ref, () => editorRef.current as Editor);

	const onChangeGetHTML = async () => {
    if (!editorRef.current) return;
		let data = editorRef.current.getInstance().getHTML();
		const isNewImage = imageCountRef.current < (data.split('data:image/').length - 1);
		for (const imageItem of imageList) {
			data = data.replace(imageItem.base64, imageItem.url);
		}
		if (isNewImage) {
			data = data.replaceAll('<br>', '').substring(bodyRef.current.replaceAll('<br>', '').length - 4);
			const base64 = data.substring(data.indexOf("data:image/"), data.indexOf('" contenteditable='));
			const file = base64ToFile(base64);

			const formData = new FormData();
			formData.append('file', file);

			const url = await postTrendBoardImageUploadRequest(formData);

				const newBody = body + data.replace(base64, url);
				setBody(newBody);

				imageCountRef.current = imageCountRef.current + 1;

				setImageList([...imageList, { base64, url }]);
		} else {
			setBody(data);
		}
		bodyRef.current = data;
	};

	useEffect(() => {
		if (!editorRef.current || !body) return;
		editorRef.current.getInstance().setHTML(body);
	}, [body, editorRef])


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


