import { Box } from "@mui/material"
import Checkbox from '@mui/joy/Checkbox';
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';

const Todo = (props) => {
    const {todo,updateTodoLists,handleDelTodo}=props
    const todoId=todo.todoId
    const  UpdateTodoCheck=async (todoId, Checked)=>{
   
        const isChecked = !Checked
       await axios.put(`http://localhost:3001/todolist/update-isChecked-by-todoId/${todoId}`, {isChecked}).then(res=>{
          updateTodoLists()
        })
     
          
    
      }


    return <>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: "10px" }}>
                <Checkbox checked={todo.isChecked} onChange={() => UpdateTodoCheck(todo.todoId, todo.isChecked)} />{todo.todoTitle}
            </Box>
            <Box onClick={() => handleDelTodo(todo.todoId)}>
                <ClearIcon sx={{ color: "gray" }} />
            </Box>
        </Box>
    </>
}
export default Todo