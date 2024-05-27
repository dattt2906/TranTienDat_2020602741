import { Box } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import ClearIcon from '@mui/icons-material/Clear';
import Textarea from '@mui/joy/Textarea';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import axios from "axios";
import Todo from "./todo";



const Todolist=(props)=>{
    const {todolist,updateTodoLists,handleDelTodoList,handleDelTodo}= props
    const todoListId= todolist.todoListId
    const [countChecked, setCountChecked]= useState(0)
    const [todoTitle,setTodoTitle] = useState("")
    const countCheck =(todolist)=>{

        if (todolist && todolist.todos) {
          const checkedCount = todolist.todos.filter(todo => todo.isChecked).length;
          setCountChecked(checkedCount);
      }
      }
    const handleAddTodo=async(todoListId)=>{
  
        await axios.post("http://localhost:3001/todolist/create-todo", { todoTitle, todoListId }).then(res => {
        if(res.data){
    
            updateTodoLists()
            setTodoTitle("")
    
        }
        })
    
          
      }
      useEffect(()=>{
        countCheck(todolist)

      },[todolist])


return(
    <>
       <Box>
                      <Box sx={{display:"flex", justifyContent:"space-between"}}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CheckBoxIcon sx={{ color: "gray" }} />
                        {todolist.todoListTitle}
                      </Box>

                      <Box>

                      <Button onClick={()=>handleDelTodoList(todolist.todoListId)}sx={{ width: "20px", marginTop: "10px", marginBottom: "10px", backgroundColor: "gray" }} variant="contained" disableElevation>
                          Xóa
                        </Button>

                        </Box>

                      </Box>
                      {todolist.todos.length!==0 ?
                      
                      <Box>
                         
                        <span style={{ fontSize: "15px" }}>{Math.floor((countChecked/todolist.todos.length)*100)}%</span>
                        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" value={(countChecked/todolist.todos.length)*100} sx={{marginLeft:"0px"}} />
                      </Box>
                      :
                      
                      <Box>
                         
                        <span style={{ fontSize: "15px" }}>0%</span>
                        <Slider defaultValue={50} aria-label="Default"  valueLabelDisplay="auto" value={0} sx={{marginLeft:"0px"}} />
                      </Box>
}
                      {todolist && todolist.todos.map((todo) => (       
                      
                      
                        <Todo
                        todo={todo}
                        updateTodoLists={updateTodoLists}
                        handleDelTodo={handleDelTodo}
                        />

                      ))}

                      <Textarea placeholder="Thêm một mục"value={todoTitle} onChange={(e)=>setTodoTitle(e.target.value)}></Textarea>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button sx={{ width: "20px", marginTop: "10px", marginBottom: "10px" }} variant="contained" disableElevation onClick={()=>handleAddTodo(todolist.todoListId)}>
                          Thêm
                        </Button>
                        <Button sx={{ width: "20px", marginTop: "10px", marginBottom: "10px", backgroundColor: "gray" }} variant="contained" disableElevation>
                          Hủy
                        </Button>
                      </Box>





                    </Box>
    
    </>


)

}
export default Todolist;


