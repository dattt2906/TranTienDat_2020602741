import "./card.css"
import React, { useState, useEffect } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import JoyButton from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";
import { v4 } from 'uuid';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from "../../../firebase";
import EditIcon from '@mui/icons-material/Edit';
import Textarea from '@mui/joy/Textarea';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { display } from "@mui/system";
import { Socket } from "socket.io-client";
import Checkbox from '@mui/joy/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ClearIcon from '@mui/icons-material/Clear';
import Slider from '@mui/material/Slider';
import Todolist from "./todolist";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: "fit-content",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  overflowX: "hidden"

};
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const Card = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { card, cardDel, socket, boardId } = props;
  // console.log(card)
  const [isShowEditCard, setIsShowEditCard] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [showAddImage, setShowAddImage] = useState(false)
  const [content, setContent] = useState("")
  const [img, setImg] = useState("")

  const [description, setDescription] = useState("")
  const [activity, setActivity] = useState("")
  const [attachment, setAttachment] = useState("")
  const [isShowDatePicker, setIsShowDatePicker] = useState(false)

  const [isShowDueDate, setIsShowDueDate] = useState(false)
  const [time, setTime] = useState("")
  const [Deadline, setDeadline] = useState(null)
  const [overdue, setOverdue] = useState(false)
  const [duesoon, setDuesoon] = useState(false)
  const [complete, setComplete] = useState(false)
  const [showTimeInCard, setShowTimeInCard] = useState(false)
  const [timeCard, setTimeCard] = useState("")
  const [comments, setComments] = useState([])
  const [contentComment, setContentComment] = useState("")
  // const [commentChange, setCommentChange]= useState(false)
  const [showModalAddCheckList, setShowModalAddCheckList] = useState(false)
  const [todoLists, setTodoLists] = useState([])
  const [todoListTitle, setTodoListTitle] = useState("")
  const [todoTitle,setTodoTitle] = useState("")
  const [countChecked, setCountChecked]= useState(0)



  const queryString = window.location.search;

  const params = new URLSearchParams(queryString);
  const userId = (params.get('userId'));





  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: card.rowId,
      data: { ...card }
    })
  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform), //css.translate thi khi keo tha se giu nguyen kich thuoc trong khi dang keo ma khong gap loi hien thi
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #3498db" : undefined,
    opacity: card?.FE_PlaceholderCard ? "0" : "1",
    height: card?.FE_PlaceholderCard ? "0px" : "unset"


  };


  const handleCloseModal = () => { setOpenModal(false); handleClose() }

  const [changeContentCard, setChangeContentCard] = useState(card.content);

  useEffect(() => {
    if (changeContentCard) {
      card.content = changeContentCard;
      // console.log("card:", card)
    }
  }, [changeContentCard])
  useEffect(() => {
    if (img) {
      handleUploadImageCard();
    }
  }, [img]);

  const handleUploadImageCard = () => {

    const imageRef = ref(imageDb, `images/${v4()}`)
    uploadBytes(imageRef, img).then((snapshot) => {

      getDownloadURL(snapshot.ref).then((img) => {
        setAttachment(img)

      })

    })

  }

