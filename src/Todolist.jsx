import React from 'react';
import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { TodoItem } from './components/TodoItem';

//js에서 동적으로 생성한 요소들은 createGlobalStyle에서 스타일 작성
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .todo-item {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 380px;
        background-color: bisque;
        border: 0.2px solid white;
        border-radius: 15px;

        @media screen and (max-width:390px){
            width:290px;
        }
        
    }

    .myCheckbox{
        margin-left: 30px;
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .myDeletebutton{
        background-color: black;
        color: white;
        height:15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left:5px ;
    }

    .highlight { 
        background-color:yellow;
    }

`;

//media query는 위의 내용을 상속받음...
const StyledContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height:450px;
    width:600px;
    margin: auto;
    background-color: bisque;
    border: 0.2px solid #c4c4c4;
    border-radius: 15px;

    @media screen and (max-width:390px){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height:700px;
        width:390px;
        margin: auto;
        background-color: bisque;
        border: 0.2px solid #c4c4c4;
        border-radius: 15px;
    }
`;

const StyledTitle=styled.div`
    margin-top: 15px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height:50px;
    width: 200px;
    background-color: white;
    border: 0.2px solid #c4c4c4;
    border-radius: 15px;
    color: gray;
    font-family: 'YourHandwritingFont', cursive;
`;


const StyledHeader=styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    height: 50px;
    width:400px;
    background-color: white;
    border: 0.2px solid #c4c4c4;
    border-radius: 15px;

    @media screen and (max-width:390px){
        margin-top: 10px;
        display: flex;
        flex-direction:row;
        justify-content: center;
        align-items: center;
        height: 50px;
        width:350px;
        background-color: white;
        border: 0.2px solid #c4c4c4;
        border-radius: 15px;
    }
`;

const StyledDeleteall=styled.div`
    margin-left: 10px;

    @media screen and (max-width:390px){
        margin-left: 10px;
    }
`;

const StyledComplete=styled.div`
    margin-left: 10px;
`;

const StyledListpart=styled.div`
    width:480px;
    height:250px;
    margin-top: 10px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    border: 0.2px solid #c4c4c4;
    border-radius: 15px;
    
    @media screen and (max-width:390px){
        width:360px;
        height: 480px;
    }
`;

const StyledAlldelete = styled.button`
    background-color: black;
    color: white;
    width:80px;
`;

const StyledCheckcomplete = styled.button`
    background-color: black;
    color: white;
    width:50px;
`;

const StyledBookmark = styled.button`
    height: 30px;
    width: 40px;
    margin-top: 10px;
    margin-left: 430px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color:bisque;
    border: 0.2px solid white;
    border-radius: 15px;
    font-size: 20px;
    background-color: white;

    @media screen and (max-width:390px){
        margin-left: 0px;
    }
`;



export function Todolist(){
    const [id, setId] = useState(""); // id 상태 관리
    const [inputText, setInputText] = useState(""); // 입력한 내용 상태 관리
    const [todoList,setTodoList]=useState([]);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = Object.keys(window.localStorage).map(key => JSON.parse(window.localStorage.getItem(key)));
        setTodos(storedTodos);

    }, []); 

    //리스트마다 고유한 id생성 
    function generateUniqueId() {
        return uuidv4();
    }


    
    function todoadd(){
        var newItemId = generateUniqueId();
        var newInputText=document.getElementById("todoInput").value;
        
        //아무것도 입력하지 않고 +를 눌렀을때 경고창
        if(newInputText===""){
            alert("할 일을 입력하세요.");
            return;
        }

        setId(newItemId);
        setInputText(newInputText);
        
        setTodoList([...todoList,newInputText]);

        // div로 todolist목록 칸 만들기
        var todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        

        //input으로 체크박스 만들고 css에서 조작하기 워해 이름 부여
        var ListCheckbox = document.createElement("input")
        ListCheckbox.type="checkbox";
        ListCheckbox.classList.add("myCheckbox");  //전에 만들었던 todolist과제에서는 그냥 Name을 부여/ 여기서는 classList.add를 사용하여 이름 부여
        
        //span으로 입력한값 넣을 수 있는 공간 만들기
        var textSpan=document.createElement("span");
        textSpan.textContent = newInputText;
    
        //button으로 x표시 만들고 css에서 조작하기 위해 이름 부여
        var deletebutton=document.createElement("button");
        deletebutton.innerText="x";
        deletebutton.classList.add("myDeletebutton");  //전에 만들었던 todolist과제에서는 그냥 Name을 부여/ 여기서는 classList.add를 사용하여 이름 부여
    
        //생성한 요소들을 todoItem의 자식요소들로 append
        todoItem.appendChild(ListCheckbox);
        todoItem.appendChild(textSpan);
        todoItem.appendChild(deletebutton);
        
        //deletebutton을 동작하게 하는 함수호출(deleteList(e) 함수)
        deletebutton.addEventListener("click", deleteList); 
    
        
        document.getElementById("todoList").appendChild(todoItem); //html 파일의 todoList 자식요소로 todoItem append
      
        
        document.getElementById("todoInput").value = ""; //입력필드 비우기

        window.localStorage.setItem(newItemId, JSON.stringify({id: newItemId,text:newInputText}));  //localStorage에 해당 리스트 추가
        todoItem.id = newItemId; //리스트의 각 id들을 설정
    }

    function deleteList(e){ //삭제 버튼(x) 클릭시 
        var removeList = e.target.parentElement; 
        removeList.remove();
        var itemId = removeList.id;      //리스트의 id 축출
        window.localStorage.removeItem(itemId);  //localStorage에서 해당 리스트만 지우기
    }
    
    function todoAlldelete(){ //전체삭제 클릭시
        const parent=document.getElementById("todoList");
        parent.replaceChildren();
        window.localStorage.clear();   //localStorage 다 비우기
    }
    
    function todoCheckComplete() { //완료 클릭시
        var checkboxes = document.querySelectorAll('.todo-item input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checkbox.nextElementSibling.style.textDecoration = "line-through";
            } else {
                checkbox.nextElementSibling.style.textDecoration = "none";
            }
        });
    }
    
    function todoBookmark(){ //별표 클릭시
        var checkboxes = document.querySelectorAll('.todo-item input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                var text=checkbox.nextElementSibling;
                text.classList.add("highlight");
            } 
        });
    }
    return(
    <>
        <GlobalStyle/>
        <StyledContainer>
            <StyledTitle>
                <h1>TO DO LIST</h1>
            </StyledTitle>
                
            <StyledHeader>
                <div className="inputList">
                    <input type="text" id="todoInput" placeholder="할 일을 입력하세요"></input>
                    <button className="add" onClick={todoadd}>+</button>
                </div>
        
                <StyledDeleteall>
                    <StyledAlldelete onClick={todoAlldelete} >전체삭제</StyledAlldelete>
                </StyledDeleteall>
        
                <StyledComplete>
                    <StyledCheckcomplete onClick={todoCheckComplete} >완료</StyledCheckcomplete>
                </StyledComplete>
            </StyledHeader>
        
            <StyledListpart>
                <ul id="todoList">
    
                </ul>
            </StyledListpart>
        
            <div className="star">
                <StyledBookmark onClick={todoBookmark} >🌟</StyledBookmark>
            </div>
        
        </StyledContainer>
    </>
    );
}