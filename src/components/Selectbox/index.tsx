import React, { useState } from 'react'
import './style.css'

interface Prop {
  value: string;
  onChange: (value: string) => void;
}

//                     component                       //
export default function SelectBox({ value, onChange}: Prop) {

  const genderListItem = [
    { name: 'MALE', value: 'MALE' },
    { name: 'FEMALE', value: 'FEMALE' },
  ];
  
  const ageListItem = [
    { name: '10대', value: 'MALE' },
    { name: '20대', value: 'FEMALE' },
    { name: '30대', value: 'FEMALE' },
    { name: '40대', value: 'FEMALE' },
    { name: '50대', value: 'FEMALE' },
    { name: '60대', value: 'FEMALE' },
    { name: '70대', value: 'FEMALE' },
    { name: '80대', value: 'FEMALE' },
    { name: '90대', value: 'FEMALE' },
  ];



  //                     state                       //
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  //                     event handler                       //
  const onButtonClickHandler = () => {
    setShow(!show);
  };

  const onItemClickHandler = (value: string) => {
    genderListItem.forEach(item => {
      if (item.value === value) setName(item.name);
    })
    onChange(value);
    setShow(false);
  };

  //                       render                    //
  const buttonClass = show ? 'select-close-button' : 'select-open-button'
  return (
    <div className='select-box'>
      { value === '' ?
        <div className='select-none'>지역</div> :
        <div className='select-item'>{name}</div>
      }
      
      <div className={buttonClass} onClick={onButtonClickHandler}></div>

      {show && 
        <div className='select-list'>
          {genderListItem.map((item) => 
          <div className='select-list-item-box' onClick={() => onItemClickHandler(item.value)}>
            <div className='select-item'>{item.name}</div>
          </div>
          )}
        </div>
      }

    </div>
  )
}