function countCheck (todolist){

  if (todolist && todolist.todos) {
    const checkedCount = todolist.todos.filter(todo => todo.isChecked).length;
    setCountChecked(checkedCount);
}
}
  const handleDelTodoList=async(todoListId)=>{

  await  axios.delete(`http://localhost:3001/todolist/del-todolist-by-id/${todoListId}`)
     
      await  axios.get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {
        if (res.data) {
          setTodoLists(res.data.todoLists)
          updateTodoLists()
        }
  
      
    })
  }

  const handleDelTodo=async(todoId)=>{

    await  axios.delete(`http://localhost:3001/todolist/del-todo-by-id/${todoId}`)
       
        await  axios.get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {
          if (res.data) {
            updateTodoLists()
          }
    
        
      })
    }

  

  const handleAddTodoList = () => {
    setShowModalAddCheckList(false)
    const rowId = card.rowId

    axios.post("http://localhost:3001/todolist/create-todolist", { todoListTitle, rowId }).then(res => {

      if (res.data) {

        axios.get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {

          if (res.data) {
            setTodoLists(res.data.todoLists)
            updateTodoLists()
          }
        })
      }
    })

  }



  const updateComments = () => {
    axios.get(`http://localhost:3001/table/find-row-by-id/${card.rowId}`).then(res => {
      if (res.data.comments && res.data.comments.length > 0) {
        setComments(res.data.comments)
      }
    })
  }
  const updateTodoLists = () => {
    axios.get(`http://localhost:3001/table/find-row-by-id/${card.rowId}`).then(res => {
      if (res.data.todoLists && res.data.todoLists.length > 0) {
        setTodoLists(res.data.todoLists)
      }
    })
  }


  useEffect(() => {
    axios.get(`http://localhost:3001/table/find-row-by-id/${card.rowId}`).then(res => {
      if (res.data.comments && res.data.comments.length > 0) {
        setComments(res.data.comments)
      }
    })
  }, [])



  useEffect(() => {
    axios.get(`http://localhost:3001/table/find-row-by-id/${card.rowId}`).then(res => {
      if (res.data.todoLists && res.data.todoLists.length > 0) {
        setTodoLists(res.data.todoLists)
      }
    })

  }, [])

  const setFormDate = (date) => {
    {

      if (dayjs(date).month() - dayjs(Date()).month() === 0 && dayjs(date).date() - dayjs(Date()).date() === 0) {
        setTime(`Hôm nay lúc ${dayjs(date).hour()}:${dayjs(date).format("mm")} `)
        if (dayjs(date).hour() - dayjs(Date()).hour() > 0) {
          setDuesoon(true)
          setOverdue(false)
          console.log("cùng ngày giờ đặt lớn hơn")
        }
        else if (dayjs(date).hour() - dayjs(Date()).hour() === 0 && dayjs(date).minute() - dayjs(Date()).minute() > 0) {
          setDuesoon(true)
          setOverdue(false)
          console.log("cùng ngày cùng giờ  phút đặt lớn hơn")
        }
        else if (dayjs(date).hour() - dayjs(Date()).hour() === 0 && dayjs(date).minute() - dayjs(Date()).minute() < 0) {
          setOverdue(true)
          setDuesoon(false)
          console.log("cùng ngày cùng giờ  phút đặt nhỏ hơn")
        }
        else if (dayjs(date).hour() - dayjs(Date()).hour() < 0) {
          setOverdue(true)
          setDuesoon(false)
          console.log("cùng ngày giờ nhỏ hơn")
        }


      }
      else if (dayjs(date).month() - dayjs(Date()).month() === 0 && dayjs(date).date() - dayjs(Date()).date() === 1) {
        setOverdue(false)
        setDuesoon(false)
        setTime(`Ngày mai lúc ${dayjs(date).hour()}:${dayjs(date).format("mm")} `)
      }
      else if (dayjs(date).month() - dayjs(Date()).month() === 0 && dayjs(date).date() - dayjs(Date()).date() > 1) {
        setOverdue(false)
        setDuesoon(false)
        setTime(`${monthNames[dayjs(date).month()]} ${dayjs(date).date()} at ${dayjs(date).hour()}:${dayjs(date).format("mm")}`)
      }

      else if (dayjs(date).month() - dayjs(Date()).month() > 0) {
        setTime(`${monthNames[dayjs(date).month()]} ${dayjs(date).date()} at ${dayjs(date).hour()}:${dayjs(date).format("mm")}`)

      }
      else {

        setOverdue(true)
        setDuesoon(false)
        setTime(`${monthNames[dayjs(date).month()]} ${dayjs(date).date()} at ${dayjs(date).hour()}:${dayjs(date).format("mm")}`)

      }


    }
  }

  const setDateTimeCard = (date) => {
    setTimeCard(`${monthNames[dayjs(date).month()]} ${dayjs(date).date()}`)




  }


  const handleShowDatePicker = () => {
    setIsShowDatePicker(true)

  }
  const confirmDateCard = async () => {
    setIsShowDatePicker(false)
    setIsShowDueDate(true)
    setShowTimeInCard(true)
    const deadline = Deadline.$d

    await axios.put(`http://localhost:3001/table/update-deadline-by-rowId/${card.rowId}`, { deadline }).then(res => {
      if (res.data) {
        socket.emit("add-deadline", boardId)
        console.log(deadline)
      }
    })
    setFormDate(Deadline.$d)

    setDateTimeCard(Deadline.$d)

  }

  useEffect(() => {
    if (attachment) {
      axios.put(`http://localhost:3001/table/update-rowDetail/${card.rowId}`, { description, attachment, activity }).then(res => {
        if (res.data) {
        }
      })
    }

  }, [attachment])


  useEffect(() => {
    axios.get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {
      if (res.data) {
        setContent(res.data.content)
        setDescription(res.data.description)
        setActivity(res.data.activity)
        setAttachment(res.data.attachment)
        if (res.data.deadline) {
          setShowTimeInCard(true)
          setIsShowDueDate(true)
          setFormDate(res.data.deadline)
          setDateTimeCard(res.data.deadline)


        }

      }
    })


  }, [])


  const handleOpenModal = () => {


    setOpenModal(true);


  }
  const cancelInput = () => {

    setShowAddImage(false)
    setAnchorEl(null);

  }
  const handleClose = () => {
    setAnchorEl(null);
    setShowAddImage(false)

  };

  const changeRowDetail = () => {

    axios.put(`http://localhost:3001/table/update-rowDetail/${card.rowId}`, { description, attachment, activity }).then(res => {
      if (res.data) {
        alert("Cap nhat thong tin card thanh cong")
      }
    })

  }
  const handleAddComment = () => {

    const rowId = card.rowId
    axios.post("http://localhost:3001/comment/create-comment", { userId, contentComment, rowId }).then(res => {
      if (res.data) {
        axios.get(`http://localhost:3001/table/find-rowDetail-by-rowId/${card.rowId}`).then(res => {

          if (res.data) {
            setComments(res.data.comments)
            updateComments()
          }
        })
      }
    })



  }

  return (
    <>
      <div className="card"
        ref={setNodeRef}
        style={dndKitCardStyles}
        {...attributes}
        {...listeners}
      >
        {/* <input className="change-content" value={card.content} onClick={handleOpenModal}></input> */}

        <Box sx={{ width: "230px", minHeight: "48px", height: "fit-content", borderRadius: "10px", border: "none", fontSize: "20px", display: "flex", justifyContent: "center", flexDirection: "column", gap: 2.5 }} onClick={handleOpenModal}>

          {attachment ?
            <img style={{ width: "280px", height: "200px", borderRadius: "10px" }} src={attachment}></img>
            :
            null
          }
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ marginBottom: "5px", marginLeft: "10px" }}>

              {card.content}


            </Box>
            {
              showTimeInCard ?




                <Box sx={{ display: "flex", justifyContent: "center", marginLeft: "10px", marginBottom: "5px", backgroundColor: overdue ? "#ed3333" : (duesoon ? "#c9c727" : "gray"), width: "100px", color: "white", gap: 1, borderRadius: "5px", fontSize: "17px" }}>
                  <AccessTimeIcon sx={{ fontSize: "25px" }} />
                  <span style={{ height: "0px" }}>{timeCard}</span>
                </Box>
                :
                null
            }

          </Box>



        </Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="Box">
              <Box sx={{ overflowY: "no-scroll", height: "600px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CreditCardIcon />
                    <span>{content}</span>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Box onClick={handleShowDatePicker} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", marginRight: "100px" }}>
                      <AccessTimeIcon />
                      <span>Ngày</span>
                    </Box>
                  </Box>




                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ marginTop: "30px", width: "250px", fontSize: "15px" }}>
                    <span>Trong danh sách {card.cols.columnName}</span>

                  </Box>
                  {isShowDueDate ?
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
                      <Box sx={{ marginTop: "30px", fontSize: "15px" }}>
                        <span>Ngày hết hạn</span>


                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Checkbox />
                        <span style={{ fontSize: "15px" }}>{time}</span>
                      </Box>

                    </Box>
                    :
                    null
                  }
                  {overdue ?
                    <Box sx={{ backgroundColor: "red", color: "white", height: "30px", display: "flex", alignItems: "center", marginTop: "50px", marginLeft: "20px", gap: 0.5 }}>
                      <AccessTimeIcon />
                      <span style={{ fontSize: "15px" }}>Quá hạn</span>




                    </Box>
                    :
                    null}
                  {duesoon ?
                    <Box sx={{ backgroundColor: "#e8e514", color: "white", height: "30px", display: "flex", alignItems: "center", marginTop: "50px", marginLeft: "20px", gap: 1 }}>
                      <AccessTimeIcon />
                      <span style={{ fontSize: "15px" }}>Sắp hết hạn</span>



                    </Box>
                    :
                    null
                  }
                  {complete ?
                    <Box sx={{ backgroundColor: "#19DF47", color: "white", height: "30px", display: "flex", alignItems: "center", marginTop: "60px", marginLeft: "20px", gap: 1 }}>

                      <span>Hoàn thành</span>



                    </Box>
                    :
                    null
                  }
                </Box>
                {isShowDatePicker ?
                  <Box sx={{ width: "fit-content", position: "relative", marginLeft: "620px", marginTop: "-50px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                          sx={{ height: '60px' }}
                          label="Ngày hết hạn"
                          value={Deadline}
                          onChange={(newValue) => setDeadline(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <JoyButton onClick={confirmDateCard}>Lưu</JoyButton>
                  </Box>
                  :
                  null
                }
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box onClick={(e) => setShowModalAddCheckList(true)} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", marginTop: "20px", marginLeft: "700px", position: "relative" }}>
                    <CheckBoxIcon sx={{ color: "gray" }} />
                    <span>Việc cần làm</span>


                  </Box>
                  {showModalAddCheckList ?
                    <Box sx={{ left: "690px", position: "absolute", marginTop: "50px", width: "240px", height: "200px", backgroundColor: "#b5b6f3", zIndex: 1 }}>
                      <Box sx={{ marginTop: "10px", color: "white", display: "flex", alignItems: "center" }}>

                        <span style={{ textAlign: "center", width: "200px", paddingLeft: "25px" }}> Thêm việc cần làm</span>
                        <ClearIcon onClick={(e) => setShowModalAddCheckList(false)} sx={{ marginLeft: "10px" }} />

                      </Box>
                      <Box sx={{ display: "flex", marginLeft: "10px", width: "calc(100% - 20px)", marginRight: "10px" }}>
                        <Box sx={{ marginTop: "15px" }}>
                          <FormControl>
                            <FormLabel>Tiêu đề</FormLabel>
                            <Input placeholder="Việc cần làm" onChange={(e) => setTodoListTitle(e.target.value)} />

                          </FormControl>
                          <Box sx={{ marginTop: "20px" }}>
                            <JoyButton type='submit' sx={{ width: "70px" }} onClick={handleAddTodoList}>Thêm</JoyButton>

                          </Box>
                        </Box>

                      </Box>
                    </Box>
                    :
                    null
                  }
                </Box>

                <Box sx={{ width: "70%", marginTop: "40px", display: "flex", flexDirection: "column", gap: 5 }}>

                  <FormControl>
                    <FormLabel>Mô tả</FormLabel>
                    {showAddImage === true ?
                      <Box sx={{ display: "flex", position: "absolute", marginTop: "30px", zIndex: 1, marginLeft: "500px", marginTop: "20px" }}>

                        <input type='file' className="imageCard" onChange={(e) => { setImg(e.target.files[0]) }} style={{ display: "none" }} />
                        <Button onClick={() => { document.querySelector('input[type="file"].imageCard').click(); }}> <AddPhotoAlternateIcon /></Button>


                      </Box>
                      :
                      <Box></Box>
                    }

                    <Textarea sx={{ border: "none", paddingTop: "30px", width: "100%", minHeight: "100px", height: "fit-content", wordBreak: "break-all" }} value={description} onClick={() => setShowAddImage(true)} onChange={(e) => setDescription(e.target.value)}></Textarea>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                      <Button sx={{ width: "20px", marginTop: "10px" }} variant="contained" disableElevation onClick={changeRowDetail}>
                        Lưu
                      </Button>
                      <Button onClick={cancelInput} sx={{ width: "20px", marginTop: "10px", backgroundColor: "gray" }} variant="contained" disableElevation>
                        Hủy
                      </Button>
                    </Box>

                  </FormControl>



                  {attachment ?

                    <Box sx={{ display: "flex", flexDirection: "column" }}>

                      <span>Đính kèm</span>
                      <img style={{ width: "250px", height: "200px" }} src={attachment}></img>

                    </Box>
                    :
                    null}

                  {todoLists && todoLists.length > 0 && todoLists.map((todolist) =>
                  // countCheck(todolist)

                  
                  ( 

                    <Todolist
                    todolist={todolist}
                    updateTodoLists ={updateTodoLists}
                    handleDelTodoList={handleDelTodoList}
                    handleDelTodo={handleDelTodo}
                    />
                    
                  ))} 
                  <Box>
                    <FormControl>
                      <FormLabel>Hoạt động</FormLabel>
                      <Box>
                        {/* <img style={{height:"40px", width:"40px", borderRadius:"50%"}} src={card.comments.user.}></img> */}
                        <Textarea placeholder="Write a commnet..." sx={{ border: "none", width: "100%", minHeight: "30px", height: "fit-content", wordBreak: "break-all" }} onChange={(e) => setContentComment(e.target.value)} ></Textarea>
                      </Box>
                      <Button sx={{ width: "20px", marginTop: "10px", marginBottom: "10px" }} onClick={handleAddComment} variant="contained" disableElevation>
                        Lưu
                      </Button>
                      {comments && comments.length > 0 && comments.map((comment) => (



                        <Box sx={{ marginTop: "15px", marginBottom: "25px", display: "flex", gap: 2 }}>
                          <Box>

                            <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src={comment.user.userInfors.avatarImg}></img>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                              <span>{comment.user.userInfors.display_name}</span>
                              <Box sx={{ border: "1px solid gray", borderRadius: "10px", padding: "10px", fontSize: "15px" }}>
                                <span>{comment.contentComment}</span>
                              </Box>
                            </Box>

                          </Box>

                        </Box>


                      ))}
                    </FormControl>
                  </Box>

                </Box>


              </Box>
            </Typography>

          </Box>
        </Modal>

        <i class="fa fa-pencil icon-edit-card" onClick={() => setIsShowEditCard(true)}></i>

      </div>

      {!isShowEditCard === false ?
        <div className="conntent-edit-card">
          <button className="icon-delete" onClick={() => cardDel(card)}> Delete</button>
          <button className="icon-save" onClick={(e) => setChangeContentCard(e.target.value)}>Save</button>
          <i className="fa fa-times icon-cancel-edit" onClick={() => setIsShowEditCard(false)}></i>

        </div>
        :
        <div></div>
      }
    </>

  )

}
export default Card;