import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdEmail } from 'react-icons/md';
import { FcPlus, FcMinus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import {
  postBulkEmail,
  reset,
  getBulkEmail,
} from '../features/email/emailSlice';

function BulkEmail() {
  const [text, setText] = useState([]);
  const [name, setName] = useState('');
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState([]);

  const dispatch = useDispatch();

  const { isSuccess, data } = useSelector((state) => state.email);

  useEffect(() => {
    dispatch(getBulkEmail());
    // if (isSuccess) {
    //   toast.success('Successfully created');
    // }

    // dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    const check = data?.map((_) => false);
    setOpen(check);
  }, [data]);

  const addEmails = () => {
    const obj = {};
    obj['text'] = '';
    setText((prevState) => [...prevState, obj]);
  };

  const handleRemove = (index) => {
    setText((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const prevState = [...text];
    const objIndex = prevState.findIndex((item, i) => i === index);
    prevState[objIndex].text = value;
    setText(prevState);
  };

  const handleCheck = (i) => {
    const prevState = [...open];
    prevState[i] = !prevState[i];
    setOpen(prevState);
  };

  useEffect(() => {
    let results = [];
    for (var i = 0; i < text.length; i++) {
      if (!text[i].text) {
        results.push(text[i]);
      }
    }
    if (text.length > 0 && results.length === 0) {
      setDisable(false);
    }
  }, [text]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Please enter bulkEmail name');
    } else {
      const data = { name, text };
      dispatch(postBulkEmail(data));
    }
  };
  return (
    <section className='heading'>
      <h1>
        <MdEmail /> Bulk Email
      </h1>

      <div className='tasks'>
        <section className='size'>
          <ul>
            {data.map((item, i) => {
              return (
                <span key={item._id}>
                  {' '}
                  <li className='task'>
                    {item.name}{' '}
                    <span
                      className='add'
                      style={{ marginLeft: 40 }}
                      onClick={() => handleCheck(i)}
                    >
                      {open.length > 0 && open[i] ? <FcMinus /> : <FcPlus />}
                    </span>
                  </li>
                  {open.length > 0 &&
                    open[i] &&
                    item.text.map((email) => (
                      <li className='sublist'>{email.text} </li>
                    ))}
                </span>
              );
            })}
          </ul>
        </section>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <span className='add' onClick={addEmails}>
                <FcPlus />
              </span>
              <input
                type='text'
                className='form-control'
                name='name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter Bulk Name'
              />
              {text.map((item, index) => {
                return (
                  <span style={{ display: 'flex' }}>
                    <input
                      type='email'
                      className='form-control'
                      name='name'
                      id='name'
                      value={item.text}
                      placeholder='Enter Email Address'
                      onChange={(e) => handleChange(e, index)}
                      key={index}
                    />
                    <span className='add' onClick={() => handleRemove(index)}>
                      <FcMinus />
                    </span>
                  </span>
                );
              })}
            </div>

            {text.length > 0 && (
              <div className='form-group'>
                <button
                  type='submit'
                  className='btn btn-block'
                  style={{ pointerEvents: disable ? 'none' : 'pointer' }}
                  disabled={disable}
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </section>
      </div>
    </section>
  );
}

export default BulkEmail;
