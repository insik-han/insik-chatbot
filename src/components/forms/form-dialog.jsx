import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import { TextInput } from '.';
import { WEBHOOK_URL } from '../../webhook-config'

const FormDialog = (props) => {
  const initialState = {
    name: "",
    email: "",
    description: ""
  }
  const [state, setState] = useState(initialState);
  const { name, email, description } = state;
  const inputName = (event) => {
    setState({ ...state, name: event.target.value });
  }

  const inputEmail = (event) => {
    setState({ ...state, email: event.target.value });
  }

  const inputDescription = (event) => {
    setState({ ...state, description: event.target.value });
  }

  const validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email)
  }

  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === "") {
        isBlank = true;
      }
    }
    return isBlank;
  }

  const submitForm = () => {
    const isBlank = validateRequiredInput(name, email, description);
    const isValidEmail = validateEmailFormat(email);

    if (isBlank) {
      alert('빈칸이 있네요')
      return false;
    } else if (!isValidEmail) {
      alert('이메일 형식이 아니네요')
      return false;
    } else {
      const payload = {
        text: '문의내역이 있습니다\n'
          + '이름: ' + name + '\n'
          + '이메일: ' + email + '\n'
          + '【문의내용】\n' + description
      }


      fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(() => {
        alert('전송되었습니다. 시간나면 확인해봄')
        setState(initialState);
        return props.handleClose()
      })
    }
  }
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">문의양식</DialogTitle>
      <DialogContent>
        <TextInput
          label={"이름(필수)"}
          multiline={false}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextInput
          label={"이메일(필수)"}
          multiline={false}
          rows={1}
          value={email}
          type={"email"}
          onChange={inputEmail}
        />
        <TextInput
          label={"문의내용(필수)"}
          multiline={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          닫기
        </Button>
        <Button onClick={submitForm} color="primary">
          전송
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog;