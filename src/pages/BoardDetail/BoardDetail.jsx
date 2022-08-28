/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Box, Heading, Image, Textarea, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useLongPress } from 'use-long-press';
import {
  PlainPaper,
  TaskIcon,
  StrikeIcon,
  CancelIcon,
  DeleteIcon,
  EditIcon,
  ShareIcon,
} from '../../assets';

function BoardDetail({ mdFont, smFont, fontBright }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [changeText, setChangeText] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sharePopup, setSharePopup] = useState(false);
  const [users, setUsers] = useState([]);

  const { boardId } = useParams();

  const getBoards = JSON.parse(localStorage.getItem('boards'));
  const selectedBoard = getBoards.find((board) => board.id === boardId);
  const boardData = selectedBoard.data;
  const usersData = JSON.parse(localStorage.getItem('users'));

  useEffect(() => {
    if (users === null) {
      setUsers([]);
    } else {
      setUsers(usersData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bind = useLongPress(() => {
    setButtonPopup(true);
  });

  const addTask = () => {
    if (taskInput && !changeText) {
      selectedBoard.data.find((task) => {
        if (task.id === selectedTask) {
          task.name = taskInput;
        }
      });
      localStorage.setItem('boards', JSON.stringify(getBoards));
      setIsPopupOpen(false);
      setButtonPopup(false);
    } else {
      const newTask = {
        id: uuidv4(),
        name: taskInput,
      };

      getBoards.forEach((board) => {
        if (board.id === boardId) {
          board.data.push(newTask);
        }
      });

      localStorage.setItem('boards', JSON.stringify(getBoards));

      setTaskInput('');
      setIsPopupOpen(!isPopupOpen);
    }
  };

  const [taskId, setTaskId] = useState('');

  const deleteTask = (id) => {
    getBoards.forEach((board) => {
      if (board.id === boardId) {
        board.data = board.data.filter((task) => task.id !== id);
      }
    });
    localStorage.setItem('boards', JSON.stringify(getBoards));
    setButtonPopup(false);
  };

  const editTask = (id) => {
    const [updatedTask] = boardData.filter((taskItem) => taskItem.id === id);

    setChangeText(false);
    setTaskInput(updatedTask.name);
    setSelectedTask(id);
    setIsPopupOpen(!isPopupOpen);
  };

  const shareTask = () => {
    setSharePopup(!sharePopup);
  };

  return (
    <Box
      bgImage={PlainPaper}
      bgPosition='top'
      bgRepeat='no-repeat'
      bgSize='cover'
      h='full'
      p='20px 15px'
      position='relative'
    >
      <Heading
        textAlign='center'
        textDecoration='underline'
        mb='30px'
        style={{ fontSize: `${mdFont}px`, filter: `contrast(${fontBright}%)` }}
      >
        {selectedBoard.name}
      </Heading>

      {boardData &&
        boardData.map((taskData, index) => (
          <Box
            key={taskData.id}
            display='flex'
            alignItems='center'
            pl='20px'
            mb='20px'
          >
            <Heading
              as='h4'
              mr='20px'
              style={{
                fontSize: `${mdFont}px`,
                filter: `contrast(${fontBright}%)`,
              }}
            >
              {index + 1}
            </Heading>
            <Heading
              border='4px'
              p='10px'
              w='100%'
              borderColor='gray.400'
              rounded='lg'
              style={{
                fontSize: `${mdFont}px`,
                filter: `contrast(${fontBright}%)`,
              }}
            >
              {taskData.name}
            </Heading>
            <Image
              w='80px'
              ml='20px'
              {...bind()}
              src={StrikeIcon}
              onMouseEnter={() => setTaskId(taskData.id)}
              style={{ cursor: 'pointer' }}
            />
          </Box>
        ))}

      {isPopupOpen && (
        <Box
          bgColor='#cccccc'
          p='20px'
          position='absolute'
          left='0'
          right='0'
          top='0'
          height='100%'
          zIndex='2'
          opacity='0.9'
        >
          <Heading
            as='h3'
            display='inline'
            style={{
              fontSize: `${mdFont}px`,
              filter: `contrast(${fontBright}%)`,
            }}
          >
            Add a task (tasks) to {selectedBoard.name}
          </Heading>
          <Textarea
            mt='10px'
            placeholder='Enter task'
            border='1px'
            borderColor='gray.500'
            resize='none'
            style={{
              fontSize: `${smFont}px`,
            }}
            fontWeight='bold'
            name='taskName'
            mb='20px'
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <Button
            colorScheme='teal'
            w='100px'
            mr='20px'
            style={{
              fontSize: `${smFont}px`,
            }}
            onClick={addTask}
          >
            {changeText ? 'Save' : 'Update'}
          </Button>
          <Button
            style={{
              fontSize: `${smFont}px`,
            }}
            colorScheme='red'
            w='100px'
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          >
            Close
          </Button>
        </Box>
      )}

      {buttonPopup && (
        <Box
          backgroundColor='#cccccc'
          position='absolute'
          width='full'
          h='full'
          opacity='0.9'
          display='flex'
          alignItems='start'
          justifyContent='center'
          flexDirection='column'
          p='20px'
          top='0'
          left='0'
        >
          <Box display='flex'>
            <Image
              src={DeleteIcon}
              w='120px'
              m='0px 20px'
              cursor='pointer'
              onClick={() => deleteTask(taskId)}
            />
            <Image
              src={EditIcon}
              w='120px'
              m='0px 20px'
              cursor='pointer'
              onClick={() => editTask(taskId)}
            />

            <Box position='relative'>
              <Image
                src={ShareIcon}
                w='120px'
                m='0px 10px'
                cursor='pointer'
                onClick={shareTask}
              />
              <Box position='absolute' display='flex'>
                {sharePopup &&
                  users.map((user) => (
                    <Box
                      key={user.id}
                      backgroundColor='#ffffff'
                      w='80px'
                      h='80px'
                      m='10px'
                      p='10px'
                      rounded='full'
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Heading
                        style={{
                          fontSize: `${smFont}px`,
                          filter: `contrast(${fontBright}%)`,
                        }}
                      >
                        {user.name}
                      </Heading>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
          <Image
            src={CancelIcon}
            w='40px'
            position='absolute'
            top='25px'
            right='25px'
            cursor='pointer'
            onClick={() => setButtonPopup(!buttonPopup)}
          />
        </Box>
      )}

      <Box
        position='absolute'
        right='0px'
        bottom='-70px'
        rounded='full'
        boxShadow='md'
        w='80px'
        style={{ cursor: 'pointer' }}
        onClick={() => setIsPopupOpen(!isPopupOpen)}
      >
        <Image src={TaskIcon} />
      </Box>
    </Box>
  );
}

export default BoardDetail;
