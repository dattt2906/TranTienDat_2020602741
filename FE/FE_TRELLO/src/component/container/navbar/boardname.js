// import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect ,useState} from 'react';
import axios from 'axios';



// function MyFormHelperText() {
//   const { focused } = useFormControl() || {};

//   const helperText = React.useMemo(() => {
//     if (focused) {
//       return 'This field is being focused';
//     }

//     return 'Helper text';
//   }, [focused]);

//   return <FormHelperText>{helperText}</FormHelperText>;
// }

export default function BoardName() {
    // const boardId= Number(localStorage.getItem("boardId"))
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);
    const boardId = params.get('boardId');
const[boardName, setBoardName]=useState("")
useEffect(()=>{
 axios.get(`http://localhost:3001/board/find-board-by-id/${boardId}`).then(res=>{

    if(res.data){
       setBoardName(res.data.boardname)
    }

})


},[])
  return (
    <form noValidate autoComplete="off">
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput value={boardName}/>
        {/* <MyFormHelperText /> */}
      </FormControl>
    </form>
  );
}
