import { useReducer, useState } from "react";
import Error from "./Error";
import styled from "styled-components"

const StyledForm = styled.form`
  
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  line-height: 32px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: 2px solid var(--greenWater);
  background-color: transparent;
  position: relative;
`

const StyledBtn = styled.button`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  background-image: linear-gradient(to left bottom, #0a63cd, #008be8, #00aee6, #00ccce, #00e5ad);
  color: var(--white);
  border: none;
  border-radius: 20px;
  font-weight: bold;
  line-height: 38px;
  padding-left: 18px;
  padding-right: 18px;
  margin-right: 12px;
  transition: background-image 1s ease-in-out;
  &:hover {
    background-image: linear-gradient(to left bottom, #00e5ad, #00ccc1, #00aee6, #008be8, #0a63cd);
    cursor: pointer;
  }
`;

const SubmitMessage = styled.p `
  position: fixed;
  z-index: 99;
  font-size: 24px;
  top: 10%;
  left: 50%;
  border-radius: 20px;
  transform: translateX(-50%);
  background-color: rgba(0, 203, 134, .4);
  line-height: 54px;
  padding: 0 20px;
  color: green;
  font-weight: bold;
  transition: opacity 300ms ease-in, transform 500ms cubic-bezier(0.19, 1, 0.22, 1);
`

//ENUM CON I TIPI DI AZIONI
enum FormTypeActions {
  changeField = 'CHANGE_FIELD',
  emptyAllFields = 'EMPTY_ALL_FIELDS',
  emptyOneField = 'EMPTY_ONE_FIELD'
}

//TYPE CON I VARI TIPI DI ACTIONS
type FormAction =
  { type: FormTypeActions.changeField; payload: { name: string, value: string} } |
  { type: FormTypeActions.emptyAllFields } |
  { type: FormTypeActions.emptyOneField, payload: { name: string }}

//INTERFACE CON LA STRUTTURA DELLO STATO DEL FORM
interface formDataStr {
  name: string;
  surname: string;
}

//INTERFACE ERRORS
interface errorsStructure {
  nameErr: boolean;
  surnameErr: boolean;
}

export default function Form() {

  const formDataReducer = (state: formDataStr, action: FormAction): formDataStr => {
    switch (action.type) {
      case FormTypeActions.changeField:{
        const { name, value } = action.payload;
        const newData: formDataStr = {
          ...state,
          [name]: value
        }
        return newData;
      }
      case FormTypeActions.emptyOneField: {
        const { name } = action.payload;
        const newData: formDataStr = {
          ...state,
          [name]: ''
        }
        return newData;
      }
      case FormTypeActions.emptyAllFields: {
        return {
          name: '',
          surname: ''
        }
      }
      default:
        return state;
    }
  }

  const [formData, dispatchFormData] = useReducer(formDataReducer, { name: '', surname: ''});
  const [errors, setErrors] = useState<errorsStructure>({ nameErr: false, surnameErr: false});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    dispatchFormData({ type: FormTypeActions.changeField, payload: { name, value } });
  }

  const handleAllInputsDeleting = (e): void => {
    e.preventDefault();
    dispatchFormData({ type: FormTypeActions.emptyAllFields });
  }

  const handleSuccessSubmitMessage = ():void => {
    setFormSubmitted(true);
    setTimeout(() => { setFormSubmitted(false); }, 4000);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(verifyInputs()) {
      console.log('Form submitted');
      handleSuccessSubmitMessage();
      dispatchFormData({ type: FormTypeActions.emptyAllFields });
    }
  }

  const verifyInputs = (): boolean => {
    const nameInputValue = formData.name.trim();
    const surnameInputValue = formData.surname.trim();
    const minLength = 2;

    if(nameInputValue.length < minLength) {
      showError('name');
      dispatchFormData({ type: FormTypeActions.emptyOneField, payload: { name: 'name'}});
      return false;
    } else if(surnameInputValue.length < minLength) {
      showError('surname');
      dispatchFormData({ type: FormTypeActions.emptyOneField, payload: { name: 'surname'}});
      return false;
    } else {
      return true;
    }
  }

  const showError = (fieldName: 'name' | 'surname'): void => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName + 'Err']: true
    }));
    setTimeout(() => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName + 'Err']: false
      }));
    }, 4000);
  }

  return (
    <StyledForm action="#" method="GET" onSubmit={handleFormSubmit}>
      { formSubmitted && <SubmitMessage role="alert"><span aria-hidden="true">&#10003;</span> Form inviato correttamente</SubmitMessage>}
      <InputGroup>
        <StyledLabel htmlFor="name">Nome</StyledLabel>
        <StyledInput 
          onChange={handleInputChange}
          value={formData.name}
          id="name" 
          name="name" 
          placeholder="Inserisci il tuo nome" 
          type="text"/>
        { errors.nameErr && <Error text="Il nome non è corretto !"/> }
      </InputGroup>
      <InputGroup>
        <StyledLabel htmlFor="surname">Cognome</StyledLabel>
        <StyledInput 
          onChange={handleInputChange}
          value={formData.surname}
          id="surname" 
          name="surname" 
          placeholder="Insert your surname" 
          type="text"/>
        { errors.surnameErr && <Error text="Il cognome non è corretto !"/> }
      </InputGroup>

      <StyledBtn onClick={handleAllInputsDeleting} className="btn">Svuota</StyledBtn>
      <StyledBtn type="submit" className="btn">Invia</StyledBtn>
    </StyledForm>
  )
}
