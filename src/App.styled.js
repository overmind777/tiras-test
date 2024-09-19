import styled from "styled-components";

export const Wrapper = styled.div``;

export const Form = styled.form`
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;
export const Input = styled.input``;
export const TextArea = styled.textarea``;
export const Button = styled.button`
  cursor: pointer;
  &:hover{
    background-color: green;
  }
  &:active{
    background-color: yellow;
  }
`;
export const List = styled.ul`
  list-style: none;
`;
export const Item = styled.li``;
