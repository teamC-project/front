import React, { useRef, useState } from 'react';
import './style.css';


const ToolBar = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
  const [selection, setSelection] = useState<Range | null>(null);
	
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSelection(sel.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    sel?.removeAllRanges();
    if (selection) {
      sel?.addRange(selection);
    }
  };

  const applyStyle = (style: string, value?: string) => {
    if (!selection) return;

    restoreSelection();

    const span = document.createElement('span');
    (span.style as any)[style] = value || '';
    
    if (selection) {
      selection.surroundContents(span);
    }

    saveSelection();
  };
	const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;
        
        restoreSelection();
        if (selection) {
          selection.deleteContents();
          selection.insertNode(img);
        }
        saveSelection();
      };
      reader.readAsDataURL(file);
    }
  };


  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    switch (value) {
      case 'bold':
        applyStyle('fontWeight', 'bold');
        break;
      case 'italic':
        applyStyle('fontStyle', 'italic');
        break;
      case 'underline':
        applyStyle('textDecoration', 'underline');
        break;
      default:
        break;
    }
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    applyStyle('fontFamily', value);
  };

  return (
    <div id = "toolbar-wrapper">
      <div className="toolbar">
        <select onChange={handleStyleChange} defaultValue="">
          <option value="" disabled>폰트 스타일</option>
          <option value="bold">굵게</option>
          <option value="italic">기울임</option>
          <option value="underline">밑줄</option>
        </select>
        <input
          type="color"
          onChange={(e) => applyStyle('color', e.target.value)}
          title="Text Color"
        />
        <select onChange={(e) => applyStyle('fontSize', e.target.value)}>
          <option value="10px">10px</option>
          <option value="13px">13px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
          <option value="48px">48px</option>
        </select>
        <select onChange={handleFontChange} defaultValue="">
				<option value="">폰트 선택</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Helvetica, sans-serif">Helvetica</option>
          <option value="Verdana, sans-serif">Verdana</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Times New Roman, serif">Times New Roman</option>
          <option value="'맑은 고딕', Malgun Gothic, sans-serif">맑은 고딕</option>
          <option value="'굴림', Gulim, sans-serif">굴림</option>
          <option value="'나눔스퀘어', 'Nanum Square', sans-serif">나눔스퀘어</option>
          <option value="'바탕', Batang, serif">바탕</option>
          <option value="'궁서', Gungsuh, serif">궁서</option>
          <option value="'돋움', Dotum, sans-serif">돋움</option>
          <option value="'Arial Black', sans-serif">Arial Black</option>
          <option value="'Comic Sans MS', sans-serif">Comic Sans MS</option>
          <option value="'Courier New', Courier, monospace">Courier New</option>
          <option value="'Lucida Console', Monaco, monospace">Lucida Console</option>
        </select>
				<button onClick={handleImageUpload}>파일 선택</button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
				</div>
      </div>
  );
};

export default ToolBar;