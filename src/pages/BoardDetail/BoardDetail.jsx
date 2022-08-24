import React, { useState, useEffect } from 'react';
import { Box, Heading, Image, Textarea, Button } from '@chakra-ui/react';
// import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PlainPaper from '../../assets/images/plain_paper.png';
import fetchBoards from '../../utils/fetchBoards';
import TaskIcon from '../../assets/images/task_btn.png';
import StrikeIcon from '../../assets/images/strike_btn.png';

function BoardDetail() {
  const [boardList, setBoardList] = useState(null);
  // const { boardName } = useParams();

  const [tasks, setTasks] = useState([{ id: uuidv4(), taskName: '' }]);

  const addInputField = () => {
    setTasks([...tasks, { id: uuidv4(), taskName: '' }]);
  };

  const handleSave = () => {
    console.log('y');
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const tasksDataList = [...tasks];
    tasksDataList[index][name] = value;
    setTasks(tasksDataList);
  };

  useEffect(() => {
    const data = fetchBoards();
    setBoardList(data);
  }, []);

  const handleStrike = () => {
    console.log('cli');
  };

  if (!boardList) return 'Loading...';
  if (!tasks) return 'Loading...';

  // const board = boardList.filter((boardItem) => boardItem.name === boardName);
  // console.log(board);
  // tasks.filter((task, i) => console.log(task.id, i, task.taskName));

  return (
    <Box
      bgImage={PlainPaper}
      bgPosition='top'
      bgRepeat='no-repeat'
      bgSize='cover'
      h='500px'
      p='20px 50px'
      position='relative'
    >
      <Heading textAlign='center' textDecoration='underline' mb='30px'>
        {/* {board[0].name} */}
      </Heading>

      {tasks.map((task, index) => (
        <Box key={task.id} display='flex' alignItems='center' mb='30px'>
          <Heading as='h3' display='inline' mr='20px'>
            {index + 1}
          </Heading>
          <Textarea
            key={task.id}
            onChange={(e) => handleChange(e, index)}
            placeholder='Enter task'
            border='1px'
            borderColor='gray.500'
            resize='none'
            fontSize='2xl'
            fontWeight='bold'
            name='taskName'
            value={task.name}
          />

          <Box
            w='100px'
            ml='20px'
            style={{ cursor: 'pointer' }}
            onClick={handleStrike}
          >
            <Image src={StrikeIcon} />
          </Box>
        </Box>
      ))}

      <Button colorScheme='teal' onClick={handleSave}>
        Save
      </Button>

      {/* <Box display='flex' alignItems='center'>
        <Heading as='h3' display='inline' mr='20px'>
          1
        </Heading>
        <Textarea
          placeholder='Enter task'
          border='1px'
          borderColor='gray.500'
          resize='none'
          fontSize='2xl'
          fontWeight='bold'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Box w='100px' ml='20px' style={{ cursor: 'pointer' }}>
          <Image src={StrikeIcon} />
        </Box>
      </Box> */}
      <Box
        position='absolute'
        right='20px'
        bottom='15px'
        w='80px'
        style={{ cursor: 'pointer' }}
        onClick={addInputField}
      >
        <Image src={TaskIcon} />
      </Box>
    </Box>
  );
}

export default BoardDetail;
