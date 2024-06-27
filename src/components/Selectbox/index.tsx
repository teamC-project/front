import { useEffect, useState } from 'react';

import './style.css';

interface Prop {
    value: string;
    onChange: (value: string) => void;
}

//                          component                           //
export default function SelectBox({ value, onChange}: Prop) {

    const ageListItem = [
        { name: '10대', value: '10대' },
        { name: '20대', value: '20대' },
        { name: '30대', value: '30대' },
        { name: '40대', value: '40대' },
        { name: '50대', value: '50대' },
        { name: '60대', value: '60대' },
        { name: '70대', value: '70대' },
        { name: '80대', value: '80대' },
        { name: '90대', value: '90대' },
    ];

//                          state                           //
    const [name, setName] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);

//                          event handler                           //
    const onButtonClickHandler = () => {
        setShow(!show);
    };

    const onItemClickHandler = (value: string) => {
        ageListItem.forEach(item => {
        if (item.value === value) setName(item.name);
        })
        onChange(value);
        setShow(false);
    };

//                          effect                          //
    useEffect(() => {
        ageListItem.forEach(item => {
        if (item.value === value) setName(item.name);
        })
        setShow(false);
    }, [value]);

    const buttonClass = show ? 'select-close-button' : 'select-open-button'
    
//                          render                          //
    return (
        <div className='select-box'>
        { value === '' ?
            <div className='select-none'>연령대</div> :
            <div className='select-item'>{name}</div>
        }
        
        <div className={buttonClass} onClick={onButtonClickHandler}></div>
        {show && (
            <div className='select-list'>
            {ageListItem.map((item) => (
                <div
                key={item.value}
                className='select-list-item-box'
                onClick={() => onItemClickHandler(item.value)}
                >
                <div className='select-item'>{item.name}</div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
}